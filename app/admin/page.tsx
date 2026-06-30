'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LogOut, Users, Calendar, Mail, BarChart3, FileText } from 'lucide-react'
import { BooksManagement } from '@/components/books-management'

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
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
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">SNDT Admin Panel</h1>
            <p className="text-gray-300 text-sm">Manage university operations</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100/20 text-red-200 font-semibold rounded-lg hover:bg-red-100/30 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'books', label: 'Books', icon: FileText },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'messages', label: 'Messages', icon: Mail },
            { id: 'content', label: 'Content', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-secondary text-primary'
                    : 'bg-white text-foreground hover:bg-muted'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'Total Students', value: '2,450', icon: Users, color: 'bg-blue-100' },
                { label: 'Active Events', value: '12', icon: Calendar, color: 'bg-green-100' },
                { label: 'Pending Messages', value: '24', icon: Mail, color: 'bg-yellow-100' },
                { label: 'Published Courses', value: '156', icon: FileText, color: 'bg-purple-100' }
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="text-gray-700" size={24} />
                    </div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  </div>
                )
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New student registration', time: '2 hours ago' },
                    { action: 'Event created - AI Workshop', time: '4 hours ago' },
                    { action: 'Contact form submission received', time: '6 hours ago' },
                    { action: 'Course syllabus updated', time: '1 day ago' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start pb-4 border-b border-border last:border-b-0">
                      <p className="text-foreground">{item.action}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Create New Event', action: 'createEvent' },
                    { label: 'Add New Program', action: 'addProgram' },
                    { label: 'Upload Syllabus', action: 'uploadSyllabus' },
                    { label: 'Send Announcement', action: 'sendAnnouncement' },
                    { label: 'View Analytics', action: 'analytics' },
                    { label: 'Manage Faculty', action: 'manageFaculty' }
                  ].map((action, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-4 py-2 bg-muted hover:bg-secondary/20 rounded-lg font-medium text-foreground transition"
                    >
                      {action.label} →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary">Manage Students</h3>
              <button className="px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition">
                Add Student
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Program</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Year</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Priya Sharma', email: 'priya@sndt.edu', program: 'B.Sc', year: '3', status: 'Active' },
                    { name: 'Anjali Patel', email: 'anjali@sndt.edu', program: 'B.A', year: '2', status: 'Active' },
                    { name: 'Neha Desai', email: 'neha@sndt.edu', program: 'M.Tech', year: '1', status: 'Inactive' },
                    { name: 'Sunita Verma', email: 'sunita@sndt.edu', program: 'MBA', year: '2', status: 'Active' }
                  ].map((student, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted transition">
                      <td className="px-4 py-3 font-medium text-foreground">{student.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{student.email}</td>
                      <td className="px-4 py-3 text-foreground">{student.program}</td>
                      <td className="px-4 py-3 text-foreground">{student.year}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-secondary font-medium hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Books Tab */}
        {activeTab === 'books' && (
          <BooksManagement />
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary">Manage Events</h3>
              <button className="px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition">
                Create Event
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'AI & Machine Learning Workshop', date: 'Mar 20, 2024', category: 'Workshop', status: 'Upcoming' },
                { title: 'Women in Leadership Summit', date: 'Apr 10, 2024', category: 'Conference', status: 'Upcoming' },
                { title: 'Annual Cultural Festival', date: 'Mar 15, 2024', category: 'Cultural', status: 'Upcoming' },
                { title: 'Career Fair 2024', date: 'May 5, 2024', category: 'Career', status: 'Draft' }
              ].map((event, idx) => (
                <div key={idx} className="p-4 border border-border rounded-lg hover:shadow-md transition flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.date} • {event.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      event.status === 'Upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {event.status}
                    </span>
                    <button className="text-secondary font-medium hover:underline">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-primary mb-6">Contact Form Messages</h3>
            <div className="space-y-4">
              {[
                { name: 'Sarah Khan', subject: 'Admission Inquiry - B.Tech', date: '2 hours ago', read: false },
                { name: 'Rajini Desai', subject: 'Research Collaboration Request', date: '5 hours ago', read: false },
                { name: 'Priya Sharma', subject: 'Feedback on Syllabus', date: '1 day ago', read: true },
                { name: 'Isha Patel', subject: 'Event Sponsorship Inquiry', date: '2 days ago', read: true }
              ].map((msg, idx) => (
                <div key={idx} className={`p-4 border rounded-lg hover:shadow-md transition cursor-pointer ${
                  msg.read ? 'bg-white border-border' : 'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-bold ${msg.read ? 'text-foreground' : 'text-primary font-bold'}`}>{msg.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{msg.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{msg.date}</p>
                      {!msg.read && <span className="inline-block mt-2 w-2 h-2 bg-secondary rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-primary mb-6">Manage Content</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Programs & Courses', count: '156', action: 'Manage' },
                { title: 'Syllabi Documents', count: '48', action: 'Upload' },
                { title: 'Faculty Directory', count: '139', action: 'Edit' },
                { title: 'Library Resources', count: '8,432', action: 'Browse' },
                { title: 'Research Papers', count: '353', action: 'Review' },
                { title: 'Student Stories', count: '24', action: 'Moderate' }
              ].map((item, idx) => (
                <div key={idx} className="p-6 border border-border rounded-lg hover:shadow-md transition">
                  <h4 className="font-bold text-lg text-primary mb-2">{item.title}</h4>
                  <p className="text-3xl font-bold text-secondary mb-4">{item.count}</p>
                  <button className="w-full px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition">
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
