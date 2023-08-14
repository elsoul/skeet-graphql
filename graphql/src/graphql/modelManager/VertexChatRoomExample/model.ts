import { objectType } from 'nexus'
import { VertexChatRoomExample } from 'nexus-prisma'

export const VertexChatRoomExampleObject = objectType({
  name: VertexChatRoomExample.$name,
  description: VertexChatRoomExample.$description,
  definition(t) {
    t.relayGlobalId('id', {})
    t.relayGlobalId('vertexChatRoomId', {})
    t.field(VertexChatRoomExample.input)
    t.field(VertexChatRoomExample.output)
    t.field(VertexChatRoomExample.createdAt)
    t.field(VertexChatRoomExample.updatedAt)
  },
})
