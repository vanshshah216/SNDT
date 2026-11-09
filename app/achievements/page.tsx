'use client'

import Link from 'next/link'
import { Navigation } from "@/components/navigation"
import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Achievement = {
  id: string
  title: string
  category: string
  short_description: string
  student_name: string
  date: string
  image_url: string
}

export default function AchievementsPage() {

  const supabase = createClient()

  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchAchievements()
  }, [])

  async function fetchAchievements() {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('date', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setAchievements(data || [])
  }

  const categories = [...new Set(achievements.map(a => a.category))]

  const filteredAchievements = selectedCategory
    ? achievements.filter(a => a.category === selectedCategory)
    : achievements

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Student Achievements</h1>
          <p className="text-white/90 max-w-3xl mx-auto text-sm">
            Celebrating the accomplishments of our students and alumni across academics, sports, research, innovation, and community impact
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            Filter By Category
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                !selectedCategory 
                  ? 'bg-primary text-white' 
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All Achievements
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          {filteredAchievements.map((achievement) => (

            <Link
              key={achievement.id}
              href={`/achievements/${achievement.id}`}
              className="group bg-white rounded-lg border border-border overflow-hidden hover:border-secondary/50 hover:shadow-md transition duration-300"
            >

              {/* Image */}
              <div className="relative h-32 overflow-hidden bg-gray-200">
                <img
                  src={achievement.image_url}
                  alt={achievement.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">
                  {achievement.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-3">

                <h3 className="text-sm font-bold text-primary group-hover:text-secondary transition line-clamp-2 mb-1">
                  {achievement.title}
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                  {achievement.short_description}
                </p>

                <div className="border-t border-border pt-2">
                  <p className="text-xs font-semibold mb-1">
                    {achievement.student_name}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5">
                      <Calendar size={12} />
                      {new Date(achievement.date).toLocaleDateString()}
                    </span>

                    <span className="text-secondary font-semibold">
                      View
                    </span>
                  </div>
                </div>

              </div>

            </Link>

          ))}

        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">

            <div className="text-center">
              <p className="text-2xl font-bold mb-1">{achievements.length}</p>
              <p className="text-xs text-white/80">Achievements Highlighted</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold mb-1">{categories.length}</p>
              <p className="text-xs text-white/80">Categories</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold mb-1">500+</p>
              <p className="text-xs text-white/80">Lives Impacted</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold mb-1">25+</p>
              <p className="text-xs text-white/80">National Awards</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>© 2024 SNDT Women's University. All rights reserved.</p>
      </footer>
    </>
  )
}