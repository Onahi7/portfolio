import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { sendWelcomeEmail } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Verify the webhook signature (in a real implementation)
    // const signature = request.headers.get('x-supabase-webhook-signature')
    // if (!verifySignature(payload, signature)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    // Handle different event types
    const eventType = payload.type

    if (eventType === "auth.signup") {
      // A new user has signed up
      const user = payload.record

      // Send welcome email
      await sendWelcomeEmail(
        user.email,
        {
          name: user.raw_user_meta_data?.first_name || user.email.split("@")[0],
          confirmationUrl: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm?token=${user.confirmation_token}`,
        },
        { userId: user.id },
      )

      return NextResponse.json({ success: true })
    }

    if (eventType === "auth.login") {
      // A user has logged in
      // You could track login activity, send notifications, etc.
      return NextResponse.json({ success: true })
    }

    // Handle other event types as needed

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error handling Supabase Auth webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Helper function to verify webhook signature
function verifySignature(payload: any, signature: string | null) {
  if (!signature) return false

  // In a real implementation, you would verify the signature using a library like crypto
  // const hmac = crypto.createHmac('sha256', process.env.SUPABASE_WEBHOOK_SECRET)
  // const computedSignature = hmac.update(JSON.stringify(payload)).digest('hex')
  // return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature))

  return true // Placeholder
}

