import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { UserVertexChatRoom } from 'nexus-prisma'

export const UserVertexChatRoomsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('userVertexChatRoomConnection', {
      type: UserVertexChatRoom.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(
          await ctx.prisma.userVertexChatRoom.findMany(),
          args,
        )
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.userVertexChatRoom.count()
          },
        })
      },
    })
    t.field('getUserVertexChatRoom', {
      type: UserVertexChatRoom.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.userVertexChatRoom.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})
