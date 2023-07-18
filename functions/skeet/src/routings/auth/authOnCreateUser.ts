import * as functions from 'firebase-functions/v1'
import { authPublicOption } from '@/routings'
import {
  gravatarIconUrl,
  sendDiscord,
  generateIv,
} from '@skeet-framework/utils'
import skeetConfig from '../../../skeetOptions.json'
import {
  createPushSubscription,
  isTopicExists,
  publishTopic,
} from '@skeet-framework/pubsub'
import { User } from '@/models/sql/userModel'

const region = skeetConfig.region
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || ''
const topicName = 'authOnCreateUser'
const queryType = 'mutation'
const queryName = 'createUser'

const endpoint =
  process.env.NODE_ENV === 'production'
    ? `https://${skeetConfig.functionsDomain}/graphql`
    : 'http://localhost:3000/graphql'

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
        iv: generateIv(),
      }

      const isTopicCreated = await isTopicExists(topicName)
      console.log({ isTopicCreated })
      if (isTopicCreated === false)
        await createPushSubscription(topicName, endpoint)

      await publishTopic<User>(queryType, queryName, topicName, userParams)
      const content = `Skeet APP New user: ${userParams.username} \nemail: ${userParams.email}\niconUrl: ${userParams.iconUrl}`
      await sendDiscord(content, DISCORD_WEBHOOK_URL)
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  })
