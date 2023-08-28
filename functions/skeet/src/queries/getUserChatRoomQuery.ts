import { ChatRoom } from '@/models'

export const GetUserChatRoomQuery = `query Query($chatRoomId: String) {
  getChatRoom(id: $chatRoomId) {
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

export type GetChatRoomResponse = {
  data: { getChatRoom: ChatRoom }
}

export type GetChatRoomVariables = {
  chatRoomId: string
}
