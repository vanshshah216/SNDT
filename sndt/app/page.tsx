'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import AnimatedHero from '@/components/animated-hero'

export default function HomePage() {
  return (
    <>
      <Navigation />
      
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Mission & Vision */}
      <section className="bg-muted py-20 relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="p-8 rounded-xl bg-white border-l-4 border-secondary shadow-md">
            <div className="text-secondary text-sm font-bold uppercase mb-2 tracking-wider">✦ Mission</div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-foreground leading-relaxed">
              To provide accessible, quality higher education to women, empowering them with interdisciplinary knowledge and skills to become independent contributors to society and catalysts for sustainable development and social change.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-white border-l-4 border-secondary shadow-md">
            <div className="text-secondary text-sm font-bold uppercase mb-2 tracking-wider">✦ Vision</div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Our Vision</h2>
            <p className="text-foreground leading-relaxed">
              To be a leading women's university globally, recognized for academic excellence, innovative research, and commitment to creating a more equitable, inclusive society where every woman can achieve her full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose SNDT Section */}
      <section className="bg-background py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-3">Why Choose SNDT?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover what makes us the preferred choice for women's education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: World-Class Library */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-5 font-bold text-primary text-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">World-Class Library</h3>
              <p className="text-foreground/80 leading-relaxed">
                Access thousands of digital resources and rare collections. Our library houses journals, books, and research papers from across the globe.
              </p>
            </div>

            {/* Card 2: Distinguished Faculty */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-5 font-bold text-primary text-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Distinguished Faculty</h3>
              <p className="text-foreground/80 leading-relaxed">
                Learn from renowned academics and industry experts. Our faculty members are leaders in their fields with extensive experience.
              </p>
            </div>

            {/* Card 3: Vibrant Campus Life */}
            <div className="bg-card rounded-xl p-8 border border-border hover:border-secondary/50 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-5 font-bold text-primary text-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Vibrant Campus Life</h3>
              <p className="text-foreground/80 leading-relaxed">
                Engage in cultural events, workshops, and student activities. Our inclusive community celebrates diversity and creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">SNDT University</h3>
            <p className="text-white/80 text-sm">
              Empowering women through education since 1916
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/about" className="hover:text-gold transition">About</Link></li>
              <li><Link href="/faculty" className="hover:text-gold transition">Faculty</Link></li>
              <li><Link href="/syllabus" className="hover:text-gold transition">Academics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-sm text-white/80">
              SNDT Women's University<br />
              Pune - 411001<br />
              Maharashtra, India
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <p className="text-sm text-white/80">
              Facebook | Twitter | LinkedIn | Instagram
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
            <p>&copy; 2024 SNDT Women's University. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-gold transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gold transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

