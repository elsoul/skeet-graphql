export const GetVertexChatRoomQuery = `query GetVertexChatRoom($getVertexChatRoomId: String) {
  getVertexChatRoom(id: $getVertexChatRoomId) {
    title
    model
    maxTokens
    temperature
    topP
    topK
    context
  }
}`
