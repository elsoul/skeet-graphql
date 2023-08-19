import { Timestamp } from 'firebase-admin/firestore'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MASTER = 'MASTER',
}

export type User = {
  id: number
  uid: string
  username?: string
  email: string
  iconUrl?: string
  role: Role
  iv?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type ChatRoom = {
  id: number
  name?: string
  title?: string
  model: string
  maxTokens: number
  temperature: number
  stream: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type ChatRoomMessage = {
  id: number
  role: string
  content: string
  userId: number
  chatRoomId: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type UserChatRoom = {
  userId: number
  chatRoomId: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type VertexChatRoom = {
  id: number
  name?: string
  title?: string
  model: string
  maxTokens: number
  temperature: number
  topP: number
  topK: number
  context: string
  isShared: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type VertexChatRoomExample = {
  id: number
  vertexChatRoomId: number
  input: string
  output: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type UserVertexChatRoom = {
  userId: number
  vertexChatRoomId: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type VertexChatRoomMessage = {
  id: number
  role: string
  content: string
  vertexChatRoomId: number
  createdAt: Timestamp
  updatedAt: Timestamp
}
