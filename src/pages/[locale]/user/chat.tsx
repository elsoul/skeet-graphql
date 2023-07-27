import { ReactElement, Suspense } from 'react'
import UserLayout from '@/layouts/user/UserLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import ChatScreen from '@/components/pages/user/chat/ChatScreen'
import UserScreenLoading from '@/components/loading/UserScreenLoading'
import UserScreenErrorBoundary from '@/components/error/UserScreenErrorBoundary'

const seo = {
  pathname: '/user/chat',
  title: {
    ja: 'AIチャット',
    en: 'AI Chat',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'user', 'chat'], seo)
export { getStaticPaths, getStaticProps }

export default function Chat() {
  return (
    <>
      <Suspense fallback={<UserScreenLoading />}>
        <UserScreenErrorBoundary showRetry={<p>error</p>}>
          <ChatScreen />
        </UserScreenErrorBoundary>
      </Suspense>
    </>
  )
}

Chat.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}
