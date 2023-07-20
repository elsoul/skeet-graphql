import { extendType, nonNull, stringArg } from 'nexus'
import { toPrismaId, connectionFromArray } from '@skeet-framework/utils'
import { ChatRoomMessage } from 'nexus-prisma'

export const ChatRoomMessagesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('chatRoomMessageConnection', {
      type: ChatRoomMessage.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.chatRoomMessage.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.chatRoomMessage.count()
          },
        })
      },
    })
    t.field('getChatRoomMessage', {
      type: ChatRoomMessage.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.chatRoomMessage.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})