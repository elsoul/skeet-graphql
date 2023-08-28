import { ChatRoomMessage } from '@/models'

export const CreateChatRoomMessageQuery = `mutation CreateChatRoomMessage(
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

export type CreateChatRoomMessageResponse = {
  data: { createChatRoomMessage: ChatRoomMessage }
}

export type CreateChatRoomMessageVariables = {
  role: string
  content: string
  chatRoomId: string
}
