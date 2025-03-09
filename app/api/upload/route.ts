import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get("file") as File

  // Upload to Vercel Blob
  const blob = await put(file.name, file, { access: "public" })

  // Return the URL to use in your application
  return NextResponse.json(blob)
}

