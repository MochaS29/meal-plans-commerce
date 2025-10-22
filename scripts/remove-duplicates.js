#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function removeDuplicates() {
  console.log('🔍 Finding duplicate recipes...\n')

  // Get all recipes
  const { data: recipes } = await supabase
    .from('recipes')
    .select('id, name, created_at')
    .order('name')

  const nameCount = {}
  const duplicates = []

  recipes.forEach(recipe => {
    if (!nameCount[recipe.name]) {
      nameCount[recipe.name] = []
    }
    nameCount[recipe.name].push(recipe)
  })

  Object.entries(nameCount).forEach(([name, instances]) => {
    if (instances.length > 1) {
      duplicates.push({ name, count: instances.length, instances })
    }
  })

  console.log(`Total recipes: ${recipes.length}`)
  console.log(`Duplicate recipe names: ${duplicates.length}`)
  console.log(`Duplicates to remove: ${duplicates.reduce((sum, d) => sum + d.count - 1, 0)}`)
  console.log('')

  let totalDeleted = 0

  for (const dup of duplicates) {
    // Sort by created_at to keep the oldest
    dup.instances.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

    const keepId = dup.instances[0].id
    const deleteIds = dup.instances.slice(1).map(i => i.id)

    console.log(`📝 ${dup.name} (keeping oldest, deleting ${deleteIds.length})`)

    // Delete duplicates
    for (const deleteId of deleteIds) {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', deleteId)

      if (error) {
        console.error(`  ❌ Error deleting ${deleteId}:`, error.message)
      } else {
        totalDeleted++
      }
    }
  }

  console.log(`\n✅ Removed ${totalDeleted} duplicate recipes`)
  console.log(`📊 Remaining recipes: ${recipes.length - totalDeleted}`)
}

removeDuplicates().catch(console.error)
