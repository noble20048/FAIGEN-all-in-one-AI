'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type AIProviderType = 'gemini' | 'openai' | 'anthropic'

interface AIContextType {
  provider: AIProviderType
  setProvider: (provider: AIProviderType) => void
  model: string
  setModel: (model: string) => void
  tokenUsage: number
  addTokenUsage: (tokens: number) => void
  resetUsage: () => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

const MODEL_CONFIGS = {
  gemini: ['gemini-1.5-flash', 'gemini-1.5-pro'],
  openai: ['gpt-4', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-5-sonnet', 'claude-3-haiku'],
}

export function AIProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<AIProviderType>('gemini')
  const [model, setModel] = useState('gemini-1.5-flash')
  const [tokenUsage, setTokenUsage] = useState(0)

  const handleProviderChange = (newProvider: AIProviderType) => {
    setProvider(newProvider)
    setModel(MODEL_CONFIGS[newProvider][0])
  }

  return (
    <AIContext.Provider
      value={{
        provider,
        setProvider: handleProviderChange,
        model,
        setModel,
        tokenUsage,
        addTokenUsage: (tokens) => setTokenUsage((prev) => prev + tokens),
        resetUsage: () => setTokenUsage(0),
      }}
    >
      {children}
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = useContext(AIContext)
  if (!context) throw new Error('useAI must be used within AIProvider')
  return context
}