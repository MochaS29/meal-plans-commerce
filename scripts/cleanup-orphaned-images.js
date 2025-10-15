#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  console.log('🧹 Cleaning up orphaned images...\n');

  // Get all recipe IDs that exist
  const { data: allRecipes } = await supabase
    .from('recipes')
    .select('id');

  const validRecipeIds = new Set(allRecipes?.map(r => r.id) || []);
  console.log(`Valid recipes: ${validRecipeIds.size}`);

  // Get all images
  const { data: allImages } = await supabase
    .from('images')
    .select('id, entity_id')
    .eq('entity_type', 'recipe');

  console.log(`Total image records: ${allImages?.length || 0}`);

  // Find orphaned images
  const orphanedImages = allImages?.filter(img => !validRecipeIds.has(img.entity_id)) || [];

  console.log(`Orphaned images found: ${orphanedImages.length}\n`);

  if (orphanedImages.length > 0) {
    console.log(`Deleting ${orphanedImages.length} orphaned images...`);
    const orphanedIds = orphanedImages.map(img => img.id);
    const { error } = await supabase
      .from('images')
      .delete()
      .in('id', orphanedIds);

    if (error) {
      console.error('Error deleting:', error);
    } else {
      console.log(`✅ Deleted ${orphanedImages.length} orphaned images`);
    }
  }

  // Now get accurate counts
  const { data: validImages } = await supabase
    .from('images')
    .select('entity_id')
    .eq('entity_type', 'recipe');

  const uniqueRecipesWithImages = new Set(validImages?.map(img => img.entity_id) || []);

  // Also check for duplicate images (same recipe ID with multiple images)
  const imageCounts = {};
  validImages?.forEach(img => {
    imageCounts[img.entity_id] = (imageCounts[img.entity_id] || 0) + 1;
  });

  const recipesWithDuplicates = Object.entries(imageCounts)
    .filter(([id, count]) => count > 1)
    .length;

  console.log(`\n📊 ACCURATE COUNT AFTER CLEANUP:`);
  console.log(`Total recipes: ${allRecipes?.length}`);
  console.log(`Total image records: ${validImages?.length}`);
  console.log(`Recipes WITH images: ${uniqueRecipesWithImages.size}`);
  console.log(`Recipes WITHOUT images: ${(allRecipes?.length || 0) - uniqueRecipesWithImages.size}`);
  if (recipesWithDuplicates > 0) {
    console.log(`⚠️  Recipes with duplicate images: ${recipesWithDuplicates}`);
  }
})();
