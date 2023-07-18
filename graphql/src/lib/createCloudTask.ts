import encodeBase64 from '@/utils/base64'
import { v2 } from '@google-cloud/tasks'
import dotenv from 'dotenv'

dotenv.config()
const { CloudTasksClient } = v2
const project = process.env.SKEET_GCP_PROJECT_ID || ''
const location = process.env.SKEET_GCP_TASK_REGION || ''
const serviceAccountEmail = `${project}@${project}.iam.gserviceaccount.com`

export const createApiCloudTask = async (
  apiEndpoint: string,
  mutationName: string,
  queue: string,
  params: { [key: string]: string },
  inSeconds?: number
) => {
  const graphql = await genGraphqlRequest(mutationName, params)
  const body = await encodeBase64(graphql)
  const client = new CloudTasksClient()
  async function createTask() {
    const parent = client.queuePath(project, location, queue)
    const task = {
      httpRequest: {
        headers: {
          'Content-Type': 'application/json',
        },
        httpMethod: 'POST',
        url: apiEndpoint,
        oidcToken: {
          serviceAccountEmail,
        },
        body,
      },
      scheduleTime: {},
    }

    if (inSeconds) {
      // The time when the task is scheduled to be attempted.
      task.scheduleTime = {
        seconds: parseInt(String(inSeconds)) + Date.now() / 1000,
      }
    }

    console.log(`Sending task: ${queue}`)

    // Send create task request.
    const request = { parent: parent, task: task }
    //@ts-ignore
    const [response] = await client.createTask(request)
    const name = response.name
    console.log(`Created task ${name}`)
  }

  createTask()
}

export const createWorkerCloudTask = async (
  workerEndpoint: string,
  queue: string,
  params: { [key: string]: string },
  inSeconds?: number
) => {
  const client = new CloudTasksClient()
  const body = await encodeBase64(JSON.stringify(params))
  async function createTask() {
    const parent = client.queuePath(project, location, queue)
    const task = {
      httpRequest: {
        headers: {
          'Content-Type': 'application/json',
        },
        httpMethod: 'POST',
        url: workerEndpoint,
        oidcToken: {
          serviceAccountEmail,
        },
        body,
      },
      scheduleTime: {},
    }

    if (inSeconds) {
      // The time when the task is scheduled to be attempted.
      task.scheduleTime = {
        seconds: parseInt(String(inSeconds)) + Date.now() / 1000,
      }
    }

    console.log(`Sending task: ${queue}`)

    // Send create task request.
    const request = { parent: parent, task: task }
    //@ts-ignore
    const [response] = await client.createTask(request)
    const name = response.name
    console.log(`Created task ${name}`)
  }

  createTask()
}

export const genGraphqlRequest = async (
  mutationName: string,
  params: { [key: string]: string }
) => {
  let queryArray: Array<string> = []
  for (const [key, value] of Object.entries(params)) {
    const str =
      typeof value === 'string' ? `${key}: "${value}"` : `${key}: ${value}`
    queryArray.push(str)
  }
  const strArgs = queryArray.join(' ')

  return JSON.stringify({
    query: `mutation { ${mutationName}(${strArgs})}`,
    variables: {},
  })
}
