export const UpdateChatRoomQuery = `mutation UpdateChatRoom($updateChatRoomId: String, $title: String) {
  updateChatRoom(id: $updateChatRoomId, title: $title) {
    name
    title
  }
}`
