import { onRequest } from 'firebase-functions/v2/https'
import { OpenAI, OpenAIMessage, OpenAIOptions } from '@skeet-framework/ai'
import { TypedRequestBody } from '@/types'
import { getUserBearerToken } from '@/lib/getUserAuth'
import { publicHttpOption } from '@/routings'
import { defineSecret } from 'firebase-functions/params'
import { skeetGraphql } from '@skeet-framework/utils'
import { CreateStreamChatMessageParams } from '@/types'
import { inspect } from 'util'
import {
  CreateChatRoomMessageResponse,
  CreateChatRoomMessageVariables,
  GetChatRoomMessagesQuery,
  GetChatRoomMessagesResponse,
  GetChatRoomMessagesVariables,
  GetChatRoomResponse,
  GetChatRoomVariables,
  GetUserChatRoomQuery,
  UpdateChatRoomQuery,
} from '@/queries'
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
      const variables: GetChatRoomVariables = {
        chatRoomId: body.chatRoomId,
      }

      const chatRoom = await skeetGraphql<
        GetChatRoomResponse,
        GetChatRoomVariables
      >(
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
      const variables2: CreateChatRoomMessageVariables = {
        chatRoomId: body.chatRoomId,
        role: 'user',
        content: body.content,
      }
      const result = await skeetGraphql<
        CreateChatRoomMessageResponse,
        CreateChatRoomMessageVariables
      >(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        CreateChatRoomMessageQuery,
        variables2
      )
      console.log(inspect(result, { depth: null }))

      const variables3: GetChatRoomMessagesVariables = {
        chatRoomId: body.chatRoomId,
      }
      const chatMessages = await skeetGraphql<
        GetChatRoomMessagesResponse,
        GetChatRoomMessagesVariables
      >(
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
      const messageResults: any[] = []
      for await (const part of stream) {
        const message = String(part.choices[0].delta.content)
        if (message === '' || message === 'undefined') continue
        console.log(inspect(message, false, null, true /* enable colors */))
        res.write(JSON.stringify({ text: message }))
        messageResults.push(message)
      }

      const message = messageResults.join('')
      const variables5 = {
        chatRoomId: body.chatRoomId,
        role: 'assistant',
        content: message,
      }
      await skeetGraphql(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        CreateChatRoomMessageQuery,
        variables5
      )
      res.end()
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
