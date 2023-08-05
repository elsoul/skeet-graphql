import { onRequest } from 'firebase-functions/v2/https'
import { CreateChatCompletionRequest } from 'openai'
import { streamChat } from '@/lib/openai/openAi'
import { TypedRequestBody } from '@/index'
import { getUserBearerToken } from '@/lib/getUserAuth'
import { publicHttpOption } from '@/routings'
import { defineSecret } from 'firebase-functions/params'
import { skeetGraphql, sleep } from '@skeet-framework/utils'
import {
  CreateChatMessageParams,
  CreateStreamChatMessageParams,
  GetChatMessagesParams,
  GetChatRoomParams,
  UpdateChatRoomTitleParams,
} from '@/types/http/createStreamChatMessageParams'
import { inspect } from 'util'
import {
  VertexAiOptions,
  VertexExample,
  VertexParameterParams,
  VertexPromptParams,
  vertexAi,
  vertexAiStream,
} from '@skeet-framework/ai'
import { generateChatRoomTitle } from '@/lib/openai/generateChatRoomTitle'
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')
type ChatRoomParams = {
  model: string
  maxTokens: number
  temperature: number
  stream: boolean
  title: string
}

type ChatRoomMessage = {
  id: string
  role: string
  content: string
}

type ChatMessagesParams = ChatRoomMessage[]

export const createStreamChatMessage = onRequest(
  {
    ...publicHttpOption,
    secrets: [SKEET_GRAPHQL_ENDPOINT_URL],
  },
  async (req: TypedRequestBody<CreateStreamChatMessageParams>, res) => {
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
      // Get ChatRoom Info from GraphQL
      const queryType = 'query'
      const queryName = 'getChatRoom'
      const chatRoom = await skeetGraphql<GetChatRoomParams, ChatRoomParams>(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        queryType,
        queryName,
        getChatRoomBody,
        ['model', 'maxTokens', 'temperature', 'stream', 'title']
      )
      console.log(inspect(chatRoom, { depth: null }))

      // Create ChatRoomMessage
      const createMessageQueryName = 'createChatRoomMessage'
      const params: CreateChatMessageParams = {
        chatRoomId: body.chatRoomId,
        role: 'user',
        content: body.content,
      }

      const result = await skeetGraphql(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        'mutation',
        createMessageQueryName,
        params,
        ['id', 'role', 'content']
      )
      console.log(inspect(result, { depth: null }))

      const queryName2 = 'getChatRoomMessages'
      const params2 = {
        chatRoomId: body.chatRoomId,
      }
      const chatMessages = await skeetGraphql<
        GetChatMessagesParams,
        ChatMessagesParams
      >(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        queryType,
        queryName2,
        params2,
        ['role', 'content']
      )
      console.log(inspect(chatMessages, { depth: null }))
      const chatRoomMessages = chatMessages.data.getChatRoomMessages

      let examples = []
      let messages = []
      let context = ''
      for (let i = 0; i < chatRoomMessages.length; i++) {
        if (i === 0) context = chatRoomMessages[i].content
        if (chatRoomMessages[i].role === 'user') {
          if (i === chatRoomMessages.length - 1) {
            messages.push({
              author: 'user',
              content: chatRoomMessages[i].content,
            })
          } else {
            examples.push({ input: { content: chatRoomMessages[i].content } })
          }
        } else if (chatRoomMessages[i].role === 'assistant') {
          examples.push({ output: { content: chatRoomMessages[i].content } })
        }
      }
      if (!examples.find((e) => e.input) || !examples.find((e) => e.output)) {
        examples = [
          {
            input: {
              content:
                'What is the Skeet framework and what benefits does it offer for app development?',
            },
            output: {
              content:
                'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
            },
          },
        ]
      }
      const vertexPrompt: VertexPromptParams = {
        context,
        examples: examples as VertexExample[],
        messages,
      }
      console.log(inspect(vertexPrompt, { depth: null }))
      // Update UserChatRoom Title
      if (
        chatRoom.data.getChatRoom.title == '' ||
        !chatRoom.data.getChatRoom.title
      ) {
        //const title = await generateChatRoomTitle()
        // if (title) {
        //   const params: UpdateChatRoomTitleParams = {
        //     id: body.chatRoomId,
        //     title,
        //   }
        //   await skeetGraphql(
        //     token,
        //     SKEET_GRAPHQL_ENDPOINT_URL.value(),
        //     'mutation',
        //     'updateChatRoom',
        //     params,
        //     ['id', 'title']
        //   )
        // }
      }

      // Send Request to Vertex AI
      const openAiOptions: VertexAiOptions = {
        model: String(chatRoom.data.getChatRoom.model),
        maxOutputTokens: Number(chatRoom.data.getChatRoom.maxTokens),
        temperature: Number(chatRoom.data.getChatRoom.temperature),
      }
      console.log('openAiOptions')
      console.log(inspect(openAiOptions, { depth: null }))

      // Get OpenAI Stream
      const stream = await vertexAiStream(vertexPrompt, openAiOptions)
      const messageResults: string[] = []
      let streamClosed = false

      res.once('error', () => (streamClosed = true))
      res.once('close', () => (streamClosed = true))
      stream.on('data', async (chunk: Buffer) => {
        const payloads = chunk.toString().split('\n\n')
        for await (const payload of payloads) {
          console.log('payload', payload)
          messageResults.push(payload)
          try {
            while (!streamClosed && res.writableLength > 0) {
              await sleep(10)
            }
            // Send Message to Client
            res.write(payload)
          } catch (error) {
            console.log(`Error with JSON.parse and ${payload}.\n${error}`)
          }
        }
        if (streamClosed) res.end('Stream disconnected')
      })

      // Stream End
      stream.on('end', async () => {
        // ** Want to save the messageResults to the database but can't figure out how to get messageResult here. **
        // ChatGpt was ok.

        // const message = messageResults.join('')
        // console.log({ message })
        // const params: CreateChatMessageParams = {
        //   chatRoomId: body.chatRoomId,
        //   role: 'assistant',
        //   content: message,
        // }

        // const result = await skeetGraphql(
        //   token,
        //   SKEET_GRAPHQL_ENDPOINT_URL.value(),
        //   'mutation',
        //   createMessageQueryName,
        //   params,
        //   ['id', 'role', 'content']
        // )
        // console.log('got result')
        // console.log(inspect(result, { depth: null }))
        res.end('Stream done')
      })
      stream.on('error', (e: Error) => console.error(e))
    } catch (error) {
      if (
        error instanceof Error &&
        !error.message.includes('Please ask to join the whitelist.') &&
        !error.message.includes('userChatRoomId is empty') &&
        !error.message.includes('stream must be true')
      ) {
        console.error(`Connection Error - ${error}`)
      }

      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
