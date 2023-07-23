import {
  extendType,
  nonNull,
  stringArg,
  intArg,
  floatArg,
  booleanArg,
} from 'nexus'
import { toPrismaId } from '@skeet-framework/utils'
import { ChatRoom } from 'nexus-prisma'
import { PrismaClient } from '@prisma/client'
import { CurrentUser } from '@/index'
import { GraphQLError } from 'graphql'

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
        stream: nonNull(booleanArg()),
      },
      async resolve(_, args, ctx) {
        try {
          const { name, title, model, maxTokens, temperature, stream } = args
          const user: CurrentUser = await ctx.currentUser
          console.log({ user: user.id })
          if (user.id === '') throw new Error('You are not logged in!')
          const prismaClient = ctx.prisma as PrismaClient
          const result = await prismaClient.$transaction(async (tx) => {
            const userId = toPrismaId(user.id)
            // ChatRoomを作成
            const createdChatRoom = await tx.chatRoom.create({
              data: {
                name,
                title,
                model,
                maxTokens,
                temperature,
                stream,
              },
            })

            // UserChatRoomに関連付けを作成
            await tx.userChatRoom.create({
              data: {
                userId: userId,
                chatRoomId: createdChatRoom.id,
              },
            })

            // ChatRoomMessageを作成
            await tx.chatRoomMessage.create({
              data: {
                role: 'system',
                content:
                  'This is a great chatbot. This Assistant is very kind and helpful.',
                userId: userId,
                chatRoomId: createdChatRoom.id,
              },
            })

            return createdChatRoom
          })
          return result
        } catch (error) {
          throw new GraphQLError(`${error}`)
        }
      },
    })
    t.field('updateChatRoom', {
      type: ChatRoom.$name,
      args: {
        id: nonNull(stringArg()),
        model: stringArg(),
        stream: booleanArg(),
      },
      async resolve(_, args, ctx) {
        const id = toPrismaId(args.id)
        let data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.chatRoom.update({
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
