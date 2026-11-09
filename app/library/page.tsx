'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { DataStore, type BookType } from '@/lib/dataStore'
import { Search, X } from 'lucide-react'

const PAGE_SIZE = 24

export default function LibraryPage() {
  const [books, setBooks] = useState<BookType[]>([])
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    DataStore.getBookCategories().then(setCategories)
  }, [])

  // Debounce search input so we don't query on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setSearchQuery(searchInput), 300)
    return () => clearTimeout(timeout)
  }, [searchInput])

  // Reset to page 1 whenever filters change.
  useEffect(() => {
    setPage(1)
  }, [selectedCategory, searchQuery])

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    DataStore.getBooksPage(page, PAGE_SIZE, {
      category: selectedCategory,
      search: searchQuery,
    }).then(({ books, total }) => {
      if (cancelled) return
      setBooks(books)
      setTotal(total)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [page, selectedCategory, searchQuery])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <>
      <Navigation />

      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-14 text-center">
        <h1 className="text-3xl font-bold">Digital Library</h1>
        <p className="text-sm mt-2">Explore academic resources</p>
      </div>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full border shadow-sm"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {categories.length > 0 && (
            <div className="flex justify-center flex-wrap gap-3 mb-10">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === null
                    ? 'bg-primary text-white'
                    : 'bg-white border'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-white border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : books.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No books found.</p>
          ) : (
            <>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,200px))] justify-center gap-8">
                {books.map(book => (
                  <Link key={book.id} href={`/library/${book.id}`}>
                    <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
                      <div className="h-64 flex items-center justify-center bg-gray-100 p-4">
                        <img
                          src={book.cover_image_url || '/placeholder.svg'}
                          alt={book.title || 'Book cover'}
                          loading="lazy"
                          className="max-h-full w-auto object-contain"
                        />
                      </div>

                      <div className="p-3 text-center">
                        <h4 className="text-sm font-semibold line-clamp-2">
                          {book.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-4 py-2 rounded-full text-sm bg-white border disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="px-4 py-2 rounded-full text-sm bg-white border disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </>
  )
}
