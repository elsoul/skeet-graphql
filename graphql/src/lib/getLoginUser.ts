import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { auth } from 'firebase-admin'
import { PrismaClient } from '@prisma/client'
import { toGlobalId } from '@skeet-framework/utils'
import admin from 'firebase-admin'
const prisma = new PrismaClient()
admin.initializeApp()

export type UnknownUser = {
  user: {
    id: string
    name: string
    email: string
    iconUrl: string
  }
}

export const unknownUser: UnknownUser = {
  user: {
    id: '',
    name: '',
    email: '',
    iconUrl: '',
  },
}

export const getLoginUser = async <T>(token: string) => {
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
    if (user) {
      const globalId = toGlobalId('User', user.id)
      return { ...user, id: globalId } as T
    } else {
      return unknownUser
    }
  } catch (error) {
    return unknownUser
  }
}
