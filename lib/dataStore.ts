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
  hoverVideo?: string
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

export interface TestimonialType {
  id?: string
  name: string
  program: string
  company: string
  testimonial: string
  sort_order?: number
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

  getTestimonials: async (): Promise<TestimonialType[]> => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, program, company, testimonial, sort_order")
      .order("sort_order", { ascending: true })

    if (error) return []

    return data || []
  },

  getBooksPage: async (
    page: number,
    pageSize: number = 24,
    filters: { category?: string | null; search?: string } = {},
  ): Promise<{ books: BookType[]; total: number }> => {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from("books")
      .select("id, title, author, category, description, cover_image_url, pdf_url", { count: "exact" })

    if (filters.category) {
      query = query.eq("category", filters.category)
    }

    if (filters.search && filters.search.trim()) {
      const term = filters.search.trim().replace(/[%_]/g, "\\$&")
      query = query.or(`title.ilike.%${term}%,author.ilike.%${term}%`)
    }

    const { data, error, count } = await query.order("title").range(from, to)

    if (error) return { books: [], total: 0 }

    return { books: data || [], total: count || 0 }
  },

  // Lightweight: fetches only the category column instead of full rows.
  getBookCategories: async (): Promise<string[]> => {
    const { data, error } = await supabase
      .from("books")
      .select("category")
      .not("category", "is", null)

    if (error) return []

    return Array.from(new Set((data || []).map((row: any) => row.category).filter(Boolean))) as string[]
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

  const [syllabus, setSyllabus] = useState<ProgramType[]>([])

  useEffect(() => {
    DataStore.getSyllabus().then(setSyllabus)
  }, [])

  return {
    syllabus
  }
}