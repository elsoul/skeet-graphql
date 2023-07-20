import { objectType } from 'nexus'
import { ChatRoom } from 'nexus-prisma'

export const ChatRoomObject = objectType({
  name: ChatRoom.$name,
  description: ChatRoom.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(ChatRoom.name)
    t.field(ChatRoom.createdAt)
    t.field(ChatRoom.updatedAt)
    t.field(ChatRoom.chatRoomMessages)
    t.field(ChatRoom.userChatRooms)
  },
})