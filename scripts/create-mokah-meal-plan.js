#!/usr/bin/env node

/**
 * Create a meal plan for mokah@me.com for testing
 * Links them to an existing PDF or creates a new one
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createMealPlanForMokah() {
  console.log('🎯 Creating meal plan for mokah@me.com\n');
  console.log('='.repeat(70) + '\n');

  try {
    // Step 1: Check if mokah@me.com already has a meal plan
    const { data: existingPlans } = await supabase
      .from('customer_meal_plans')
      .select('*')
      .eq('customer_email', 'mokah@me.com');

    if (existingPlans && existingPlans.length > 0) {
      console.log('⚠️  mokah@me.com already has a meal plan!');
      console.log('   Deleting old plan and creating new one...\n');

      // Delete old plans
      await supabase
        .from('customer_meal_plans')
        .delete()
        .eq('customer_email', 'mokah@me.com');
    }

    // Step 2: Get an existing Mediterranean PDF (or we'll create one)
    const { data: existingPdf } = await supabase
      .from('meal_plan_pdfs')
      .select('*')
      .eq('plan_type', 'Mediterranean Diet')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    let pdfId;
    let recipeIds;

    if (existingPdf) {
      console.log('✅ Found existing Mediterranean PDF');
      console.log(`   Plan Type: ${existingPdf.plan_type}`);
      console.log(`   Recipe Count: ${existingPdf.recipe_count}`);
      console.log(`   Has been reused: ${existingPdf.times_reused} times\n`);

      pdfId = existingPdf.id;
      recipeIds = existingPdf.recipe_ids;

      // Update reuse count
      await supabase
        .from('meal_plan_pdfs')
        .update({
          times_reused: existingPdf.times_reused + 1,
          last_used_at: new Date().toISOString()
        })
        .eq('id', pdfId);

    } else {
      console.log('⚠️  No existing PDF found, creating a new one...\n');

      // Get 30 Mediterranean recipes from database
      const { data: dietPlan } = await supabase
        .from('diet_plans')
        .select('id')
        .eq('slug', 'mediterranean')
        .single();

      if (!dietPlan) {
        console.error('❌ Mediterranean diet plan not found in database');
        return;
      }

      const { data: recipes } = await supabase
        .from('recipes')
        .select('id')
        .contains('diet_plans', [dietPlan.id])
        .limit(30);

      if (!recipes || recipes.length < 30) {
        console.error('❌ Not enough recipes in database');
        return;
      }

      recipeIds = recipes.map(r => r.id);

      // Create hash for caching
      const crypto = require('crypto');
      const recipeHash = crypto
        .createHash('sha256')
        .update(recipeIds.sort().join(','))
        .digest('hex');

      // Create new PDF record
      const { data: newPdf, error: pdfError } = await supabase
        .from('meal_plan_pdfs')
        .insert({
          pdf_url: 'https://mock-url-for-testing.com/mokah-plan.pdf',
          diet_plan_id: dietPlan.id,
          plan_type: 'Mediterranean Diet',
          recipe_ids: recipeIds,
          recipe_hash: recipeHash,
          recipe_count: recipeIds.length,
          times_reused: 0,
          generation_date: new Date().toISOString()
        })
        .select()
        .single();

      if (pdfError) {
        console.error('❌ Error creating PDF record:', pdfError);
        return;
      }

      pdfId = newPdf.id;
      console.log('✅ Created new PDF record\n');
    }

    // Step 3: Link mokah@me.com to this PDF
    const { data: newCustomerPlan, error: cpError } = await supabase
      .from('customer_meal_plans')
      .insert({
        customer_email: 'mokah@me.com',
        meal_plan_pdf_id: pdfId,
        stripe_session_id: 'manual_test_' + Date.now(),
        purchase_date: new Date().toISOString()
      })
      .select()
      .single();

    if (cpError) {
      console.error('❌ Error creating customer meal plan:', cpError);
      return;
    }

    console.log('✅ Successfully linked mokah@me.com to meal plan!\n');

    // Step 4: Verify and show results
    console.log('='.repeat(70));
    console.log('\n📊 MEAL PLAN DETAILS:\n');
    console.log(`   Customer: mokah@me.com`);
    console.log(`   Plan Type: Mediterranean Diet`);
    console.log(`   Recipe Count: ${recipeIds.length}`);
    console.log(`   PDF ID: ${pdfId}`);

    // Fetch a few recipe names to show
    const { data: sampleRecipes } = await supabase
      .from('recipes')
      .select('name')
      .in('id', recipeIds.slice(0, 5));

    if (sampleRecipes && sampleRecipes.length > 0) {
      console.log(`\n   Sample Recipes (first 5):`);
      sampleRecipes.forEach((r, i) => {
        console.log(`      ${i + 1}. ${r.name}`);
      });
    }

    console.log('\n='.repeat(70));
    console.log('\n✅ SUCCESS! mokah@me.com can now see personalized calendar');
    console.log('\n📝 Next Steps:');
    console.log('   1. Login at http://localhost:3000/login');
    console.log('   2. Email: mokah@me.com');
    console.log('   3. Password: TestPassword123!');
    console.log('   4. Calendar will now show YOUR specific 30 recipes');
    console.log('   5. All recipe names will match EXACTLY (100% match rate)\n');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createMealPlanForMokah();
