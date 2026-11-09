'use client'

import { Navigation } from '@/components/navigation'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Calendar, MapPin, X, ArrowLeft, Play } from 'lucide-react'
import { DataStore, EventType } from '@/lib/dataStore'

export default function EventHighlightsPage() {
  const [events, setEvents] = useState<EventType[]>([])
  const [mounted, setMounted] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [videoPlaying, setVideoPlaying] = useState<string | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const hoverRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  useEffect(() => {
    DataStore.getEvents().then((allEvents) => {
      setEvents(allEvents.filter(e => e.category === 'completed'))
      setMounted(true)
    })
  }, [])

  const handleMouseEnter = (eventId: string) => {
    if (hoverRefs.current[eventId]) {
      hoverRefs.current[eventId]!.play()
    }
  }

  const handleMouseLeave = (eventId: string) => {
    if (hoverRefs.current[eventId]) {
      hoverRefs.current[eventId]!.pause()
      hoverRefs.current[eventId]!.currentTime = 0
    }
  }

  const handleEventClick = (event: EventType) => {
    setSelectedEvent(event)
    setVideoPlaying(event.id)
  }

  if (!mounted) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/events" className="inline-flex items-center gap-2 text-emerald-100 hover:text-white transition mb-6">
            <ArrowLeft size={20} />
            Back to Events
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Event Highlights</h1>
          <p className="text-lg md:text-xl text-emerald-100">Relive the magic of our past events through videos and photos</p>
        </div>
      </section>

      {/* Event Highlights Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {events.map(event => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-slate-200 cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  {/* Video/Image Container */}
                  <div
                    className="relative h-80 bg-slate-900 overflow-hidden"
                    onMouseEnter={() => handleMouseEnter(event.id)}
                    onMouseLeave={() => handleMouseLeave(event.id)}
                  >
                    {/* Image */}
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
                    />

                    {/* Hover Video */}
                    {event.hoverVideo && (
                      <video
                        ref={el => { hoverRefs.current[event.id] = el }}
                        src={event.hoverVideo}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        muted
                        loop
                      />
                    )}

                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                        <Play size={28} className="text-emerald-600 fill-emerald-600" />
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-semibold">
                      Highlights
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-emerald-600 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={16} className="text-emerald-600 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{event.location}</span>
                      </div>
                    </div>

                    {/* Gallery Preview */}
                    {event.gallery && event.gallery.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-500 font-semibold mb-2">Gallery ({event.gallery.length} photos)</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {event.gallery.slice(0, 3).map((image, idx) => (
                            <div key={idx} className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden border border-slate-300">
                              <img src={image} alt={`Gallery ${idx}`} loading="lazy" className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {event.gallery.length > 3 && (
                            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-slate-200 flex items-center justify-center border border-slate-300">
                              <span className="text-xs font-bold text-slate-600">+{event.gallery.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Event Highlights Yet</h3>
              <p className="text-slate-600 mb-6">Highlights from completed events will appear here</p>
              <Link href="/events" className="inline-block px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition">
                Back to Events
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal with Video */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl">
            {/* Close Button */}
            <div className="sticky top-0 flex justify-end p-4 bg-slate-50 border-b border-slate-200 z-10">
              <button
                onClick={() => {
                  setSelectedEvent(null)
                  setVideoPlaying(null)
                }}
                className="p-2 hover:bg-slate-200 rounded-lg transition"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            <div className="max-h-[85vh] overflow-y-auto">
              <div className="p-8 space-y-6">
                {/* Video Player */}
                {selectedEvent.videoUrl && (
                  <div className="w-full">
                    <div className="relative w-full bg-slate-900 rounded-xl overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                      <video
                        key={selectedEvent.id}
                        controls
                        autoPlay
                        className="w-full h-full"
                        crossOrigin="anonymous"
                      >
                        <source src={selectedEvent.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                {/* Event Header */}
                <div className="pt-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{selectedEvent.title}</h2>
                  <p className="text-slate-600 text-base leading-relaxed">{selectedEvent.description}</p>
                </div>

                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold mb-1">DATE & TIME</p>
                    <p className="text-base font-bold text-slate-900">{selectedEvent.date}</p>
                    <p className="text-sm text-slate-600">{selectedEvent.time}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold mb-1">LOCATION</p>
                    <p className="text-base font-bold text-slate-900">{selectedEvent.location}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">About This Event</h3>
                  <p className="text-slate-600 leading-relaxed text-base">{selectedEvent.fullDescription}</p>
                </div>

                {/* Photo Gallery */}
                {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedEvent.gallery.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative overflow-hidden rounded-lg border border-slate-200 aspect-square group"
                        >
                          <img
                            src={image}
                            alt={`Gallery ${idx}`}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <div className="pt-2 pb-4">
                  <button
                    onClick={() => {
                      setSelectedEvent(null)
                      setVideoPlaying(null)
                    }}
                    className="w-full px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-400">
          <p>&copy; 2026 SNDT Women's University. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
