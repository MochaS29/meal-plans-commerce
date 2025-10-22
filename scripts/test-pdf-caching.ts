#!/usr/bin/env npx tsx

/**
 * Test PDF Caching System
 * Demonstrates how the system reuses PDFs with identical recipe combinations
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import { generateAndUploadMealPlan } from '../lib/storage';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testPDFCaching() {
  console.log('🧪 Testing PDF Caching System\n');
  console.log('=' .repeat(60));

  try {
    // Fetch 30 sample recipes
    console.log('\n📚 Fetching 30 sample recipes from database...');
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .limit(30);

    if (error || !recipes) {
      console.error('❌ Error fetching recipes:', error);
      process.exit(1);
    }

    console.log(`✅ Fetched ${recipes.length} recipes\n`);

    // Test 1: Generate first PDF
    console.log('=' .repeat(60));
    console.log('TEST 1: Generate New PDF');
    console.log('=' .repeat(60));

    const customer1 = 'customer1@example.com';
    const planType = 'Mediterranean Diet';

    console.log(`\n🎨 Generating PDF for ${customer1}...`);
    const pdfUrl1 = await generateAndUploadMealPlan(
      customer1,
      planType,
      'test-session-1-' + Date.now(),
      recipes
    );

    console.log(`\n✅ PDF 1 Generated: ${pdfUrl1}\n`);

    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: Generate second PDF with SAME recipes (should reuse)
    console.log('=' .repeat(60));
    console.log('TEST 2: Reuse Existing PDF (Same Recipes)');
    console.log('=' .repeat(60));

    const customer2 = 'customer2@example.com';

    console.log(`\n🎨 Generating PDF for ${customer2} with SAME recipes...`);
    const pdfUrl2 = await generateAndUploadMealPlan(
      customer2,
      planType,
      'test-session-2-' + Date.now(),
      recipes
    );

    console.log(`\n✅ PDF 2 URL: ${pdfUrl2}\n`);

    // Check if URLs are the same (should be)
    if (pdfUrl1 === pdfUrl2) {
      console.log('✅ SUCCESS! PDFs are identical (caching worked!)');
    } else {
      console.log('⚠️  WARNING: PDFs are different (caching may not have worked)');
    }

    // Test 3: Generate third PDF with DIFFERENT recipes (should create new)
    console.log('\n' + '='.repeat(60));
    console.log('TEST 3: Generate New PDF (Different Recipes)');
    console.log('=' .repeat(60));

    const customer3 = 'customer3@example.com';

    // Fetch different recipes
    const { data: differentRecipes } = await supabase
      .from('recipes')
      .select('*')
      .range(30, 59)
      .limit(30);

    if (differentRecipes && differentRecipes.length > 0) {
      console.log(`\n🎨 Generating PDF for ${customer3} with DIFFERENT recipes...`);
      const pdfUrl3 = await generateAndUploadMealPlan(
        customer3,
        planType,
        'test-session-3-' + Date.now(),
        differentRecipes
      );

      console.log(`\n✅ PDF 3 URL: ${pdfUrl3}\n`);

      if (pdfUrl3 !== pdfUrl1) {
        console.log('✅ SUCCESS! Different recipes generated different PDF');
      } else {
        console.log('⚠️  WARNING: Should have generated different PDF');
      }
    }

    // Show cache statistics
    console.log('\n' + '='.repeat(60));
    console.log('📊 Cache Statistics');
    console.log('=' .repeat(60) + '\n');

    const { data: allPdfs } = await supabase
      .from('meal_plan_pdfs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (allPdfs && allPdfs.length > 0) {
      console.log('Recent PDFs:');
      allPdfs.forEach((pdf, i) => {
        console.log(`\n${i + 1}. ${pdf.plan_type}`);
        console.log(`   Recipe Count: ${pdf.recipe_count}`);
        console.log(`   Times Reused: ${pdf.times_reused}`);
        console.log(`   File Size: ${(pdf.file_size_bytes / 1024).toFixed(2)} KB`);
        console.log(`   Created: ${new Date(pdf.created_at).toLocaleString()}`);
        if (pdf.last_used_at) {
          console.log(`   Last Used: ${new Date(pdf.last_used_at).toLocaleString()}`);
        }
      });
    }

    // Show customer links
    console.log('\n' + '='.repeat(60));
    console.log('👥 Customer Links');
    console.log('=' .repeat(60) + '\n');

    const { data: customerLinks } = await supabase
      .from('customer_meal_plans')
      .select(`
        *,
        meal_plan_pdfs (
          plan_type,
          recipe_count,
          times_reused
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    if (customerLinks && customerLinks.length > 0) {
      console.log('Recent Customer Purchases:');
      customerLinks.forEach((link: any, i) => {
        console.log(`\n${i + 1}. ${link.customer_email}`);
        console.log(`   Plan: ${link.meal_plan_pdfs?.plan_type}`);
        console.log(`   Purchased: ${new Date(link.purchase_date).toLocaleString()}`);
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ PDF Caching Test Complete!');
    console.log('=' .repeat(60) + '\n');

    console.log('🎯 Key Benefits:');
    console.log('  ✅ Reduced PDF generation time (reuse existing PDFs)');
    console.log('  ✅ Lower storage costs (fewer duplicate PDFs)');
    console.log('  ✅ Better performance (instant delivery for cached PDFs)');
    console.log('  ✅ Analytics on most popular recipe combinations\n');

  } catch (error: any) {
    console.error('\n❌ Test failed:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

testPDFCaching();
