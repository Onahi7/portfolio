import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Secret key to protect the revalidation endpoint
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "default-secret-change-me"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, secret } = body

    // Validate the secret
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 })
    }

    // Validate the path
    if (!path || typeof path !== "string") {
      return NextResponse.json({ success: false, message: "Path is required" }, { status: 400 })
    }

    // Revalidate the path
    revalidatePath(path)

    // Also revalidate related paths if needed
    if (path.includes("/training-events/")) {
      revalidatePath("/training-events")
      revalidatePath("/training-events/frontend")
    }

    return NextResponse.json({ success: true, revalidated: true, path })
  } catch (error) {
    console.error("Error revalidating path:", error)
    return NextResponse.json({ success: false, message: "Error revalidating path" }, { status: 500 })
  }
}

