import { objectType } from 'nexus'
import { VertexChatRoom, VertexChatRoomExample } from 'nexus-prisma'

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
    t.field(VertexChatRoom.isShared)
    t.field(VertexChatRoom.createdAt)
    t.field(VertexChatRoom.updatedAt)
    t.list.field('VertexChatRoomExample', {
      type: 'VertexChatRoomExample',
    })
    t.list.field('VertexChatRoomMessage', {
      type: 'VertexChatRoomMessage',
    })
    t.list.field('UserVertexChatRoom', {
      type: 'UserVertexChatRoom',
    })
  },
})
