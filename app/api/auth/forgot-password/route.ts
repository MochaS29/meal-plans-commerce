import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Connect to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration')
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('email', email.toLowerCase())
      .single()

    // SECURITY: Always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (userError || !user) {
      console.log('User not found for password reset:', email)
      // Still return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.'
      })
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Invalidate any existing tokens for this user
    await supabase
      .from('password_reset_tokens')
      .update({ used: true })
      .eq('user_id', user.id)
      .eq('used', false)

    // Store reset token in password_reset_tokens table
    const { error: tokenError } = await supabase
      .from('password_reset_tokens')
      .insert({
        user_id: user.id,
        token: resetToken,
        used: false,
        expires_at: resetTokenExpiry.toISOString()
      })

    if (tokenError) {
      console.error('Error storing reset token:', tokenError)
      return NextResponse.json(
        { error: 'Failed to process reset request' },
        { status: 500 }
      )
    }

    // Create reset URL
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`

    // Send password reset email
    const emailHtml = getPasswordResetEmailTemplate(
      user.name || 'there',
      resetUrl
    )

    const emailResult = await sendEmail({
      to: email,
      subject: 'Reset Your Password - Mindful Meal Plan',
      html: emailHtml
    })

    if (!emailResult.success) {
      console.error('Failed to send reset email:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again.' },
        { status: 500 }
      )
    }

    console.log('✅ Password reset email sent to:', email)

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent! Check your inbox.'
    })

  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

function getPasswordResetEmailTemplate(userName: string, resetUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 15px 40px; background: #14b8a6; color: white; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
          .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .code { font-family: monospace; background: #f3f4f6; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset Your Password 🔒</h1>
          </div>
          <div class="content">
            <p>Hi ${userName},</p>

            <p>We received a request to reset your password for your Mindful Meal Plan account.</p>

            <center>
              <a href="${resetUrl}" class="button">Reset Your Password</a>
            </center>

            <p style="text-align: center; color: #666; font-size: 14px;">
              Or copy and paste this link into your browser:<br>
              <span class="code">${resetUrl}</span>
            </p>

            <div class="warning-box">
              <strong>⏰ This link will expire in 1 hour</strong><br>
              For security, this password reset link is only valid for 60 minutes.
            </div>

            <p><strong>Didn't request a password reset?</strong></p>
            <p>If you didn't make this request, you can safely ignore this email. Your password will remain unchanged.</p>

            <p>For security reasons:</p>
            <ul>
              <li>We never ask for your password via email</li>
              <li>This link can only be used once</li>
              <li>If you're concerned about account security, contact our support team</li>
            </ul>

            <p>Stay secure,<br>
            The Mindful Meal Plans Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Mindful Meal Plans. All rights reserved.</p>
            <p>If you have questions, reply to this email or contact support@mindfulmealplan.com</p>
          </div>
        </div>
      </body>
    </html>
  `
}
