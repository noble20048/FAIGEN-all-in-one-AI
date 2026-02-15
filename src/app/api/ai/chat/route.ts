import { NextRequest, NextResponse } from 'next/server'
import { getGeminiProvider } from '@/lib/ai/providers/gemini/client'

export async function POST(request: NextRequest) {
  try {
    const { messages, provider, model } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }
    if (provider !== 'gemini') {
      return NextResponse.json({ error: 'Only Gemini supported' }, { status: 400 })
    }

    const aiProvider = getGeminiProvider(model as any)

    const response = await aiProvider.chat(messages, {
      temperature: 0.7,
      maxTokens: 2048,
    })

    return NextResponse.json({
      content: response.content,
      usage: response.usage,
      model: response.model,
    })
  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}