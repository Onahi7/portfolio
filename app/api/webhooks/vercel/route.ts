import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Secret key to protect the webhook endpoint
const VERCEL_WEBHOOK_SECRET = process.env.VERCEL_WEBHOOK_SECRET || "default-webhook-secret-change-me"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, secret } = body

    // Validate the secret
    if (secret !== VERCEL_WEBHOOK_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    // Handle different webhook types
    if (type === "deployment.succeeded") {
      // Revalidate all dynamic paths after a successful deployment
      revalidatePath("/training-events")
      revalidatePath("/training-events/frontend")
      revalidatePath("/sitemap.xml")
      revalidatePath("/api/sitemap.xml")
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully" })
  } catch (error) {
    console.error("Error processing Vercel webhook:", error)
    return NextResponse.json({ success: false, message: "Error processing webhook" }, { status: 500 })
  }
}

