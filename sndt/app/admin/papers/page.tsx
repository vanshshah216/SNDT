'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit, Trash2, X } from 'lucide-react'

interface Paper {
  id: string
  title: string
  authors: string[]
  year: number
  journal: string
  doi?: string
  citations: number
  abstract: string
  keywords: string[]
  department: string
  researchArea: string
}

export default function AdminPapersPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingPaper, setIsAddingPaper] = useState(false)
  const [editingPaperId, setEditingPaperId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Paper>>({
    authors: [],
    keywords: []
  })

  const departments = [
    { id: 'cs', name: 'Computer Science & Information Technology' },
    { id: 'ed', name: 'Education & Pedagogy' },
    { id: 'ah', name: 'Arts, Humanities & Social Sciences' }
  ]

  const researchAreas = {
    cs: ['Artificial Intelligence & Machine Learning', 'Cybersecurity & Privacy', 'Cloud & Edge Computing', 'Data Science & Analytics', 'IoT & Smart Systems'],
    ed: ['Digital & Blended Learning', 'Curriculum Innovation & Development', 'Educational Psychology & Assessment', 'STEM Education Methodology'],
    ah: ['Indian History & Heritage', 'Literature & Linguistics', 'Social Sciences Research']
  }

  useEffect(() => {
    fetchPapers()
  }, [])

  const fetchPapers = async () => {
    try {
      const res = await fetch('/api/research-papers')
      const data = await res.json()
      setPapers(data)
    } catch (error) {
      console.error('Failed to fetch papers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPaper = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title) {
      alert('Please enter a title')
      return
    }

    try {
      const res = await fetch('/api/research-papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const newPaper = await res.json()
        setPapers([...papers, newPaper])
        setFormData({ authors: [], keywords: [] })
        setIsAddingPaper(false)
      }
    } catch (error) {
      console.error('Failed to add paper:', error)
      alert('Failed to add paper')
    }
  }

  const handleEditPaper = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingPaperId) return

    try {
      const res = await fetch(`/api/research-papers/${editingPaperId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const updated = await res.json()
        setPapers(papers.map(p => p.id === editingPaperId ? updated : p))
        setFormData({ authors: [], keywords: [] })
        setEditingPaperId(null)
      }
    } catch (error) {
      console.error('Failed to update paper:', error)
      alert('Failed to update paper')
    }
  }

  const handleDeletePaper = async (id: string) => {
    if (!confirm('Are you sure you want to delete this paper?')) return

    try {
      const res = await fetch(`/api/research-papers/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setPapers(papers.filter(p => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete paper:', error)
      alert('Failed to delete paper')
    }
  }

  const handleEditStart = (paper: Paper) => {
    setEditingPaperId(paper.id)
    setFormData(paper)
  }

  const handleCancel = () => {
    setIsAddingPaper(false)
    setEditingPaperId(null)
    setFormData({ authors: [], keywords: [] })
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-background z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/research"
            className="inline-flex items-center text-secondary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Research
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Manage Research Papers</h1>
          <button
            onClick={() => setIsAddingPaper(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition"
          >
            <Plus className="w-4 h-4" />
            Add Paper
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Add/Edit Form */}
        {(isAddingPaper || editingPaperId) && (
          <div className="mb-8 bg-white rounded-lg border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-foreground">
                {editingPaperId ? 'Edit Paper' : 'Add New Paper'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingPaperId ? handleEditPaper : handleAddPaper} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Paper Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />

                <select
                  value={formData.department || ''}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>

                <select
                  value={formData.researchArea || ''}
                  onChange={(e) => setFormData({...formData, researchArea: e.target.value})}
                  disabled={!formData.department}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
                >
                  <option value="">Select Research Area</option>
                  {formData.department && researchAreas[formData.department as keyof typeof researchAreas]?.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Journal/Conference Name"
                  value={formData.journal || ''}
                  onChange={(e) => setFormData({...formData, journal: e.target.value})}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <input
                  type="number"
                  placeholder="Year"
                  value={formData.year || ''}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <input
                  type="number"
                  placeholder="Citations"
                  value={formData.citations || ''}
                  onChange={(e) => setFormData({...formData, citations: parseInt(e.target.value)})}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />

                <input
                  type="text"
                  placeholder="DOI"
                  value={formData.doi || ''}
                  onChange={(e) => setFormData({...formData, doi: e.target.value})}
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <textarea
                placeholder="Abstract"
                value={formData.abstract || ''}
                onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={4}
              />

              <input
                type="text"
                placeholder="Authors (comma separated)"
                value={Array.isArray(formData.authors) ? formData.authors.join(', ') : ''}
                onChange={(e) => setFormData({...formData, authors: e.target.value.split(',').map(a => a.trim())})}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />

              <input
                type="text"
                placeholder="Keywords (comma separated)"
                value={Array.isArray(formData.keywords) ? formData.keywords.join(', ') : ''}
                onChange={(e) => setFormData({...formData, keywords: e.target.value.split(',').map(k => k.trim())})}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition"
                >
                  {editingPaperId ? 'Update Paper' : 'Add Paper'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Papers List */}
        <div className="space-y-4">
          {papers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <p className="text-muted-foreground">No research papers yet. Create your first paper!</p>
            </div>
          ) : (
            papers.map(paper => (
              <div key={paper.id} className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {paper.authors.join(', ')} • {paper.journal} ({paper.year})
                    </p>
                    <p className="text-sm text-foreground mb-3">{paper.abstract.substring(0, 150)}...</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {paper.keywords.map(keyword => (
                        <span key={keyword} className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {paper.citations} citations • {paper.researchArea}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEditStart(paper)}
                      className="p-2 hover:bg-muted rounded transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeletePaper(paper.id)}
                      className="p-2 hover:bg-muted rounded transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
