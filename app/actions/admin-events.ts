"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { sendEventApprovalEmail, sendEventRejectionEmail } from "@/lib/email"
import { shareToSocialMedia } from "@/lib/social-media"
import { trackEventAction } from "@/lib/analytics"

export async function approveEvent(eventId: string) {
  try {
    // Get the event
    const event = await prisma.externalTraining.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return { success: false, error: "Event not found" }
    }

    // Update the event
    await prisma.externalTraining.update({
      where: { id: eventId },
      data: { approved: true },
    })

    // Send approval email
    await sendEventApprovalEmail(event)

    // If it's a premium or extended listing, share to social media
    if (event.featured) {
      await shareToSocialMedia(event)
    }

    // Track this action
    await trackEventAction("event_approved", { eventId })

    revalidatePath("/admin/dashboard")
    revalidatePath("/training-events")

    return { success: true }
  } catch (error: any) {
    console.error("Error approving event:", error)
    return { success: false, error: error.message }
  }
}

export async function rejectEvent(eventId: string, reason?: string) {
  try {
    // Get the event
    const event = await prisma.externalTraining.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return { success: false, error: "Event not found" }
    }

    // Update the event
    await prisma.externalTraining.update({
      where: { id: eventId },
      data: { approved: false },
    })

    // Send rejection email
    await sendEventRejectionEmail(event, reason)

    // Track this action
    await trackEventAction("event_rejected", { eventId, reason })

    revalidatePath("/admin/dashboard")
    revalidatePath("/training-events")

    return { success: true }
  } catch (error: any) {
    console.error("Error rejecting event:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteEvent(eventId: string) {
  try {
    // Get the event first (for tracking)
    const event = await prisma.externalTraining.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return { success: false, error: "Event not found" }
    }

    // Delete the event
    await prisma.externalTraining.delete({
      where: { id: eventId },
    })

    // Track this action
    await trackEventAction("event_deleted", {
      eventId,
      eventTitle: event.title,
      organizerEmail: event.organizerEmail,
    })

    revalidatePath("/admin/dashboard")
    revalidatePath("/training-events")

    return { success: true }
  } catch (error: any) {
    console.error("Error deleting event:", error)
    return { success: false, error: error.message }
  }
}

export async function shareEvent(eventId: string) {
  try {
    // Get the event
    const event = await prisma.externalTraining.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return { success: false, error: "Event not found" }
    }

    // Only share approved and featured events
    if (!event.approved || !event.featured) {
      return { success: false, error: "Only approved featured events can be shared" }
    }

    // Share to social media
    const shareResult = await shareToSocialMedia(event)

    if (!shareResult.success) {
      return { success: false, error: shareResult.error }
    }

    // Track this action
    await trackEventAction("event_shared", {
      eventId,
      platforms: shareResult.platforms,
    })

    return { success: true, platforms: shareResult.platforms }
  } catch (error: any) {
    console.error("Error sharing event:", error)
    return { success: false, error: error.message }
  }
}

