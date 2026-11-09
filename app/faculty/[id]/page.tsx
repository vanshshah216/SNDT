'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Mail,
  Calendar,
  ChevronRight
} from 'lucide-react'

interface FacultyRow {
  id: string
  name: string
  designation?: string
  department?: string
  degree?: string
  email?: string
  bio?: string
  image_url?: string
  type?: string
  start_year?: number
  end_year?: number
}

export default function FacultyDetailPage() {

  const params = useParams()
  const supabase = createClient()

  const [faculty, setFaculty] = useState<FacultyRow | null>(null)
  const [research, setResearch] = useState<string[]>([])
  const [awards, setAwards] = useState<string[]>([])
  const [courses, setCourses] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    if (params?.id) {
      fetchAllData(params.id as string)
    }
  }, [params])

  async function fetchAllData(id: string) {
    try {
      // All five queries only depend on `id`, not on each other's results,
      // so they're run concurrently instead of as sequential round-trips.
      const [facultyRes, researchRes, awardsRes, coursesRes, tagsRes] = await Promise.all([
        supabase.from('faculty').select('*').eq('id', id).single(),
        supabase.from('faculty_research').select('title').eq('faculty_id', id),
        supabase.from('faculty_awards').select('title, year').eq('faculty_id', id),
        supabase.from('faculty_courses').select('course_name').eq('faculty_id', id),
        supabase.from('faculty_tags').select('tag').eq('faculty_id', id),
      ])

      if (!facultyRes.data) return
      setFaculty(facultyRes.data)
      setResearch((researchRes.data || []).map((x: { title: string }) => x.title))
      setAwards((awardsRes.data || []).map((x: { title: string; year: number }) => `${x.title} (${x.year})`))
      setCourses((coursesRes.data || []).map((x: { course_name: string }) => x.course_name))
      setTags((tagsRes.data || []).map((x: { tag: string }) => x.tag))
    } catch (err) {
      console.error(err)
    }
  }

  if (!faculty) {
    return (
      <>
        <Navigation />
        <div className="p-20 text-center text-lg">
          Loading faculty data...
        </div>
      </>
    )
  }

  const isFormer = faculty.type === 'former'

  return (
    <>
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500 flex gap-2">
          <Link href="/">Home</Link> /
          <Link href="/faculty">Faculty</Link> /
          <span>{faculty.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">

          <Link href="/faculty" className="flex items-center gap-2 mb-6 text-sm">
            <ArrowLeft size={16} /> Back
          </Link>

          <div className="grid md:grid-cols-3 gap-8">

            {/* IMAGE */}
            <div className="flex justify-center">
              <img
                src={faculty.image_url}
                className="w-64 h-64 object-cover rounded-2xl shadow"
              />
            </div>

            {/* INFO */}
            <div className="md:col-span-2 space-y-4">

              <h1 className="text-3xl font-bold text-gray-900">
                {faculty.name}
              </h1>

              <p className="text-yellow-600 font-medium">
                {faculty.designation}
              </p>

              <p className="text-gray-500 text-sm">
                {faculty.department} | {faculty.degree}
              </p>

              <a href={`mailto:${faculty.email}`} className="flex gap-2 text-sm">
                <Mail size={16} />
                {faculty.email}
              </a>

              <p className="flex gap-2 text-sm text-gray-500">
                <Calendar size={16} />
                {isFormer
                  ? `${faculty.start_year} - ${faculty.end_year}`
                  : `Since ${faculty.start_year}`}
              </p>

              {/* TAGS */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-10">

            {/* BIO */}
            {faculty.bio && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Biography</h2>
                <p className="text-gray-600 leading-relaxed">
                  {faculty.bio}
                </p>
              </div>
            )}

            {/* RESEARCH */}
            {research.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Research</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {research.map(r => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* RIGHT */}
          <div className="space-y-10">

            {/* AWARDS */}
            {awards.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Awards</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {awards.map(a => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* COURSES */}
            {courses.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Courses</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {courses.map(c => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>
      </section>
    </>
  )
}