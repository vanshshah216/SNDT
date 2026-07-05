'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { useDataStore } from '@/lib/dataStore'
import { Search, X } from 'lucide-react'

export default function LibraryPage() {
  const { books } = useDataStore()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = useMemo(() => {
    if (!books) return []
    return Array.from(new Set(books.map(b => b.category).filter(Boolean))) as string[]
  }, [books])

  const filteredBooks = useMemo(() => {
    if (!books) return []

    let result = books

    if (selectedCategory) {
      result = result.filter(b => b.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(b =>
        b.title?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
      )
    }

    return result
  }, [books, selectedCategory, searchQuery])

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-full border shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
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

          {filteredBooks.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No books found.</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,200px))] justify-center gap-8">
              {filteredBooks.map(book => (
                <Link key={book.id} href={`/library/${book.id}`}>
                  <div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
                    <div className="h-64 flex items-center justify-center bg-gray-100 p-4">
                      <img
                        src={book.cover_image_url || '/placeholder.svg'}
                        alt={book.title || 'Book cover'}
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
          )}

        </div>
      </div>
    </>
  )
}
