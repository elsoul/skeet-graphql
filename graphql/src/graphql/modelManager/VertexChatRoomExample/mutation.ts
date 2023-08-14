import { extendType, stringArg, intArg, floatArg } from 'nexus'
import { toPrismaId } from '@/lib/toPrismaId'
import { VertexChatRoomExample } from 'nexus-prisma'
import { GraphQLError } from 'graphql'
import { CurrentUser } from '@/index'

export const VertexChatRoomExampleMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createVertexChatRoomExample', {
      type: VertexChatRoomExample.$name,
      args: {
        vertexChatRoomId: stringArg(),
        input: stringArg(),
        output: stringArg(),
      },
      async resolve(_, args, ctx) {
        const user: CurrentUser = ctx.user
        console.log({ user: user.id })
        if (user.id === '') throw new Error('You are not logged in!')

        try {
          if (!args.vertexChatRoomId)
            throw new GraphQLError('vertexChatRoomId is required')

          return await ctx.prisma.vertexChatRoomExample.create({
            data: {
              vertexChatRoomId: toPrismaId(args.vertexChatRoomId),
              input: args.input,
              output: args.output,
            },
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('updateVertexChatRoomExample', {
      type: VertexChatRoomExample.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        const user: CurrentUser = ctx.user
        console.log({ user: user.id })
        if (user.id === '') throw new Error('You are not logged in!')
        if (!args.id) throw new GraphQLError('id is required')

        const id = toPrismaId(args.id)
        const data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.vertexChatRoomExample.update({
            where: {
              id,
            },
            data,
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('deleteVertexChatRoomExample', {
      type: VertexChatRoomExample.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        const user: CurrentUser = ctx.user
        console.log({ user: user.id })
        if (user.id === '') throw new Error('You are not logged in!')
        try {
          if (!id) throw new GraphQLError('id is required')

          return await ctx.prisma.vertexChatRoomExample.delete({
            where: {
              id: toPrismaId(id),
            },
          })
        } catch (error) {
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
  },
})
