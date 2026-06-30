'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simple admin credentials check
    const adminEmail = 'admin@sndt.edu'
    const adminPassword = 'admin123'

    if (email === adminEmail && password === adminPassword) {
      // Store admin session in localStorage
      localStorage.setItem('adminToken', 'authenticated')
      localStorage.setItem('adminEmail', email)
      router.push('/admin/dashboard')
    } else {
      setError('Invalid credentials. Please use admin email and password.')
    }
    setIsLoading(false)
  }

  return (
    <>
      <Navigation />
      <section className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-[hsl(45_85%_60%)]/30">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-gradient-to-br from-[hsl(45_85%_52%)] to-[hsl(45_85%_45%)] rounded-full shadow-lg">
              <LogIn className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-[hsl(45_85%_45%)] bg-clip-text text-transparent mb-2">Admin Login</h1>
          <p className="text-center text-muted-foreground mb-8">Access the SNDT admin portal</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sndt.edu"
                className="w-full px-4 py-2 border border-[hsl(45_85%_70%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(45_85%_52%)] bg-white/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-[hsl(45_85%_70%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(45_85%_52%)] bg-white/50"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-2 bg-gradient-to-r from-[hsl(45_85%_52%)] to-[hsl(45_85%_45%)] text-primary font-bold rounded-lg hover:from-[hsl(45_85%_48%)] hover:to-[hsl(45_85%_40%)] transition disabled:opacity-50 shadow-lg hover:shadow-xl border border-[hsl(45_85%_60%)]"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-br from-[hsl(45_85%_52%)]/10 to-primary/10 rounded-lg border border-[hsl(45_85%_70%)]/50">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Demo Credentials:</span><br />
              Email: admin@sndt.edu<br />
              Password: admin123
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
