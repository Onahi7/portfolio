// Simple utility to check for required environment variables
export function checkRequiredEnvVars() {
  const requiredVars = [
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY",
    "PAYSTACK_SECRET_KEY",
  ]

  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    console.warn(`⚠️ Missing required environment variables: ${missing.join(", ")}`)
    return false
  }

  return true
}

