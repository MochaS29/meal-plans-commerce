import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Direct Supabase connection
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Database configuration missing',
        debug: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        }
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (userError || !user) {
      return NextResponse.json({
        error: 'Invalid email or password',
        debug: { userError }
      }, { status: 401 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json({
        error: 'Invalid email or password'
      }, { status: 401 })
    }

    // Get purchases
    const { data: purchases } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')

    // Create simple JWT using jose
    const { SignJWT } = await import('jose')
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key')

    const sessionToken = await new SignJWT({ 
      userId: user.id, 
      email: user.email 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30d')
      .sign(secret)

    // Return success with session
    const response = NextResponse.json({
      success: true,
      message: 'Login successful!',
      redirect: '/userportal',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        purchases: purchases?.map(p => ({
          productId: p.product_id,
          productName: p.product_name,
          dietPlan: p.diet_plan,
          status: p.status,
          purchaseDate: p.purchased_at
        })) || []
      }
    })

    // Set session cookie
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Simple login error:', error)
    return NextResponse.json({
      error: 'Login failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}