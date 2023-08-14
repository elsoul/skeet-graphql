import { objectType } from 'nexus'
import { UserVertexChatRoom } from 'nexus-prisma'

export const UserVertexChatRoomObject = objectType({
  name: UserVertexChatRoom.$name,
  description: UserVertexChatRoom.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(UserVertexChatRoom.userId)
    t.field(UserVertexChatRoom.vertexChatRoomId)
    t.field(UserVertexChatRoom.createdAt)
    t.field(UserVertexChatRoom.updatedAt)
  },
})