import { VertexChatRoomMessage } from '@/models'

export const CreateVertexChatRoomMessageQuery = `mutation CreateChatRoomMessage(
  $role: String
  $content: String
  $vertexChatRoomId: String
) {
  createVertexChatRoomMessage(
    role: $role
    content: $content
    vertexChatRoomId: $vertexChatRoomId
  ) {
    id
    role
    content
  }
}`

export type CreateVertexChatRoomMessageResponse = {
  data: { createVertexChatRoomMessage: VertexChatRoomMessage }
}

export type CreateVertexChatRoomMessageVariables = {
  role: string
  content: string
  vertexChatRoomId: string
}
