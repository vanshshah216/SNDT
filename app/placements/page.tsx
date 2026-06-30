'use client'

import { Navigation } from '@/components/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function PlacementsPage() {

  const supabase = createClient()

  const [placements, setPlacements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const topRecruiters = [
    'Microsoft', 'Google', 'Goldman Sachs', 'McKinsey',
    'Deloitte', 'Accenture', 'TCS', 'Flipkart',
    'Amazon', 'JP Morgan', 'Infosys', 'ICICI Bank',
    'Microsoft', 'Google', 'Goldman Sachs', 'McKinsey',
  ]

  useEffect(() => {
    fetchPlacements()
  }, [])

  async function fetchPlacements() {
    try {
      const { data, error } = await supabase
        .from('placements')
        .select('*')

      console.log("PLACEMENTS:", data)

      if (error) throw error

      setPlacements(data || [])

    } catch (err) {
      console.error("Placement error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[35vh] bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden pt-20 pb-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Placements</h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Our graduates lead successful careers across Fortune 500 companies and innovative organizations worldwide.
          </p>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-background relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-primary mb-2">Alumni Success Stories</h2>
            <p className="text-foreground/70">Meet our graduates making an impact globally</p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">Loading placements...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {placements.map((story, idx) => (
                <div key={idx} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg hover:border-secondary/50 transition">
                  
                  {/* Image */}
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={story.image_url || '/fallback.jpg'}
                      alt={story.name}
                      width={300}
                      height={350}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary mb-1">
                      {story.name}
                    </h3>

                    <p className="text-sm font-medium text-secondary mb-3">
                      {story.role}
                    </p>

                    <p className="text-xs text-foreground/60 font-medium mb-3">
                      at {story.company}
                    </p>

                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {story.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Recruiters */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-primary mb-2">Recruitment Partners</h2>
            <p className="text-foreground/70">Companies that trust SNDT graduates</p>
          </div>

          <div className="relative h-24 overflow-hidden">
            <style>{`
              @keyframes scroll-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }

              .marquee {
                display: flex;
                gap: 2rem;
                animation: scroll-left 30s linear infinite;
              }

              .marquee:hover {
                animation-play-state: paused;
              }

              .marquee-item {
                flex-shrink: 0;
                min-width: 180px;
              }
            `}</style>

            <div className="marquee">
              {topRecruiters.map((recruiter, i) => (
                <div key={i} className="marquee-item">
                  <div className="bg-muted rounded-lg p-4 border border-border hover:border-secondary/50 hover:shadow-md transition text-center flex items-center justify-center h-20">
                    <span className="font-semibold text-foreground text-sm">{recruiter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}