import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Only work for your test account
    if (email !== 'mokah@me.com' || password !== 'MindfulMeal2025!') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create a simple mock session for testing
    const response = NextResponse.json({
      success: true,
      message: 'Test login successful!',
      redirect: '/userportal',
      user: {
        id: '67771364-d1fe-47ec-9669-a3177e714bc4',
        email: 'mokah@me.com',
        name: 'Mocha',
        purchases: [
          {
            productId: 'wellness-transformation',
            productName: '30-Day Wellness Transformation',
            dietPlan: 'mediterranean',
            status: 'completed'
          }
        ]
      }
    })

    // Set a simple session cookie
    response.cookies.set('session', 'test-session-' + Date.now(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })

    return response

  } catch (error) {
    return NextResponse.json({
      error: 'Login failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}