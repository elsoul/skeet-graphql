import { extendType, stringArg, intArg } from 'nexus'
import { toPrismaId } from '@/lib/toPrismaId'
import { UserVertexChatRoom } from 'nexus-prisma'
import { GraphQLError } from 'graphql'

export const UserVertexChatRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUserVertexChatRoom', {
      type: UserVertexChatRoom.$name,
      args: {
        userId: intArg(),
        vertexChatRoomId: intArg(),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.userVertexChatRoom.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new GraphQLError(`error: ${error}`)
        }
      },
    })
    t.field('updateUserVertexChatRoom', {
      type: UserVertexChatRoom.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, args, ctx) {
        if (!args.id) throw new GraphQLError('id is required')

        const id = toPrismaId(args.id)
        const data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.userVertexChatRoom.update({
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
    t.field('deleteUserVertexChatRoom', {
      type: UserVertexChatRoom.$name,
      args: {
        id: stringArg(),
      },
      async resolve(_, { id }, ctx) {
        try {
          if (!id) throw new GraphQLError('id is required')

          return await ctx.prisma.userVertexChatRoom.delete({
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
