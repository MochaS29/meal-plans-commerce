#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Calculate similarity between two strings (0-1, where 1 is identical)
function similarity(s1, s2) {
  // Normalize strings
  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
  const n1 = normalize(s1)
  const n2 = normalize(s2)

  if (n1 === n2) return 1.0

  // Calculate Jaccard similarity (word overlap)
  const words1 = new Set(n1.split(/\s+/))
  const words2 = new Set(n2.split(/\s+/))

  const intersection = new Set([...words1].filter(x => words2.has(x)))
  const union = new Set([...words1, ...words2])

  return intersection.size / union.size
}

async function removeSimilarRecipes() {
  console.log('🔍 Finding similar recipe names...\\n')

  // Get all recipes
  const { data: recipes } = await supabase
    .from('recipes')
    .select('id, name, created_at')
    .order('created_at')

  console.log(`Total recipes: ${recipes.length}`)

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

  // Find similar recipes (threshold 0.75 = 75% similar)
  const SIMILARITY_THRESHOLD = 0.75
  const toDelete = new Set()
  const groups = []

  for (let i = 0; i < recipes.length; i++) {
    if (toDelete.has(recipes[i].id)) continue

    const similarRecipes = [recipes[i]]

    for (let j = i + 1; j < recipes.length; j++) {
      if (toDelete.has(recipes[j].id)) continue

      const sim = similarity(recipes[i].name, recipes[j].name)
      if (sim >= SIMILARITY_THRESHOLD) {
        similarRecipes.push(recipes[j])
      }
    }

    if (similarRecipes.length > 1) {
      // Sort: prioritize recipes WITH images, then oldest
      similarRecipes.sort((a, b) => {
        const aHasImage = !!recipeImages[a.id]
        const bHasImage = !!recipeImages[b.id]
        if (aHasImage && !bHasImage) return -1
        if (!aHasImage && bHasImage) return 1
        return new Date(a.created_at) - new Date(b.created_at)
      })

      const keep = similarRecipes[0]
      const deleteList = similarRecipes.slice(1)

      groups.push({
        keep: keep.name,
        keepId: keep.id,
        hasImage: !!recipeImages[keep.id],
        deleteCount: deleteList.length,
        deleteNames: deleteList.map(r => r.name)
      })

      deleteList.forEach(r => toDelete.add(r.id))
    }
  }

  console.log(`\\nFound ${groups.length} groups of similar recipes`)
  console.log(`Total recipes to remove: ${toDelete.size}\\n`)

  if (toDelete.size === 0) {
    console.log('✅ No similar recipes found!')
    return
  }

  // Show first 20 groups
  console.log('Sample groups (first 20):\\n')
  groups.slice(0, 20).forEach((group, i) => {
    console.log(`${i + 1}. Keeping: "${group.keep}" ${group.hasImage ? '(with image)' : '(no image)'}`)
    console.log(`   Deleting ${group.deleteCount} similar:`)
    group.deleteNames.slice(0, 3).forEach(name => {
      console.log(`     - "${name}"`)
    })
    if (group.deleteNames.length > 3) {
      console.log(`     ... and ${group.deleteNames.length - 3} more`)
    }
    console.log('')
  })

  // Delete in batches
  const deleteIds = Array.from(toDelete)
  const batchSize = 50
  let totalDeleted = 0

  console.log(`\\n🗑️  Deleting ${deleteIds.length} recipes in batches of ${batchSize}...\\n`)

  for (let i = 0; i < deleteIds.length; i += batchSize) {
    const batch = deleteIds.slice(i, i + batchSize)

    const { error } = await supabase
      .from('recipes')
      .delete()
      .in('id', batch)

    if (error) {
      console.error(`  ❌ Error deleting batch:`, error.message)
    } else {
      totalDeleted += batch.length
    }

    // Progress update
    if ((i + batchSize) % 200 === 0 || i + batchSize >= deleteIds.length) {
      console.log(`  Progress: ${Math.min(i + batchSize, deleteIds.length)}/${deleteIds.length}`)
    }
  }

  console.log(`\\n✅ Removed ${totalDeleted} similar recipes`)
  console.log(`📊 Remaining recipes: ${recipes.length - totalDeleted}`)
}

removeSimilarRecipes().catch(console.error)
