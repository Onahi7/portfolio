"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/db"
import { sendEventSubmissionEmail } from "@/lib/email"
import { trackEventAction } from "@/lib/analytics"

interface TrainingEventData {
  title: string
  description: string
  organizerName: string
  organizerEmail: string
  organizerPhone: string
  website?: string
  startDate: Date
  endDate: Date
  location: string
  mode: string
  price: number
  currency: string
  packageType: string
  imageUrl?: string
  fee: number
}

export async function submitTrainingEvent(data: TrainingEventData) {
  try {
    // First, create the training event record
    const event = await prisma.externalTraining.create({
      data: {
        title: data.title,
        description: data.description,
        organizerName: data.organizerName,
        organizerEmail: data.organizerEmail,
        organizerPhone: data.organizerPhone,
        website: data.website || null,
        startDate: data.startDate,
        endDate: data.endDate,
        location: data.location,
        mode: data.mode,
        price: data.price,
        currency: data.currency,
        imageUrl: data.imageUrl || null,
        // Set featured based on package type
        featured: data.packageType === "premium" || data.packageType === "extended",
        // Initially not approved until payment is confirmed
        approved: false,
        paymentStatus: "pending",
      },
    })

    // Initialize Paystack payment
    const paymentRef = `TRN_${Date.now()}_${Math.floor(Math.random() * 1000)}`

    // Update the event with the payment reference
    await prisma.externalTraining.update({
      where: { id: event.id },
      data: { paymentReference: paymentRef },
    })

    // Send notification email to admin
    await sendEventSubmissionEmail(event)

    // Track this action
    await trackEventAction("event_submitted", {
      eventId: event.id,
      packageType: data.packageType,
      fee: data.fee,
    })

    // Construct the payment URL (this would typically be done through Paystack's API)
    const paymentUrl = `/api/payment?reference=${paymentRef}&amount=${data.fee}&email=${data.organizerEmail}&event_id=${event.id}`

    revalidatePath("/training-events")

    return {
      success: true,
      eventId: event.id,
      paymentUrl,
    }
  } catch (error) {
    console.error("Error submitting training event:", error)
    return {
      success: false,
      error: "Failed to submit training event",
    }
  }
}

export async function getExternalTrainings(showAll = false) {
  try {
    const events = await prisma.externalTraining.findMany({
      where: showAll
        ? {}
        : {
            approved: true,
            endDate: { gte: new Date() },
          },
      orderBy: [{ featured: "desc" }, { startDate: "asc" }],
    })

    return { success: true, events }
  } catch (error) {
    console.error("Error fetching external trainings:", error)
    return { success: false, events: [] }
  }
}

