import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Secret key to protect the webhook endpoint
const SUPABASE_WEBHOOK_SECRET = process.env.SUPABASE_WEBHOOK_SECRET || "default-webhook-secret-change-me"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, table, record, secret } = body

    // Validate the secret
    if (secret !== SUPABASE_WEBHOOK_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    // Handle different webhook types based on table and operation
    if (table === "external_trainings") {
      // Revalidate training events pages when external_trainings table changes
      revalidatePath("/training-events")
      revalidatePath("/training-events/frontend")

      // If a new event was approved, also revalidate the sitemap
      if (type === "UPDATE" && record?.approved === true) {
        revalidatePath("/sitemap.xml")
        revalidatePath("/api/sitemap.xml")
      }
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully" })
  } catch (error) {
    console.error("Error processing Supabase webhook:", error)
    return NextResponse.json({ success: false, message: "Error processing webhook" }, { status: 500 })
  }
}

