#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function findDuplicates() {
  // Find duplicate recipe names
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

  console.log('Total recipes:', recipes.length)
  console.log('Duplicate recipe names found:', duplicates.length)
  console.log('')

  // Show first 30 duplicates
  duplicates.slice(0, 30).forEach(dup => {
    console.log(`📝 ${dup.name} (x${dup.count})`)
    dup.instances.forEach((inst, i) => {
      console.log(`   [${i+1}] ID: ${inst.id} | Created: ${inst.created_at}`)
    })
  })

  return duplicates
}

findDuplicates().catch(console.error)
