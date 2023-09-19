import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { VertexChatRoom } from 'nexus-prisma'
import { toPrismaId } from '@/lib/toPrismaId'
import { CurrentUser } from '@/index'
import { UserVertexChatRoom } from '@prisma/client'

export const VertexChatRoomsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('vertexChatRoomConnection', {
      type: VertexChatRoom.$name,
      async resolve(_, args, ctx, info) {
        const user: CurrentUser = ctx.user
        const userChatRooms = await ctx.prisma.userVertexChatRoom.findMany({
          where: {
            userId: toPrismaId(user.id),
          },
        })
        const chatRoomIds = userChatRooms.map(
          (userChatRoom: UserVertexChatRoom) => userChatRoom.vertexChatRoomId,
        )
        return connectionFromArray(
          await ctx.prisma.vertexChatRoom.findMany({
            where: {
              id: {
                in: chatRoomIds,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          }),
          args,
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
