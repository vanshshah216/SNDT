'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, Award, BookOpen } from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface AchievementRow {
  id: string
  title: string
  category?: string
  student_name?: string
  student_class?: string
  date?: string
  recognition?: string
  image_url?: string
  full_description?: string
  impact?: string
}

export default function AchievementDetailPage() {

  const params = useParams()
  const supabase = createClient()

  const [achievement, setAchievement] = useState<AchievementRow | null>(null)
  const [gallery, setGallery] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [related, setRelated] = useState<AchievementRow[]>([])

  useEffect(() => {
    if (params?.id) fetchData(params.id as string)
  }, [params])

  async function fetchData(id: string) {
    // These four queries only depend on `id`, not on each other's results,
    // so they're run concurrently instead of as sequential round-trips.
    const [mainRes, galleryRes, skillsRes, relatedRes] = await Promise.all([
      supabase.from('achievements').select('*').eq('id', id).single(),
      supabase.from('achievement_gallery').select('image_url').eq('achievement_id', id),
      supabase.from('achievement_skills').select('skill').eq('achievement_id', id),
      supabase.from('achievements').select('*').neq('id', id).limit(3),
    ])

    if (!mainRes.data) return

    setAchievement(mainRes.data)
    setGallery((galleryRes.data || []).map((x: { image_url: string }) => x.image_url))
    setSkills((skillsRes.data || []).map((x: { skill: string }) => x.skill))
    setRelated(relatedRes.data || [])
  }

  if (!achievement) return null

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Back */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <Link href="/achievements" className="inline-flex items-center gap-2 text-blue-600">
            <ArrowLeft size={16} />
            Back to Achievements
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* IMAGE + GALLERY */}
            <div className="lg:col-span-2">

              <div className="aspect-video rounded-lg overflow-hidden mb-4 border">
                <img
                  src={achievement.image_url}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, idx) => (
                  <div key={idx} className="h-20 overflow-hidden rounded border">
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                ))}
              </div>

            </div>

            {/* INFO */}
            <div>
              <div className="bg-white rounded-lg p-5 border shadow-sm space-y-4">

                <div>
                  <div className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded inline-block mb-2">
                    {achievement.category}
                  </div>

                  <h1 className="text-xl font-bold">
                    {achievement.title}
                  </h1>
                </div>

                <div>
                  <p className="text-xs uppercase">Student Achiever</p>
                  <p className="font-bold">{achievement.student_name}</p>
                  <p className="text-xs">Class of {achievement.student_class}</p>
                </div>

                <div className="flex gap-2 text-sm">
                  <Calendar size={16} />
                  {achievement.date ? new Date(achievement.date).toDateString() : ''}
                </div>

                <div className="flex gap-2 text-sm">
                  <Award size={16} />
                  {achievement.recognition}
                </div>

                {/* SKILLS */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="bg-blue-100 px-2 py-1 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-8">

          <div>
            <h2 className="text-xl font-bold mb-3">Overview</h2>
            <p className="text-sm">
              {achievement.full_description}
            </p>
          </div>

          <div className="bg-blue-50 p-5 border rounded">
            <div className="flex gap-2 mb-2">
              <BookOpen size={20} />
              <h2 className="font-bold">Impact & Recognition</h2>
            </div>
            <p className="text-sm">
              {achievement.impact}
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div>
          <div className="bg-white border p-4 rounded">
            <h3 className="font-bold mb-3">Key Highlights</h3>

            <p>• Excellence in {achievement.category}</p>
            <p>• {achievement.recognition}</p>
            <p>• Skill development & growth</p>
          </div>

          <Link
            href="/achievements"
            className="block mt-4 bg-blue-600 text-white text-center py-2 rounded"
          >
            View All Achievements
          </Link>
        </div>

      </div>

      {/* RELATED */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-4">
          {related.map((item) => (
            <Link key={item.id} href={`/achievements/${item.id}`}>
              <img src={item.image_url} alt={item.title} loading="lazy" className="h-32 w-full object-cover rounded" />
              <p className="text-sm font-bold mt-1">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6 text-center text-xs">
        © 2024 SNDT Women's University
      </footer>
    </div>
  )
}