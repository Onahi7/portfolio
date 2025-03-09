import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Create a Supabase client with the service role key for admin operations
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)

// Function to update Supabase Auth email templates
export const updateAuthEmailTemplates = async () => {
  try {
    // This requires the service role key and the Supabase Management API
    // In a real implementation, you would use the Supabase Management API
    // This is a placeholder showing the structure

    console.log("Updating Supabase Auth email templates...")

    // Example of how you would update the templates using the Supabase Management API
    /*
    const response = await fetch(
      `${process.env.SUPABASE_URL}/auth/v1/template/email`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        },
        body: JSON.stringify({
          type: 'confirmation',
          template: confirmationTemplate
        })
      }
    )
    
    if (!response.ok) {
      throw new Error(`Failed to update email template: ${response.statusText}`)
    }
    */

    return { success: true }
  } catch (error) {
    console.error("Error updating auth email templates:", error)
    return { success: false, error }
  }
}

// Function to create a new user with a specific role
export const createUserWithRole = async (
  email: string,
  password: string,
  userData: {
    first_name?: string
    last_name?: string
    role: "admin" | "developer" | "instructor" | "organizer" | "student" | "attendee"
  },
) => {
  try {
    // Create the user
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: userData.first_name,
        last_name: userData.last_name,
      },
    })

    if (userError) throw userError

    // Get the role ID
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from("roles")
      .select("id")
      .eq("name", userData.role)
      .single()

    if (roleError) throw roleError

    // Assign the role to the user
    const { error: assignRoleError } = await supabaseAdmin.from("user_roles").insert({
      user_id: userData.user.id,
      role_id: roleData.id,
    })

    if (assignRoleError) throw assignRoleError

    return { success: true, userId: userData.user.id }
  } catch (error) {
    console.error("Error creating user with role:", error)
    return { success: false, error }
  }
}

// Function to get all email templates
export const getEmailTemplates = async () => {
  try {
    const { data, error } = await supabaseAdmin.from("email_templates").select("*")

    if (error) throw error

    return { success: true, templates: data }
  } catch (error) {
    console.error("Error getting email templates:", error)
    return { success: false, error, templates: [] }
  }
}

// Function to update an email template
export const updateEmailTemplate = async (
  templateName: string,
  updates: {
    subject?: string
    html_content?: string
    text_content?: string
    variables?: any
  },
) => {
  try {
    const { error } = await supabaseAdmin.from("email_templates").update(updates).eq("name", templateName)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error updating email template:", error)
    return { success: false, error }
  }
}

// Function to log an email send
export const logEmailSend = async (data: {
  user_id?: string
  template_name: string
  recipient_email: string
  subject: string
  status: "sent" | "failed"
  error_message?: string
  metadata?: any
}) => {
  try {
    const { error } = await supabaseAdmin.from("email_logs").insert({
      user_id: data.user_id,
      template_name: data.template_name,
      recipient_email: data.recipient_email,
      subject: data.subject,
      status: data.status,
      error_message: data.error_message,
      metadata: data.metadata,
    })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error logging email send:", error)
    return { success: false, error }
  }
}

export default supabaseAdmin

