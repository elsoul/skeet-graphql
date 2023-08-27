import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import {
  gravatarIconUrl,
  sendDiscord,
  skeetGraphql,
} from '@skeet-framework/utils'
import skeetConfig from '../../../skeetOptions.json'
import { defineSecret } from 'firebase-functions/params'
import { inspect } from 'util'
import { CreateUserQuery } from '@/queries'
const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')

const { region } = skeetConfig

export const authOnCreateUser = functions
  .runWith({
    ...authPublicOption,
    secrets: [DISCORD_WEBHOOK_URL, SKEET_GRAPHQL_ENDPOINT_URL],
  })
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      if (!user.email) throw new Error(`no email`)
      const { uid, email, displayName, photoURL } = user
      const accessToken = 'skeet-access-token'
      const variables = {
        createUserUid: uid,
        createUserEmail: email,
        createUserUsername: displayName || email?.split('@')[0],
        createUserIconUrl:
          photoURL == '' || !photoURL
            ? gravatarIconUrl(email ?? 'info@skeet.dev')
            : photoURL,
      }
      const createUserResponse = await skeetGraphql(
        accessToken,
        SKEET_GRAPHQL_ENDPOINT_URL.value(),
        CreateUserQuery,
        variables
      )

      console.log(
        inspect(createUserResponse, false, null, true /* enable colors */)
      )

      // Send Discord message when new user is created
      const content = `Skeet APP New user: ${variables.createUserUsername} \nemail: ${variables.createUserEmail}\niconUrl: ${variables.createUserIconUrl}`
      if (process.env.NODE_ENV === 'production') {
        await sendDiscord(content)
      }
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
