import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkMealTypes() {
  const { data, error } = await supabase
    .from('recipes')
    .select('meal_type, name')
    .not('meal_type', 'is', null);
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  const types = [...new Set(data.map(r => r.meal_type))].sort();
  console.log('Meal types in database:', types);
  
  // Count by type
  const counts: Record<string, number> = {};
  data.forEach(r => {
    counts[r.meal_type] = (counts[r.meal_type] || 0) + 1;
  });
  
  console.log('\nCounts by meal type:');
  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  
  // Show some snack examples
  console.log('\nExample snack recipes:');
  data.filter(r => r.meal_type === 'snack').slice(0, 5).forEach(r => {
    console.log(`  - ${r.name}`);
  });
}

checkMealTypes();
