import { prisma } from "@/lib/db"
import { headers } from "next/headers"

export async function trackEventView(eventId: string) {
  try {
    const headersList = headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"
    const referer = headersList.get("referer") || "unknown"

    await prisma.eventView.create({
      data: {
        eventId,
        ip,
        userAgent,
        referer,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error tracking event view:", error)
    return { success: false }
  }
}

export async function trackEventClick(eventId: string, target: string) {
  try {
    const headersList = headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"

    await prisma.eventClick.create({
      data: {
        eventId,
        target,
        ip,
        userAgent,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error tracking event click:", error)
    return { success: false }
  }
}

export async function trackEventAction(action: string, metadata: any = {}) {
  try {
    await prisma.adminAction.create({
      data: {
        action,
        metadata,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error tracking admin action:", error)
    return { success: false }
  }
}

export async function getEventAnalytics(eventId: string) {
  try {
    // Get view count
    const viewCount = await prisma.eventView.count({
      where: { eventId },
    })

    // Get click count
    const clickCount = await prisma.eventClick.count({
      where: { eventId },
    })

    // Get click breakdown by target
    const clickBreakdown = await prisma.eventClick.groupBy({
      by: ["target"],
      where: { eventId },
      _count: true,
    })

    // Get views over time (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const viewsOverTime = await prisma.eventView.groupBy({
      by: ["timestamp"],
      where: {
        eventId,
        timestamp: { gte: thirtyDaysAgo },
      },
      _count: true,
    })

    return {
      success: true,
      data: {
        viewCount,
        clickCount,
        clickBreakdown,
        viewsOverTime,
      },
    }
  } catch (error: any) {
    console.error("Error getting event analytics:", error)
    return { success: false, error: error.message }
  }
}

