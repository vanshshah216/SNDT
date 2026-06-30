'use client'

import { Navigation } from '@/components/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, ArrowLeft, Share2, X, Users, FileText } from 'lucide-react'
import { DataStore, EventType } from '@/lib/dataStore'

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventType[]>([])
  const [mounted, setMounted] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)

  useEffect(() => {
    const allEvents = DataStore.getEvents()
    setEvents(allEvents.filter(e => e.category === 'upcoming'))
    setMounted(true)
  }, [])

  if (!mounted) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/events" className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition mb-6">
            <ArrowLeft size={20} />
            Back to Events
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg md:text-xl text-blue-100">Mark your calendars and join us for these amazing experiences</p>
        </div>
      </section>

      {/* Invitation Cards Grid */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="group h-full text-left"
                >
                  {/* Premium Invitation Card */}
                  <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200/50 hover:border-blue-300/50">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"></div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative p-8 flex flex-col h-full">
                      {/* Header Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-bold tracking-wide border border-blue-200">
                          ✦ Upcoming Event
                        </span>
                        <span className="text-2xl font-light text-slate-300">№{event.id}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>

                      {/* Decorative line */}
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent mb-4"></div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                        {event.description}
                      </p>

                      {/* Details Section */}
                      <div className="space-y-3 mb-6 pb-6 border-b border-slate-200/60">
                        {/* Date */}
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
                            <Calendar size={16} className="text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Date</p>
                            <p className="text-slate-900 font-semibold">{event.date}</p>
                          </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-50">
                            <Clock size={16} className="text-indigo-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Time</p>
                            <p className="text-slate-900 font-semibold">{event.time}</p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50">
                            <MapPin size={16} className="text-cyan-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Venue</p>
                            <p className="text-slate-900 font-semibold truncate">{event.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEvent(event)
                          }}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          View Details
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Upcoming Events</h3>
              <p className="text-slate-600 mb-6">Check back soon for new events</p>
              <Link href="/events" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Back to Events
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="relative h-48 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20"></div>

              {/* Close button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedEvent.title}</h2>
                <p className="text-blue-100 line-clamp-2">{selectedEvent.description}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="p-8 space-y-8">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <Calendar size={20} className="text-blue-600 mb-2" />
                    <p className="text-xs text-blue-600 font-semibold mb-1">DATE</p>
                    <p className="text-sm font-bold text-slate-900">{selectedEvent.date}</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
                    <Clock size={20} className="text-indigo-600 mb-2" />
                    <p className="text-xs text-indigo-600 font-semibold mb-1">TIME</p>
                    <p className="text-sm font-bold text-slate-900">{selectedEvent.time}</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-4 border border-cyan-200">
                    <MapPin size={20} className="text-cyan-600 mb-2" />
                    <p className="text-xs text-cyan-600 font-semibold mb-1">VENUE</p>
                    <p className="text-sm font-bold text-slate-900 line-clamp-2">{selectedEvent.location}</p>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText size={20} className="text-slate-600" />
                    <h3 className="text-lg font-bold text-slate-900">About This Event</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{selectedEvent.fullDescription}</p>
                </div>

                {/* Agenda Section */}
                {selectedEvent.agenda && selectedEvent.agenda.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users size={20} className="text-slate-600" />
                      <h3 className="text-lg font-bold text-slate-900">Event Agenda</h3>
                    </div>
                    <div className="space-y-2">
                      {selectedEvent.agenda.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex-shrink-0">
                            {idx + 1}
                          </div>
                          <p className="text-slate-700 pt-1">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Register Now
                  </button>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
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
