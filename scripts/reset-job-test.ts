import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function resetJob() {
  const { data } = await supabase
    .from('meal_plan_jobs')
    .update({
      status: 'pending',
      error_message: null,
      processing_started_at: null,
      completed_at: null
    })
    .eq('id', 'b19dfd66-2ef5-4c2c-89a3-cd4028700aac')
    .select();

  console.log('✅ Job reset to pending');
}

resetJob();
