#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function cleanOrphanedImages() {
  console.log('🗑️  Cleaning up orphaned image records...\n')

  // Get all recipe IDs
  const { data: recipes } = await supabase.from('recipes').select('id')
  const validRecipeIds = new Set(recipes.map(r => r.id))

  console.log('Valid recipe IDs:', validRecipeIds.size)

  // Get all image records
  const { data: images } = await supabase
    .from('images')
    .select('id, entity_id')
    .eq('entity_type', 'recipe')

  console.log('Total image records:', images.length)

  // Find orphaned images
  const orphanedImages = images.filter(img => !validRecipeIds.has(img.entity_id))

  console.log('Orphaned image records:', orphanedImages.length)

  if (orphanedImages.length > 0) {
    // Delete in batches
    const batchSize = 100
    let deleted = 0

    for (let i = 0; i < orphanedImages.length; i += batchSize) {
      const batch = orphanedImages.slice(i, i + batchSize)
      const ids = batch.map(img => img.id)

      const { error } = await supabase.from('images').delete().in('id', ids)

      if (error) {
        console.error('Error deleting batch:', error)
      } else {
        deleted += ids.length
        console.log(`Deleted ${deleted}/${orphanedImages.length} orphaned images...`)
      }
    }

    console.log(`\n✅ Deleted ${deleted} orphaned image records`)
  } else {
    console.log('\n✅ No orphaned images found')
  }

  // Verify final counts
  const { count: finalImages } = await supabase
    .from('images')
    .select('*', { count: 'exact', head: true })
    .eq('entity_type', 'recipe')

  console.log('Final image count:', finalImages)
}

cleanOrphanedImages().catch(console.error)
