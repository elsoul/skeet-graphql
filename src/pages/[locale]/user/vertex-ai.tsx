import { ReactElement, Suspense, useCallback, useEffect } from 'react'
import UserLayout from '@/layouts/user/UserLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import VertexChatScreen, {
  vertexChatScreenQuery,
} from '@/components/pages/user/vertex-ai/VertexChatScreen'
import UserScreenLoading from '@/components/loading/UserScreenLoading'
import UserScreenErrorBoundary from '@/components/error/UserScreenErrorBoundary'
import {
  VertexChatScreenQuery,
  VertexChatScreenQuery$variables,
} from '@/__generated__/VertexChatScreenQuery.graphql'
import { useQueryLoader } from 'react-relay'
import { sleep } from '@/utils/time'
import RefetchChat from '@/components/pages/user/vertex-ai/RefetchVertexChat'

const seo = {
  pathname: '/user/vertex-ai',
  title: {
    ja: 'Vertex AI チャット',
    en: 'Vertex AI Chat',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'user', 'vertex-ai'], seo)
export { getStaticPaths, getStaticProps }

export default function VertexAi() {
  const [queryReference, loadQuery] = useQueryLoader<VertexChatScreenQuery>(
    vertexChatScreenQuery
  )

  useEffect(() => {
    ;(async () => {
      await sleep(250)
      loadQuery({
        first: 15,
        after: null,
      })
    })()
  }, [loadQuery])

  const refetch = useCallback(
    (variables: VertexChatScreenQuery$variables) => {
      loadQuery(variables, { fetchPolicy: 'network-only' })
    },
    [loadQuery]
  )

  if (queryReference == null) {
    return (
      <>
        <UserScreenLoading />
      </>
    )
  }
  return (
    <>
      <div className="content-height">
        <Suspense fallback={<UserScreenLoading />}>
          <UserScreenErrorBoundary
            showRetry={<RefetchChat refetch={refetch} />}
          >
            <VertexChatScreen
              queryReference={queryReference}
              refetch={refetch}
            />
          </UserScreenErrorBoundary>
        </Suspense>
      </div>
    </>
  )
}

VertexAi.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}
