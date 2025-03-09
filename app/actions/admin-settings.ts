"use server"

import { createServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

// API Keys Management
export async function getApiKeys() {
  try {
    const supabase = createServerClient()

    // Check if user is authenticated and has admin role
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Unauthorized" }
    }

    // Fetch API keys from Supabase
    const { data, error } = await supabase.from("api_keys").select("*").single()

    if (error) {
      console.error("Error fetching API keys:", error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      data: {
        RESEND_API_KEY: data?.resend_api_key || "",
        TWITTER_API_KEY: data?.twitter_api_key || "",
        LINKEDIN_API_KEY: data?.linkedin_api_key || "",
        FACEBOOK_API_KEY: data?.facebook_api_key || "",
      },
    }
  } catch (error: any) {
    console.error("Error getting API keys:", error)
    return { success: false, error: error.message }
  }
}

export async function updateApiKeys(keys: {
  RESEND_API_KEY: string
  TWITTER_API_KEY?: string
  LINKEDIN_API_KEY?: string
  FACEBOOK_API_KEY?: string
}) {
  try {
    const supabase = createServerClient()

    // Check if user is authenticated and has admin role
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Unauthorized" }
    }

    // Check if API keys record exists
    const { data: existingKeys } = await supabase.from("api_keys").select("id").limit(1)

    if (existingKeys && existingKeys.length > 0) {
      // Update existing record
      const { error } = await supabase
        .from("api_keys")
        .update({
          resend_api_key: keys.RESEND_API_KEY,
          twitter_api_key: keys.TWITTER_API_KEY || null,
          linkedin_api_key: keys.LINKEDIN_API_KEY || null,
          facebook_api_key: keys.FACEBOOK_API_KEY || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingKeys[0].id)

      if (error) {
        throw new Error(error.message)
      }
    } else {
      // Create new record
      const { error } = await supabase.from("api_keys").insert({
        resend_api_key: keys.RESEND_API_KEY,
        twitter_api_key: keys.TWITTER_API_KEY || null,
        linkedin_api_key: keys.LINKEDIN_API_KEY || null,
        facebook_api_key: keys.FACEBOOK_API_KEY || null,
      })

      if (error) {
        throw new Error(error.message)
      }
    }

    revalidatePath("/admin/settings")

    return { success: true }
  } catch (error: any) {
    console.error("Error updating API keys:", error)
    return { success: false, error: error.message }
  }
}

// Admin Users Management
export async function getAdminUsers() {
  try {
    const supabase = createServerClient()

    // Check if user is authenticated and has admin role
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Unauthorized" }
    }

    // Fetch admin users from Supabase
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) {
      console.error("Error fetching admin users:", error)
      return { success: false, error: error.message }
    }

    // Filter users with admin role
    const adminUsers = data.users
      .filter((user) => user.user_metadata?.role === "admin")
      .map((user) => ({
        id: user.id,
        email: user.email || "",
      }))

    return { success: true, data: adminUsers }
  } catch (error: any) {
    console.error("Error getting admin users:", error)
    return { success: false, error: error.message }
  }
}

export async function addAdminUser(userData: {
  email: string
  password: string
}) {
  try {
    const supabase = createServerClient()

    // Check if user is authenticated and has admin role
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Unauthorized" }
    }

    // Create new user
    const { data, error } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true,
      user_metadata: {
        role: "admin",
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath("/admin/settings")

    return { success: true, userId: data.user.id }
  } catch (error: any) {
    console.error("Error adding admin user:", error)
    return { success: false, error: error.message }
  }
}

export async function removeAdminUser(userId: string) {
  try {
    const supabase = createServerClient()

    // Check if user is authenticated and has admin role
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: "Unauthorized" }
    }

    // Delete user
    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
      throw new Error(error.message)
    }

    revalidatePath("/admin/settings")

    return { success: true }
  } catch (error: any) {
    console.error("Error removing admin user:", error)
    return { success: false, error: error.message }
  }
}

