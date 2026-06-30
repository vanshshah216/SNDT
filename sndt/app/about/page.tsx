import { Navigation } from '@/components/navigation'
import Link from 'next/link'

export default function AboutPage() {
  const testimonials = [
    {
      name: 'Anjali Desai',
      program: 'Bachelor of Arts',
      company: 'Content Strategist at Tech Corp',
      testimonial: 'My time at SNDT shaped me into an independent professional. The faculty and resources provided exceptional learning opportunities.'
    },
    {
      name: 'Priya Sharma',
      program: 'PhD in Computer Science',
      company: 'Senior Researcher at Microsoft',
      testimonial: 'SNDT has given me the confidence and knowledge to contribute to cutting-edge technology. The mentorship was truly transformative.'
    },
    {
      name: 'Neha Patel',
      program: 'MBA',
      company: 'Founder & CEO',
      testimonial: 'SNDT gave me the network and skills I needed to launch my startup. The supportive community was instrumental.'
    },
    {
      name: 'Dr. Sneha Gupta',
      program: 'Master of Science',
      company: 'Doctor & Social Activist',
      testimonial: 'The holistic education at SNDT instilled values of social responsibility and empathy alongside professional skills.'
    },
    {
      name: 'Kavya Reddy',
      program: 'Master of Science',
      company: 'Research Scientist at IIT',
      testimonial: 'The research opportunities here were invaluable. SNDT provides the perfect environment for intellectual growth and innovation.'
    },
    {
      name: 'Vidya Iyer',
      program: 'Bachelor of Commerce',
      company: 'Financial Analyst at Goldman Sachs',
      testimonial: 'SNDT equipped me with analytical and leadership skills that have been invaluable in my finance career.'
    },
  ]
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About SNDT</h1>
          <p className="text-xl text-gray-100">A legacy of empowering women through education since 1916</p>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-primary">A Century of Excellence</h2>
              <p className="text-foreground mb-4 leading-relaxed">
                Founded in 1916 by Savitribai Phule and Dhondo Kedar Vaidya, SNDT Women's University was established as India's first institution of higher learning dedicated exclusively to women. What began as a visionary response to the educational needs of women has evolved into a premier university recognized nationally and internationally.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                Over more than a century, SNDT has expanded its reach, with campuses across India and a network of 50,000+ accomplished alumni who have contributed significantly to society across various fields.
              </p>
              <p className="text-foreground leading-relaxed">
                Today, we continue our mission to provide transformative education that empowers women to become leaders, innovators, and agents of change in their communities and the world.
              </p>
            </div>
            <div className="bg-gradient-to-b from-secondary/20 to-transparent rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-secondary mb-2">100+</div>
                <div className="text-xl text-primary font-semibold">Years of Legacy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-primary">Our Journey Through Time</h2>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line with Golden Glow */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-secondary to-secondary/80 timeline-glow" />
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {/* Item 1 - Left */}
              <div className="flex items-center">
                <div className="w-1/2 pr-12 text-right">
                  <div className="animate-fade-in-left">
                    <h3 className="text-3xl font-bold text-primary mb-2">1916</h3>
                    <p className="text-lg text-primary font-semibold mb-2">Founded by Maharshi Dhondo Keshav Karve</p>
                    <p className="text-foreground text-sm leading-relaxed">
                      SNDT Women's University was established as India's first institution dedicated exclusively to women's higher education, pioneering women's empowerment through education.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-secondary rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg timeline-glow">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div className="w-1/2" />
              </div>

              {/* Item 2 - Right */}
              <div className="flex items-center">
                <div className="w-1/2" />
                <div className="w-8 h-8 bg-secondary rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg timeline-glow">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div className="w-1/2 pl-12">
                  <div className="animate-fade-in-right">
                    <h3 className="text-3xl font-bold text-primary mb-2">1951</h3>
                    <p className="text-lg text-primary font-semibold mb-2">Granted University Status</p>
                    <p className="text-foreground text-sm leading-relaxed">
                      Recognized as a full-fledged university with the authority to award degrees and establish departments across diverse academic disciplines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 - Left */}
              <div className="flex items-center">
                <div className="w-1/2 pr-12 text-right">
                  <div className="animate-fade-in-left">
                    <h3 className="text-3xl font-bold text-primary mb-2">1976</h3>
                    <p className="text-lg text-primary font-semibold mb-2">Expanded to Multiple Campuses</p>
                    <p className="text-foreground text-sm leading-relaxed">
                      SNDT grew beyond its original campus, establishing presence in multiple cities to reach more women across India.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-secondary rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg timeline-glow">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div className="w-1/2" />
              </div>

              {/* Item 4 - Right */}
              <div className="flex items-center">
                <div className="w-1/2" />
                <div className="w-8 h-8 bg-secondary rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg timeline-glow">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div className="w-1/2 pl-12">
                  <div className="animate-fade-in-right">
                    <h3 className="text-3xl font-bold text-primary mb-2">2000</h3>
                    <p className="text-lg text-primary font-semibold mb-2">Launched Digital Learning Initiatives</p>
                    <p className="text-foreground text-sm leading-relaxed">
                      Embraced technology and established digital learning platforms to make education accessible to women across geographical boundaries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 5 - Left */}
              <div className="flex items-center">
                <div className="w-1/2 pr-12 text-right">
                  <div className="animate-fade-in-left">
                    <h3 className="text-3xl font-bold text-primary mb-2">2016</h3>
                    <p className="text-lg text-primary font-semibold mb-2">Celebrated 100 Years of Excellence</p>
                    <p className="text-foreground text-sm leading-relaxed">
                      Marked a century of continuous commitment to women's empowerment with enhanced research facilities, global partnerships, and expanded academic programs.
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-secondary rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg timeline-glow">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div className="w-1/2" />
              </div>

              {/* Item 6 - Right */}
              <div className="flex items-center">
                <div className="w-1/2" />
                <div className="w-8 h-8 bg-secondary rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center shadow-lg timeline-glow">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div className="w-1/2 pl-12">
                  <div className="animate-fade-in-right">
                    <h3 className="text-3xl font-bold text-primary mb-2">2026 & Beyond</h3>
                    <p className="text-lg text-primary font-semibold mb-2">Innovating for the Future</p>
                    <p className="text-foreground text-sm leading-relaxed">
                      Continuing our mission with cutting-edge research, international collaborations, and pioneering programs that prepare women for tomorrow's challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dual Row Infinite Scroll */}
      <section className="py-20 bg-muted overflow-hidden">
        <div className="max-w-full px-4 mb-12">
          <h2 className="text-4xl font-bold text-center text-primary max-w-6xl mx-auto">Student Testimonials</h2>
        </div>

        {/* Row 1 - Scroll Left to Right (loop back) */}
        <div className="mb-12 relative">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 animate-scroll-left-infinite">
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-full md:w-96 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{item.name}</h3>
                    <p className="text-sm text-secondary font-semibold">{item.program}</p>
                    <p className="text-xs text-muted-foreground">{item.company}</p>
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed italic">&quot;{item.testimonial}&quot;</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Scroll Right to Left (loop back) */}
        <div className="relative">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 animate-scroll-right-infinite">
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-full md:w-96 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{item.name}</h3>
                    <p className="text-sm text-secondary font-semibold">{item.program}</p>
                    <p className="text-xs text-muted-foreground">{item.company}</p>
                  </div>
                </div>
                <p className="text-foreground text-sm leading-relaxed italic">&quot;{item.testimonial}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-white/80">
          <p>&copy; 2026 SNDT Women's University. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
