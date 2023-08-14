import { initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import dotenv from 'dotenv'
import firebaseConfig from '@/lib/firebaseConfig'
dotenv.config()

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const SkeetEnv = process.env.NODE_ENV || 'development'
if (SkeetEnv === 'development')
  connectAuthEmulator(auth, 'http://127.0.0.1:9099')

export const loginSeed = async (
  email = 'elsoul-labo@example.com',
  password = 'password'
) => {
  let loginUserCredential: any
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    loginUserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
  } catch (error) {
    loginUserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
  }

  const user = loginUserCredential.user
  await graphqlLogExport(user.accessToken)
  return true
}

export const graphqlLogExport = async (accessToken: string) => {
  console.log('🚸 === Copy & Paste below command to your terminal === 🚸\n')
  const exportLog = `export ACCESS_TOKEN=${accessToken}\n`
  console.log(exportLog)
  console.log('🚸 =========           END           ========= 🚸\n\n')
}

const run = async () => {
  await loginSeed()
}

run()
