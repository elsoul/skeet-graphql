import fetch from 'node-fetch'

export const sendPost = async <T>(url: string, body: T) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    return response
  } catch (e) {
    console.log({ e })
    throw new Error(`sendPost failed: ${body}`)
  }
}
type QueryType = 'query' | 'mutation'

export const sendGraphqlRequest = async <T extends Record<string, any>>(
  queryType: QueryType,
  queryName: string,
  query: T
) => {
  try {
    const inputString = Object.entries(query)
      .map(([key, value]) => {
        if (value === undefined || value === null) {
          return `${key}: ""`
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          return `${key}: ${value}`
        } else {
          return `${key}: "${value}"`
        }
      })
      .join(', ')

    const graphql = JSON.stringify({
      query: `${queryType} {\n${queryName}(${inputString}) {\n    id\n}\n}`,
      variables: {},
    })

    const baseUrl = 'http://localhost:3000/graphql'
    const res = await fetch(baseUrl, {
      method: 'POST',
      body: graphql,
      headers: { 'Content-Type': 'application/json' },
    })

    return res
  } catch (e) {
    console.log({ e })
    throw new Error('sendGraphqlRequest failed')
  }
}

export const sendGet = async (url: string) => {
  try {
    const res = fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return res
  } catch (e) {
    console.log({ e })
    throw new Error('sendGET failed')
  }
}
