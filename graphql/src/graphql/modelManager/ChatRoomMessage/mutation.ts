import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { toPrismaId } from '@skeet-framework/utils'
import { ChatRoomMessage } from 'nexus-prisma'

export const ChatRoomMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChatRoomMessage', {
      type: ChatRoomMessage.$name,
      args: {
        content: nonNull(stringArg()),
        userId: nonNull(intArg()),
        chatRoomId: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.chatRoomMessage.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updateChatRoomMessage', {
      type: ChatRoomMessage.$name,
      args: {
        id: nonNull(stringArg()),
        userId: intArg(),
        chatRoomId: intArg(),
      },
      async resolve(_, args, ctx) {
        const id = Number(fromGlobalId(args.id).id)
        let data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.chatRoomMessage.update({
            where: {
              id
            },
            data
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('deleteChatRoomMessage', {
      type: ChatRoomMessage.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.chatRoomMessage.delete({
            where: {
              id: toPrismaId(id),
            },
          })
        } catch (error) {
          throw new Error(`error: ${error}`)
        }
      },
    })
  },
})