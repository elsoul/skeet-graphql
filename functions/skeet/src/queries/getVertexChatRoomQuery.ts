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
