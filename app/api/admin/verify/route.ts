import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin-token')

    if (!token) {
      return NextResponse.json(
        { error: 'No admin token found' },
        { status: 401 }
      )
    }

    // Verify JWT token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-jwt-secret-key'
    )

    try {
      const { payload } = await jwtVerify(token.value, secret)

      // Check if token has admin role
      if (payload.role !== 'admin') {
        return NextResponse.json(
          { error: 'Invalid admin role' },
          { status: 403 }
        )
      }

      return NextResponse.json({
        success: true,
        username: payload.username,
        role: payload.role
      })

    } catch (error) {
      // Token is invalid or expired
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Admin verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}