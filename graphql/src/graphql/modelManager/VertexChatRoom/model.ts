import { objectType } from 'nexus'
import { VertexChatRoom } from 'nexus-prisma'

export const VertexChatRoomObject = objectType({
  name: VertexChatRoom.$name,
  description: VertexChatRoom.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.field(VertexChatRoom.name)
    t.field(VertexChatRoom.title)
    t.field(VertexChatRoom.model)
    t.field(VertexChatRoom.maxTokens)
    t.field(VertexChatRoom.temperature)
    t.field(VertexChatRoom.topP)
    t.field(VertexChatRoom.topK)
    t.field(VertexChatRoom.context)
    t.field(VertexChatRoom.isShered)
    t.field(VertexChatRoom.createdAt)
    t.field(VertexChatRoom.updatedAt)
    t.field(VertexChatRoom.VertexChatRoomExample)
    t.field(VertexChatRoom.VertexChatRoomMessage)
    t.field(VertexChatRoom.UserVertexChatRoom)
  },
})