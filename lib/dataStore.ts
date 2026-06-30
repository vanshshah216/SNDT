'use client'

import { useState, useEffect } from "react"
import { createClient } from "./supabase/client"

const supabase = createClient()

/* ---------------- TYPES ---------------- */

export interface EventType {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  fullDescription: string
  category: "upcoming" | "completed"
  agenda: string[]
  image: string
  invitationCard?: string
  gallery?: string[]
  videoUrl?: string
}

export interface AchievementType {
  id: string
  title: string
  description: string
  date: string
  image: string
  category?: string
}

export interface FacultyType {
  id: string
  name: string
  designation: string
  department: string
  email: string
  image: string
  bio: string
}

export interface BookType {
  id: string
  title: string
  author: string
  category: string
  description: string
  cover_image_url: string
  pdf_url: string
}

/* ---------------- SYLLABUS TYPES ---------------- */

export interface SubjectType {
  code: string
  name: string
  type: string
  credits: number
}

export interface SemesterType {
  name: string
  subjects: SubjectType[]
}

export interface ProgramType {
  id: string
  title: string
  description: string
  color: string
  semesters: SemesterType[]
}

/* ---------------- DATASTORE ---------------- */

export const DataStore = {

  /* ---------- EVENTS (UPDATED ✅) ---------- */

  getEvents: async (): Promise<EventType[]> => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true })

    if (error) {
      console.error("Events Error:", error)
      return []
    }

    return (data || []).map((event: any) => ({
      id: event.id,
      title: event.title,
      date: event.event_date,
      time: `${event.start_time || ""}${event.end_time ? " - " + event.end_time : ""}`,
      location: event.location,
      description: event.description,
      fullDescription: event.full_description || event.description,
      category: event.category,
      image: event.image_url,
      invitationCard: event.invitation_card_url,
      videoUrl: event.video_url,
      gallery: event.gallery || [],
      agenda: []
    }))
  },

  getUpcomingEvents: async (): Promise<EventType[]> => {
    const events = await DataStore.getEvents()
    return events.filter(e => e.category === "upcoming")
  },

  getEventHighlights: async (): Promise<EventType[]> => {
    const events = await DataStore.getEvents()
    return events.filter(e => e.category === "completed")
  },

  /* ---------- OTHER ---------- */

  getAchievements: async (): Promise<AchievementType[]> => {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")

    if (error) return []

    return (data || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.short_description,
      date: item.date,
      image: item.image_url,
      category: item.category
    }))
  },

  getFaculty: async (): Promise<FacultyType[]> => {
    const { data, error } = await supabase
      .from("faculty")
      .select("*")

    if (error) return []

    return data || []
  },

  getBooks: async (): Promise<BookType[]> => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("title")

    if (error) return []

    return data || []
  },

  /* ---------- SYLLABUS ---------- */

  getSyllabus: async (): Promise<ProgramType[]> => {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")

    if (error || !data || data.length === 0) return []

    const latestYear = Math.max(...data.map((item: any) => item.syllabus_year))
    const filtered = data.filter((item: any) => item.syllabus_year === latestYear)

    const programsMap: any = {
      ba: {
        id: 'ba',
        title: 'Bachelor of Arts',
        description: '2-Year Program | Humanities & Social Sciences',
        color: 'from-blue-500 to-blue-600',
        semesters: {}
      },
      ma: {
        id: 'ma',
        title: 'Master of Arts',
        description: '2-Year Program | Advanced Research & Specialization',
        color: 'from-purple-500 to-purple-600',
        semesters: {}
      }
    }

    filtered.forEach((item: any) => {
      const programKey = item.program.toLowerCase()

      const semMap: any = {
        1: "1st Semester",
        2: "2nd Semester",
        3: "3rd Semester",
        4: "4th Semester"
      }

      const semName = semMap[item.semester]

      if (!programsMap[programKey].semesters[semName]) {
        programsMap[programKey].semesters[semName] = {
          name: semName,
          subjects: []
        }
      }

      programsMap[programKey].semesters[semName].subjects.push({
        code: item.code,
        name: item.name,
        type: item.type,
        credits: item.credits
      })
    })

    return Object.values(programsMap).map((program: any) => ({
      ...program,
      semesters: Object.values(program.semesters)
    }))
  }
}

/* ---------------- HOOK ---------------- */

export const useDataStore = () => {

  const [books, setBooks] = useState<BookType[]>([])
  const [syllabus, setSyllabus] = useState<ProgramType[]>([])

  useEffect(() => {
    DataStore.getBooks().then(setBooks)
    DataStore.getSyllabus().then(setSyllabus)
  }, [])

  return {
    books,
    syllabus
  }
}