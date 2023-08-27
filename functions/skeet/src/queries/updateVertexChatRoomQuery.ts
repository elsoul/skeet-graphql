export const UpdateVertexChatRoomQuery = `mutation UpdateVertexChatRoom($id: String, $title: String) {
  updateVertexChatRoom(id: $id, title: $title) {
    id
    title
  }
}`
