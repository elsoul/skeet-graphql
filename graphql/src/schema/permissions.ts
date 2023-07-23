import { not, rule, shield } from 'graphql-shield'
import { GraphQLError } from 'graphql'

const isAuthenticated = rule({ cache: 'contextual' })(async (
  _parent,
  _args,
  ctx,
) => {
  return !!ctx.currentUser?.id
})

const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.currentUser.role === 'ADMIN'
})

const isGm = rule()(async (parent, args, ctx, info) => {
  return ctx.currentUser.role === 'GM'
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
      console.log(thrownThing)
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
