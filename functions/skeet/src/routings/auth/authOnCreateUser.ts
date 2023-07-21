import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import {
  createCloudTask,
  gravatarIconUrl,
  sendDiscord,
} from '@skeet-framework/utils'
import skeetConfig from '../../../skeetOptions.json'
import { User } from '@/models'
import { defineSecret } from 'firebase-functions/params'
import { inspect } from 'util'
const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')
const SKEET_GRAPHQL_ENDPOINT_URL = defineSecret('SKEET_GRAPHQL_ENDPOINT_URL')

const { projectId, region } = skeetConfig
const queryName = 'createUser'

export const authOnCreateUser = functions
  .runWith({
    ...authPublicOption,
    secrets: [DISCORD_WEBHOOK_URL, SKEET_GRAPHQL_ENDPOINT_URL],
  })
  .region(region)
  .auth.user()
  .onCreate(async (user) => {
    try {
      const { uid, email, displayName, photoURL } = user
      const userParams: User = {
        uid,
        email: email || '',
        username: displayName || email?.split('@')[0] || '',
        iconUrl:
          photoURL == '' || !photoURL
            ? gravatarIconUrl(email ?? 'info@skeet.dev')
            : photoURL,
      }
      const result = await createCloudTask(
        projectId,
        region,
        queryName,
        userParams,
        SKEET_GRAPHQL_ENDPOINT_URL.value()
      )

      if (result && typeof result !== 'string') {
        const jsonResult = await result.json()
        console.log('postStatus:', inspect(jsonResult, { depth: null }))
      }

      const content = `Skeet APP New user: ${userParams.username} \nemail: ${userParams.email}\niconUrl: ${userParams.iconUrl}`
      await sendDiscord(content, DISCORD_WEBHOOK_URL.value())
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
