const { sendEmail } = require('./lib/email.ts')

async function testResend() {
  console.log('🧪 Testing Resend email integration...\n')

  try {
    const result = await sendEmail({
      to: 'mocha@mochasmindlab.com',
      subject: '🎉 Resend Integration Test - SUCCESS!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #14b8a6, #f59e0b); border-radius: 12px;">
          <div style="background: white; padding: 30px; border-radius: 8px;">
            <h2 style="color: #14b8a6; margin-top: 0;">✅ Resend Email System Active!</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              <strong>Congratulations!</strong> Your Mindful Meal Plan email system is now fully operational.
            </p>
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
              <h3 style="margin-top: 0; color: #1f2937;">What This Means:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>✅ Customers will automatically receive purchase confirmations</li>
                <li>✅ Meal plan PDFs will be delivered instantly</li>
                <li>✅ Welcome emails will be sent immediately</li>
                <li>✅ Your business is ready to serve real customers!</li>
              </ul>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 0;">
              <strong>API Key:</strong> Active and working<br>
              <strong>From:</strong> ${process.env.EMAIL_FROM || 'noreply@mindfulmealplan.com'}<br>
              <strong>Time:</strong> ${new Date().toLocaleString()}<br>
              <strong>System:</strong> Resend Email Service
            </p>
          </div>
        </div>
      `
    })

    if (result.success) {
      console.log('🎉 SUCCESS! Email sent via Resend')
      console.log(`📧 Message ID: ${result.messageId}`)
      console.log('📬 Check your email inbox!')
      console.log('\n✅ Your email system is now LIVE and ready for customers!')
    } else {
      console.log('❌ Email failed to send')
      console.log('Error:', result.error)
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testResend()