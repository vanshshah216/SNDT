'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { LogOut, BookOpen, Calendar, Settings } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push('/auth/login')
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-muted py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back!</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Academic Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-secondary" size={24} />
                </div>
                <h2 className="text-xl font-bold text-primary">Your Academics</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Program</p>
                  <p className="font-semibold text-foreground">Bachelor of Science</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold text-foreground">Third Year</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                  <p className="font-semibold text-foreground">3.8/4.0</p>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition">
                  View Transcript
                </button>
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Calendar className="text-secondary" size={24} />
                </div>
                <h2 className="text-xl font-bold text-primary">Next Classes</h2>
              </div>
              <div className="space-y-3">
                {[
                  { subject: 'Advanced Physics', time: 'Today, 2:00 PM', room: 'Lab A' },
                  { subject: 'Organic Chemistry', time: 'Tomorrow, 10:00 AM', room: 'Room 201' },
                  { subject: 'Mathematics', time: 'Friday, 3:00 PM', room: 'Hall 5' }
                ].map((cls, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg">
                    <p className="font-semibold text-sm text-foreground">{cls.subject}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cls.time}</p>
                    <p className="text-xs text-muted-foreground">{cls.room}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4">Quick Access</h2>
              <div className="space-y-2">
                {[
                  { label: 'View Syllabus', href: '/syllabus' },
                  { label: 'Digital Library', href: '/library' },
                  { label: 'Research Portal', href: '/research' },
                  { label: 'Events Calendar', href: '/events' }
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="block p-3 bg-muted hover:bg-secondary/20 rounded-lg text-primary font-medium transition text-sm"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Recent Assignments</h2>
            <div className="space-y-4">
              {[
                { title: 'Physics Lab Report', dueDate: 'March 20', status: 'pending' },
                { title: 'Chemistry Presentation', dueDate: 'March 25', status: 'pending' },
                { title: 'Math Problem Set', dueDate: 'March 18', status: 'submitted' }
              ].map((assignment, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    assignment.status === 'submitted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4">My Downloads</h2>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Recent course materials and lecture notes</p>
                <button className="mt-4 w-full px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition">
                  Access Downloads
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4">Support & Counseling</h2>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Get academic or personal counseling support</p>
                <button className="mt-4 w-full px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition">
                  Schedule Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-primary text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-white/80">
          <p>&copy; 2026 SNDT Women's University. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
