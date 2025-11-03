import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test basic Supabase connection
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .limit(1)

    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase connection failed',
        error: error.message
      })
    }

    // Test environment variables
    const envCheck = {
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      jwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV
    }

    return NextResponse.json({
      status: 'success',
      message: 'Authentication system diagnostics',
      supabaseConnection: 'working',
      userCount: data?.length || 0,
      environment: envCheck
    })

  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error in auth test',
      error: error.message
    })
  }
}