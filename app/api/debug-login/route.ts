import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    const debug = {
      step: '',
      success: false,
      error: null as any,
      data: null as any
    }

    // Step 1: Check environment
    debug.step = 'Environment Check'
    debug.data = {
      hasSupabase: !!supabase,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV
    }
    
    if (!supabase) {
      debug.error = 'Supabase client not initialized'
      return NextResponse.json(debug)
    }

    // Step 2: Database connection test
    debug.step = 'Database Connection'
    try {
      const { data: testData, error: testError } = await supabase
        .from('users')
        .select('count')
        .limit(1)
      
      if (testError) {
        debug.error = testError
        return NextResponse.json(debug)
      }
      debug.data = { ...debug.data, dbConnection: 'success' }
    } catch (err) {
      debug.error = err
      return NextResponse.json(debug)
    }

    // Step 3: User lookup
    debug.step = 'User Lookup'
    try {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()

      if (userError) {
        debug.error = userError
        return NextResponse.json(debug)
      }

      if (!user) {
        debug.error = 'User not found'
        return NextResponse.json(debug)
      }

      debug.data = { ...debug.data, userFound: true, userId: user.id }
    } catch (err) {
      debug.error = err
      return NextResponse.json(debug)
    }

    // Step 4: Password verification
    debug.step = 'Password Verification'
    try {
      const { data: user } = await supabase
        .from('users')
        .select('password_hash')
        .eq('email', email.toLowerCase())
        .single()

      const isValid = await bcrypt.compare(password, user.password_hash)
      debug.data = { ...debug.data, passwordValid: isValid }
      
      if (!isValid) {
        debug.error = 'Invalid password'
        return NextResponse.json(debug)
      }
    } catch (err) {
      debug.error = err
      return NextResponse.json(debug)
    }

    // Step 5: Get purchases
    debug.step = 'Get Purchases'
    try {
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase())
        .single()

      const { data: purchases, error: purchaseError } = await supabase
        .from('user_purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'completed')

      if (purchaseError) {
        debug.error = purchaseError
        return NextResponse.json(debug)
      }

      debug.data = { ...debug.data, purchaseCount: purchases?.length || 0 }
    } catch (err) {
      debug.error = err
      return NextResponse.json(debug)
    }

    // Step 6: JWT Creation
    debug.step = 'JWT Creation'
    try {
      const { SignJWT } = await import('jose')
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'your-secret-key-change-in-production'
      )

      const token = await new SignJWT({ userId: 'test', email: 'test' })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('30d')
        .sign(secret)

      debug.data = { ...debug.data, jwtCreated: true }
    } catch (err) {
      debug.error = err
      return NextResponse.json(debug)
    }

    // Step 7: Session table check
    debug.step = 'Session Table Check'
    try {
      const { data: sessionData, error: sessionError } = await supabase
        .from('user_sessions')
        .select('id')
        .limit(1)

      if (sessionError) {
        debug.error = sessionError
        return NextResponse.json(debug)
      }

      debug.data = { ...debug.data, sessionTableExists: true }
    } catch (err) {
      debug.error = err
      return NextResponse.json(debug)
    }

    debug.step = 'All Steps Complete'
    debug.success = true
    
    return NextResponse.json(debug)

  } catch (error) {
    return NextResponse.json({
      step: 'Global Error',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
  }
}