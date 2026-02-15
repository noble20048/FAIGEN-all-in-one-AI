import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AIProvider, ChatMessage, ChatResponse, StreamOptions } from '../../types/llm.types'

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
const gemini = new GoogleGenerativeAI(API_KEY)

export const GEMINI_MODELS = {
  'gemini-1.5-pro': {
    name: 'gemini-2.5-pro-preview-tts',
    maxTokens: 2097152,
    costPer1KTokens: 0.00025,
  },
  'gemini-1.5-flash': {
    name: 'gemini-flash-latest',
    maxTokens: 1048576,
    costPer1KTokens: 0.000125,
  },
} as const

export type GeminiModelName = keyof typeof GEMINI_MODELS

export class GeminiProvider implements AIProvider {
  private model: string

  constructor(modelName: GeminiModelName = 'gemini-1.5-pro') {
    this.model = GEMINI_MODELS[modelName].name
  }

  private formatMessages(messages: ChatMessage[]) {
    return messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : msg.role,
      parts: [{ text: msg.content }],
    }))
  }

  async chat(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<ChatResponse> {
    try {
      const model = gemini.getGenerativeModel({ model: this.model })
      const chat = model.startChat({
        history: this.formatMessages(messages.slice(0, -1)),
        generationConfig: {
          temperature: options?.temperature ?? 0.7,
          maxOutputTokens: options?.maxTokens ?? 2048,
        },
      })

      const lastMessage = messages[messages.length - 1]
      const result = await chat.sendMessage(lastMessage.content)
      const response = result.response

      return {
        content: response.text(),
        usage: {
          promptTokens: result.response.usageMetadata?.promptTokenCount || 0,
          completionTokens: result.response.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: result.response.usageMetadata?.totalTokenCount || 0,
        },
        model: this.model,
        finishReason: 'stop',
      }
    } catch (error) {
      throw new Error(`Gemini API Error: ${error instanceof Error ? error.message : 'Unknown'}`)
    }
  }

  async *streamChat(messages: ChatMessage[], options?: StreamOptions): AsyncGenerator<string, void, unknown> {
    try {
      const model = gemini.getGenerativeModel({ model: this.model })
      const chat = model.startChat({
        history: this.formatMessages(messages.slice(0, -1)),
        generationConfig: {
          temperature: options?.temperature ?? 0.7,
          maxOutputTokens: options?.maxTokens ?? 2048,
        },
      })

      const lastMessage = messages[messages.length - 1]
      const result = await chat.sendMessageStream(lastMessage.content)

      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (options?.onChunk) options.onChunk(text)
        yield text
      }

      if (options?.onComplete) {
        const finalResponse = await result.response
        options.onComplete({
          totalTokens: finalResponse.usageMetadata?.totalTokenCount || 0,
          finishReason: 'stop',
        })
      }
    } catch (error) {
      if (options?.onError) options.onError(error as Error)
      throw error
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const model = gemini.getGenerativeModel({ model: 'embedding-001' })
    const result = await model.embedContent(text)
    return result.embedding.values
  }

  async countTokens(text: string): Promise<number> {
    try {
      const model = gemini.getGenerativeModel({ model: this.model })
      const result = await model.countTokens(text)
      return result.totalTokens
    } catch {
      return Math.ceil(text.length / 4)
    }
  }
}

export function getGeminiProvider(model?: GeminiModelName): GeminiProvider {
  return new GeminiProvider(model)
}