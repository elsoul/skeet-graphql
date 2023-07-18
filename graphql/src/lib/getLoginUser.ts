import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { User } from 'nexus-prisma'
import { auth } from 'firebase-admin'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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

export const getLoginUser = async (token: string) => {
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
      return user
    } else {
      return unknownUser
    }
  } catch (error) {
    return unknownUser
  }
}
