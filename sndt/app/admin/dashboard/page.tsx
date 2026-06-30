'use client'

import { useState, useEffect } from 'react'
import { LogOut, Plus, Trash2, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DataStore, BookType, EventType, AchievementType, FacultyType } from '@/lib/dataStore'
import { createClient } from '@/lib/supabase/client'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<'books' | 'events' | 'achievements' | 'faculty'>('books')
  const [books, setBooks] = useState<BookType[]>([])
  const [events, setEvents] = useState<EventType[]>([])
  const [achievements, setAchievements] = useState<AchievementType[]>([])
  const [faculty, setFaculty] = useState<FacultyType[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Technology',
    description: '',
    cover_image_url: '',
    publication_year: new Date().getFullYear(),
    edition: '1st',
    pages: 300,
    pdf_url: '',
    canDownload: true
  })

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    fullDescription: '',
    category: 'upcoming' as const,
    image: '',
    agenda: ''
  })

  const [newAchievement, setNewAchievement] = useState({
    name: '',
    role: '',
    achievement: '',
    description: '',
    skills: [] as string[],
    image: '',
    skillInput: ''
  })

  const [newFaculty, setNewFaculty] = useState({
    name: '',
    title: '',
    bio: '',
    image: '',
    email: '',
    department: '',
    expertise: [] as string[],
    expertiseInput: ''
  })

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
      try {
        localStorage.removeItem('library_books')
      } catch (e) {
        console.error('[v0] Error clearing localStorage:', e)
      }
      loadBooksFromSupabase()
      loadAchievementsFromSupabase()
      loadFacultyFromSupabase()
      setMounted(true)
    }
  }, [router])

  const loadBooksFromSupabase = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('books').select('*')
      if (error) {
        console.error('[v0] Error loading books from Supabase:', error)
        setBooks([])
      } else if (data) {
        setBooks(data as BookType[])
      }
    } catch (err) {
      console.error('[v0] Error loading books:', err)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const loadAchievementsFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('[v0] Error loading achievements:', error)
        setAchievements([])
      } else {
        setAchievements(data || [])
      }
    } catch (err) {
      console.error('[v0] Error loading achievements:', err)
      setAchievements([])
    }
  }

  const loadFacultyFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('created_at', { ascending: true })
      
      if (error) {
        console.error('[v0] Error loading faculty:', error)
        setFaculty([])
      } else {
        setFaculty(data || [])
      }
    } catch (err) {
      console.error('[v0] Error loading faculty:', err)
      setFaculty([])
    }
  }

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author) {
      alert('Please fill in all required fields')
      return
    }
    
    try {
      setLoading(true)
      const book = {
        title: newBook.title,
        author: newBook.author,
        isbn: newBook.isbn,
        category: newBook.category,
        description: newBook.description,
        cover_image_url: newBook.cover_image_url,
        publication_year: newBook.publication_year,
        edition: newBook.edition,
        pages: parseInt(newBook.pages.toString()),
        pdf_url: newBook.pdf_url,
        canDownload: newBook.canDownload
      }

      const { data, error } = await supabase
        .from('books')
        .insert([book])
        .select()
      
      if (error) {
        console.error('[v0] Error adding book to Supabase:', error)
        alert('Error adding book. Please try again.')
        return
      }

      if (data) {
        await loadBooksFromSupabase()
      }

      setNewBook({
        title: '',
        author: '',
        isbn: '',
        category: 'Technology',
        description: '',
        cover_image_url: '',
        publication_year: new Date().getFullYear(),
        edition: '1st',
        pages: 300,
        pdf_url: '',
        canDownload: true
      })
      setShowAddForm(false)
      alert('Book added successfully!')
    } catch (err) {
      console.error('[v0] Error adding book:', err)
      alert('Error adding book. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBook = async (id: string) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('[v0] Error deleting book:', error)
        alert('Error deleting book. Please try again.')
        return
      }

      await loadBooksFromSupabase()
      alert('Book deleted successfully!')
    } catch (err) {
      console.error('[v0] Error deleting book:', err)
      alert('Error deleting book. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert('Please fill in required fields')
      return
    }
    const event: EventType = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      description: newEvent.description,
      fullDescription: newEvent.fullDescription,
      category: newEvent.category,
      image: newEvent.image,
      agenda: newEvent.agenda.split('\n').filter(a => a.trim())
    }
    const updatedEvents = [...events, event]
    setEvents(updatedEvents)
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      fullDescription: '',
      category: 'upcoming',
      image: '',
      agenda: ''
    })
    setShowAddForm(false)
  }

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter(e => e.id !== id)
    setEvents(updatedEvents)
  }

  const handleAddAchievement = async () => {
    if (!newAchievement.name || !newAchievement.achievement) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const achievement = {
        name: newAchievement.name,
        role: newAchievement.role,
        achievement: newAchievement.achievement,
        description: newAchievement.description,
        skills: newAchievement.skills,
        image: newAchievement.image,
        likes: 0,
        comments: 0,
        shares: 0
      }

      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(achievement)
      })

      if (!response.ok) {
        alert('Error adding achievement')
        return
      }

      await loadAchievementsFromSupabase()
      setNewAchievement({
        name: '',
        role: '',
        achievement: '',
        description: '',
        skills: [],
        image: '',
        skillInput: ''
      })
      setShowAddForm(false)
      alert('Achievement added successfully!')
    } catch (err) {
      console.error('[v0] Error adding achievement:', err)
      alert('Error adding achievement')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAchievement = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/achievements?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        alert('Error deleting achievement')
        return
      }

      await loadAchievementsFromSupabase()
      alert('Achievement deleted successfully!')
    } catch (err) {
      console.error('[v0] Error deleting achievement:', err)
      alert('Error deleting achievement')
    } finally {
      setLoading(false)
    }
  }

  const handleAddFaculty = async () => {
    if (!newFaculty.name || !newFaculty.title) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      const facultyData = {
        name: newFaculty.name,
        title: newFaculty.title,
        bio: newFaculty.bio,
        image: newFaculty.image,
        email: newFaculty.email,
        department: newFaculty.department,
        expertise: newFaculty.expertise
      }

      const response = await fetch('/api/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facultyData)
      })

      if (!response.ok) {
        alert('Error adding faculty')
        return
      }

      await loadFacultyFromSupabase()
      setNewFaculty({
        name: '',
        title: '',
        bio: '',
        image: '',
        email: '',
        department: '',
        expertise: [],
        expertiseInput: ''
      })
      setShowAddForm(false)
      alert('Faculty member added successfully!')
    } catch (err) {
      console.error('[v0] Error adding faculty:', err)
      alert('Error adding faculty')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFaculty = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/faculty?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        alert('Error deleting faculty')
        return
      }

      await loadFacultyFromSupabase()
      alert('Faculty member deleted successfully!')
    } catch (err) {
      console.error('[v0] Error deleting faculty:', err)
      alert('Error deleting faculty')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image') => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      if (type === 'pdf') {
        setNewBook({ ...newBook, pdf_url: base64String })
      } else {
        setNewBook({ ...newBook, cover_image_url: base64String })
      }
    }
    reader.onerror = () => {
      console.error('[v0] Error reading file')
      alert('Error reading file. Please try again.')
    }
    reader.readAsDataURL(file)
  }

  const handleEventImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      setNewEvent({ ...newEvent, image: base64String })
    }
    reader.readAsDataURL(file)
  }

  const handleAchievementImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      setNewAchievement({ ...newAchievement, image: base64String })
    }
    reader.readAsDataURL(file)
  }

  const handleFacultyImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      setNewFaculty({ ...newFaculty, image: base64String })
    }
    reader.readAsDataURL(file)
  }

  const addSkill = () => {
    if (newAchievement.skillInput.trim()) {
      setNewAchievement({
        ...newAchievement,
        skills: [...newAchievement.skills, newAchievement.skillInput],
        skillInput: ''
      })
    }
  }

  const removeSkill = (index: number) => {
    setNewAchievement({
      ...newAchievement,
      skills: newAchievement.skills.filter((_, i) => i !== index)
    })
  }

  const addExpertise = () => {
    if (newFaculty.expertiseInput.trim()) {
      setNewFaculty({
        ...newFaculty,
        expertise: [...newFaculty.expertise, newFaculty.expertiseInput],
        expertiseInput: ''
      })
    }
  }

  const removeExpertise = (index: number) => {
    setNewFaculty({
      ...newFaculty,
      expertise: newFaculty.expertise.filter((_, i) => i !== index)
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/login')
  }

  if (!mounted || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-4 border-b border-border mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'books'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Books
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'achievements'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'faculty'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-muted-foreground'
            }`}
          >
            Faculty
          </button>
        </div>

        {/* BOOKS TAB */}
        {activeTab === 'books' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-opacity-90"
            >
              <Plus size={18} />
              Add New Book
            </button>

            {showAddForm && (
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4">Add New Book</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="ISBN"
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <select
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  >
                    <option>Technology</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                  </select>
                  <textarea
                    placeholder="Description"
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg"
                  />
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">Upload Book Cover Image</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'image')}
                        className="flex-1 px-4 py-2 border border-border rounded-lg"
                      />
                      <Upload size={18} />
                    </div>
                    {newBook.cover_image_url && <p className="text-xs text-green-600 mt-1">Image uploaded</p>}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">Upload PDF Book</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(e, 'pdf')}
                        className="flex-1 px-4 py-2 border border-border rounded-lg"
                      />
                      <Upload size={18} />
                    </div>
                    {newBook.pdf_url && <p className="text-xs text-green-600 mt-1">PDF uploaded</p>}
                  </div>
                  <div className="col-span-2 flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                    <input
                      type="checkbox"
                      checked={newBook.canDownload}
                      onChange={(e) => setNewBook({ ...newBook, canDownload: e.target.checked })}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <label className="text-sm font-semibold cursor-pointer">
                      Allow download
                    </label>
                  </div>
                  <button
                    onClick={handleAddBook}
                    className="col-span-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg"
                  >
                    Save Book
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {books.map((book) => (
                <div key={book.id} className="bg-white p-4 rounded-lg border border-border flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">{book.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{book.category}</span>
                      <span className={`text-xs px-2 py-1 rounded ${book.canDownload ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {book.canDownload ? 'Downloadable' : 'View Only'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-opacity-90"
            >
              <Plus size={18} />
              Add New Event
            </button>

            {showAddForm && (
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4">Add New Event</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg"
                  />
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">Upload Event Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEventImageUpload}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                    {newEvent.image && <p className="text-xs text-green-600 mt-1">Image uploaded</p>}
                  </div>
                  <button
                    onClick={handleAddEvent}
                    className="col-span-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg"
                  >
                    Save Event
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white p-4 rounded-lg border border-border flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-opacity-90"
            >
              <Plus size={18} />
              Add Achievement
            </button>

            {showAddForm && (
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4">Add Achievement</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newAchievement.name}
                    onChange={(e) => setNewAchievement({ ...newAchievement, name: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Role/Title"
                    value={newAchievement.role}
                    onChange={(e) => setNewAchievement({ ...newAchievement, role: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Achievement Title"
                    value={newAchievement.achievement}
                    onChange={(e) => setNewAchievement({ ...newAchievement, achievement: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg"
                  />
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">Skills/Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add a skill"
                        value={newAchievement.skillInput}
                        onChange={(e) => setNewAchievement({ ...newAchievement, skillInput: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        className="flex-1 px-4 py-2 border border-border rounded-lg"
                      />
                      <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-secondary text-primary rounded-lg font-semibold"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newAchievement.skills.map((skill, i) => (
                        <div key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                          {skill}
                          <button onClick={() => removeSkill(i)} className="hover:text-red-600">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAchievementImageUpload}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                    {newAchievement.image && <p className="text-xs text-green-600 mt-1">Image uploaded</p>}
                  </div>
                  <button
                    onClick={handleAddAchievement}
                    className="col-span-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg"
                  >
                    Save Achievement
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {achievements.map((ach) => (
                <div key={ach.id} className="bg-white p-4 rounded-lg border border-border flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{ach.achievement}</h4>
                    <p className="text-sm text-muted-foreground">{ach.name} - {ach.role}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {ach.skills?.map((skill, i) => (
                        <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteAchievement(ach.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FACULTY TAB */}
        {activeTab === 'faculty' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-opacity-90"
            >
              <Plus size={18} />
              Add Faculty
            </button>

            {showAddForm && (
              <div className="bg-white p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4">Add Faculty Member</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Title/Designation"
                    value={newFaculty.title}
                    onChange={(e) => setNewFaculty({ ...newFaculty, title: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newFaculty.email}
                    onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    value={newFaculty.department}
                    onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg"
                  />
                  <textarea
                    placeholder="Bio"
                    value={newFaculty.bio}
                    onChange={(e) => setNewFaculty({ ...newFaculty, bio: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-border rounded-lg"
                  />
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">Areas of Expertise</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add expertise"
                        value={newFaculty.expertiseInput}
                        onChange={(e) => setNewFaculty({ ...newFaculty, expertiseInput: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && addExpertise()}
                        className="flex-1 px-4 py-2 border border-border rounded-lg"
                      />
                      <button
                        onClick={addExpertise}
                        className="px-4 py-2 bg-secondary text-primary rounded-lg font-semibold"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newFaculty.expertise.map((exp, i) => (
                        <div key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                          {exp}
                          <button onClick={() => removeExpertise(i)} className="hover:text-red-600">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-2">Upload Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFacultyImageUpload}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                    {newFaculty.image && <p className="text-xs text-green-600 mt-1">Image uploaded</p>}
                  </div>
                  <button
                    onClick={handleAddFaculty}
                    className="col-span-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg"
                  >
                    Save Faculty
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              {faculty.map((fac) => (
                <div key={fac.id} className="bg-white p-4 rounded-lg border border-border flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{fac.name}</h4>
                    <p className="text-sm text-muted-foreground">{fac.title}</p>
                    {fac.email && <p className="text-sm text-muted-foreground">{fac.email}</p>}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {fac.expertise?.map((exp, i) => (
                        <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteFaculty(fac.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 size={18} />
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
