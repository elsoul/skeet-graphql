import { Prisma } from '@prisma/client'
import { generateIv, toPrismaId } from '@skeet-framework/utils'
import { objectType, stringArg, nonNull } from 'nexus'
import { User } from 'nexus-prisma'

export const UserMutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: User.$name,
      args: {
        uid: nonNull(stringArg()),
        username: stringArg(),
        email: nonNull(stringArg()),
        iconUrl: stringArg(),
      },
      async resolve(_, args, ctx) {
        try {
          const { uid, username, email, iconUrl } = args
          const userParams: Prisma.UserCreateInput = {
            uid: uid!,
            username,
            email: email!,
            iconUrl,
            iv: generateIv(),
          }
          return await ctx.prisma.user.create({
            data: userParams,
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
              id: toPrismaId(id),
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
