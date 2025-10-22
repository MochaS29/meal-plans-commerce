import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser, createSession, getUserSessionById } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Authenticate user
    const user = await authenticateUser(email, password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Get full user session data
    const userSession = await getUserSessionById(user.id)

    if (!userSession) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      )
    }

    // Create session token
    const sessionToken = await createSession(userSession)

    // Set cookie and return success
    const response = NextResponse.json({
      success: true,
      message: 'Login successful!',
      redirect: '/userportal',
      user: {
        id: userSession.id,
        email: userSession.email,
        name: userSession.name,
        purchases: userSession.purchases
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
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}