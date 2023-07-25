import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { auth } from 'firebase-admin'
import { toGlobalId } from '@skeet-framework/utils'
import admin from 'firebase-admin'
import { PrismaClient } from '@prisma/client'
import { getApps } from 'firebase-admin/app'
admin.initializeApp()

console.log(getApps())

const skeetEnv = process.env.NODE_ENV || 'development'

export type UnknownUser = {
  id: string
  uid: string
  name: string
  email: string
  iconUrl: string
}

export const unknownUser: UnknownUser = {
  id: '',
  uid: '',
  name: '',
  email: '',
  iconUrl: '',
}

export const getLoginUser = async <T>(token: string, prisma: PrismaClient) => {
  try {
    if (token == 'undefined' || token == null) throw new Error('undefined')

    const bearer = token.split('Bearer ')[1]
    if (!bearer) return unknownUser
    const decodedUser: DecodedIdToken = await auth().verifyIdToken(bearer)
    const user = await prisma.user.findUnique({
      where: {
        uid: decodedUser.uid,
      },
    })
    console.log(user)
    if (!user) return unknownUser
    const response = { ...user, id: toGlobalId('User', user.id) } as T
    console.log('loginUser')
    if (response) return response
    return response
  } catch (error) {
    if (skeetEnv === 'development') {
      const user = await prisma.user.findUnique({
        where: {
          id: 1,
        },
      })
      if (!user) return unknownUser
      return { ...user, id: toGlobalId('User', 1) } as T
    }
    console.log(error)
    console.log('unknownUser')
    return unknownUser
  }
}
