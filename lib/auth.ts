import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { supabase } from '@/lib/supabase'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

export interface UserSession {
  id: string
  email: string
  name?: string
  stripeCustomerId?: string
  purchases: {
    productId: string
    productName: string
    purchaseDate: string
    dietPlan?: string
    status: string
    expiresAt?: string
  }[]
  emailVerified: boolean
}

export interface User {
  id: string
  email: string
  password_hash: string
  name?: string
  stripe_customer_id?: string
  email_verified: boolean
  created_at: string
  updated_at: string
  last_login?: string
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Session management
export async function createSession(user: UserSession): Promise<string> {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }

  // Create session in database
  const sessionToken = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(secret)

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  await supabase
    .from('user_sessions')
    .insert({
      user_id: user.id,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString()
    })

  return sessionToken
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')

  if (!token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token.value, secret)
    const userId = payload.userId as string

    // Get full user session from database
    return await getUserSessionById(userId)
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
  const token = cookieStore.get('session')

  if (token && supabase) {
    // Invalidate session in database
    await supabase
      .from('user_sessions')
      .delete()
      .eq('session_token', token.value)
  }

  cookieStore.delete('session')
}

// User management
export async function createUser(email: string, password: string, name?: string): Promise<User> {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }
  const passwordHash = await hashPassword(password)

  const { data, error } = await supabase
    .from('users')
    .insert({
      email: email.toLowerCase(),
      password_hash: passwordHash,
      name
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`)
  }

  return data
}

export async function getUserByEmail(email: string): Promise<User | null> {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email.toLowerCase())
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function getUserById(id: string): Promise<User | null> {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function getUserSessionById(userId: string): Promise<UserSession | null> {
  if (!supabase) {
    return null
  }

  // Get user data
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (userError || !user) {
    return null
  }

  // Get user's active purchases
  const { data: purchases, error: purchasesError } = await supabase
    .from('user_purchases')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('purchased_at', { ascending: false })

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    stripeCustomerId: user.stripe_customer_id,
    emailVerified: user.email_verified,
    purchases: purchases?.map(p => ({
      productId: p.product_id,
      productName: p.product_name,
      purchaseDate: p.purchased_at,
      dietPlan: p.diet_plan,
      status: p.status,
      expiresAt: p.expires_at
    })) || []
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email)

  if (!user) {
    return null
  }

  const isValidPassword = await verifyPassword(password, user.password_hash)

  if (!isValidPassword) {
    return null
  }

  // Update last login
    await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id)

  return user
}

export async function updateUserStripeId(userId: string, stripeCustomerId: string): Promise<void> {
  
  await supabase
    .from('users')
    .update({ stripe_customer_id: stripeCustomerId })
    .eq('id', userId)
}

export async function addUserPurchase(
  userId: string,
  stripeSessionId: string,
  productId: string,
  productName: string,
  dietPlan: string,
  amount: number
): Promise<void> {
  
  await supabase
    .from('user_purchases')
    .insert({
      user_id: userId,
      stripe_session_id: stripeSessionId,
      product_id: productId,
      product_name: productName,
      diet_plan: dietPlan,
      amount,
      status: 'completed'
    })
}

export async function getUserDietAccess(userId: string): Promise<string[]> {
  
  const { data, error } = await supabase
    .from('user_purchases')
    .select('diet_plan')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .not('diet_plan', 'is', null)

  if (error || !data) {
    return []
  }

  return [...new Set(data.map(p => p.diet_plan).filter(Boolean))]
}

// Generate secure tokens
export function generateSecureToken(): string {
  return crypto.randomUUID() + '-' + Date.now().toString(36)
}

// Password reset functionality
export async function createPasswordResetToken(userId: string): Promise<string> {
    const token = generateSecureToken()
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 24) // 24 hour expiry

  await supabase
    .from('password_reset_tokens')
    .insert({
      user_id: userId,
      token,
      expires_at: expiresAt.toISOString()
    })

  return token
}

export async function validatePasswordResetToken(token: string): Promise<string | null> {
  
  const { data, error } = await supabase
    .from('password_reset_tokens')
    .select('user_id, expires_at, used')
    .eq('token', token)
    .single()

  if (error || !data || data.used || new Date(data.expires_at) < new Date()) {
    return null
  }

  return data.user_id
}

export async function resetUserPassword(token: string, newPassword: string): Promise<boolean> {
  const userId = await validatePasswordResetToken(token)

  if (!userId) {
    return false
  }

    const passwordHash = await hashPassword(newPassword)

  // Update password
  const { error: updateError } = await supabase
    .from('users')
    .update({ password_hash: passwordHash })
    .eq('id', userId)

  if (updateError) {
    return false
  }

  // Mark token as used
  await supabase
    .from('password_reset_tokens')
    .update({ used: true })
    .eq('token', token)

  return true
}

// Legacy function for backward compatibility (remove in production)
export async function createOrUpdateUser(email: string, purchase: any): Promise<UserSession> {
  let user = await getUserByEmail(email)

  if (!user) {
    // Create user with a temporary password (they'll need to set a real one)
    user = await createUser(email, 'temp-password-' + Date.now())
  }

  // Add purchase if provided
  if (purchase) {
    await addUserPurchase(
      user.id,
      purchase.stripeSessionId || '',
      purchase.productId || 'legacy',
      purchase.productName || 'Meal Plan',
      purchase.dietPlan || 'mediterranean',
      purchase.amount || 0
    )
  }

  return (await getUserSessionById(user.id))!
}