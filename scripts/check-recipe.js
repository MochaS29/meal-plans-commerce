const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function check() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data } = await supabase
    .from('meal_plan_jobs')
    .select('generated_recipes')
    .eq('id', '401ecaac-a016-4df5-8b16-4ca4d3ae6ac6')
    .single()

  console.log('\nFirst recipe structure:')
  console.log(JSON.stringify(data.generated_recipes[0], null, 2))

  console.log('\n\nRecipe properties:')
  console.log('Keys:', Object.keys(data.generated_recipes[0]))
  console.log('Has meal_type?', 'meal_type' in data.generated_recipes[0])
  console.log('Has mealType?', 'mealType' in data.generated_recipes[0])
}

check().catch(console.error)
