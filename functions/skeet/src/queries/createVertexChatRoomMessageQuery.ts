export const CreateVertexChatRoomMessageQuery = `mutation CreateChatRoomMessage(
  $role: String
  $content: String
  $chatRoomId: String
) {
  createChatRoomMessage(
    role: $role
    content: $content
    chatRoomId: $chatRoomId
  ) {
    id
    role
    content
  }
}`
