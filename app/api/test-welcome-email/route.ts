import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getWelcomeEmailTemplate } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, customerName, customerEmail, isSubscription } = await request.json()

    if (!to || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: to, customerName, customerEmail' },
        { status: 400 }
      )
    }

    // Generate the beautiful welcome email template
    const emailHtml = getWelcomeEmailTemplate(customerName, customerEmail, isSubscription || false)

    // Send the welcome email
    const result = await sendEmail({
      to,
      subject: subject || 'Welcome to Your Meal Planning Journey! 🌟',
      html: emailHtml
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: 'Welcome email sent successfully!'
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to send welcome email', details: result.error },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Welcome email error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}