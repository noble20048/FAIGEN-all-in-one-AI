import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles, Zap, Shield, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Logo */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">Powered by Gemini AI</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to FAIGEN
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Production-grade AI-Integrated Full-Stack Platform built with Next.js, TypeScript, and cutting-edge AI
        </p>
        
        <div className="flex gap-4 justify-center mb-16">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          
          <Link href="/chat">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Try Chat
            </Button>
          </Link>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Multi-Provider AI</h3>
            <p className="text-gray-600 text-sm">
              Switch between Gemini, OpenAI, and Claude seamlessly
            </p>
          </div>
          
          <div className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">High Performance</h3>
            <p className="text-gray-600 text-sm">
              Lighthouse score 96+ with optimized bundle size
            </p>
          </div>
          
          <div className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Type-Safe</h3>
            <p className="text-gray-600 text-sm">
              100% TypeScript coverage with end-to-end safety
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}