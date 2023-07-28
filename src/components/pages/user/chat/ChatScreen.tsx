import ChatMenu, { ChatRoom } from '@/components/pages/user/chat/ChatMenu'
import ChatBox from '@/components/pages/user/chat/ChatBox'
import { useState } from 'react'
import { PreloadedQuery, graphql, usePreloadedQuery } from 'react-relay'
import {
  ChatScreenQuery,
  ChatScreenQuery$variables,
} from '@/__generated__/ChatScreenQuery.graphql'

export const chatScreenQuery = graphql`
  query ChatScreenQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    chatRoomConnection(
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      edges {
        cursor
        node {
          id
          maxTokens
          model
          title
          createdAt
          updatedAt
          temperature
        }
      }
      nodes {
        id
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
type Props = {
  queryReference: PreloadedQuery<ChatScreenQuery, Record<string, unknown>>
  refetch: (variables: ChatScreenQuery$variables) => void
}

export default function ChatScreen({ queryReference, refetch }: Props) {
  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false)
  const [currentChatRoomId, setCurrentChatRoomId] = useState<string | null>(
    null
  )
  const data = usePreloadedQuery(chatScreenQuery, queryReference)

  return (
    <>
      <div className="content-height flex w-full flex-col items-start justify-start overflow-auto sm:flex-row">
        <ChatMenu
          isNewChatModalOpen={isNewChatModalOpen}
          setNewChatModalOpen={setNewChatModalOpen}
          currentChatRoomId={currentChatRoomId}
          setCurrentChatRoomId={setCurrentChatRoomId}
          refetch={refetch}
          chatRoomsData={data}
        />
        <ChatBox
          setNewChatModalOpen={setNewChatModalOpen}
          currentChatRoomId={currentChatRoomId}
          refetch={refetch}
        />
      </div>
    </>
  )
}
