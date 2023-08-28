import { VertexChatRoom } from '@/models'

export const UpdateVertexChatRoomQuery = `mutation UpdateVertexChatRoom($id: String, $title: String) {
  updateVertexChatRoom(id: $id, title: $title) {
    id
    title
  }
}`

export type UpdateVertexChatRoomResponse = {
  data: { updateVertexChatRoom: VertexChatRoom }
}

export type UpdateVertexChatRoomVariables = {
  id: string
  title: string
}
