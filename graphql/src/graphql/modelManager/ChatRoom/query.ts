import { extendType, stringArg } from 'nexus'
import { toPrismaId, connectionFromArray } from '@skeet-framework/utils'
import { ChatRoom } from 'nexus-prisma'

export const ChatRoomsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('chatRoomConnection', {
      type: ChatRoom.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.chatRoom.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.chatRoom.count()
          },
        })
      },
    })
    t.field('getChatRoom', {
      type: ChatRoom.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        try {
          if (!id) throw new Error(`no id`)
          return await ctx.prisma.chatRoom.findUnique({
            where: {
              id: toPrismaId(id),
            },
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
  },
})
