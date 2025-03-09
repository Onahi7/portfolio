import type React from "react"
import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase-server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  // Check if user is authenticated and has admin role
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Fetch user metadata to check for admin role
  const { data: user } = await supabase.auth.getUser()
  const isAdmin = user?.user?.user_metadata?.role === "admin"

  if (!isAdmin) {
    redirect("/")
  }

  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
}

