import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Log connection status
if (supabase) {
  console.log('✅ Supabase connected to:', supabaseUrl)
} else {
  console.log('⚠️ Supabase not configured - using local storage')
}

// Database types
export interface User {
  id: string
  email: string
  name?: string
  stripe_customer_id?: string
  created_at: string
  updated_at: string
}

export interface Purchase {
  id: string
  user_id: string
  stripe_session_id: string
  product_id: string
  product_name: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  pdf_url?: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  status: 'active' | 'cancelled' | 'past_due'
  current_period_start: string
  current_period_end: string
  created_at: string
  updated_at: string
}

// User functions
export async function createOrUpdateUser(email: string, data: Partial<User>) {
  if (!supabase) {
    console.log('Supabase not configured, skipping user creation')
    return null
  }

  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (existingUser) {
    // Update existing user
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('email', email)
      .select()
      .single()

    if (error) throw error
    return updatedUser
  } else {
    // Create new user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        email,
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error
    return newUser
  }
}

// Purchase functions
export async function createPurchase(purchase: Omit<Purchase, 'id' | 'created_at'>) {
  if (!supabase) {
    console.log('Supabase not configured, skipping purchase creation')
    return null
  }

  const { data, error } = await supabase
    .from('purchases')
    .insert([{
      ...purchase,
      created_at: new Date().toISOString()
    }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePurchaseWithPDF(sessionId: string, pdfUrl: string) {
  if (!supabase) {
    console.log('Supabase not configured, skipping PDF update')
    return null
  }

  const { data, error } = await supabase
    .from('purchases')
    .update({
      pdf_url: pdfUrl,
      status: 'completed'
    })
    .eq('stripe_session_id', sessionId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Get user's purchase history
export async function getUserPurchases(userId: string) {
  if (!supabase) {
    console.log('Supabase not configured')
    return []
  }

  const { data, error } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Subscription functions
export async function createSubscription(subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>) {
  if (!supabase) {
    console.log('Supabase not configured, skipping subscription creation')
    return null
  }

  const { data, error } = await supabase
    .from('subscriptions')
    .insert([{
      ...subscription,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSubscriptionStatus(stripeSubscriptionId: string, status: Subscription['status']) {
  if (!supabase) {
    console.log('Supabase not configured, skipping subscription update')
    return null
  }

  const { data, error } = await supabase
    .from('subscriptions')
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', stripeSubscriptionId)
    .select()
    .single()

  if (error) throw error
  return data
}