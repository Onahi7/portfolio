import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-server"

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hardytechnology.xyz"

  // Static routes
  const staticRoutes = [
    "",
    "/training",
    "/training/frontend",
    "/training-events",
    "/training-events/frontend",
    "/advertise-training",
    "/contact",
    "/vision",
    "/services",
    "/pricing",
    "/calculator",
  ]

  // Dynamic routes - Training events
  let eventRoutes: string[] = []
  try {
    const supabase = createClient()
    const { data: events } = await supabase
      .from("external_trainings")
      .select("id")
      .eq("approved", true)
      .gte("end_date", new Date().toISOString())

    if (events) {
      eventRoutes = events.map((event) => `/training-events/${event.id}`)
    }
  } catch (error) {
    console.error("Error fetching events for sitemap:", error)
  }

  // Combine all routes
  const allRoutes = [...staticRoutes, ...eventRoutes]

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

