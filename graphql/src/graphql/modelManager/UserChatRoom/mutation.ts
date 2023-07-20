import { extendType, nonNull, stringArg, intArg, floatArg } from 'nexus'
import { toPrismaId } from '@skeet-framework/utils'
import { UserChatRoom } from 'nexus-prisma'

export const UserChatRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUserChatRoom', {
      type: UserChatRoom.$name,
      args: {
        userId: nonNull(intArg()),
        chatRoomId: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        try {
          return await ctx.prisma.userChatRoom.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updateUserChatRoom', {
      type: UserChatRoom.$name,
      args: {
        id: nonNull(stringArg()),
        chatRoomId: intArg(),
      },
      async resolve(_, args, ctx) {
        const id = Number(fromGlobalId(args.id).id)
        let data = JSON.parse(JSON.stringify(args))
        delete data.id
        try {
          return await ctx.prisma.userChatRoom.update({
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
    t.field('deleteUserChatRoom', {
      type: UserChatRoom.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.userChatRoom.delete({
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