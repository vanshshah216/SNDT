'use client'

import { Navigation } from '@/components/navigation'
import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { useDataStore } from '@/lib/dataStore'

interface Subject {
  code: string
  name: string
  type: string
  credits: number
}

interface Semester {
  name: string
  subjects: Subject[]
}

export default function SyllabusPage() {
  const { syllabus } = useDataStore()
  const program = syllabus.find((p) => p.id === 'ma')

  const [activeSemester, setActiveSemester] = useState<string>('1st Semester')

  if (!program) return null

  return (
    <>
      <Navigation />

      {/* HERO (smaller) */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-10">
        <div className="w-full max-w-[1400px] mx-auto text-center px-8">
          <GraduationCap className="w-8 h-8 mx-auto mb-2" />
          <h1 className="text-3xl font-bold">Master of Arts (MA)</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">
            2-Year Postgraduate Programme • 4 Semesters
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="py-10 bg-background">
        <div className="w-full max-w-[1400px] mx-auto px-8 space-y-10">

          {/* SEMESTER BOX GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {program.semesters.map((sem: Semester) => (
              <button
                key={sem.name}
                onClick={() => setActiveSemester(sem.name)}
                className={`p-6 rounded-xl border text-center transition-all shadow-sm hover:shadow-md ${
                  activeSemester === sem.name
                    ? 'bg-primary text-white'
                    : 'bg-card hover:border-primary'
                }`}
              >
                <h3 className="font-semibold text-base">{sem.name}</h3>
                <p className="text-xs mt-1 opacity-80">
                  {sem.subjects.length} Courses
                </p>
              </button>
            ))}
          </div>

          {/* TABLE */}
          <div className="bg-card border rounded-xl shadow-md overflow-hidden w-full">

            {/* TABLE HEADER */}
            <div className="px-6 py-3 border-b bg-muted">
              <h2 className="text-lg font-semibold">{activeSemester}</h2>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-base table-fixed sm:table-auto">

                <thead className="bg-primary/10">
                  <tr className="text-left">
                    <th className="hidden sm:table-cell p-2 sm:p-4 font-semibold">Code</th>
                    <th className="p-2 sm:p-4 font-semibold">Course Name</th>
                    <th className="p-2 sm:p-4 font-semibold">Type</th>
                    <th className="p-2 sm:p-4 font-semibold text-center w-16 sm:w-auto">Credits</th>
                  </tr>
                </thead>

                <tbody>
                  {program.semesters
                    .find((s: Semester) => s.name === activeSemester)
                    ?.subjects.map((sub: Subject) => (
                      <tr
                        key={sub.code}
                        className="border-t bg-card hover:bg-muted/40 transition"
                      >
                        <td className="hidden sm:table-cell p-2 sm:p-4 font-mono text-sm text-muted-foreground">
                          {sub.code}
                        </td>

                        <td className="p-2 sm:p-4 font-medium text-sm sm:text-base break-words">
                          {sub.name}
                        </td>

                        <td className="p-2 sm:p-4 text-sm sm:text-base text-foreground/80 break-words">
                          {sub.type}
                        </td>

                        <td className="p-2 sm:p-4 text-center font-semibold text-sm sm:text-base">
                          {sub.credits}
                        </td>
                      </tr>
                    ))}
                </tbody>

              </table>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-white py-5 text-center text-sm">
        <p>&copy; 2026 SNDT Women's University</p>
      </footer>
    </>
  )
}