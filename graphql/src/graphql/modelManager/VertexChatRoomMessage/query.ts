import { extendType, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { VertexChatRoomMessage } from 'nexus-prisma'
import { toPrismaId } from '@/lib/toPrismaId'

export const VertexChatRoomMessagesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('vertexChatRoomMessageConnection', {
      type: VertexChatRoomMessage.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(
          await ctx.prisma.vertexChatRoomMessage.findMany(),
          args
        )
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.vertexChatRoomMessage.count()
          },
        })
      },
    })
    t.field('getVertexChatRoomMessage', {
      type: VertexChatRoomMessage.$name,
      args: {
        vertexChatRoomId: stringArg(),
      },
      async resolve(_, { vertexChatRoomId }, ctx) {
        if (!vertexChatRoomId) throw new Error('vertexChatRoomId is required')

        try {
          const chatRoomMessages =
            await ctx.prisma.vertexChatRoomMessage.findMany({
              where: {
                vertexChatRoomId: toPrismaId(vertexChatRoomId),
              },
              orderBy: {
                createdAt: 'ask',
              },
            })

          console.log('chatRoomMessages', chatRoomMessages)
          return chatRoomMessages
        } catch (error) {
          throw new Error(`getVertexChatRoomMessage: ${error}`)
        }
      },
    })
  },
})
