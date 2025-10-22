import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import Anthropic from '@anthropic-ai/sdk'

// TODO: USER INPUT NEEDED
// Add this to your .env.local file:
// ANTHROPIC_API_KEY=sk-ant-...
// Get your API key from: https://console.anthropic.com/settings/keys

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
})

export async function POST(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }

  // TODO: USER INPUT NEEDED (OPTIONAL)
  // Add subscription check if you want to restrict this to monthly subscribers only
  // const hasMonthlySubscription = session.purchases.some(p =>
  //   p.productId === 'monthly-calendar' && p.status === 'active'
  // )
  // if (!hasMonthlySubscription) {
  //   return NextResponse.json(
  //     { error: 'This feature is only available for monthly subscribers' },
  //     { status: 403 }
  //   )
  // }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY not configured')
    return NextResponse.json(
      { error: 'AI service not configured. Please contact support.' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { question, conversationHistory } = body

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    // Build conversation context from history
    const messages: Anthropic.MessageParam[] = []

    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.slice(-5).forEach((msg: any) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role,
            content: msg.content
          })
        }
      })
    }

    // Add current question
    messages.push({
      role: 'user',
      content: question
    })

    // TODO: USER INPUT NEEDED
    // Customize the system prompt based on your brand voice and expertise
    const systemPrompt = `You are an AI wellness chef assistant for Mocha's MindLab meal planning service.

Your expertise includes:
- Recipe suggestions and modifications
- Meal planning and prep strategies
- Nutritional guidance and healthy eating
- Cooking techniques and tips
- Dietary accommodations (vegetarian, vegan, gluten-free, keto, etc.)
- Ingredient substitutions
- Kitchen equipment recommendations
- Food storage and safety

Guidelines:
- Be warm, encouraging, and supportive
- Provide practical, actionable advice
- Consider health, taste, and convenience
- Suggest recipes that align with our Mediterranean, Keto, Plant-Based, Global, Intermittent Fasting, and Family-Focused meal plans
- Keep responses concise but thorough (2-4 paragraphs)
- If asked about specific recipes in our database, acknowledge you can help with general recipe guidance
- Encourage users to check their personalized meal plans for tailored recommendations

Do NOT:
- Provide medical advice or diagnose conditions
- Recommend specific medications or supplements
- Claim to be a licensed nutritionist or dietitian
- Make absolute health claims`

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // TODO: USER INPUT NEEDED - Can upgrade to newer models as they release
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages
    })

    // Extract answer from response
    const answer = response.content
      .filter(block => block.type === 'text')
      .map(block => (block as Anthropic.TextBlock).text)
      .join('\n')

    return NextResponse.json({
      answer,
      conversationId: response.id
    })

  } catch (error: any) {
    console.error('Recipe Q&A error:', error)

    // Handle specific Anthropic errors
    if (error.status === 401) {
      return NextResponse.json(
        { error: 'AI service authentication failed. Please contact support.' },
        { status: 500 }
      )
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process your question. Please try again.' },
      { status: 500 }
    )
  }
}
