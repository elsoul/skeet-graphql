export const UpdateVertexChatRoomQuery = `mutation UpdateVertexChatRoom($updateVertexChatRoomId: String, $title: String) {
  updateVertexChatRoom(id: $updateVertexChatRoomId, title: $title) {
    id
    title
  }
}`
