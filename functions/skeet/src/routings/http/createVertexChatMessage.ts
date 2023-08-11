import { onRequest } from 'firebase-functions/v2/https'
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
} from '@/types/http/createStreamChatMessageParams'
import { inspect } from 'util'
import {
  VertexAiOptions,
  VertexExample,
  VertexPromptParams,
  VertexAI,
} from '@skeet-framework/ai'
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
  }
)
