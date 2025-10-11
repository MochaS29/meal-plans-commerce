import { NextRequest, NextResponse } from 'next/server'
import { createUser, createSession, getUserSessionById } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    try {
      // Create new user
      const user = await createUser(email, password, name)

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
        message: 'Account created successfully!',
        redirect: '/dashboard',
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
    } catch (error: any) {
      // Handle duplicate email error
      if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
        return NextResponse.json(
          { error: 'An account with this email already exists. Please login instead.' },
          { status: 409 }
        )
      }

      throw error
    }
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}