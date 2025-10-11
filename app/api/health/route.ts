import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'

export async function GET() {
  const startTime = Date.now()
  const checks = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    status: 'healthy',
    services: {
      database: { status: 'unknown', responseTime: 0 },
      stripe: { status: 'unknown', responseTime: 0 },
      email: { status: 'unknown', responseTime: 0 }
    },
    metrics: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      totalResponseTime: 0
    }
  }

  // Check Supabase Database
  try {
    const dbStart = Date.now()
    if (supabase) {
      const { data, error } = await supabase
        .from('users')
        .select('count(*)')
        .limit(1)

      checks.services.database = {
        status: error ? 'error' : 'healthy',
        responseTime: Date.now() - dbStart,
        error: error?.message
      }
    } else {
      checks.services.database = {
        status: 'error',
        responseTime: 0,
        error: 'Supabase not configured'
      }
    }
  } catch (error) {
    checks.services.database = {
      status: 'error',
      responseTime: Date.now() - Date.now(),
      error: error instanceof Error ? error.message : 'Unknown database error'
    }
  }

  // Check Stripe Connection
  try {
    const stripeStart = Date.now()
    if (stripe) {
      // Just check if we can access Stripe (without making charges)
      await stripe.products.list({ limit: 1 })
      checks.services.stripe = {
        status: 'healthy',
        responseTime: Date.now() - stripeStart
      }
    } else {
      checks.services.stripe = {
        status: 'error',
        responseTime: 0,
        error: 'Stripe not configured'
      }
    }
  } catch (error) {
    checks.services.stripe = {
      status: 'error',
      responseTime: Date.now() - Date.now(),
      error: error instanceof Error ? error.message : 'Unknown Stripe error'
    }
  }

  // Check Email Service (Resend)
  try {
    const emailStart = Date.now()
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      // Simple API key validation check
      const response = await fetch('https://api.resend.com/domains', {
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
        },
      })

      checks.services.email = {
        status: response.ok ? 'healthy' : 'error',
        responseTime: Date.now() - emailStart,
        error: response.ok ? undefined : `HTTP ${response.status}`
      }
    } else {
      checks.services.email = {
        status: 'error',
        responseTime: 0,
        error: 'Resend API key not configured'
      }
    }
  } catch (error) {
    checks.services.email = {
      status: 'error',
      responseTime: Date.now() - Date.now(),
      error: error instanceof Error ? error.message : 'Unknown email error'
    }
  }

  // Calculate overall status
  const hasErrors = Object.values(checks.services).some(service => service.status === 'error')
  checks.status = hasErrors ? 'degraded' : 'healthy'
  checks.metrics.totalResponseTime = Date.now() - startTime

  // Return appropriate HTTP status
  const httpStatus = checks.status === 'healthy' ? 200 : 503

  return NextResponse.json(checks, { status: httpStatus })
}