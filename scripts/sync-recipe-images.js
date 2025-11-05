#!/usr/bin/env node

/**
 * Sync recipe images from images table to recipe.image_url column
 * This populates the image_url column for all recipes that have images
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncRecipeImages() {
  console.log('🔄 Syncing recipe images...\n');

  // Get all images for recipes
  const { data: images, error: imagesError } = await supabase
    .from('images')
    .select('entity_id, url')
    .eq('entity_type', 'recipe')
    .eq('is_primary', true);

  if (imagesError) {
    console.error('❌ Error fetching images:', imagesError);
    return;
  }

  console.log(`Found ${images.length} recipe images in images table\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  // Update each recipe's image_url
  for (const image of images) {
    try {
      // Check if recipe already has image_url
      const { data: recipe } = await supabase
        .from('recipes')
        .select('image_url, name')
        .eq('id', image.entity_id)
        .single();

      if (!recipe) {
        console.log(`⚠️  Recipe not found for image: ${image.entity_id}`);
        errors++;
        continue;
      }

      if (recipe.image_url === image.url) {
        skipped++;
        continue;
      }

      // Update recipe with image URL
      const { error: updateError } = await supabase
        .from('recipes')
        .update({ image_url: image.url })
        .eq('id', image.entity_id);

      if (updateError) {
        console.log(`❌ Error updating "${recipe.name}":`, updateError.message);
        errors++;
      } else {
        console.log(`✅ Updated "${recipe.name}"`);
        updated++;
      }
    } catch (error) {
      console.error(`❌ Error processing image:`, error.message);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✨ Sync Complete!');
  console.log(`   ✅ Updated: ${updated} recipes`);
  console.log(`   ⏭️  Skipped (already synced): ${skipped} recipes`);
  if (errors > 0) {
    console.log(`   ❌ Errors: ${errors}`);
  }

  // Check recipes without images
  const { count: totalRecipes } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true });

  const { count: recipesWithImages } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true })
    .not('image_url', 'is', null);

  console.log(`\n📊 Final Status:`);
  console.log(`   Total recipes: ${totalRecipes}`);
  console.log(`   With images: ${recipesWithImages} (${Math.round((recipesWithImages / totalRecipes) * 100)}%)`);
  console.log(`   Missing images: ${totalRecipes - recipesWithImages}`);
}

syncRecipeImages().catch(console.error);
