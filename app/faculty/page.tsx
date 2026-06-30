'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

interface FacultyMember {
  id: number
  name: string
  designation: string
  type: string
  image_url: string
  degree?: string
  start_year?: number
}

function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <Link
      href={`/faculty/${member.id}`}
      className="group w-full max-w-[280px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col items-center text-center"
    >
      {/* IMAGE */}
      <div className="w-28 h-28 mb-4">
        <img
          src={member.image_url || '/faculty/default.jpg'}
          alt={member.name}
          className="w-full h-full rounded-full object-cover border-2 border-gray-200 group-hover:scale-105 transition"
        />
      </div>

      {/* NAME */}
      <h3 className="font-semibold text-lg text-gray-900">
        {member.name}
      </h3>

      {/* DESIGNATION */}
      <p className="text-sm text-yellow-600 mt-1 text-center">
        {member.designation}
      </p>

      {/* DEGREE */}
      {member.degree && (
        <p className="text-xs text-gray-500 mt-1 text-center">
          {member.degree}
        </p>
      )}

      {/* YEAR */}
      {member.start_year && (
        <p className="text-xs text-gray-400 mt-2">
          Since {member.start_year}
        </p>
      )}

      {/* CTA */}
      <div className="mt-4 text-sm font-medium text-yellow-600 group-hover:tracking-wide transition-all">
        View Profile →
      </div>
    </Link>
  )
}

export default function FacultyPage() {
  const supabase = createClient()

  const [faculty, setFaculty] = useState<FacultyMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFaculty()
  }, [])

  async function fetchFaculty() {
    try {
      setLoading(true)

      const { data, error } = await supabase
        .from('faculty')
        .select('*')

      console.log('FACULTY RAW:', data)

      if (error) throw error

      setFaculty(data || [])
    } catch (err) {
      console.error(err)
      setError('Failed to load faculty')
    } finally {
      setLoading(false)
    }
  }

  // FILTER
  const currentFaculty = faculty.filter(f => f.type === 'current')
  const formerFaculty = faculty.filter(f => f.type === 'former')

  return (
    <>
      <Navigation />

      {/* HERO */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Our Faculty
        </h1>
      </section>

      {/* ERROR */}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

      {/* CONTENT */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {/* CURRENT */}
          <section className="py-12 bg-gray-50">
            <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
              Current Faculty
            </h2>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,280px))] justify-center gap-8 px-6 max-w-6xl mx-auto">
              {currentFaculty.length > 0 ? (
                currentFaculty.map((m) => (
                  <FacultyCard key={m.id} member={m} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No current faculty found
                </p>
              )}
            </div>
          </section>

          {/* FORMER */}
          <section className="py-12">
            <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
              Former Faculty
            </h2>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,280px))] justify-center gap-8 px-6 max-w-6xl mx-auto">
              {formerFaculty.length > 0 ? (
                formerFaculty.map((m) => (
                  <FacultyCard key={m.id} member={m} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No former faculty found
                </p>
              )}
            </div>
          </section>
        </>
      )}

      <footer className="text-center py-10 text-gray-500">
        © SNDT
      </footer>
    </>
  )
}