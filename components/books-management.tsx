'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Trash2, Edit2 } from 'lucide-react'

interface Book {
  id?: string
  title: string
  author?: string
  category?: string
  description?: string
  cover_image_url?: string
  pdf_url: string
}

export function BooksManagement() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClient()

  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    category: '',
    description: '',
    cover_image_url: '',
    pdf_url: ''
  })

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setBooks(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validate required fields
    if (!formData.title.trim() || !formData.pdf_url.trim()) {
      setError('Title and PDF URL are required')
      return
    }

    try {
      // Check if user is authenticated
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      if (authError || !session) {
        setError('You must be logged in to manage books')
        return
      }

      if (editingId) {
        // Update existing book
        const { error: updateError } = await supabase
          .from('books')
          .update(formData)
          .eq('id', editingId)

        if (updateError) {
          console.error('[v0] Update error:', updateError)
          throw updateError
        }
        setSuccess('Book updated successfully')
      } else {
        // Create new book - only send fields that are not empty
        const bookData = {
          title: formData.title.trim(),
          author: formData.author?.trim() || null,
          category: formData.category?.trim() || null,
          description: formData.description?.trim() || null,
          cover_image_url: formData.cover_image_url?.trim() || null,
          pdf_url: formData.pdf_url.trim()
        }

        const { data, error: insertError } = await supabase
          .from('books')
          .insert([bookData])
          .select()

        if (insertError) {
          console.error('[v0] Insert error:', insertError)
          throw insertError
        }
        console.log('[v0] Book created successfully:', data)
        setSuccess('Book added successfully')
      }

      // Reset form and refresh list
      setFormData({
        title: '',
        author: '',
        category: '',
        description: '',
        cover_image_url: '',
        pdf_url: ''
      })
      setEditingId(null)
      setShowForm(false)
      await fetchBooks()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      console.error('[v0] Submit error:', errorMessage)
      setError(errorMessage)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this book?')) return

    try {
      const { error: deleteError } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Book deleted successfully')
      await fetchBooks()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book')
    }
  }

  function handleEdit(book: Book) {
    setFormData(book)
    setEditingId(book.id || null)
    setShowForm(true)
  }

  function handleCancel() {
    setFormData({
      title: '',
      author: '',
      category: '',
      description: '',
      cover_image_url: '',
      pdf_url: ''
    })
    setEditingId(null)
    setShowForm(false)
    setError(null)
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
          <h3 className="text-lg font-bold text-primary mb-4">
            {editingId ? 'Edit Book' : 'Add New Book'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="e.g., Technology, Mathematics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={formData.cover_image_url || ''}
                  onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                PDF URL *
              </label>
              <input
                type="url"
                value={formData.pdf_url}
                onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="https://example.com/book.pdf"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                placeholder="Enter book description"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition"
              >
                {editingId ? 'Update Book' : 'Add Book'}
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

      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-opacity-90 transition"
        >
          Add New Book
        </button>
      )}

      {/* Books List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-bold text-primary mb-6">Library Books</h3>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No books added yet. Create one to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Author</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">PDF</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b border-border hover:bg-muted transition">
                    <td className="px-4 py-3 font-medium text-foreground">{book.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{book.author || '-'}</td>
                    <td className="px-4 py-3 text-foreground">{book.category || '-'}</td>
                    <td className="px-4 py-3">
                      {book.pdf_url ? (
                        <a
                          href={book.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:underline"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-muted-foreground">No PDF</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(book)}
                          className="p-2 hover:bg-muted rounded text-secondary transition"
                          title="Edit book"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => book.id && handleDelete(book.id)}
                          className="p-2 hover:bg-red-50 rounded text-red-600 transition"
                          title="Delete book"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
