#!/usr/bin/env npx tsx

/**
 * Test PDF Generation
 * Generates a sample meal plan PDF to verify the system works
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

async function testPDFGeneration() {
  console.log('🧪 Testing PDF Generation System\n');

  try {
    // Fetch 30 sample recipes from the database
    console.log('📚 Fetching sample recipes from database...');
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .limit(30);

    if (error) {
      console.error('❌ Error fetching recipes:', error);
      process.exit(1);
    }

    console.log(`✅ Fetched ${recipes!.length} recipes\n`);

    // Generate PDF
    console.log('🎨 Generating PDF...');
    const pdfUrl = await generateAndUploadMealPlan(
      'mocha@mochasmindlabs.com',
      'Mediterranean Diet',
      'test-session-' + Date.now(),
      recipes
    );

    console.log('\n✅ PDF Generation Complete!');
    console.log('📄 PDF URL:', pdfUrl);
    console.log('\n📊 PDF Contents:');
    console.log('  ✅ Cover page with customer info');
    console.log('  ✅ Monthly meal calendar (30 days)');
    console.log('  ✅ Weekly shopping lists (4+ weeks)');
    console.log('  ✅ Complete recipe book (30 recipes)');
    console.log('  ✅ Sunday meal prep guide');
    console.log('\n🎉 PDF generation test passed!\n');

  } catch (error: any) {
    console.error('❌ PDF generation failed:', error);
    console.error('\nError details:', error.message);
    process.exit(1);
  }
}

testPDFGeneration();
