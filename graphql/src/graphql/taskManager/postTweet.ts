import { extendType, nonNull, stringArg } from 'nexus'
import encodeBase64 from '@/utils/base64'
// import createCloudTask from '@/lib/createCloudTask'

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
        // This is sample to create cloud task queue
        //
        // const path = '/endpoint'
        // const queue = 'your-cloud-task-queue'
        // const body = { id, text }
        // const payload = await encodeBase64(JSON.stringify(body))
        // await createCloudTask(path, queue, payload)
        return true
      },
    })
  },
})
