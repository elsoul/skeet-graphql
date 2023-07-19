import { v2beta3 } from '@google-cloud/tasks'
import * as dotenv from 'dotenv'
import { sendGraphqlRequest } from './http'

dotenv.config()
type SkeetOptions = {
  name: string
  projectId: string
  region: string
  appDomain: string
  lbDomain: string
  nsDomain: string
}

export const createCloudTask = async <
  T extends {
    [key: string]: any
  }
>(
  skeetOptions: SkeetOptions,
  queue = 'my-queue',
  graphqlQuery: T,
  inSeconds = 0
) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const result = await sendGraphqlRequest('mutation', queue, graphqlQuery)
      return result
    } else {
      const result = await createHttpTaskWithToken(
        skeetOptions,
        queue,
        graphqlQuery,
        inSeconds
      )
      return result
    }
  } catch (error) {
    throw new Error(`Error in createCloudTask: ${error}`)
  }
}

export const createHttpTaskWithToken = async <T>(
  skeetOptions: SkeetOptions,
  queue = 'my-queue',
  graphqlQuery: T,
  inSeconds = 0
) => {
  try {
    const { projectId, region, lbDomain } = skeetOptions
    const client = new v2beta3.CloudTasksClient()
    const parent = client.queuePath(projectId, region, queue)
    const body: string = Buffer.from(JSON.stringify(graphqlQuery)).toString(
      'base64'
    )
    const serviceAccountEmail = `${projectId}@${projectId}.iam.gserviceaccount.com`
    const url = `https://${lbDomain}/graphql`
    const oidcToken = {
      serviceAccountEmail,
    }
    const task = {
      httpRequest: {
        headers: {
          'Content-Type': 'application/json',
        },
        httpMethod: 'POST' as const,
        url,
        oidcToken,
        body,
      },
      scheduleTime: {},
    }
    if (inSeconds) {
      task.scheduleTime = {
        seconds: parseInt(String(inSeconds)) + Date.now() / 1000,
      }
    }
    const request = { parent, task }
    const [response] = await client.createTask(request)
    console.log(`Created task ${response.name}`)
    return response.name
  } catch (error) {
    throw new Error(`createHttpTaskWithToken: ${error}`)
  }
}
