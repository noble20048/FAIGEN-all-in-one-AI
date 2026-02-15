'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAI } from '@/context/AiContext'
import { Sparkles, MessageSquare, LayoutDashboard, Settings, LogOut } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const { tokenUsage } = useAI()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FAIGEN
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link href="/dashboard">
              <Button 
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>

            <Link href="/chat">
              <Button 
                variant={isActive('/chat') ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </Button>
            </Link>

            <Link href="/settings">
              <Button 
                variant={isActive('/settings') ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>

            {/* Token Counter */}
            <div className="ml-4 px-3 py-1 bg-gray-100 rounded-full text-sm">
              <span className="font-semibold">{tokenUsage.toLocaleString()}</span>
              <span className="text-gray-600 ml-1">tokens</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}