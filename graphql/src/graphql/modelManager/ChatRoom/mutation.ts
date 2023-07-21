import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { toPrismaId } from '@skeet-framework/utils'
import { ChatRoom } from 'nexus-prisma'

export const ChatRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChatRoom', {
      type: ChatRoom.$name,
      args: {
        name: stringArg(),
        title: stringArg(),
        model: nonNull(stringArg()),
        maxTokens: nonNull(intArg()),
        temperature: nonNull(intArg()),
        stream: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.chatRoom.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updateChatRoom', {
      type: ChatRoom.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const id = toPrismaId(args.id)
        let data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.chatRoom.update({
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
    t.field('deleteChatRoom', {
      type: ChatRoom.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.chatRoom.delete({
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