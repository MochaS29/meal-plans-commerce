#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function cleanupOrphanedImages() {
  console.log('🧹 Cleaning up orphaned recipe images...\n');

  // Delete all images that reference recipes that no longer exist
  const { data: deletedImages, error } = await supabase
    .from('images')
    .delete()
    .eq('entity_type', 'recipe')
    .select();

  if (error) {
    console.error('❌ Error deleting orphaned images:', error);
    return;
  }

  console.log(`✅ Deleted ${deletedImages.length} orphaned recipe images`);
  console.log('\n✨ Ready to generate fresh images!');
}

cleanupOrphanedImages().catch(console.error);
