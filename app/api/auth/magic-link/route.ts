import { NextRequest, NextResponse } from 'next/server'
import { createSession, setSessionCookie, createOrUpdateUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // For demo/development, automatically log in any email
    // In production, you would send an actual email with a login link

    // Create or update user
    const user = await createOrUpdateUser(email, {
      productId: 'demo-access',
      productName: 'Dashboard Access',
      purchaseDate: new Date().toISOString(),
      dietPlan: 'mediterranean'
    })

    // Create session
    const sessionToken = await createSession(user)

    // Set cookie (in production, this would be done after clicking email link)
    const response = NextResponse.json({
      success: true,
      message: 'Login successful! Redirecting...',
      redirect: '/dashboard'
    })

    // Set the session cookie
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
      { error: 'Failed to process login' },
      { status: 500 }
    )
  }
}

// GET request to handle magic link clicks (in production)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  if (!token || !email) {
    return NextResponse.redirect(new URL('/login?error=invalid-link', request.url))
  }

  // For demo, auto-approve any token
  // In production, verify the token from database

  const user = await createOrUpdateUser(email, {
    productId: 'demo-access',
    productName: 'Dashboard Access',
    purchaseDate: new Date().toISOString(),
    dietPlan: 'mediterranean'
  })

  const sessionToken = await createSession(user)

  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  response.cookies.set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60
  })

  return response
}