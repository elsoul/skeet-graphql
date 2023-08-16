import { VertexChatExamples_query$key } from '@/__generated__/VertexChatExamples_query.graphql'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { graphql, useMutation, usePaginationFragment } from 'react-relay'

const vertexChatExamplesQuery = graphql`
  fragment VertexChatExamples_query on Query
  @refetchable(queryName: "VertexChatExamplesQuery") {
    getVertexChatRoomExamples(
      first: $first
      after: $after
      last: $last
      before: $before
      vertexChatRoomId: $chatRoomId
    ) @connection(key: "VertexChatExamples_getVertexChatRoomExamples") {
      edges {
        node {
          id
          input
          output
          createdAt
          updatedAt
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
  currentChatRoomId: string
  chatBoxData: VertexChatExamples_query$key
}

export default function VertexChatExamples({
  currentChatRoomId,
  chatBoxData,
}: Props) {
  const { t } = useTranslation()

  const { data, refetch } = usePaginationFragment(
    vertexChatExamplesQuery,
    chatBoxData
  )
  console.log(data)
  return (
    <>
      <button
        onClick={() => {}}
        className={clsx(
          'flex flex-row items-center justify-center border border-gray-600 px-2 py-1 hover:border-gray-400 dark:border-gray-200 dark:hover:border-gray-400'
        )}
      >
        <AcademicCapIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-800 dark:text-white" />
        <span className="text-center text-sm font-bold text-gray-800 dark:text-white">
          {t('vertex-ai:learning')}
        </span>
      </button>
    </>
  )
}
