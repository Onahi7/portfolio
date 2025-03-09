import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase-server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hardytechnology.xyz"

  // Static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/training`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/training/frontend`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/training-events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/training-events/frontend`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advertise-training`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/vision`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ] as MetadataRoute.Sitemap

  // Dynamic routes - Training events
  try {
    const supabase = createClient()
    const { data: events } = await supabase
      .from("external_trainings")
      .select("id, updated_at")
      .eq("approved", true)
      .gte("end_date", new Date().toISOString())

    if (events) {
      const eventRoutes = events.map((event) => ({
        url: `${baseUrl}/training-events/${event.id}`,
        lastModified: new Date(event.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))

      routes.push(...eventRoutes)
    }
  } catch (error) {
    console.error("Error fetching events for sitemap:", error)
  }

  return routes
}

