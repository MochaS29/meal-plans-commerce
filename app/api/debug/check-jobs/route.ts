import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  // Check admin API key
  const authHeader = request.headers.get('authorization')
  const adminKey = process.env.ADMIN_API_KEY
  const providedKey = authHeader?.replace('Bearer ', '')

  if (!providedKey || providedKey !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    // Get recent jobs
    const { data: jobs, error: jobsError } = await supabase
      .from('meal_plan_jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (jobsError) throw jobsError

    // Get recent purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (purchasesError) throw purchasesError

    // Get recent users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (usersError) throw usersError

    return NextResponse.json({
      jobs: jobs || [],
      purchases: purchases || [],
      users: users || [],
      summary: {
        pending_jobs: jobs?.filter(j => j.status === 'pending').length || 0,
        processing_jobs: jobs?.filter(j => j.status === 'processing').length || 0,
        completed_jobs: jobs?.filter(j => j.status === 'completed').length || 0,
        failed_jobs: jobs?.filter(j => j.status === 'failed').length || 0,
      }
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
