'use client'

import { Eye } from 'lucide-react'
import Link from 'next/link'

interface BookCardProps {
  id: string
  title: string
  author?: string
  thumbnail_url?: string
  onViewDetails?: () => void
}

export function BookCard({ id, title, author, thumbnail_url, onViewDetails }: BookCardProps) {
  return (
    <Link href={`/library/${id}`}>
      <div className="text-left group cursor-pointer h-full">
        <div className="relative mb-3 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition h-48">
          <img
            src={thumbnail_url || 'https://via.placeholder.com/150x225?text=No+Cover'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
            <Eye className="text-white opacity-0 group-hover:opacity-100 transition" size={24} />
          </div>
        </div>
        <h3 className="font-bold text-sm line-clamp-2 text-foreground">{title}</h3>
        {author && <p className="text-xs text-muted-foreground">{author}</p>}
      </div>
    </Link>
  )
}
