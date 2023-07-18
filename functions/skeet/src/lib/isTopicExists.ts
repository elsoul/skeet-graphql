import { PubSub } from '@google-cloud/pubsub'

export const isTopicExists = async (topicName: string) => {
  try {
    const pubsub = new PubSub()
    const [topics] = await pubsub.getTopics()

    // Check if the topic exists in the list of topics
    const exists = topics.some((topic) => topic.name === topicName)
    return exists
  } catch (error) {
    console.log(`isTopicExists: ${JSON.stringify(error)}`)
    throw new Error(JSON.stringify(error))
  }
}

isTopicExists('pubsubExample')
