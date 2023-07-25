import { extendType, nonNull, stringArg, intArg } from 'nexus'
import { toPrismaId } from '@skeet-framework/utils'
import { ChatRoomMessage } from 'nexus-prisma'
import { CurrentUser } from '@/index'

export const ChatRoomMessageMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChatRoomMessage', {
      type: ChatRoomMessage.$name,
      args: {
        role: nonNull(stringArg()),
        content: nonNull(stringArg()),
        chatRoomId: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const { role, content, chatRoomId } = args
        const user: CurrentUser = ctx.user
        console.log(user)
        if (user.uid === '') throw new Error(`You are not logged in!`)

        const data = {
          role,
          content,
          userId: toPrismaId(user.id),
          chatRoomId: toPrismaId(chatRoomId),
        }
        try {
          return await ctx.prisma.chatRoomMessage.create({
            data,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`createChatRoomMessage: ${error}`)
        }
      },
    })
    t.field('updateChatRoomMessage', {
      type: ChatRoomMessage.$name,
      args: {
        id: nonNull(stringArg()),
        content: stringArg(),
        userId: intArg(),
        chatRoomId: intArg(),
      },
      async resolve(_, args, ctx) {
        const id = toPrismaId(args.id)
        let data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.chatRoomMessage.update({
            where: {
              id,
            },
            data,
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
