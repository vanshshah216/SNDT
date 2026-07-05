'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LegacyAdminDashboardRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/admin')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting to admin panel...</p>
    </div>
  )
}
