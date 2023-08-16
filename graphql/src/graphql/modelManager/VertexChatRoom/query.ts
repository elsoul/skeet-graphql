import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { VertexChatRoom } from 'nexus-prisma'
import { toPrismaId } from '@/lib/toPrismaId'

export const VertexChatRoomsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('vertexChatRoomConnection', {
      type: VertexChatRoom.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(
          await ctx.prisma.vertexChatRoom.findMany(),
          args
        )
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.vertexChatRoom.count()
          },
        })
      },
    })
    t.field('getVertexChatRoom', {
      type: VertexChatRoom.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        if (!id) throw new Error('id is required')
        const chatRoomData = await ctx.prisma.vertexChatRoom.findUnique({
          where: {
            id: toPrismaId(id),
          },
          include: {
            VertexChatRoomExample: true,
            VertexChatRoomMessage: true,
            UserVertexChatRoom: true,
          },
        })
        return chatRoomData
      },
    })
  },
})
