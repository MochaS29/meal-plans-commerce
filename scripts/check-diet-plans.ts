import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDietPlans() {
  console.log('🔍 Checking available diet plans...\n')

  try {
    const { data: plans, error } = await supabase
      .from('diet_plans')
      .select('*')
      .order('name')

    if (error) {
      console.error('❌ Error:', error.message)
      return
    }

    console.log(`📋 Available Diet Plans (${plans?.length || 0}):`)
    plans?.forEach(plan => {
      console.log(`  - ID: ${plan.id}`)
      console.log(`    Name: ${plan.name}`)
      console.log(`    Slug: ${plan.slug}`)
      console.log(`    Description: ${plan.description}`)
      console.log()
    })
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

checkDietPlans()
