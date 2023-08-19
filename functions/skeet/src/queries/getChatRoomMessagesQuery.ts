export const GetChatRoomMessagesQuery = `query GetChatRoomMessages($chatRoomId: String) {
  getChatRoomMessages(chatRoomId: $chatRoomId) {
    role
    content
  }
}`
