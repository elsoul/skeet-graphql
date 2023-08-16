import { extendType, list, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { toPrismaId } from '@/lib/toPrismaId'
import { VertexChatRoomExample } from 'nexus-prisma'

export const VertexChatRoomExamplesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('vertexChatRoomExampleConnection', {
      type: VertexChatRoomExample.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(
          await ctx.prisma.vertexChatRoomExample.findMany(),
          args
        )
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.vertexChatRoomExample.count()
          },
        })
      },
    })
    t.field('getVertexChatRoomExamples', {
      type: list(VertexChatRoomExample.$name),
      args: {
        vertexChatRoomId: stringArg(),
      },
      async resolve(_, { vertexChatRoomId, ...args }, ctx) {
        if (!vertexChatRoomId) throw new Error('id is required')

        try {
          const chatRoomMessages =
            await ctx.prisma.vertexChatRoomExample.findMany({
              where: {
                vertexChatRoomId: toPrismaId(vertexChatRoomId),
              },
            })
          const examples = []
          for await (const example of chatRoomMessages) {
            examples.push({
              input: example.input,
              output: example.output,
            })
          }
          return chatRoomMessages
        } catch (error) {
          throw new Error(`getVertexChatRoomExamples: ${error}`)
        }
      },
    })
    t.connectionField('getVertexChatRoomExampleConnection', {
      type: VertexChatRoomExample.$name,
      additionalArgs: {
        vertexChatRoomId: stringArg(),
      },
      async resolve(_, { vertexChatRoomId, ...args }, ctx) {
        if (!vertexChatRoomId) throw new Error('id is required')

        try {
          const chatRoomMessages =
            await ctx.prisma.vertexChatRoomExample.findMany({
              where: {
                vertexChatRoomId: toPrismaId(vertexChatRoomId),
              },
            })
          const examples = []
          for await (const example of chatRoomMessages) {
            examples.push({
              input: example.input,
              output: example.output,
            })
          }
          return connectionFromArray(chatRoomMessages, args)
        } catch (error) {
          throw new Error(`getVertexChatRoomExamples: ${error}`)
        }
      },
    })
  },
})
