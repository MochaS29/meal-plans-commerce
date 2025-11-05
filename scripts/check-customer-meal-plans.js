#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCustomerData() {
  console.log('🔍 Checking Customer-Specific Meal Plan Data\n');
  console.log('='.repeat(70) + '\n');

  // Check if customer_meal_plans table has data
  const { data: customerPlans, error: cpError } = await supabase
    .from('customer_meal_plans')
    .select('*')
    .limit(10);

  console.log('📦 Customer Meal Plans Table:');
  if (cpError) {
    console.log('   ❌ Error:', cpError.message);
  } else if (!customerPlans || customerPlans.length === 0) {
    console.log('   ⚠️  Table is EMPTY - no customer plans stored yet');
    console.log('   This means purchases haven\'t created meal plans in database');
  } else {
    console.log(`   ✅ Found ${customerPlans.length} customer meal plans`);
    customerPlans.forEach(cp => {
      console.log(`      - ${cp.customer_email}`);
      console.log(`        PDF ID: ${cp.meal_plan_pdf_id}`);
      console.log(`        Purchase: ${new Date(cp.purchase_date).toLocaleDateString()}`);
    });
  }

  // Check if meal_plan_pdfs table has data
  const { data: pdfs, error: pdfError } = await supabase
    .from('meal_plan_pdfs')
    .select('id, plan_type, recipe_count, times_reused, recipe_ids')
    .limit(10);

  console.log('\n📄 Meal Plan PDFs Table:');
  if (pdfError) {
    console.log('   ❌ Error:', pdfError.message);
  } else if (!pdfs || pdfs.length === 0) {
    console.log('   ⚠️  Table is EMPTY - no PDFs with recipe selections stored');
    console.log('   This means PDFs weren\'t generated via hybrid selector');
  } else {
    console.log(`   ✅ Found ${pdfs.length} generated PDFs`);
    pdfs.forEach(pdf => {
      console.log(`      - ${pdf.plan_type}`);
      console.log(`        Recipes: ${pdf.recipe_count}`);
      console.log(`        Recipe IDs: ${pdf.recipe_ids ? pdf.recipe_ids.length : 0}`);
      console.log(`        Reused: ${pdf.times_reused} times`);
    });
  }

  // Check mokah@me.com specifically
  const { data: mokahPlans, error: mokahError } = await supabase
    .from('customer_meal_plans')
    .select(`
      *,
      meal_plan_pdfs (
        id,
        plan_type,
        recipe_count,
        recipe_ids,
        pdf_url
      )
    `)
    .eq('customer_email', 'mokah@me.com');

  console.log('\n🔍 mokah@me.com Specific Meal Plans:');
  if (mokahError) {
    console.log('   ❌ Error:', mokahError.message);
  } else if (!mokahPlans || mokahPlans.length === 0) {
    console.log('   ⚠️  NO meal plans found for mokah@me.com');
    console.log('   This means your test purchase didn\'t trigger meal plan generation');
  } else {
    console.log(`   ✅ Has ${mokahPlans.length} meal plan(s)`);
    mokahPlans.forEach((mp, i) => {
      console.log(`\n   Plan ${i + 1}:`);
      console.log(`      Purchase Date: ${new Date(mp.purchase_date).toLocaleDateString()}`);
      if (mp.meal_plan_pdfs) {
        console.log(`      Plan Type: ${mp.meal_plan_pdfs.plan_type}`);
        console.log(`      Recipe Count: ${mp.meal_plan_pdfs.recipe_count}`);
        console.log(`      Has Recipe IDs: ${mp.meal_plan_pdfs.recipe_ids ? 'Yes (' + mp.meal_plan_pdfs.recipe_ids.length + ')' : 'No'}`);
        console.log(`      PDF URL: ${mp.meal_plan_pdfs.pdf_url ? 'Yes' : 'No'}`);

        if (mp.meal_plan_pdfs.recipe_ids && mp.meal_plan_pdfs.recipe_ids.length > 0) {
          console.log(`\n      First 3 Recipe IDs:`);
          mp.meal_plan_pdfs.recipe_ids.slice(0, 3).forEach(id => {
            console.log(`        - ${id}`);
          });
        }
      }
    });
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n📊 ANALYSIS:\n');

  if (!customerPlans || customerPlans.length === 0) {
    console.log('❌ PROBLEM: No customer-specific meal plans in database');
    console.log('   Cause: Webhook isn\'t storing customer meal plans');
    console.log('   Result: Calendar shows static JSON instead of personalized recipes\n');
  } else {
    console.log('✅ Customer meal plans ARE being stored');
    console.log('   BUT: /api/meal-plans is not reading from them');
    console.log('   Fix: Update API to fetch customer\'s specific recipes\n');
  }
}

checkCustomerData().catch(console.error);
