export const UpdateChatRoomQuery = `mutation UpdateChatRoom($id: String, $title: String) {
  updateChatRoom(id: $id, title: $title) {
    name
    title
  }
}`
