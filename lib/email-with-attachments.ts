import { Resend } from 'resend'

// TODO: USER INPUT NEEDED
// This file provides email delivery with PDF attachments
// Requires: Resend API key already configured in .env.local

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailAttachment {
  filename: string
  content: Buffer | string
  contentType?: string
}

interface SendMealPlanEmailParams {
  to: string
  customerName: string
  dietPlan: string
  pdfBuffer: Buffer
  purchaseDetails: {
    productName: string
    amount: number
    purchaseDate: string
  }
}

/**
 * Send meal plan delivery email with PDF attachment
 * Called after successful purchase
 */
export async function sendMealPlanEmail({
  to,
  customerName,
  dietPlan,
  pdfBuffer,
  purchaseDetails
}: SendMealPlanEmailParams) {

  // TODO: USER INPUT NEEDED
  // Update EMAIL_FROM in .env.local to your custom domain once DNS is verified
  // Current: onboarding@resend.dev (sandbox)
  // Production: recipes@mochasmindlab.com or noreply@mindfulmealplan.com

  const emailFrom = process.env.EMAIL_FROM || 'Mindful Meal Plan <onboarding@resend.dev>'

  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: to,
      subject: `Your ${dietPlan} Meal Plan is Ready! 🍽️`,
      html: generateMealPlanEmailHTML({
        customerName,
        dietPlan,
        purchaseDetails
      }),
      attachments: [
        {
          filename: `${dietPlan}-meal-plan.pdf`,
          content: pdfBuffer
        }
      ]
    })

    if (error) {
      console.error('Resend email error:', error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log('✅ Meal plan email sent:', data?.id)
    return { success: true, emailId: data?.id }

  } catch (error) {
    console.error('Error sending meal plan email:', error)
    throw error
  }
}

/**
 * Send custom family plan notification (24-hour delivery)
 */
export async function sendCustomPlanOrderConfirmation({
  to,
  customerName,
  preferencesSummary
}: {
  to: string
  customerName: string
  preferencesSummary: string
}) {

  const emailFrom = process.env.EMAIL_FROM || 'Mindful Meal Plan <onboarding@resend.dev>'

  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: to,
      subject: 'Custom Family Plan Order Received - Delivery in 24 Hours',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0d9488 0%, #f59e0b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmed!</h1>
              <p>Your Custom Family Meal Plan is Being Prepared</p>
            </div>
            <div class="content">
              <p>Hi ${customerName},</p>

              <p>Thank you for your Custom Family Plan purchase! We've received your preferences and our AI is crafting a personalized 30-day meal plan tailored specifically for your family.</p>

              <h3>Your Preferences:</h3>
              <pre style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #0d9488;">${preferencesSummary}</pre>

              <h3>What Happens Next?</h3>
              <ul>
                <li>⏱️ <strong>Within 24 hours:</strong> Your personalized meal plan will be generated</li>
                <li>📧 <strong>Email delivery:</strong> PDF calendar + recipes + shopping lists</li>
                <li>🔄 <strong>Unlimited regeneration:</strong> Adjust anytime if needed</li>
              </ul>

              <p><strong>You'll receive an email with your complete meal plan within 24 hours.</strong></p>

              <p>Questions? Just reply to this email - we're here to help!</p>

              <p>Best regards,<br>Mocha's MindLab Team</p>
            </div>
            <div class="footer">
              <p>Mindful Meal Plan | mindfulmealplan.com</p>
              <p>Generated with care by Mocha's MindLab</p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return { success: true, emailId: data?.id }

  } catch (error) {
    console.error('Error sending custom plan confirmation:', error)
    throw error
  }
}

/**
 * Generate beautiful HTML email for meal plan delivery
 */
function generateMealPlanEmailHTML({
  customerName,
  dietPlan,
  purchaseDetails
}: {
  customerName: string
  dietPlan: string
  purchaseDetails: {
    productName: string
    amount: number
    purchaseDate: string
  }
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0d9488 0%, #f59e0b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .attachment-notice { background: #ecfdf5; border: 2px solid #10b981; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .features { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        .feature-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .feature-item:last-child { border-bottom: none; }
        .button { display: inline-block; background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Your Meal Plan is Ready!</h1>
          <p>${dietPlan} - Complete 30-Day Plan</p>
        </div>

        <div class="content">
          <p>Hi ${customerName},</p>

          <p>Your ${dietPlan} meal plan is attached and ready to transform your wellness journey!</p>

          <div class="attachment-notice">
            <h3 style="margin-top: 0;">📎 PDF Attachment Included</h3>
            <p style="margin-bottom: 0;">Your complete meal plan PDF is attached to this email. Download it to access:</p>
          </div>

          <div class="features">
            <div class="feature-item">
              <strong>📅 30-Day Calendar</strong> - Daily breakfast, lunch, dinner, and snacks
            </div>
            <div class="feature-item">
              <strong>🍳 Complete Recipes</strong> - Step-by-step instructions with photos
            </div>
            <div class="feature-item">
              <strong>🛒 Weekly Shopping Lists</strong> - Organized by store section
            </div>
            <div class="feature-item">
              <strong>📊 Nutritional Info</strong> - Calories, macros, and portions
            </div>
            <div class="feature-item">
              <strong>⏱️ Meal Prep Guides</strong> - Time-saving batch cooking tips
            </div>
          </div>

          <h3>Getting Started</h3>
          <ol>
            <li>Download the PDF attachment</li>
            <li>Review Week 1 shopping list</li>
            <li>Prep on Sunday (optional - see meal prep guide in PDF)</li>
            <li>Enjoy delicious, healthy meals all week!</li>
          </ol>

          <h3>Need Help?</h3>
          <p>Reply to this email anytime - we're here to support your wellness journey!</p>

          <p><strong>Order Details:</strong></p>
          <ul style="list-style: none; padding: 0;">
            <li>Product: ${purchaseDetails.productName}</li>
            <li>Amount: $${(purchaseDetails.amount / 100).toFixed(2)}</li>
            <li>Date: ${purchaseDetails.purchaseDate}</li>
          </ul>

          <p>Best regards,<br>Mocha's MindLab Team</p>
        </div>

        <div class="footer">
          <p>Mindful Meal Plan | mindfulmealplan.com</p>
          <p>Questions? Reply to this email or visit our <a href="https://mindfulmealplan.com/support">support center</a></p>
          <p>© ${new Date().getFullYear()} Mocha's MindLab. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// TODO: USER INPUT NEEDED
// Add this function to your Stripe webhook handler after successful payment
// Example usage:
/*
import { sendMealPlanEmail } from '@/lib/email-with-attachments'
import { SimpleMealPlanPDFGenerator } from '@/lib/pdf-generator-simple'

// In your webhook after payment.succeeded:
const pdfGenerator = new SimpleMealPlanPDFGenerator()
const pdfBlob = await pdfGenerator.generateMealPlanPDF(mealPlanData, userInfo)
const pdfBuffer = Buffer.from(await pdfBlob.arrayBuffer())

await sendMealPlanEmail({
  to: customer.email,
  customerName: customer.name,
  dietPlan: 'Mediterranean Diet',
  pdfBuffer: pdfBuffer,
  purchaseDetails: {
    productName: 'Mediterranean Meal Plan',
    amount: 7900,
    purchaseDate: new Date().toLocaleDateString()
  }
})
*/
