import { extendType, nonNull, stringArg } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { User } from 'nexus-prisma'
import { toPrismaId } from '@skeet-framework/utils'

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('userConnection', {
      type: User.$name,
      async resolve(_, args, ctx, info) {
        return connectionFromArray(await ctx.prisma.user.findMany(), args)
      },
      extendConnection(t) {
        t.int('totalCount', {
          async resolve(source, args, ctx) {
            return ctx.prisma.user.count()
          },
        })
      },
    })
    t.field('getUser', {
      type: User.$name,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_, { id }, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            id: toPrismaId(id),
          },
        })
      },
    })
  },
})
