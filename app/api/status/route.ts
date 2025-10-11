import { NextResponse } from 'next/server'
import { monitoring } from '@/lib/monitoring'

export async function GET() {
  try {
    const systemStatus = monitoring.getSystemStatus()

    return NextResponse.json({
      ...systemStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}