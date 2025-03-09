import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { sendPaymentConfirmationEmail } from "@/lib/email-service"
import supabaseAdmin from "@/lib/supabase-admin"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Verify the webhook signature (in a real implementation)
    // const signature = request.headers.get('x-paystack-signature')
    // if (!verifySignature(payload, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    // Handle different event types
    const eventType = payload.event

    if (eventType === "charge.success") {
      // A payment has been successfully processed
      const data = payload.data

      // Update the payment record in the database
      const { error: updateError } = await supabaseAdmin
        .from("payments")
        .update({
          payment_status: "successful",
          payment_date: new Date().toISOString(),
          gateway_response: data,
        })
        .eq("payment_reference", data.reference)

      if (updateError) throw updateError

      // Get the payment details
      const { data: paymentData, error: paymentError } = await supabaseAdmin
        .from("payments")
        .select("*, user_id(email, profiles(first_name, last_name)), related_type, related_id")
        .eq("payment_reference", data.reference)
        .single()

      if (paymentError) throw paymentError

      // Handle different payment types
      if (paymentData.related_type === "event") {
        // Update the event registration
        await supabaseAdmin
          .from("event_registrations")
          .update({
            payment_status: "paid",
            payment_date: new Date().toISOString(),
          })
          .eq("payment_reference", data.reference)

        // Get the event details
        const { data: eventData, error: eventError } = await supabaseAdmin
          .from("events")
          .select("*")
          .eq("id", paymentData.related_id)
          .single()

        if (eventError) throw eventError

        // Send payment confirmation email
        await sendPaymentConfirmationEmail(
          paymentData.user_id.email,
          {
            name: paymentData.user_id.profiles.first_name || paymentData.user_id.email.split("@")[0],
            amount: paymentData.amount,
            paymentDate: new Date().toLocaleString(),
            paymentMethod: data.channel || "Card",
            invoiceNumber: paymentData.invoice_number || `INV-${Date.now()}`,
            invoiceUrl: paymentData.invoice_url || `${process.env.NEXT_PUBLIC_APP_URL}/invoices/${paymentData.id}`,
            itemsPurchased: [
              {
                name: `Event Registration: ${eventData.title}`,
                price: paymentData.amount,
              },
            ],
          },
          { userId: paymentData.user_id.id },
        )
      } else if (paymentData.related_type === "course") {
        // Update the course enrollment
        await supabaseAdmin
          .from("course_enrollments")
          .update({
            payment_status: "paid",
            payment_date: new Date().toISOString(),
          })
          .eq("payment_reference", data.reference)

        // Get the course details
        const { data: courseData, error: courseError } = await supabaseAdmin
          .from("courses")
          .select("*")
          .eq("id", paymentData.related_id)
          .single()

        if (courseError) throw courseError

        // Send payment confirmation email
        await sendPaymentConfirmationEmail(
          paymentData.user_id.email,
          {
            name: paymentData.user_id.profiles.first_name || paymentData.user_id.email.split("@")[0],
            amount: paymentData.amount,
            paymentDate: new Date().toLocaleString(),
            paymentMethod: data.channel || "Card",
            invoiceNumber: paymentData.invoice_number || `INV-${Date.now()}`,
            invoiceUrl: paymentData.invoice_url || `${process.env.NEXT_PUBLIC_APP_URL}/invoices/${paymentData.id}`,
            itemsPurchased: [
              {
                name: `Course Enrollment: ${courseData.title}`,
                price: paymentData.amount,
              },
            ],
          },
          { userId: paymentData.user_id.id },
        )
      }

      return NextResponse.json({ success: true })
    }

    // Handle other event types as needed

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error handling payment webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper function to verify webhook signature
function verifySignature(payload: any, signature: string | null) {
  if (!signature) return false

  // In a real implementation, you would verify the signature using a library like crypto
  // const hmac = crypto.createHmac('sha256', process.env.PAYSTACK_SECRET_KEY)
  // const computedSignature = hmac.update(JSON.stringify(payload)).digest('hex')
  // return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature))

  return true // Placeholder
}

