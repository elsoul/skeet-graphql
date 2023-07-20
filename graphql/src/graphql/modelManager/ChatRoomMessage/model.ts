import { objectType } from 'nexus'
import { ChatRoomMessage } from 'nexus-prisma'

export const ChatRoomMessageObject = objectType({
  name: ChatRoomMessage.$name,
  description: ChatRoomMessage.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(ChatRoomMessage.content)
    t.field(ChatRoomMessage.userId)
    t.field(ChatRoomMessage.chatRoomId)
    t.field(ChatRoomMessage.createdAt)
    t.field(ChatRoomMessage.updatedAt)
  },
})