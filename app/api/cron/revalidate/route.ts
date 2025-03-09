import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

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

    // Revalidate dynamic pages
    revalidatePath("/training-events")
    revalidatePath("/training-events/frontend")

    // Revalidate sitemap and other static paths
    revalidatePath("/sitemap.xml")
    revalidatePath("/api/sitemap.xml")

    return NextResponse.json({ success: true, revalidated: true })
  } catch (error) {
    console.error("Error in cron revalidation:", error)
    return NextResponse.json({ success: false, message: "Error revalidating paths" }, { status: 500 })
  }
}

