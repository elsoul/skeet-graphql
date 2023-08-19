import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody, CreateVertexMessageParams } from '@/types'
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
import { ChunkedStream } from '@/lib/chunk'
import {
  CreateVertexChatRoomMessageQuery,
  GetVertexChatRoomExamplesQuery,
  GetVertexChatRoomQuery,
  UpdateVertexChatRoomQuery,
} from '@/queries'
import { VertexChatRoom, VertexChatRoomExample } from '@/models'

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
      const chatRoom = await skeetGraphql<{
        data: { getVertexChatRoom: VertexChatRoom }
      }>(token, SKEET_GRAPHQL_ENDPOINT_URL.value(), GetVertexChatRoomQuery)
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
      const variables = {
        createVertexChatRoomMessageVertexChatRoomId: body.id,
        createVertexChatRoomMessageRole: 'user',
        createVertexChatRoomMessageContent: body.content,
      }
      const saveUserMessageResult = await skeetGraphql(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        CreateVertexChatRoomMessageQuery,
        variables
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

        const variables2 = {
          updateVertexChatRoomId: body.id,
          updateVertexChatRoomTitle: title,
        }
        const updateTitleResult = await skeetGraphql(
          token,
          SKEET_GRAPHQL_ENDPOINT_URL.value(),
          UpdateVertexChatRoomQuery,
          variables2
        )
        console.log(inspect({ updateTitleResult }, { depth: null }))
      }
      const variables3 = {
        vertexChatRoomId: body.id,
      }
      // Get VertexAI ChatRoom Examples
      const examples = await skeetGraphql<{
        data: { getVertexChatRoomExamples: VertexChatRoomExample[] }
      }>(
        token,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        GetVertexChatRoomExamplesQuery,
        variables3
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
        const variables4 = {
          createVertexChatRoomMessageVertexChatRoomId: body.id,
          createVertexChatRoomMessageRole: 'assistant',
          createVertexChatRoomMessageContent: vertexAiResponse,
        }
        const saveVertexAiMessageResult = await skeetGraphql(
          token,
          SKEET_GRAPHQL_ENDPOINT_URL.value(),
          CreateVertexChatRoomMessageQuery,
          variables4
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
