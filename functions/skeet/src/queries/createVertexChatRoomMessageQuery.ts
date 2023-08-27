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
