import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

// GET /api/member-resources/[slug] - Get a specific resource
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
    const { slug } = params

    // Fetch resource
    const { data: resource, error } = await supabase
      .from('member_resources')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error || !resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    // Track view
    await supabase
      .from('member_resource_views')
      .upsert({
        resource_id: resource.id,
        user_id: session.id,
        viewed_at: new Date().toISOString()
      }, {
        onConflict: 'resource_id,user_id'
      })

    return NextResponse.json({ resource })
  } catch (error) {
    console.error('Error fetching resource:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resource' },
      { status: 500 }
    )
  }
}

// PUT /api/member-resources/[slug] - Mark resource as completed
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
    const { slug } = params
    const body = await request.json()
    const { completed } = body

    // Get resource ID
    const { data: resource } = await supabase
      .from('member_resources')
      .select('id')
      .eq('slug', slug)
      .single()

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    // Update completion status
    const { error } = await supabase
      .from('member_resource_views')
      .upsert({
        resource_id: resource.id,
        user_id: session.id,
        completed: completed || false
      }, {
        onConflict: 'resource_id,user_id'
      })

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Progress updated'
    })
  } catch (error) {
    console.error('Error updating resource progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
