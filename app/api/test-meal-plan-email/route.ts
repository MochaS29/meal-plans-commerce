import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getMealPlanEmailTemplate } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, customerName, planType, downloadUrl } = await request.json()

    if (!to || !customerName || !planType || !downloadUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: to, customerName, planType, downloadUrl' },
        { status: 400 }
      )
    }

    // Generate the beautiful meal plan email template
    const emailHtml = getMealPlanEmailTemplate(customerName, planType, downloadUrl)

    // Send the meal plan email
    const result = await sendEmail({
      to,
      subject: subject || `Your ${planType} Meal Plan is Ready! 🎉`,
      html: emailHtml
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: 'Meal plan email sent successfully!'
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to send meal plan email', details: result.error },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Meal plan email error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}