import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const pathname = req.nextUrl.pathname

  // Create a Supabase client for the middleware
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if needed
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedRoutes = ["/admin", "/developer"]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // If it's a protected route and there's no session, redirect to login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/admin/login", req.url)
    if (pathname.startsWith("/developer")) {
      redirectUrl.pathname = "/developer/login"
    }

    // Add the original URL as a query parameter for redirect after login
    redirectUrl.searchParams.set("redirectTo", pathname)

    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/admin/:path*", "/developer/:path*", "/api/admin/:path*", "/api/developer/:path*"],
}

