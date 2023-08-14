import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@/index'
import { CreateVertexMessageParams } from '@/types/http/createVertexMessageParams'
import { getUserBearerToken } from '@/lib/getUserAuth'
import { skeetGraphql } from '@skeet-framework/utils'
import skeetOptions from '../../../skeetOptions.json'
import { defineSecret } from 'firebase-functions/params'
import { inspect } from 'util'
import {
  VertexAI,
  VertexAiOptions,
  VertexPromptParams,
} from '@skeet-framework/ai'
import * as dotenv from 'dotenv'
import { ChunkedStream } from '@/lib/chunk'
dotenv.config()

type ChatRoomParams = {
  model: string
  maxTokens: number
  temperature: number
  topP: number
  topK: number
  context: string
  title: string
}

type GetVertexChatRoomParams = {
  id: string
}

type GetVertexChatRoomExamplesParams = {
  vertexChatRoomId: string
}
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')

export const createVertexMessage = onRequest(
  {
    ...publicHttpOption,
    secrets: [SKEET_GRAPHQL_ENDPOINT_URL],
  },
  async (req: TypedRequestBody<CreateVertexMessageParams>, res) => {
    const body = {
      id: req.body.vertexChatRoomId || '',
      content: req.body.content,
    }
    try {
      const token = await getUserBearerToken(req)
      const queryType = 'query'
      const queryName = 'getVertexChatRoom'
      const chatRoom = await skeetGraphql<
        GetVertexChatRoomParams,
        ChatRoomParams
      >(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        queryType,
        queryName,
        { id: body.id },
        [
          'model',
          'maxTokens',
          'temperature',
          'topP',
          'topK',
          'context',
          'title',
        ]
      )
      if (!chatRoom) throw new Error('ChatRoom not found')

      console.log(inspect(chatRoom, { depth: null }))

      // Create VertexAI
      const vertexAiOptions: VertexAiOptions = {
        model: chatRoom.data.getVertexChatRoom.model,
        maxOutputTokens: chatRoom.data.getVertexChatRoom.maxTokens,
        temperature: chatRoom.data.getVertexChatRoom.temperature,
        topP: chatRoom.data.getVertexChatRoom.topP,
        topK: chatRoom.data.getVertexChatRoom.topK,
        location: skeetOptions.region,
        projectId: skeetOptions.projectId,
      }
      const vertexAi = new VertexAI(vertexAiOptions)
      const userMessage = {
        vertexChatRoomId: body.id,
        role: 'user',
        content: body.content,
      }
      const saveUserMessageResult = await skeetGraphql(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        'mutation',
        'createVertexChatRoomMessage',
        userMessage,
        ['id', 'role', 'content']
      )
      console.log(inspect(saveUserMessageResult, { depth: null }))

      // Update VertexChatRoom Title
      if (
        chatRoom.data.getVertexChatRoom.title === '' ||
        !chatRoom.data.getVertexChatRoom.title
      ) {
        console.log('Updating VertexChatRoom Title...')
        const titlePrompt = await vertexAi.generateTitlePrompt(body.content)
        const title = await vertexAi.prompt(titlePrompt)

        const updateTitleParams = {
          id: body.id,
          title,
        }
        console.log(inspect(updateTitleParams, { depth: null }))

        const updateTitleResult = await skeetGraphql(
          token,
          SKEET_GRAPHQL_ENDPOINT_URL.value(),
          'mutation',
          'updateVertexChatRoom',
          updateTitleParams,
          ['id', 'title']
        )
        console.log(inspect({ updateTitleResult }, { depth: null }))
      }

      // Get VertexAI ChatRoom Examples
      const examples = await skeetGraphql<
        GetVertexChatRoomExamplesParams,
        { input: string; output: string }[]
      >(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        'query',
        'getVertexChatRoomExamples',
        { vertexChatRoomId: body.id },
        ['input', 'output']
      )
      console.log(inspect({ examples }, { depth: null }))
      // Send Request to VertexAI
      const vertexAiParams: VertexPromptParams = {
        context: chatRoom.data.getVertexChatRoom.context,
        examples: examples.data.getVertexChatRoomExamples.map((example) => ({
          input: {
            content: example.input,
          },
          output: {
            content: example.output,
          },
        })),
        messages: [
          {
            author: 'user',
            content: body.content,
          },
        ],
      }
      console.log(inspect({ vertexAiParams }, { depth: null }))
      const vertexAiResponse = await vertexAi.prompt(vertexAiParams)
      console.log(inspect({ vertexAiResponse }, { depth: null }))

      const stream = new ChunkedStream(vertexAiResponse)
      stream.on('data', (chunk) => {
        console.log(chunk.toString())
        res.write(JSON.stringify({ text: chunk.toString() }))
      })
      stream.on('end', async () => {
        // Save VertexAI Response
        const vertexAiMessage = {
          vertexChatRoomId: body.id,
          role: 'assistant',
          content: vertexAiResponse,
        }
        const saveVertexAiMessageResult = await skeetGraphql(
          token,
          SKEET_GRAPHQL_ENDPOINT_URL.value(),
          'mutation',
          'createVertexChatRoomMessage',
          vertexAiMessage,
          ['id', 'role', 'content']
        )
        console.log(inspect(saveVertexAiMessageResult, { depth: null }))
        res.end()
      })
      stream.on('error', (e: Error) => console.error(e))
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  }
)
