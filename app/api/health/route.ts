import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"
import { checkRequiredEnvVars } from "@/lib/env-check"

export async function GET() {
  try {
    // Check environment variables
    const envCheck = checkRequiredEnvVars()

    // Check database connection
    const supabase = createClient()
    const { data, error } = await supabase.from("external_trainings").select("count()", { count: "exact" }).limit(1)

    if (error) throw error

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: "connected",
      envVarsCheck: envCheck ? "ok" : "missing some variables",
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    })
  } catch (error) {
    console.error("Health check failed:", error)

    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        error: process.env.NODE_ENV === "production" ? "Internal server error" : String(error),
      },
      { status: 500 },
    )
  }
}

