import { extendType, stringArg } from 'nexus'
import {
  toPrismaId,
  connectionFromArray,
  GraphQLError,
} from '@skeet-framework/utils'
import { ChatRoomMessage } from 'nexus-prisma'
import { CurrentUser } from '@/index'

export const ChatRoomMessagesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('chatRoomMessageConnection', {
      type: ChatRoomMessage.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(
          await ctx.prisma.chatRoomMessage.findMany(),
          args
        )
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.chatRoomMessage.count()
          },
        })
      },
    })
    t.list.field('getChatRoomMessages', {
      type: ChatRoomMessage.$name,
      args: {
        chatRoomId: stringArg(),
      },
      async resolve(_, { chatRoomId }, ctx) {
        try {
          if (!chatRoomId) throw new Error(`no chatRoomId`)
          const user: CurrentUser = ctx.user
          if (user.id === '') throw new Error('You are not logged in!')
          // Fetch the most recent 5 messages
          const chatRoomMessages = await ctx.prisma.chatRoomMessage.findMany({
            where: {
              chatRoomId: toPrismaId(chatRoomId),
              userId: toPrismaId(user.id),
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 5,
          })
          const reversedChatRoomMessages = chatRoomMessages.reverse()

          // Fetch the first created system message
          const firstMessage: ChatRoomMessage | null =
            await ctx.prisma.chatRoomMessage.findFirst({
              where: {
                chatRoomId: toPrismaId(chatRoomId),
                userId: toPrismaId(user.id),
              },
              orderBy: {
                createdAt: 'asc',
              },
            })

          // If the first created message is not included in the most recent messages, append it
          if (
            firstMessage &&
            !reversedChatRoomMessages.some(
              (msg: any) => msg.id === firstMessage.id
            )
          ) {
            reversedChatRoomMessages.unshift(firstMessage)
          }

          return chatRoomMessages
        } catch (error) {
          throw new GraphQLError(`getChatRoomMessage: ${error}`)
        }
      },
    })
  },
})
