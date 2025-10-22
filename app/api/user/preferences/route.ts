import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export interface UserPreferences {
  id?: string
  user_id: string

  // Family & Serving Info
  family_size: number
  servings_preference: number

  // Dietary Restrictions & Allergies
  dietary_restrictions: string[]
  allergies: string[]
  dislikes: string[]

  // Cuisine & Cooking Preferences
  preferred_cuisines: string[]
  cooking_skill_level: 'beginner' | 'intermediate' | 'advanced'
  max_prep_time: number

  // Budget & Shopping
  budget_level: 'budget' | 'moderate' | 'premium'
  preferred_stores: string[]

  // Meal Planning Preferences
  meal_prep_day: string
  snacks_included: boolean
  breakfast_importance: 'minimal' | 'moderate' | 'substantial'

  // Kids & Family
  has_kids: boolean
  kid_ages: number[]
  kid_friendly_required: boolean

  // Nutrition Goals
  nutrition_goals: string[]
  calorie_target?: number
  protein_priority: boolean

  // Special Requirements
  batch_cooking_preference: boolean
  leftover_tolerance: 'minimal' | 'moderate' | 'high'
  variety_importance: 'low' | 'moderate' | 'high'

  // Timestamps
  created_at?: string
  updated_at?: string
}

// GET - Retrieve user preferences
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
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', session.id)
      .single()

    if (error) {
      // If no preferences found, return defaults
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          preferences: null,
          hasPreferences: false
        })
      }
      throw error
    }

    return NextResponse.json({
      preferences: data,
      hasPreferences: true
    })
  } catch (error) {
    console.error('Error fetching preferences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    )
  }
}

// PUT - Update or create user preferences
export async function PUT(request: NextRequest) {
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
    const body = await request.json()

    // Validate required fields
    if (typeof body.family_size !== 'number' || body.family_size < 1 || body.family_size > 12) {
      return NextResponse.json(
        { error: 'family_size must be between 1 and 12' },
        { status: 400 }
      )
    }

    // Check if preferences exist
    const { data: existing } = await supabase
      .from('user_preferences')
      .select('id')
      .eq('user_id', session.id)
      .single()

    const preferencesData = {
      user_id: session.id,
      family_size: body.family_size || 2,
      servings_preference: body.servings_preference || 4,
      dietary_restrictions: body.dietary_restrictions || [],
      allergies: body.allergies || [],
      dislikes: body.dislikes || [],
      preferred_cuisines: body.preferred_cuisines || [],
      cooking_skill_level: body.cooking_skill_level || 'intermediate',
      max_prep_time: body.max_prep_time || 45,
      budget_level: body.budget_level || 'moderate',
      preferred_stores: body.preferred_stores || [],
      meal_prep_day: body.meal_prep_day || 'sunday',
      snacks_included: body.snacks_included !== undefined ? body.snacks_included : true,
      breakfast_importance: body.breakfast_importance || 'moderate',
      has_kids: body.has_kids || false,
      kid_ages: body.kid_ages || [],
      kid_friendly_required: body.kid_friendly_required || false,
      nutrition_goals: body.nutrition_goals || [],
      calorie_target: body.calorie_target || null,
      protein_priority: body.protein_priority || false,
      batch_cooking_preference: body.batch_cooking_preference || false,
      leftover_tolerance: body.leftover_tolerance || 'moderate',
      variety_importance: body.variety_importance || 'high'
    }

    if (existing) {
      // Update existing preferences
      const { data, error } = await supabase
        .from('user_preferences')
        .update(preferencesData)
        .eq('user_id', session.id)
        .select()
        .single()

      if (error) throw error

      return NextResponse.json({
        success: true,
        preferences: data,
        message: 'Preferences updated successfully'
      })
    } else {
      // Create new preferences
      const { data, error } = await supabase
        .from('user_preferences')
        .insert(preferencesData)
        .select()
        .single()

      if (error) throw error

      return NextResponse.json({
        success: true,
        preferences: data,
        message: 'Preferences created successfully'
      }, { status: 201 })
    }
  } catch (error) {
    console.error('Error saving preferences:', error)
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    )
  }
}
