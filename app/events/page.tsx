'use client'

import { Navigation } from '@/components/navigation'
import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, X, Play, Maximize2, ArrowLeft, Download, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { DataStore, EventType } from '@/lib/dataStore'

// Dummy data for demonstration
const DUMMY_UPCOMING_EVENTS: EventType[] = [
  {
    id: '1',
    title: 'Annual Faculty Seminar 2025',
    date: 'March 28, 2025',
    time: '10:00 AM - 5:00 PM',
    location: 'Main Auditorium, SNDT Campus',
    description: 'Join us for an inspiring day of knowledge sharing and professional development.',
    fullDescription: 'An immersive full-day seminar featuring keynote speakers from leading institutions, interactive workshops, and networking sessions. This event brings together faculty from across departments to explore emerging trends in education.',
    category: 'upcoming',
    agenda: ['Opening Ceremony', 'Keynote Address', 'Workshop Sessions', 'Lunch Break', 'Panel Discussion', 'Closing Ceremony'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    invitationCard: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    title: 'Student Innovation Summit',
    date: 'April 5, 2025',
    time: '2:00 PM - 6:00 PM',
    location: 'Innovation Hub, Building C',
    description: 'Showcase your brilliant ideas and compete for exciting prizes.',
    fullDescription: 'A platform for students to present innovative projects across technology, sustainability, and social impact. Meet industry experts and potential mentors who can help shape your entrepreneurial journey.',
    category: 'upcoming',
    agenda: ['Project Registration', 'Idea Pitches', 'Expert Feedback', 'Winner Announcement'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    invitationCard: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    title: 'Cultural Evening Gala',
    date: 'April 15, 2025',
    time: '6:30 PM - 9:30 PM',
    location: 'Grand Hall, SNDT Campus',
    description: 'An evening celebrating diverse talents and cultural expressions.',
    fullDescription: 'Experience an evening of art, music, dance, and theatre showcasing the diverse talents within our community. A beautiful celebration of culture and creativity.',
    category: 'upcoming',
    agenda: ['Welcome Reception', 'Cultural Performances', 'Dance Performances', 'Dinner & Networking'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop',
    invitationCard: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'
  }
]

const DUMMY_HIGHLIGHTS: EventType[] = [
  {
    id: 'h1',
    title: 'Annual Convocation 2024',
    date: 'February 10, 2024',
    time: '10:00 AM',
    location: 'Main Campus Grounds',
    description: 'Celebrating academic excellence and inspiring future leaders.',
    fullDescription: 'Our prestigious convocation brought together graduates, faculty, and dignitaries for a day of celebration, awards, and inspiration. Over 500 students graduated and received recognition for their achievements.',
    category: 'completed',
    image: 'https://images.unsplash.com/photo-1540575467063-178f50c1a1c7?w=800&h=500&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178f50c1a1c7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop'
    ],
    videoUrl: 'https://videos.unsplash.com/output-H1sD1R2HK-unsplash.mp4',
    agenda: []
  },
  {
    id: 'h2',
    title: 'Research & Innovation Fair',
    date: 'January 20, 2024',
    time: '9:00 AM',
    location: 'Exhibition Center',
    description: 'Showcasing groundbreaking research projects and innovations.',
    fullDescription: 'A comprehensive exhibition featuring 50+ research projects from our faculty and students. Interactive demonstrations, poster presentations, and awards ceremony celebrated the outstanding contributions to knowledge advancement.',
    category: 'completed',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415cff?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop'
    ],
    videoUrl: 'https://videos.unsplash.com/output-H1sD1R2HK-unsplash.mp4',
    agenda: []
  }
]

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([])
  const [highlightedEvents, setHighlightedEvents] = useState<EventType[]>([])
  const [mounted, setMounted] = useState(false)
  const [selectedInvitation, setSelectedInvitation] = useState<EventType | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [galleryImageIndex, setGalleryImageIndex] = useState<number>(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryZoom, setGalleryZoom] = useState(100)

  useEffect(() => {
    const loadEvents = async () => {
      // Try to load from database, fallback to dummy data
      let upcoming = await DataStore.getUpcomingEvents()
      let highlights = await DataStore.getEventHighlights()

      // Use dummy data if no real data exists
     console.log("UPCOMING FROM DB:", upcoming)
console.log("HIGHLIGHTS FROM DB:", highlights)

      setUpcomingEvents(upcoming)
      setHighlightedEvents(highlights)
      setMounted(true)
    }

    loadEvents()
  }, [])

  // Handle ESC key to close lightbox and modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedGalleryImage) {
          setSelectedGalleryImage(null)
        } else if (isGalleryOpen) {
          setIsGalleryOpen(false)
          setSelectedEvent(null)
        } else if (selectedEvent) {
          setSelectedEvent(null)
        } else if (isFullscreen) {
          setIsFullscreen(false)
        } else if (selectedInvitation) {
          setSelectedInvitation(null)
        }
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [selectedGalleryImage, isGalleryOpen, selectedEvent, isFullscreen, selectedInvitation])

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading events...</p>
      </div>
    </div>
  )

  return (
    <>
      <Navigation />

      {/* Hero Section - Compact */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white py-10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Events
            </h1>
            <p className="text-sm text-white/80 max-w-xl">
              Explore upcoming experiences and relive memorable moments
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-10 bg-gradient-to-b from-yellow-50 via-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Upcoming Events</h2>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedInvitation(event)}
                  className="group text-left h-full cursor-pointer"
                >
                  <div className="relative h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-red-400 flex flex-col">
                    {/* Image Container */}
                    <div className="relative h-40 overflow-hidden bg-slate-100">
                      <img
                        src={event.invitationCard || event.image}
                        alt={event.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-xs leading-relaxed mb-3 line-clamp-2 flex-grow">
                        {event.description}
                      </p>

                      {/* Details */}
                      <div className="space-y-1 mb-3 pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar size={13} className="text-red-700 flex-shrink-0" />
                          <span className="text-slate-700">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Clock size={13} className="text-red-700 flex-shrink-0" />
                          <span className="text-slate-700">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin size={13} className="text-red-700 flex-shrink-0" />
                          <span className="text-slate-700 line-clamp-1">{event.location}</span>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="w-full px-3 py-2 bg-red-700 text-white text-xs font-bold rounded-md hover:bg-red-800 transition-colors text-center cursor-pointer">
                        View
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 text-sm">No upcoming events</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className="py-10 bg-gradient-to-b from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-red-900">Event Highlights</h2>
          </div>

          {highlightedEvents.length > 0 ? (
            <div className="space-y-4">
              {highlightedEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-200 hover:border-red-400"
                >
                  <div className="grid md:grid-cols-4 gap-0">
                    {/* Media Side */}
                    <button
                      onClick={() => {
                        setSelectedEvent(event)
                        setIsGalleryOpen(true)
                        setGalleryImageIndex(0)
                      }}
                      className="relative md:col-span-2 h-56 overflow-hidden bg-slate-900 cursor-pointer group"
                    >
                      {event.videoUrl ? (
                        <video
                          src={event.videoUrl}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <Play size={20} className="text-red-800 fill-red-800 ml-1" />
                        </div>
                      </div>
                    </button>

                    {/* Content Side */}
                    <div className="md:col-span-2 p-5 flex flex-col justify-between">
                      {/* Title & Description */}
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          {event.title}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-1 mb-3 pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar size={13} className="text-red-700 flex-shrink-0" />
                          <span className="text-slate-700">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <MapPin size={13} className="text-red-700 flex-shrink-0" />
                          <span className="text-slate-700">{event.location}</span>
                        </div>
                      </div>

                      {/* Gallery Grid - All Images Visible */}
                      {event.gallery && event.gallery.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-slate-600 mb-2">Photos ({event.gallery.length})</p>
                          <div className="grid grid-cols-4 gap-1">
                            {event.gallery.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedEvent(event)
                                  setIsGalleryOpen(true)
                                  setGalleryImageIndex(idx)
                                }}
                                className="relative w-full aspect-square rounded overflow-hidden border border-slate-300 hover:border-red-500 transition-all hover:scale-110 group/thumb"
                              >
                                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/40 transition-colors"></div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Play className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 text-sm">No highlights yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 to-red-800 text-white py-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs text-white/70">
          <p>&copy; 2026 SNDT Women's University. All rights reserved.</p>
        </div>
      </footer>

      {/* Event Details Modal */}
      {selectedInvitation && !isFullscreen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
              <button
                onClick={() => setSelectedInvitation(null)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition text-sm font-medium"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <h3 className="text-lg font-bold text-center flex-1 line-clamp-1">
                {selectedInvitation.title}
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = selectedInvitation.invitationCard || selectedInvitation.image
                    link.download = `${selectedInvitation.title}.jpg`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                  title="Download"
                >
                  <Download size={18} />
                </button>

                <button
                  onClick={() => setIsFullscreen(true)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                  title="Fullscreen"
                >
                  <Maximize2 size={18} />
                </button>

                <button
                  onClick={() => setSelectedInvitation(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="bg-black flex items-center justify-center h-[70vh]">
              {selectedInvitation.videoUrl ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src={selectedInvitation.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={selectedInvitation.invitationCard || selectedInvitation.image}
                  alt={selectedInvitation.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      {selectedInvitation && isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {selectedInvitation.videoUrl ? (
            <video
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              <source src={selectedInvitation.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              src={selectedInvitation.invitationCard || selectedInvitation.image}
              alt={selectedInvitation.title}
              className="w-full h-full object-contain"
            />
          )}

          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            <X className="text-white" size={24} />
          </button>
        </div>
      )}

      {/* Full Gallery Viewer Modal */}
      {isGalleryOpen && selectedEvent && selectedEvent.gallery && (
        <div className="fixed inset-0 bg-black/98 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <button
              onClick={() => {
                setIsGalleryOpen(false)
                setSelectedEvent(null)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <span className="text-white text-sm font-medium">
              {galleryImageIndex + 1} / {selectedEvent.gallery.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setGalleryZoom(Math.max(100, galleryZoom - 20))}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white text-sm font-medium"
              >
                −
              </button>
              <button
                onClick={() => setGalleryZoom(100)}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white text-sm font-medium"
              >
                Reset
              </button>
              <button
                onClick={() => setGalleryZoom(Math.min(300, galleryZoom + 20))}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white text-sm font-medium"
              >
                +
              </button>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Image Viewer */}
          <div className="flex-1 overflow-auto flex items-center justify-center">
            <img
              src={selectedEvent.gallery[galleryImageIndex]}
              alt={`Gallery ${galleryImageIndex}`}
              style={{
                width: `${galleryZoom}%`,
                height: `${galleryZoom}%`,
                objectFit: 'contain'
              }}
              className="max-w-full max-h-full transition-all"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-4 border-t border-white/10">
            <button
              onClick={() => setGalleryImageIndex(Math.max(0, galleryImageIndex - 1))}
              disabled={galleryImageIndex === 0}
              className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded-lg transition text-white"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto px-4 max-w-3xl">
              {selectedEvent.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryImageIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === galleryImageIndex
                      ? 'border-white scale-105'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setGalleryImageIndex(Math.min((selectedEvent.gallery?.length ?? 1) - 1, galleryImageIndex + 1))}
              disabled={galleryImageIndex === (selectedEvent.gallery?.length ?? 1) - 1}
              className="p-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 rounded-lg transition text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Event Details Modal - Premium Design */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-w-6xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl my-8">
            {/* Header Bar */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-200 rounded-lg transition text-sm font-semibold text-slate-900"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              <h2 className="text-xl font-bold flex-1 text-center line-clamp-1 text-slate-900">{selectedEvent.title}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2.5 hover:bg-slate-200 rounded-lg transition text-slate-900"
              >
                <X size={22} />
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-3 gap-0">
              {/* Video/Image Panel - Larger */}
              <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center h-96 md:h-auto relative z-10">
                {selectedEvent.videoUrl ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain pointer-events-auto"
                  >
                    <source src={selectedEvent.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Info Panel */}
              <div className="md:col-span-1 p-6 overflow-y-auto max-h-[75vh] flex flex-col bg-slate-50">
                {/* Details Section */}
                <div className="mb-6 pb-6 border-b border-slate-200">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Date</p>
                        <p className="text-slate-900 font-semibold">{selectedEvent.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Location</p>
                        <p className="text-slate-900 font-semibold text-sm">{selectedEvent.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">About</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {selectedEvent.fullDescription || selectedEvent.description}
                  </p>
                </div>

                {/* Gallery Section */}
                {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                  <div className="relative z-20">
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">Gallery ({selectedEvent.gallery.length})</h4>
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {selectedEvent.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            // Gallery images are always clickable
                            setSelectedGalleryImage(img)
                            // Pause video if playing
                            const videoElement = document.querySelector('video') as HTMLVideoElement
                            if (videoElement && !videoElement.paused) {
                              videoElement.pause()
                            }
                          }}
                          className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-slate-300 hover:border-emerald-500 hover:shadow-lg transition-all hover:scale-110 cursor-pointer group"
                          title="Click to view full image"
                        >
                          <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <ImageIcon size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Viewer */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg flex-1">Gallery Image</h3>
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center bg-black/50 rounded-xl overflow-hidden">
              <img
                src={selectedGalleryImage}
                alt="Lightbox"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Close Button with ESC hint */}
            <div className="mt-4 text-center text-white/70 text-sm">
              Press ESC or click the X button to close
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Gallery Container */}
      <div data-gallery-container className="fixed inset-0 bg-black z-[100] hidden items-center justify-center" style={{display: 'none'}}>
        {selectedGalleryImage && (
          <>
            <img
              src={selectedGalleryImage}
              alt="Fullscreen"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 p-3 bg-white/20 hover:bg-white/30 rounded-lg transition text-white"
            >
              <X size={28} />
            </button>
          </>
        )}
      </div>
    </>
  )
}
