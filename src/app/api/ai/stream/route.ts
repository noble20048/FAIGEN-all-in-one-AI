import { NextRequest } from 'next/server'
import { getGeminiProvider } from '@/lib/ai/providers/gemini/client'

export async function POST(request: NextRequest) {
  try {
    const { messages, provider, model } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 })
    }

    if (provider !== 'gemini') {
      return new Response('Only Gemini supported', { status: 400 })
    }

    const aiProvider = getGeminiProvider(model as any)
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of aiProvider.streamChat(messages)) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    return new Response('AI streaming failed', { status: 500 })
  }
}