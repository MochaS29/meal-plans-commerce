import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

// List of admin emails (in production, store in database)
const ADMIN_EMAILS = [
  'mocha@mochasmindlab.com',
  'admin@mochasmindlab.com'
]

export async function GET(request: NextRequest) {
  const session = await getSession()

  // For demo/development, allow access without session
  if (!session) {
    // Create a demo admin session for testing
    return NextResponse.json({
      success: true,
      admin: true,
      email: 'demo-admin@mochasmindlab.com'
    })
  }

  const isAdmin = ADMIN_EMAILS.includes(session.email.toLowerCase())

  if (!isAdmin) {
    // In demo mode, allow any logged-in user to see admin panel
    return NextResponse.json({
      success: true,
      admin: true,
      email: session.email
    })
  }

  return NextResponse.json({
    success: true,
    admin: true,
    email: session.email
  })
}