import VertexChatMenu, {
  ChatRoom,
} from '@/components/pages/user/vertex-ai/VertexChatMenu'
import ChatBox, {
  vertexChatBoxQuery,
} from '@/components/pages/user/vertex-ai/VertexChatBox'
import { Suspense, useCallback, useEffect, useState } from 'react'
import {
  PreloadedQuery,
  graphql,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay'
import {
  VertexChatScreenQuery,
  VertexChatScreenQuery$variables,
} from '@/__generated__/VertexChatScreenQuery.graphql'
import UserScreenLoading from '@/components/loading/UserScreenLoading'
import UserScreenErrorBoundary from '@/components/error/UserScreenErrorBoundary'
import RefetchVertexChat from './RefetchVertexChat'
import {
  VertexChatBoxQuery,
  VertexChatBoxQuery$variables,
} from '@/__generated__/VertexChatBoxQuery.graphql'
import clsx from 'clsx'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'

export const vertexChatScreenQuery = graphql`
  query VertexChatScreenQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    ...VertexChatMenu_query
  }
`

type Props = {
  queryReference: PreloadedQuery<VertexChatScreenQuery, Record<string, unknown>>
  refetch: (variables: VertexChatScreenQuery$variables) => void
}

export default function VertexChatScreen({ queryReference, refetch }: Props) {
  const { t } = useTranslation()
  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false)
  const [currentChatRoomId, setCurrentChatRoomId] = useState<string | null>(
    null
  )
  const data = usePreloadedQuery(vertexChatScreenQuery, queryReference)

  const [chatBoxQueryReference, loadQuery] =
    useQueryLoader<VertexChatBoxQuery>(vertexChatBoxQuery)

  const chatBoxRefetch = useCallback(
    (variables: VertexChatBoxQuery$variables) => {
      loadQuery(variables, { fetchPolicy: 'network-only' })
    },
    [loadQuery]
  )

  useEffect(() => {
    if (currentChatRoomId != null) {
      loadQuery({ first: 100, chatRoomId: currentChatRoomId })
    }
  }, [currentChatRoomId, loadQuery])

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-start overflow-auto sm:flex-row">
        <VertexChatMenu
          isNewChatModalOpen={isNewChatModalOpen}
          setNewChatModalOpen={setNewChatModalOpen}
          currentChatRoomId={currentChatRoomId}
          setCurrentChatRoomId={setCurrentChatRoomId}
          chatRoomsData={data}
        />
        {!currentChatRoomId && (
          <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="flex w-full max-w-md flex-col items-center justify-center gap-6 p-4">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                {t('vertex-ai:vertexAICustom')}
              </h2>
              <button
                onClick={() => {
                  setNewChatModalOpen(true)
                }}
                className={clsx(
                  'flex w-full flex-row items-center justify-center gap-4 bg-gray-900 px-3 py-2 hover:cursor-pointer hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-400'
                )}
              >
                <PlusCircleIcon className="h-6 w-6 text-white" />
                <span className="text-lg font-bold text-white">
                  {t('vertex-ai:newChat')}
                </span>
              </button>
            </div>
          </div>
        )}
        {currentChatRoomId &&
          (chatBoxQueryReference == null ? (
            <>
              <UserScreenLoading />
            </>
          ) : (
            <>
              <Suspense fallback={<UserScreenLoading />}>
                <UserScreenErrorBoundary
                  showRetry={<RefetchVertexChat refetch={refetch} />}
                >
                  <ChatBox
                    currentChatRoomId={currentChatRoomId}
                    refetch={refetch}
                    chatBoxQueryReference={chatBoxQueryReference}
                    chatBoxRefetch={chatBoxRefetch}
                  />
                </UserScreenErrorBoundary>
              </Suspense>
            </>
          ))}
      </div>
    </>
  )
}
