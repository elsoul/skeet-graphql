import type { ReactNode } from 'react'
import { useEffect, useCallback } from 'react'
import CommonFooter from '@/layouts/common/CommonFooter'
import { User, signOut } from 'firebase/auth'
import { fetchQuery, graphql } from 'react-relay'
import AuthHeader from './AuthHeader'
import { useRecoilState } from 'recoil'
import { defaultUser, userState } from '@/store/user'
import { auth } from '@/lib/firebase'
import { createEnvironment } from '@/lib/relayEnvironment'
import { AuthLayoutQuery } from '@/__generated__/AuthLayoutQuery.graphql'
import useI18nRouter from '@/hooks/useI18nRouter'

type Props = {
  children: ReactNode
}

const mainContentId = 'authMainContent'

export const authLayoutQuery = graphql`
  query AuthLayoutQuery {
    me {
      id
      iconUrl
      username
    }
  }
`

export default function AuthLayout({ children }: Props) {
  const { router, routerPush } = useI18nRouter()

  const resetWindowScrollPosition = useCallback(() => {
    const element = document.getElementById(mainContentId)
    if (element) {
      element.scrollIntoView({ block: 'start' })
    }
  }, [])
  useEffect(() => {
    void (async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100))
        if (!router.asPath.includes('#')) {
          resetWindowScrollPosition()
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [router.asPath, resetWindowScrollPosition])

  const [_user, setUser] = useRecoilState(userState)

  const onAuthStateChanged = useCallback(
    async (fbUser: User | null) => {
      if (auth && fbUser && fbUser.emailVerified) {
        const user = await fetchQuery<AuthLayoutQuery>(
          createEnvironment(),
          authLayoutQuery,
          {},
        ).toPromise()
        if (user?.me?.id) {
          setUser({
            id: user.me.id,
            uid: fbUser.uid,
            email: fbUser.email ?? '',
            username: user.me.username ?? '',
            iconUrl: user.me.iconUrl ?? '',
            emailVerified: fbUser.emailVerified,
          })
          await routerPush('/user/vertex-ai')
        } else {
          setUser(defaultUser)
          await signOut(auth)
        }
      } else {
        setUser(defaultUser)
      }
    },
    [setUser, routerPush],
  )

  useEffect(() => {
    let subscriber = () => {}

    if (auth) {
      subscriber = auth.onAuthStateChanged(onAuthStateChanged)
    }
    return () => subscriber()
  }, [onAuthStateChanged])

  return (
    <>
      <div className="relative h-full w-full bg-white dark:bg-gray-900">
        <AuthHeader />
        <div id={mainContentId} className="min-h-screen">
          {children}
        </div>
        <CommonFooter />
      </div>
    </>
  )
}
