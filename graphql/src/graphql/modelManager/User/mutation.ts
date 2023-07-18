import { fromGlobalId } from 'graphql-relay'
import { objectType, stringArg, nonNull } from 'nexus'
import { User } from 'nexus-prisma'

export const UserMutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: User.$name,
      args: {
        uid: stringArg(),
        username: stringArg(),
        email: stringArg(),
        iconUrl: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          console.log(args)
          return await ctx.prisma.user.create({
            data: args,
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('updateUser', {
      type: User.$name,
      args: {
        id: nonNull(stringArg()),
        uid: stringArg(),
        name: stringArg(),
        email: stringArg(),
        iconUrl: stringArg(),
      },
      async resolve(_, { id, name }, ctx) {
        try {
          return await ctx.prisma.user.update({
            where: {
              id: Number(fromGlobalId(id).id),
            },
            data: {
              name,
            },
          })
        } catch (error) {
          console.log(error)
          throw new Error(`error: ${error}`)
        }
      },
    })
    t.field('deleteUser', {
      type: User.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          return await ctx.prisma.user.delete({
            where: {
              id: Number(fromGlobalId(id).id),
            },
          })
        } catch (error) {
          throw new Error(`error: ${error}`)
        }
      },
    })
  },
})
