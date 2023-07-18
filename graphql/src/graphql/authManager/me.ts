import { extendType } from 'nexus'
import { User } from 'nexus-prisma'

export const MeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: User.$name,
      args: {},
      async resolve(_, __, ctx) {
        console.log(ctx.user)
        if (!ctx.user.id || ctx.user.id == '') {
          return {
            uid: '',
            username: '',
            iconUrl: '',
            email: '',
          }
        }
        return await ctx.prisma.user.findUnique({
          where: {
            id: Number(ctx.user.id),
          },
        })
      },
    })
  },
})
