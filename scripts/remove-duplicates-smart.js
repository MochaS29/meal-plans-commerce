#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function removeDuplicatesSmart() {
  console.log('🔍 Finding duplicate recipes with images...\n')

  // Get all recipes
  const { data: recipes } = await supabase
    .from('recipes')
    .select('id, name, created_at')
    .order('name')

  // Get all images
  const { data: images } = await supabase
    .from('images')
    .select('entity_id, url')
    .eq('entity_type', 'recipe')
    .eq('is_primary', true)

  const recipeImages = {}
  images?.forEach(img => {
    recipeImages[img.entity_id] = img.url
  })

  const nameCount = {}

  recipes.forEach(recipe => {
    if (!nameCount[recipe.name]) {
      nameCount[recipe.name] = []
    }
    nameCount[recipe.name].push({
      ...recipe,
      hasImage: !!recipeImages[recipe.id]
    })
  })

  const duplicates = Object.entries(nameCount)
    .filter(([name, instances]) => instances.length > 1)
    .map(([name, instances]) => ({ name, instances }))

  console.log(`Total recipes: ${recipes.length}`)
  console.log(`Duplicate names: ${duplicates.length}`)
  console.log(`Duplicates to remove: ${duplicates.reduce((sum, d) => sum + d.instances.length - 1, 0)}`)
  console.log('')

  let totalDeleted = 0
  const batchSize = 10

  for (let i = 0; i < duplicates.length; i++) {
    const dup = duplicates[i]

    // Sort: prioritize recipes WITH images, then oldest
    dup.instances.sort((a, b) => {
      if (a.hasImage && !b.hasImage) return -1
      if (!a.hasImage && b.hasImage) return 1
      return new Date(a.created_at) - new Date(b.created_at)
    })

    const keepId = dup.instances[0].id
    const deleteIds = dup.instances.slice(1).map(i => i.id)

    console.log(`📝 ${dup.name} (keeping ${dup.instances[0].hasImage ? 'with image' : 'oldest'}, deleting ${deleteIds.length})`)

    // Delete in batches
    for (let j = 0; j < deleteIds.length; j += batchSize) {
      const batch = deleteIds.slice(j, j + batchSize)

      const { error } = await supabase
        .from('recipes')
        .delete()
        .in('id', batch)

      if (error) {
        console.error(`  ❌ Error deleting batch:`, error.message)
      } else {
        totalDeleted += batch.length
      }
    }

    // Progress update every 10 recipes
    if ((i + 1) % 10 === 0) {
      console.log(`  Progress: ${i + 1}/${duplicates.length} (${Math.round((i + 1) / duplicates.length * 100)}%)`)
    }
  }

  console.log(`\n✅ Removed ${totalDeleted} duplicate recipes`)
  console.log(`📊 Remaining recipes: ${recipes.length - totalDeleted}`)
}

removeDuplicatesSmart().catch(console.error)
