import { extendType, nonNull, stringArg } from 'nexus'

export const postTweet = extendType({
  type: 'Query',
  definition(t) {
    t.field('postTweet', {
      type: 'Boolean',
      args: {
        id: nonNull(stringArg()),
        text: nonNull(stringArg()),
      },
      async resolve(_, { id, text }, ctx) {
        return true
      },
    })
  },
})
