import { not, rule, shield } from 'graphql-shield'
import { GraphQLError } from 'graphql'

const isAuthenticated = rule({ cache: 'contextual' })(async (
  _parent,
  _args,
  ctx,
) => {
  console.log(!!ctx.user?.id)
  return !!ctx.user?.id
})

const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === 'ADMIN'
})

const isGm = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === 'GM'
})

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      userConnection: not(isAuthenticated),
    },
    Mutation: {},
  },
  {
    fallbackError: async (thrownThing) => {
      console.log('error')
      if (thrownThing instanceof GraphQLError) {
        return thrownThing
      } else if (thrownThing instanceof Error) {
        console.error(thrownThing)
        return new GraphQLError('Internal server error')
      } else {
        return new GraphQLError('Not Authorized')
      }
    },
  },
)
