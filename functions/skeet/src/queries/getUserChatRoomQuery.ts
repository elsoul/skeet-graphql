export const GetUserChatRoomQuery = `query Query($getChatRoomId: String) {
  getChatRoom(id: $getChatRoomId) {
    id
    rawId
    name
    title
    model
    maxTokens
    temperature
    stream
    createdAt
    updatedAt
  }
}`
