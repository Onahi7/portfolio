import { type NextRequest, NextResponse } from "next/server"
import { trackEventClick } from "@/lib/analytics"

export async function POST(request: NextRequest) {
  try {
    const { eventId, target } = await request.json()

    if (!eventId || !target) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    await trackEventClick(eventId, target)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking click:", error)
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
  }
}

