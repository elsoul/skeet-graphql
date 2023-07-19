import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import {
  createCloudTask,
  gravatarIconUrl,
  sendDiscord,
} from '@skeet-framework/utils'
import skeetConfig from '../../../skeetOptions.json'
import { User } from '@/models'

const region = skeetConfig.region
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || ''
const queryName = 'createUser'

export const authOnCreateUser = functions
  .runWith(authPublicOption)
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
      const result = await createCloudTask(skeetConfig, queryName, userParams)

      if (result && typeof result !== 'string') {
        console.log({ postStatus: await result.json() })
      }

      const content = `Skeet APP New user: ${userParams.username} \nemail: ${userParams.email}\niconUrl: ${userParams.iconUrl}`
      await sendDiscord(content, DISCORD_WEBHOOK_URL)
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
