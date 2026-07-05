'use client'

import { Navigation } from '@/components/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  ExternalLink,
  Download,
  ZoomIn,
  ZoomOut
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function BookDetailPage() {

  const params = useParams()
  const supabase = createClient()

  const [book, setBook] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'detail' | 'read'>('detail')

  // ✅ ZOOM STATE
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (params?.id) fetchBook(params.id as string)
  }, [params])

  async function fetchBook(id: string) {
    setLoading(true)
    setFetchError(null)

    if (!id) {
      setBook(null)
      setFetchError('Book not found')
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      setBook(null)
      setFetchError('Book not found')
    } else {
      setBook(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="p-20 text-center">Loading...</div>
      </>
    )
  }

  if (fetchError || !book) {
    return (
      <>
        <Navigation />
        <div className="p-20 text-center space-y-4">
          <p className="text-lg text-gray-600">{fetchError || 'Book not found'}</p>
          <Link href="/library" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft size={16} /> Back to Library
          </Link>
        </div>
      </>
    )
  }

  const pdfDownloadUrl = book.pdf_url?.replace('/preview', '/export?format=pdf')
  const pdfViewUrl = book.pdf_url?.replace('/preview', '/view')

  return (
    <>
      <Navigation />

      {/* DETAIL PAGE */}
      {viewMode === 'detail' && (
        <>
          <div className="bg-gray-50 border-b">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <Link href="/library" className="flex items-center gap-2 text-sm">
                <ArrowLeft size={16} /> Back
              </Link>
            </div>
          </div>

          <section className="py-10">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">

              {/* IMAGE */}
              <div className="flex justify-center items-center bg-gray-100 rounded-xl p-4">
                <img
                  src={book.cover_image_url || '/placeholder.svg'}
                  alt={book.title || 'Book cover'}
                  className="max-h-[400px] w-auto object-contain"
                />
              </div>

              {/* DETAILS */}
              <div className="md:col-span-2 space-y-4">

                <h1 className="text-3xl font-bold">{book.title}</h1>

                <p className="text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-500">{book.category}</p>

                <p className="mt-4 text-gray-700 leading-relaxed">
                  {book.description}
                </p>

                <div className="flex gap-4 mt-6">

                  <button
                    onClick={() => setViewMode('read')}
                    disabled={!book.pdf_url}
                    className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Read Book
                  </button>

                  {pdfDownloadUrl && (
                    <a
                      href={pdfDownloadUrl}
                      target="_blank"
                      className="border px-4 py-2 rounded flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download
                    </a>
                  )}

                </div>

              </div>

            </div>
          </section>
        </>
      )}

      {/* FULLSCREEN READER */}
      {viewMode === 'read' && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">

          {/* 🔥 TOOLBAR */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white text-sm">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <button
                onClick={() => setViewMode('detail')}
                className="flex items-center gap-2 hover:opacity-80"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div className="bg-gray-800 px-3 py-1 rounded">
                Zoom: {Math.round(zoom * 100)}%
              </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">

              {/* ZOOM OUT */}
              <button
                onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
                className="hover:bg-gray-700 px-2 py-1 rounded"
              >
                <ZoomOut size={16} />
              </button>

              {/* ZOOM IN */}
              <button
                onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
                className="hover:bg-gray-700 px-2 py-1 rounded"
              >
                <ZoomIn size={16} />
              </button>

              {/* OPEN */}
              {pdfViewUrl && (
                <a
                  href={pdfViewUrl}
                  target="_blank"
                  className="hover:bg-gray-700 px-2 py-1 rounded"
                >
                  <ExternalLink size={16} />
                </a>
              )}

              {/* DOWNLOAD */}
              {pdfDownloadUrl && (
                <a
                  href={pdfDownloadUrl}
                  target="_blank"
                  className="hover:bg-gray-700 px-2 py-1 rounded"
                >
                  <Download size={16} />
                </a>
              )}

            </div>

          </div>

          {/* 🔥 PDF VIEW WITH ZOOM */}
          <div className="flex-1 overflow-auto flex justify-center items-start bg-black p-6">

            <div
              style={{ transform: `scale(${zoom})` }}
              className="origin-top transition"
            >
              <iframe
                src={book.pdf_url}
                className="w-[900px] h-[1200px] border-0 rounded"
              />
            </div>

          </div>

        </div>
      )}

    </>
  )
}
