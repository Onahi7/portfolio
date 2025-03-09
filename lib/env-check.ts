// Simple utility to check for required environment variables
export function checkRequiredEnvVars() {
  const requiredVars = [
    "DATABASE_URL",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "PAYSTACK_PUBLIC_KEY",
    "NEXT_PUBLIC_APP_URL",
  ]

  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    console.warn(`⚠️ Missing required environment variables: ${missing.join(", ")}`)
    return false
  }

  return true
}

