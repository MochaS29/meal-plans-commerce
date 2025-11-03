// Email service for sending meal plans to customers
import { trackEmailError } from '@/lib/monitoring'

interface SendEmailParams {
  to: string
  subject: string
  html: string
  attachments?: {
    filename: string
    content: Buffer | string
  }[]
}

// Lazy load Resend only when needed
let resend: any = null
async function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null
  }
  
  if (!resend) {
    const { Resend } = await import('resend')
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  
  return resend
}

export async function sendEmail({ to, subject, html, attachments }: SendEmailParams) {
  // Get Resend client (will be null if no API key)
  const resendClient = await getResendClient()
  
  // Only log instead of sending if no API key is configured
  if (!resendClient) {
    console.log('📧 Email would be sent (no API key):', {
      to,
      subject,
      attachmentsCount: attachments?.length || 0
    })
    return { success: true, messageId: 'dev-' + Date.now() }
  }

  try {
    console.log('📧 Attempting to send email via Resend...')
    console.log('From:', process.env.EMAIL_FROM)
    console.log('To:', to)
    console.log('Subject:', subject)

    // Send email with Resend
    const response = await resendClient.emails.send({
      from: process.env.EMAIL_FROM || 'Meal Plans <onboarding@resend.dev>',
      to,
      subject,
      html,
      attachments
    })

    console.log('📬 Resend response:', response)

    if ('data' in response && response.data) {
      console.log('✅ Email sent successfully:', response.data.id)
      return { success: true, messageId: response.data.id }
    } else if ('error' in response) {
      console.error('❌ Resend API error:', response.error)
      await trackEmailError('Resend API error', {
        to,
        error: response.error.message || 'Resend API error'
      })
      return { success: false, error: response.error.message || 'Resend API error' }
    } else {
      console.error('❌ Unexpected response format:', response)
      await trackEmailError('Unexpected response format', { to })
      return { success: false, error: 'Unexpected response format' }
    }
  } catch (error) {
    console.error('❌ Failed to send email:', error)
    await trackEmailError('Email sending failed', {
      to,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export function getMealPlanEmailTemplate(customerName: string, planType: string, downloadUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Your Meal Plan is Ready!</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #14b8a6; color: white; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
          .features { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your ${planType} Meal Plan is Ready! 🎉</h1>
          </div>
          <div class="content">
            <p>Hi ${customerName},</p>

            <p>Thank you for your purchase! Your personalized meal plan is ready for download.</p>

            <center>
              <a href="${downloadUrl}" class="button">Download Your Meal Plan</a>
            </center>

            <div class="features">
              <h3>What's Included:</h3>
              <ul>
                <li>✅ 30-day meal calendar</li>
                <li>✅ Complete recipes with instructions</li>
                <li>✅ Weekly shopping lists</li>
                <li>✅ Meal prep guides</li>
                <li>✅ Nutritional information</li>
              </ul>
            </div>

            <h3>Getting Started:</h3>
            <ol>
              <li>Download and print your meal calendar</li>
              <li>Review this week's shopping list</li>
              <li>Set aside time for Sunday meal prep</li>
              <li>Enjoy delicious, healthy meals!</li>
            </ol>

            <p>If you have any questions or need support, simply reply to this email and we'll be happy to help!</p>

            <p>Happy cooking!<br>
            The Meal Plans Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Meal Plans. All rights reserved.</p>
            <p>This link will expire in 7 days for security. Please download and save your meal plan.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export function getWelcomeEmailTemplate(customerName: string, customerEmail: string, isSubscription: boolean) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Meal Plans!</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border: 1px solid #e5e5e5; border-radius: 0 0 10px 10px; }
          .info-box { background: #f0fdf4; border-left: 4px solid #14b8a6; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Your Meal Planning Journey! 🌟</h1>
          </div>
          <div class="content">
            <p>Hi ${customerName},</p>

            <p>Welcome to the Meal Plans family! We're thrilled to have you on board.</p>

            <div class="info-box">
              <strong>Your Account Details:</strong><br>
              Email: ${customerEmail}<br>
              Plan Type: ${isSubscription ? 'Monthly Subscription' : 'One-Time Purchase'}<br>
              ${isSubscription ? 'Next Delivery: ' + new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() : ''}
            </div>

            ${isSubscription ? `
            <h3>Your Monthly Benefits:</h3>
            <ul>
              <li>🗓️ New meal plans delivered on the 1st of each month</li>
              <li>🌍 Rotating global cuisine themes</li>
              <li>📚 Access to our full recipe archive</li>
              <li>💬 Priority customer support</li>
              <li>🎁 Exclusive member-only content</li>
            </ul>

            <p>You can manage your subscription, update preferences, or cancel anytime from your account dashboard.</p>
            ` : `
            <h3>Make the Most of Your Meal Plan:</h3>
            <ul>
              <li>📌 Pin your calendar in a visible spot</li>
              <li>📱 Take photos of your shopping lists</li>
              <li>🥘 Try one new recipe each week</li>
              <li>💡 Share your creations on social media with #MealPlansLife</li>
            </ul>
            `}

            <p>Best wishes on your wellness journey!</p>

            <p>Warmly,<br>
            The Meal Plans Team</p>
          </div>
          <div class="footer">
            <p>© 2024 Meal Plans. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `
}