'use client'

import { Navigation } from '@/components/navigation'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react'

const COLLEGE_ADDRESS = "SNDT Women's University, Pune - 411001, Maharashtra, India"
const MAPS_LAT = 18.5083
const MAPS_LNG = 73.8564
const MAPS_QUERY = encodeURIComponent(COLLEGE_ADDRESS)
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_LAT},${MAPS_LNG}&hl=en&z=16&output=embed`
const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ✅ REAL SUBMIT (CONNECTED TO API)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      })

      if (res.ok) {
        setSubmitMessage('Message sent successfully!')
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' })
      } else {
        const data = await res.json().catch(() => ({}))
        setSubmitMessage(data.error || 'Failed to send message')
      }

    } catch (error) {
      setSubmitMessage('Error sending message')
    }

    setIsSubmitting(false)

    setTimeout(() => setSubmitMessage(''), 3000)
  }

  return (
    <>
      <Navigation />

      <section className="bg-primary text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-100">
            Get in touch with us for admissions, inquiries, or collaborations
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">

            {/* LEFT INFO (UNCHANGED) */}
            <div className="md:col-span-1 space-y-6">

              <div className="flex gap-4">
                <MapPin className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold">Address</h3>
                  <a
                    href={MAPS_LINK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {COLLEGE_ADDRESS}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p>+91 (22) 6669-0001</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p>info@sndt.edu.in</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock />
                <div>
                  <h3 className="font-bold">Office Hours</h3>
                  <p>Mon - Fri: 9AM - 5PM</p>
                </div>
              </div>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="px-4 py-3 border rounded"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="px-4 py-3 border rounded"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="px-4 py-3 border rounded"
                />

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border rounded"
                >
                  <option value="">Select Subject</option>
                  <option value="admission">Admission</option>
                  <option value="general">General</option>
                </select>
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 border rounded"
              />

              {submitMessage && <p>{submitMessage}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 py-3 font-bold"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

            </form>

          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Find Us on the Map</h2>
            <p className="text-muted-foreground">{COLLEGE_ADDRESS}</p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg border bg-white">
            <iframe
              title="SNDT Women's University location"
              src={MAPS_EMBED_URL}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="fullscreen"
            />
          </div>
          <div className="mt-6 text-center">
            <a href={MAPS_LINK_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition">
              Open in Google Maps
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}