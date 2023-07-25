import { onRequest } from 'firebase-functions/v2/https'
import { CreateChatCompletionRequest } from 'openai'
import { streamChat } from '@/lib/openai/openAi'
import { TypedRequestBody } from '@/index'
import { getUserBearerToken } from '@/lib/getUserAuth'
import { privateHttpOption, publicHttpOption } from '@/routings'
// import { generateChatRoomTitle } from '@/lib/openai/generateChatRoomTitle'
import { defineSecret } from 'firebase-functions/params'
import { createCloudTask, skeetGraphql, sleep } from '@skeet-framework/utils'
import {
  CreateChatMessageParams,
  CreateStreamChatMessageParams,
  GetChatRoomParams,
} from '@/types/http/createStreamChatMessageParams'
import { inspect } from 'util'
const chatGptOrg = defineSecret('CHAT_GPT_ORG')
const chatGptKey = defineSecret('CHAT_GPT_KEY')
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')
type ChatRoomParams = {
  model: string
  maxTokens: number
  temperature: number
  stream: boolean
}

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
    const getChatRoomBody: GetChatRoomParams = {
      id: body.chatRoomId,
    }

    try {
      const queryType = 'query'
      const queryName = 'getChatRoom'
      const chatRoom = await skeetGraphql<GetChatRoomParams, ChatRoomParams>(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        queryType,
        queryName,
        getChatRoomBody,
        ['model', 'maxTokens', 'temperature', 'stream']
      )
      console.log('got chatRoom')
      console.log(inspect(chatRoom, { depth: null }))
      // Update UserChatRoom Title
      // if (messages.length === 2) {
      //   const title = await generateChatRoomTitle(
      //     body.content,
      //     organization,
      //     apiKey
      //   )
      //   // Update UserChatRoom Title by Cloud Task
      // }

      // Send Request to OpenAI
      const openAiBody: CreateChatCompletionRequest = {
        model: String(chatRoom.data.getChatRoom.model),
        max_tokens: Number(chatRoom.data.getChatRoom.maxTokens),
        temperature: Number(chatRoom.data.getChatRoom.temperature),
        n: 1,
        top_p: 1,
        stream: Boolean(chatRoom.data.getChatRoom.stream),
        messages: [
          {
            role: 'user',
            content: body.content,
          },
        ],
      }
      console.log('openAiBody')
      console.log(inspect(openAiBody, { depth: null }))

      // Get OpenAI Stream
      const stream = await streamChat(openAiBody, organization, apiKey)
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
        const queryName = 'createChatRoomMessage'
        const params: CreateChatMessageParams = {
          chatRoomId: body.chatRoomId,
          role: 'system',
          content: message,
        }
        await createCloudTask(
          queryName,
          params,
          SKEET_GRAPHQL_ENDPOINT_URL.value()
        )
        console.log(message)
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
