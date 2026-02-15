'use client'

import { useState } from 'react'
import { useAI } from '@/context/AiContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { provider, model, addTokenUsage } = useAI()

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], provider, model }),
      })

      if (!response.ok) throw new Error('AI generation failed')

      const data = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
      
      if (data.usage?.totalTokens) {
        addTokenUsage(data.usage.totalTokens)
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
    setError(null)
  }

  return { messages, sendMessage, clearMessages, isLoading, error }
}