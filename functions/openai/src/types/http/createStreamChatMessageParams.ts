export type CreateStreamChatMessageParams = {
  chatRoomId: string
  content: string
}

export type GetChatRoomParams = {
  id: string
}

export type CreateChatMessageParams = {
  role: string
  content: string
  chatRoomId: string
}
