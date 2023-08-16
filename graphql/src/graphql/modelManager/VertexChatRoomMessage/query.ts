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
    t.connectionField('getVertexChatRoomMessages', {
      type: VertexChatRoomMessage.$name,
      additionalArgs: {
        vertexChatRoomId: stringArg(),
      },
      async resolve(_, { vertexChatRoomId, ...args }, ctx, info) {
        if (!vertexChatRoomId) throw new Error('vertexChatRoomId is required')

        try {
          const chatRoomMessages =
            await ctx.prisma.vertexChatRoomMessage.findMany({
              where: {
                vertexChatRoomId: toPrismaId(vertexChatRoomId),
              },
              orderBy: {
                createdAt: 'asc',
              },
            })

          console.log('chatRoomMessages', chatRoomMessages)
          return connectionFromArray(chatRoomMessages, args)
        } catch (error) {
          throw new Error(`getVertexChatRoomMessages: ${error}`)
        }
      },
    })
  },
})
