// Cleanup incomplete recipes (those without ingredients/instructions)
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function cleanupIncompleteRecipes() {
  console.log('🧹 Cleaning up incomplete recipes...\n')

  try {
    // Get all recipes
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('id, name, created_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    console.log(`Found ${recipes.length} total recipes\n`)

    let incompleteRecipes = []
    let completeRecipes = []

    // Check each recipe for ingredients and instructions
    for (const recipe of recipes) {
      // Check for ingredients
      const { count: ingredientCount } = await supabase
        .from('recipe_ingredients')
        .select('*', { count: 'exact', head: true })
        .eq('recipe_id', recipe.id)

      // Check for instructions
      const { count: instructionCount } = await supabase
        .from('recipe_instructions')
        .select('*', { count: 'exact', head: true })
        .eq('recipe_id', recipe.id)

      if (ingredientCount === 0 && instructionCount === 0) {
        incompleteRecipes.push(recipe)
        console.log(`❌ Incomplete: ${recipe.name}`)
        console.log(`   (No ingredients or instructions)`)
      } else {
        completeRecipes.push(recipe)
        console.log(`✅ Complete: ${recipe.name}`)
        console.log(`   (${ingredientCount} ingredients, ${instructionCount} instructions)`)
      }
    }

    console.log('\n' + '='.repeat(50))
    console.log(`\n📊 Summary:`)
    console.log(`  - Complete recipes: ${completeRecipes.length}`)
    console.log(`  - Incomplete recipes: ${incompleteRecipes.length}`)

    if (incompleteRecipes.length > 0) {
      console.log('\n⚠️  The following recipes will be deleted:')
      incompleteRecipes.forEach(r => {
        console.log(`  - ${r.name}`)
      })

      // Ask for confirmation
      console.log('\n🤔 Do you want to delete these incomplete recipes?')
      console.log('   Press Ctrl+C to cancel, or wait 5 seconds to proceed...\n')

      // Wait 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000))

      console.log('🗑️  Deleting incomplete recipes...')

      // Delete incomplete recipes
      for (const recipe of incompleteRecipes) {
        const { error: deleteError } = await supabase
          .from('recipes')
          .delete()
          .eq('id', recipe.id)

        if (deleteError) {
          console.log(`❌ Failed to delete ${recipe.name}: ${deleteError.message}`)
        } else {
          console.log(`✅ Deleted: ${recipe.name}`)
        }
      }

      console.log('\n✨ Cleanup complete!')
      console.log(`   Deleted ${incompleteRecipes.length} incomplete recipes`)
      console.log(`   Kept ${completeRecipes.length} complete recipes`)
    } else {
      console.log('\n✨ No incomplete recipes found! Your database is clean.')
    }

    // Final count
    const { count: finalCount } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })

    console.log(`\n📊 Final recipe count: ${finalCount}`)

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }
}

// Run cleanup
console.log('🚀 Recipe Cleanup Tool\n')
console.log('This will remove recipes that have no ingredients or instructions.\n')

cleanupIncompleteRecipes()