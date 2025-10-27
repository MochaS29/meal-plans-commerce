import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

// GET /api/member-resources - List all published resources
export async function GET(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }

  if (!supabase) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 500 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = supabase
      .from('member_resources')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data: resources, error } = await query

    if (error) throw error

    // Get user's viewed resources
    const { data: viewedResources } = await supabase
      .from('member_resource_views')
      .select('resource_id, completed')
      .eq('user_id', session.id)

    const viewedMap = new Map(
      viewedResources?.map(v => [v.resource_id, v.completed]) || []
    )

    // Enrich resources with user progress
    const enrichedResources = resources?.map(resource => ({
      ...resource,
      viewed: viewedMap.has(resource.id),
      completed: viewedMap.get(resource.id) || false
    }))

    return NextResponse.json({
      resources: enrichedResources || [],
      totalCount: enrichedResources?.length || 0
    })
  } catch (error) {
    console.error('Error fetching member resources:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}
