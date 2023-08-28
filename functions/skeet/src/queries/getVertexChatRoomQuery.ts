import { VertexChatRoom } from '@/models'

export const GetVertexChatRoomQuery = `query GetVertexChatRoom($id: String) {
  getVertexChatRoom(id: $id) {
    title
    model
    maxTokens
    temperature
    topP
    topK
    context
  }
}`

export type GetVertexChatRoomResponse = {
  data: { getVertexChatRoom: VertexChatRoom }
}

export type GetVertexChatRoomVariables = {
  id: string
}
