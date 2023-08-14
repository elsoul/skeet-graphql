import { objectType } from 'nexus'
import { VertexChatRoomMessage } from 'nexus-prisma'

export const VertexChatRoomMessageObject = objectType({
  name: VertexChatRoomMessage.$name,
  description: VertexChatRoomMessage.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(VertexChatRoomMessage.role)
    t.field(VertexChatRoomMessage.content)
    t.field(VertexChatRoomMessage.vertexChatRoomId)
    t.field(VertexChatRoomMessage.createdAt)
    t.field(VertexChatRoomMessage.updatedAt)
  },
})