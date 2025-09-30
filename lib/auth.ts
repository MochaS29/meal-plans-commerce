import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

export interface UserSession {
  email: string
  customerId?: string
  purchases: {
    productId: string
    productName: string
    purchaseDate: string
    dietPlan?: string
  }[]
}

export async function createSession(user: UserSession): Promise<string> {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(secret)

  return token
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')

  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token.value, secret)
    return payload as unknown as UserSession
  } catch (error) {
    return null
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

// Mock user database (in production, use Supabase)
const userDatabase = new Map<string, UserSession>()

export async function getUserByEmail(email: string): Promise<UserSession | null> {
  return userDatabase.get(email) || null
}

export async function createOrUpdateUser(email: string, purchase: any): Promise<UserSession> {
  const existingUser = userDatabase.get(email) || {
    email,
    purchases: []
  }

  const newPurchase = {
    productId: purchase.productId || 'unknown',
    productName: purchase.productName || 'Meal Plan',
    purchaseDate: new Date().toISOString(),
    dietPlan: purchase.dietPlan
  }

  existingUser.purchases.push(newPurchase)
  existingUser.customerId = purchase.customerId

  userDatabase.set(email, existingUser)
  return existingUser
}