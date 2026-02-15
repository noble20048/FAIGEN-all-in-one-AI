export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface ChatResponse {
  content: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  model: string
  finishReason: 'stop' | 'length' | 'content_filter'
}

export interface StreamOptions {
  temperature?: number
  maxTokens?: number
  onChunk?: (chunk: string) => void
  onComplete?: (data: { totalTokens: number; finishReason: string }) => void
  onError?: (error: Error) => void
}

export interface AIProvider {
  chat(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<ChatResponse>
  streamChat(messages: ChatMessage[], options?: StreamOptions): AsyncGenerator<string, void, unknown>
  generateEmbedding(text: string): Promise<number[]>
  countTokens(text: string): Promise<number>
}