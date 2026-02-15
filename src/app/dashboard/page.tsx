'use client'

import { useAI } from '@/context/AiContext'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Settings, 
  Zap, 
  BarChart, 
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Navbar } from '@/components/navigation/Navbar'

export default function DashboardPage() {
  const { tokenUsage, provider, model } = useAI()

  const calculateCost = () => {
    const costPerToken = provider === 'gemini' ? 0.00000025 : 0.00003
    return (tokenUsage * costPerToken).toFixed(4)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
            <p className="text-gray-600">
              Here's what's happening with your AI assistant
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Tokens */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tokens
                </CardTitle>
                <Zap className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tokenUsage.toLocaleString()}</div>
                <p className="text-xs text-gray-600 mt-1">
                  This session
                </p>
              </CardContent>
            </Card>

            {/* Estimated Cost */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Estimated Cost
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${calculateCost()}</div>
                <p className="text-xs text-gray-600 mt-1">
                  60% cheaper than GPT-4
                </p>
              </CardContent>
            </Card>

            {/* Active Provider */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Provider
                </CardTitle>
                <Sparkles className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{provider}</div>
                <Badge variant="secondary" className="mt-2">
                  {model}
                </Badge>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg Response
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3s</div>
                <p className="text-xs text-gray-600 mt-1">
                  95% under 3 seconds
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Start Chat Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/chat">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Start New Chat</CardTitle>
                        <CardDescription>
                          Chat with {provider} AI
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Ask questions, get code help, brainstorm ideas, or just chat about anything
                  </p>
                </CardContent>
              </Link>
            </Card>

            {/* Settings Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <Link href="/settings">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Configure Settings</CardTitle>
                        <CardDescription>
                          Customize AI behavior
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Switch providers, adjust models, manage token usage and preferences
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Chat conversation', time: '2 minutes ago', tokens: 1234 },
                  { action: 'Changed provider to Gemini', time: '1 hour ago', tokens: 0 },
                  { action: 'Chat conversation', time: '3 hours ago', tokens: 892 },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                    {activity.tokens > 0 && (
                      <Badge variant="secondary">
                        {activity.tokens} tokens
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  )
}