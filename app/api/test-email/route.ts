import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    console.log('Raw request body:', body)

    const { to, subject, message } = JSON.parse(body)

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      )
    }

    // Test email with Resend
    const result = await sendEmail({
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #14b8a6;">✅ Resend Email Test</h2>
          <p>This is a test email from your Mindful Meal Plan system!</p>
          <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <strong>Message:</strong> ${message}
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Sent from: ${process.env.EMAIL_FROM || 'noreply@mindfulmealplan.com'}
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            Time: ${new Date().toISOString()}
          </p>
        </div>
      `
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: 'Email sent successfully with Resend!'
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}