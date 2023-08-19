import { onRequest } from 'firebase-functions/v2/https'
import { OpenAI, OpenAIMessage, OpenAIOptions } from '@skeet-framework/ai'
import { TypedRequestBody } from '@/types'
import { getUserBearerToken } from '@/lib/getUserAuth'
import { publicHttpOption } from '@/routings'
import { defineSecret } from 'firebase-functions/params'
import { skeetGraphql, sleep } from '@skeet-framework/utils'
import { CreateStreamChatMessageParams } from '@/types'
import { inspect } from 'util'
import {
  GetChatRoomMessagesQuery,
  GetUserChatRoomQuery,
  UpdateChatRoomQuery,
} from '@/queries'
import { ChatRoom, ChatRoomMessage } from '@/models'
import { CreateChatRoomMessageQuery } from '@/queries'
const chatGptOrg = defineSecret('CHAT_GPT_ORG')
const chatGptKey = defineSecret('CHAT_GPT_KEY')
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')

export const createStreamChatMessage = onRequest(
  {
    ...publicHttpOption,
    secrets: [chatGptOrg, chatGptKey, SKEET_GRAPHQL_ENDPOINT_URL],
  },
  async (req: TypedRequestBody<CreateStreamChatMessageParams>, res) => {
    const organization = chatGptOrg.value()
    const apiKey = chatGptKey.value()
    if (!organization || !apiKey)
      throw new Error(
        `ChatGPT organization or apiKey is empty\nPlease run \`skeet add secret CHAT_GPT_ORG/CHAT_GPT_KEY\``
      )

    // Get Request Body
    console.log(inspect(req.body, { depth: null }))
    const body = {
      chatRoomId: req.body.chatRoomId || '',
      content: req.body.content,
    }
    if (body.chatRoomId === '') throw new Error('chatRoomId is empty')

    // Get User Info from Firebase Auth
    const token = await getUserBearerToken(req)

    try {
      // Get ChatRoom Info from GraphQL
      const variables = {
        getChatRoomId: body.chatRoomId,
      }
      const chatRoom = await skeetGraphql<{ data: { getChatRoom: ChatRoom } }>(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        GetUserChatRoomQuery,
        variables
      )
      console.log(inspect(chatRoom, { depth: null }))

      // Create OpenAI
      const openAiOptions: OpenAIOptions = {
        organizationKey: organization,
        apiKey,
        model: chatRoom.data.getChatRoom.model,
        maxTokens: chatRoom.data.getChatRoom.maxTokens,
        temperature: chatRoom.data.getChatRoom.temperature,
        stream: true,
      }

      const openAi = new OpenAI(openAiOptions)

      // Create ChatRoomMessage
      const variables2 = {
        createChatRoomMessageChatRoomId: body.chatRoomId,
        createChatRoomMessageRole: 'user',
        createChatRoomMessageContent: body.content,
      }
      const result = await skeetGraphql<{
        data: { createChatRoomMessage: ChatRoomMessage }
      }>(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        CreateChatRoomMessageQuery,
        variables2
      )
      console.log(inspect(result, { depth: null }))

      const variables3 = {
        getChatRoomMessagesChatRoomId: body.chatRoomId,
      }
      const chatMessages = await skeetGraphql<{
        data: { getChatRoomMessages: ChatRoomMessage[] }
      }>(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        GetChatRoomMessagesQuery,
        variables3
      )
      console.log(inspect(chatMessages, { depth: null }))

      // Update UserChatRoom Title
      if (
        chatRoom.data.getChatRoom.title == '' ||
        !chatRoom.data.getChatRoom.title
      ) {
        const title = await openAi.generateTitle(body.content)

        if (title) {
          const variables4 = {
            id: body.chatRoomId,
            title,
          }
          await skeetGraphql(
            token,
            SKEET_GRAPHQL_ENDPOINT_URL.value(),
            UpdateChatRoomQuery,
            variables4
          )
        }
      }

      // Send Request to OpenAI
      const messages = chatMessages.data.getChatRoomMessages.map((message) => {
        return {
          role: message.role,
          content: message.content,
        } as OpenAIMessage
      })
      const prompt = {
        messages,
      }
      console.log('prompt')
      console.log(inspect(prompt, { depth: null }))

      // Get OpenAI Stream
      const stream = await openAi.promptStream(prompt)
      const messageResults: string[] = []
      let streamClosed = false

      res.once('error', () => (streamClosed = true))
      res.once('close', () => (streamClosed = true))
      stream.on('data', async (chunk: Buffer) => {
        const payloads = chunk.toString().split('\n\n')
        for await (const payload of payloads) {
          if (payload.includes('[DONE]')) return
          if (payload.startsWith('data:')) {
            const data = payload.replaceAll(/(\n)?^data:\s*/g, '')
            try {
              const delta = JSON.parse(data.trim())
              const message = delta.choices[0].delta?.content
              if (message == undefined) continue

              // Log Message
              console.log(message)
              messageResults.push(message)

              while (!streamClosed && res.writableLength > 0) {
                await sleep(10)
              }

              // Send Message to Client
              res.write(JSON.stringify({ text: message }))
            } catch (error) {
              console.log(`Error with JSON.parse and ${payload}.\n${error}`)
            }
          }
        }
        if (streamClosed) res.end('Stream disconnected')
      })

      // Stream End
      stream.on('end', async () => {
        const message = messageResults.join('')
        // Send Message to Client
        const variables5 = {
          createChatRoomMessageChatRoomId: body.chatRoomId,
          createChatRoomMessageRole: 'assistant',
          createChatRoomMessageContent: message,
        }
        const result = await skeetGraphql(
          token,
          SKEET_GRAPHQL_ENDPOINT_URL.value(),
          CreateChatRoomMessageQuery,
          variables5
        )
        console.log('got result')
        console.log(inspect(result, { depth: null }))
        res.end('Stream done')
      })
      stream.on('error', (e: Error) => console.error(e))
    } catch (error) {
      if (
        error instanceof Error &&
        !error.message.includes('Please ask to join the whitelist.') &&
        !error.message.includes('userChatRoomId is empty') &&
        !error.message.includes('stream must be true') &&
        !error.message.includes(
          `ChatGPT organization or apiKey is empty\nPlease run \`skeet add secret CHAT_GPT_ORG/CHAT_GPT_KEY\``
        )
      ) {
        console.error(`OpenAI API Connection Error - ${error}`)
      }

      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
