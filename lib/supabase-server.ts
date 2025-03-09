import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { cache } from "react"
import { redirect } from "next/navigation"
import type { Database } from "@/types/supabase"

// Create a cached version of the Supabase client for server components
export const createClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

// Create a cached Supabase server client
export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

// Get the current session
export async function getSession() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

// Get the current user
export async function getCurrentUser() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

// Get the current user with profile data
export async function getUserWithProfile() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    // Get the user's profile data
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    return {
      ...user,
      profile,
    }
  } catch (error) {
    console.error("Error getting user with profile:", error)
    return null
  }
}

// Require authentication - redirect to login if not authenticated
export async function requireAuth(redirectTo = "/login") {
  const session = await getSession()

  if (!session) {
    redirect(redirectTo)
  }

  return session
}

// Require admin role - redirect to login if not admin
export async function requireAdmin(redirectTo = "/login") {
  const supabase = createServerSupabaseClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect(redirectTo)
    }

    // Check if user has admin role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || profile.role !== "admin") {
      redirect("/unauthorized")
    }

    return user
  } catch (error) {
    console.error("Error checking admin role:", error)
    redirect(redirectTo)
  }
}

