import { NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

export async function GET() {
  const baseUrl = getBaseUrl()

  return NextResponse.json({
    baseUrl,
    env: {
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
      VERCEL_URL: process.env.VERCEL_URL || null,
      NODE_ENV: process.env.NODE_ENV
    },
    isValid: baseUrl && baseUrl.startsWith('http')
  })
}
