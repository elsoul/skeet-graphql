import { Timestamp } from 'firebase-admin/firestore'

export enum Role {
  USER,
  ADMIN,
  MASTER,
}

export type User = {
  id: number;
  uid: string;
  username?: string;
  email: string;
  iconUrl?: string;
  role: Role;
  iv?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  chatRoomMessages: ChatRoomMessage;
  userChatRooms: UserChatRoom;
  UserVertexChatRoom: UserVertexChatRoom;
}

export type ChatRoom = {
  id: number;
  name?: string;
  title?: string;
  model: string;
  maxTokens: number;
  temperature: number;
  stream: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  chatRoomMessages: ChatRoomMessage;
  userChatRooms: UserChatRoom;
}

export type ChatRoomMessage = {
  id: number;
  role: string;
  content: string;
  userId: number;
  chatRoomId: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  User: User;
  ChatRoom: ChatRoom;
}

export type UserChatRoom = {
  userId: number;
  chatRoomId: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  User: User;
  ChatRoom: ChatRoom;
}

export type VertexChatRoom = {
  id: number;
  name?: string;
  title?: string;
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  topK: number;
  context: string;
  isShared: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  VertexChatRoomExample: VertexChatRoomExample;
  VertexChatRoomMessage: VertexChatRoomMessage;
  UserVertexChatRoom: UserVertexChatRoom;
}

export type VertexChatRoomExample = {
  id: number;
  vertexChatRoomId: number;
  input: string;
  output: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  VertexChatRoom: VertexChatRoom;
}

export type UserVertexChatRoom = {
  userId: number;
  vertexChatRoomId: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  User: User;
  VertexChatRoom: VertexChatRoom;
}

export type VertexChatRoomMessage = {
  id: number;
  role: string;
  content: string;
  vertexChatRoomId: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  VertexChatRoom: VertexChatRoom;
}

