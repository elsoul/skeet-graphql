import { onMessagePublished } from 'firebase-functions/v2/pubsub'
import { pubsubDefaultOption } from '@/routings/options'
import { PubsubExampleParams } from '@common/types/pubsub/pubsubExampleParams'
import { parsePubSubMessage } from './parsePubSubMessage'

export const pubsubTopic = 'pubsubExample'

export const pubsubExample = onMessagePublished(
  pubsubDefaultOption(pubsubTopic),
  async (event) => {
    try {
      const pubsubObject = parsePubSubMessage<PubsubExampleParams>(event)
      console.log({
        status: 'success',
        topic: pubsubTopic,
        event,
        pubsubObject,
      })
    } catch (error) {
      console.error({ status: 'error', message: String(error) })
    }
  },
)
