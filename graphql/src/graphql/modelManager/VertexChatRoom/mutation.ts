import { extendType, stringArg, intArg, floatArg, booleanArg } from 'nexus'
import { toPrismaId } from '@/lib/toPrismaId'
import { VertexChatRoom } from 'nexus-prisma'
import { GraphQLError } from 'graphql'
import { PrismaClient } from '@prisma/client'
import { CurrentUser } from '@/index'

export const VertexChatRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createVertexChatRoom', {
      type: VertexChatRoom.$name,
      args: {
        name: stringArg(),
        title: stringArg(),
        model: stringArg(),
        maxTokens: intArg(),
        temperature: floatArg(),
        topP: floatArg(),
        topK: intArg(),
        context: stringArg(),
        isShared: booleanArg(),
      },
      async resolve(_, args, ctx) {
        try {
          const user: CurrentUser = ctx.user
          console.log({ user: user.id })
          if (user.id === '') throw new Error('You are not logged in!')
          const prismaClient = ctx.prisma as PrismaClient
          const result = await prismaClient.$transaction(async (tx) => {
            const data = {
              name: args.name || 'default room',
              model: args.model || 'chat-bison@001',
              context:
                args.context ||
                'This is a great chatbot. This Assistant is very kind and helpful.',
              maxTokens: args.maxTokens || 256,
              temperature: args.temperature || 0.2,
              topP: args.topP || 0.95,
              topK: args.topK || 40,
              isShared: args.isShared || false,
            }
            // ChatRoomを作成
            const vertexChatRoom = await tx.vertexChatRoom.create({
              data,
            })

            // UserChatRoomに関連付けを作成
            await tx.userVertexChatRoom.create({
              data: {
                userId: toPrismaId(user.id),
                vertexChatRoomId: vertexChatRoom.id,
              },
            })

            return vertexChatRoom
          })
          return result
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`createVertexChatRoom: ${error}`)
        }
      },
    })
    t.field('updateVertexChatRoom', {
      type: VertexChatRoom.$name,
      args: {
        id: stringArg(),
        title: stringArg(),
      },
      async resolve(_, args, ctx) {
        const id = toPrismaId(args.id || '')
        if (!args.title) throw new GraphQLError('title is required')

        try {
          return await ctx.prisma.vertexChatRoom.update({
            where: {
              id,
            },
            data: {
              title: args.title,
            },
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`updateVertexChatRoom: ${error}`)
        }
      },
    })
    t.field('deleteVertexChatRoom', {
      type: VertexChatRoom.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.vertexChatRoom.delete({
            where: {
              id: toPrismaId(id || ''),
            },
          })
        } catch (error) {
          throw new GraphQLError(`updateVertexChatRoom: ${error}`)
        }
      },
    })
  },
})
