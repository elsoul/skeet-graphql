import { VertexChatRoomExample } from '@/models'

export const GetVertexChatRoomExamplesQuery = `query GetVertexChatRoomExamples($vertexChatRoomId: String) {
  getVertexChatRoomExamples(vertexChatRoomId: $vertexChatRoomId) {
    input
    output
  }
}`

export type GetVertexChatRoomExamplesResponse = {
  data: { getVertexChatRoomExamples: VertexChatRoomExample[] }
}

export type GetVertexChatRoomExamplesVariables = {
  vertexChatRoomId: string
}
