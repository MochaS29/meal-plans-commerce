import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { supabase } from '@/lib/supabase'

// Temporary endpoint to manually login for testing
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (email !== 'mokah@me.com') {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }

    // Get user data directly
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get purchases
    const { data: purchases } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')

    // Create simple JWT
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    )

    const sessionToken = await new SignJWT({ 
      userId: user.id, 
      email: user.email 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30d')
      .sign(secret)

    // Set cookie and return success
    const response = NextResponse.json({
      success: true,
      message: 'Manual login successful!',
      redirect: '/userportal',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        purchases: purchases?.map(p => ({
          productId: p.product_id,
          productName: p.product_name,
          dietPlan: p.diet_plan,
          purchaseDate: p.purchased_at,
          status: p.status
        })) || []
      }
    })

    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })

    return response

  } catch (error) {
    console.error('Manual login error:', error)
    return NextResponse.json({
      error: 'Manual login failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}