#!/usr/bin/env node

/**
 * Send Demo Emails to Mocha
 * Sends both welcome and meal plan delivery emails for review
 */

require('dotenv').config({ path: '.env.local' });
const { sendEmail, getWelcomeEmailTemplate, getMealPlanEmailTemplate } = require('../lib/email.ts');

async function sendDemoEmails() {
  console.log('📧 Sending demo emails to mocha@mochasmindlabs.com\n');

  const customerEmail = 'mocha@mochasmindlabs.com';
  const customerName = 'Mocha';

  try {
    // Email 1: Welcome Email
    console.log('📬 Sending Email #1: Welcome Email...');
    const welcomeHtml = getWelcomeEmailTemplate(customerName, customerEmail, false);
    const welcomeResult = await sendEmail({
      to: customerEmail,
      subject: '🌟 Welcome to Mindful Meal Plan!',
      html: welcomeHtml
    });

    if (welcomeResult.success) {
      console.log('✅ Welcome email sent successfully!');
      console.log('   Message ID:', welcomeResult.messageId);
    } else {
      console.log('❌ Welcome email failed:', welcomeResult.error);
    }

    // Wait 2 seconds between emails
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Email 2: Meal Plan Delivery with PDF link
    console.log('\n📬 Sending Email #2: Meal Plan Delivery...');
    const mealPlanHtml = getMealPlanEmailTemplate(
      customerName,
      'Mediterranean Diet Challenge',
      'http://localhost:3001/demo-meal-plan.pdf' // Demo link
    );
    const mealPlanResult = await sendEmail({
      to: customerEmail,
      subject: '🎉 Your Mediterranean Diet Meal Plan is Ready!',
      html: mealPlanHtml
    });

    if (mealPlanResult.success) {
      console.log('✅ Meal plan email sent successfully!');
      console.log('   Message ID:', mealPlanResult.messageId);
    } else {
      console.log('❌ Meal plan email failed:', mealPlanResult.error);
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ Demo emails sent!');
    console.log('='.repeat(60));
    console.log('📧 Check your inbox at mocha@mochasmindlabs.com');
    console.log('');
    console.log('You should receive:');
    console.log('  1. Welcome email (account creation confirmation)');
    console.log('  2. Meal plan delivery email (with PDF download link)');
    console.log('');
    console.log('🔗 Next steps:');
    console.log('  - View customer dashboard: http://localhost:3001/dashboard');
    console.log('  - View PDF preview: http://localhost:3001/demo-pdf');
    console.log('');

  } catch (error) {
    console.error('❌ Error sending emails:', error);
    process.exit(1);
  }
}

sendDemoEmails();
