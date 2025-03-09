import supabaseAdmin from "./supabase-admin"

// Initialize email service (e.g., Resend, SendGrid, etc.)
// This is a placeholder for the actual email service implementation
const emailService = {
  send: async (options: {
    to: string | string[]
    subject: string
    html: string
    text?: string
    from?: string
    replyTo?: string
  }) => {
    // In a real implementation, you would use an email service like Resend or SendGrid
    console.log("Sending email:", options)

    // Simulate successful email sending
    return { success: true, messageId: `mock-${Date.now()}` }
  },
}

// Function to send an email using a template
export const sendTemplatedEmail = async (
  templateName: string,
  to: string | string[],
  data: Record<string, any>,
  options?: {
    from?: string
    replyTo?: string
    userId?: string
  },
) => {
  try {
    // Get the template from the database
    const { data: templates, error } = await supabaseAdmin
      .from("email_templates")
      .select("*")
      .eq("name", templateName)
      .single()

    if (error) throw error

    // Replace template variables with actual data
    let htmlContent = templates.html_content
    let textContent = templates.text_content || ""
    let subject = templates.subject

    // Replace variables in the subject
    Object.entries(data).forEach(([key, value]) => {
      subject = subject.replace(new RegExp(`{{${key}}}`, "g"), value)
    })

    // Replace variables in the HTML content
    Object.entries(data).forEach(([key, value]) => {
      htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, "g"), value)
      if (textContent) {
        textContent = textContent.replace(new RegExp(`{{${key}}}`, "g"), value)
      }
    })

    // Send the email
    const result = await emailService.send({
      to,
      subject,
      html: htmlContent,
      text: textContent,
      from: options?.from || "Hardy Technology <no-reply@hardytechnology.xyz>",
      replyTo: options?.replyTo,
    })

    // Log the email send
    await supabaseAdmin.from("email_logs").insert({
      user_id: options?.userId,
      template_name: templateName,
      template_id: templates.id,
      recipient_email: Array.isArray(to) ? to.join(", ") : to,
      subject,
      status: result.success ? "sent" : "failed",
      metadata: { data },
    })

    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Error sending templated email:", error)

    // Log the failed email send
    try {
      await supabaseAdmin.from("email_logs").insert({
        user_id: options?.userId,
        template_name: templateName,
        recipient_email: Array.isArray(to) ? to.join(", ") : to,
        subject: `Failed to send ${templateName} email`,
        status: "failed",
        error_message: error.message,
        metadata: { data },
      })
    } catch (logError) {
      console.error("Error logging email failure:", logError)
    }

    return { success: false, error }
  }
}

// Specific email sending functions

// Send welcome email
export const sendWelcomeEmail = async (
  to: string,
  data: {
    name: string
    confirmationUrl: string
  },
  options?: {
    userId?: string
  },
) => {
  return sendTemplatedEmail("welcome", to, data, options)
}

// Send password reset email
export const sendPasswordResetEmail = async (
  to: string,
  data: {
    name: string
    resetUrl: string
  },
  options?: {
    userId?: string
  },
) => {
  return sendTemplatedEmail("password_reset", to, data, options)
}

// Send event registration confirmation email
export const sendEventRegistrationEmail = async (
  to: string,
  data: {
    name: string
    eventTitle: string
    eventDate: string
    eventLocation: string
    eventDetails: string
    ticketUrl: string
  },
  options?: {
    userId?: string
  },
) => {
  return sendTemplatedEmail("event_registration", to, data, options)
}

// Send payment confirmation email
export const sendPaymentConfirmationEmail = async (
  to: string,
  data: {
    name: string
    amount: number
    paymentDate: string
    paymentMethod: string
    invoiceNumber: string
    invoiceUrl: string
    itemsPurchased: Array<{ name: string; price: number }>
  },
  options?: {
    userId?: string
  },
) => {
  return sendTemplatedEmail("payment_confirmation", to, data, options)
}

// Send course enrollment email
export const sendCourseEnrollmentEmail = async (
  to: string,
  data: {
    name: string
    courseName: string
    courseStartDate: string
    instructorName: string
    courseUrl: string
    prerequisites: string[]
  },
  options?: {
    userId?: string
  },
) => {
  return sendTemplatedEmail("course_enrollment", to, data, options)
}

// Send event approval email
export const sendEventApprovalEmail = async (
  to: string,
  data: {
    organizerName: string
    eventTitle: string
    eventDate: string
    eventLocation: string
    eventUrl: string
    adminComments?: string
  },
  options?: {
    userId?: string
  },
) => {
  return sendTemplatedEmail("event_approval", to, data, options)
}

// Function to initialize Supabase Auth email templates
export const initializeSupabaseAuthTemplates = async () => {
  try {
    // In a real implementation, you would use the Supabase Management API
    // This is a placeholder showing the structure

    console.log("Initializing Supabase Auth email templates...")

    // Example of how you would update the templates using the Supabase Management API
    /*
    const templates = supabaseTemplates
    
    // Update confirmation template
    await updateAuthEmailTemplate('confirmation', templates.confirmationTemplate)
    
    // Update magic link template
    await updateAuthEmailTemplate('magiclink', templates.magicLinkTemplate)
    
    // Update reset password template
    await updateAuthEmailTemplate('recovery', templates.resetPasswordTemplate)
    
    // Update invite template
    await updateAuthEmailTemplate('invite', templates.inviteTemplate)
    
    // Update email change template
    await updateAuthEmailTemplate('change_email', templates.emailChangeTemplate)
    */

    return { success: true }
  } catch (error) {
    console.error("Error initializing Supabase Auth email templates:", error)
    return { success: false, error }
  }
}

// Helper function to update a specific Supabase Auth email template
const updateAuthEmailTemplate = async (type: string, template: string) => {
  // In a real implementation, you would use the Supabase Management API
  // This is a placeholder showing the structure

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
        type,
        template
      })
    }
  )
  
  if (!response.ok) {
    throw new Error(`Failed to update ${type} email template: ${response.statusText}`)
  }
  */

  return { success: true }
}

