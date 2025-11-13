const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkPhaseStatus() {
  const { data, error } = await supabase
    .from('meal_plan_jobs')
    .select('*')
    .eq('id', '401ecaac-a016-4df5-8b16-4ca4d3ae6ac6')
    .single()

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('\n=== MULTI-PHASE STATUS ===')
  console.log('📍 Phase:', `${data.current_phase}/${data.total_phases}`)
  console.log('📋 Status:', data.status)
  console.log('📝 Progress:', data.phase_progress)
  console.log('🍽️  Generated recipes:', data.generated_recipes?.length || 0)
  console.log('⏱️  Created:', data.created_at)
  console.log('🚀 Processing started:', data.processing_started_at || 'Not yet')
  console.log('✅ Completed:', data.completed_at || 'Not yet')
  console.log('📄 PDF:', data.pdf_url ? '✓ Generated' : '✗ Not yet')
  console.log('❌ Error:', data.error_message || 'None')

  if (data.generated_recipes && data.generated_recipes.length > 0) {
    console.log('\n📊 Recipe breakdown:')
    const mealTypes = {}
    data.generated_recipes.forEach(r => {
      mealTypes[r.meal_type] = (mealTypes[r.meal_type] || 0) + 1
    })
    Object.entries(mealTypes).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`)
    })
  }
}

checkPhaseStatus().catch(console.error)
