import { ChatRoomMessage } from '@/models'

export const GetChatRoomMessagesQuery = `query GetChatRoomMessages($chatRoomId: String) {
  getChatRoomMessages(chatRoomId: $chatRoomId) {
    role
    content
  }
}`

export type GetChatRoomMessagesResponse = {
  data: { getChatRoomMessages: ChatRoomMessage[] }
}

export type GetChatRoomMessagesVariables = {
  chatRoomId: string
}
