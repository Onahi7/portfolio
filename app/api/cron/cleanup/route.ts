import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

// Secret key to protect the cron endpoint
const CRON_SECRET = process.env.CRON_SECRET || "default-cron-secret-change-me"

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Validate the secret
    if (secret !== CRON_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    const supabase = createClient()

    // Mark expired events as inactive
    const { error: updateError } = await supabase
      .from("external_trainings")
      .update({ active: false })
      .lt("end_date", new Date().toISOString())
      .eq("active", true)

    if (updateError) throw updateError

    return NextResponse.json({ success: true, message: "Cleanup completed successfully" })
  } catch (error) {
    console.error("Error in cron cleanup:", error)
    return NextResponse.json({ success: false, message: "Error during cleanup" }, { status: 500 })
  }
}

