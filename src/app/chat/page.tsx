'use client'

import { useAIChat } from '@/hooks/ai/useAiChat'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Send, User, Bot, Sparkles, Trash2 } from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'

export default function ChatPage() {
  const { messages, sendMessage, isLoading, clearMessages } = useAIChat()
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input)
      setInput('')
    }
  }

  const suggestedPrompts = [
    "Explain quantum computing in simple terms",
    "Write a Python function to sort a list",
    "Help me plan a 5-day trip to Tokyo",
    "What are React Server Components?"
  ]

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
        <div className="max-w-4xl mx-auto w-full h-full flex flex-col p-4">
          
          {/* Messages Area */}
          <ScrollArea className="flex-1 pr-4 mb-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-2xl">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Start a Conversation</h2>
                  <p className="text-gray-600 mb-8">
                    Ask me anything - I'm here to help with coding, writing, research, and more!
                  </p>
                  
                  {/* Suggested Prompts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {suggestedPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(prompt)
                          sendMessage(prompt)
                        }}
                        className="p-4 text-left border-2 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white shadow-sm"
                      >
                        <p className="text-sm font-medium">{prompt}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-4">
                {/* Clear button when messages exist */}
                {messages.length > 0 && (
                  <div className="flex justify-end mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearMessages}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Chat
                    </Button>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <Avatar className="w-10 h-10 shrink-0 shadow-md">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <Bot className="w-5 h-5 text-white" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`px-4 py-3 rounded-2xl max-w-[85%] shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </p>
                    </div>

                    {msg.role === 'user' && (
                      <Avatar className="w-10 h-10 shrink-0 shadow-md">
                        <AvatarFallback className="bg-gray-200">
                          <User className="w-5 h-5 text-gray-700" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-10 h-10 shadow-md">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Bot className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="px-4 py-3 rounded-2xl bg-white border shadow-sm">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <p className="text-sm">AI is thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-4 border">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 border-0 focus-visible:ring-0 text-base"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="rounded-lg px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}