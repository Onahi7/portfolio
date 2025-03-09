import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const reference = searchParams.get("reference")
  const eventId = searchParams.get("event_id")

  if (!reference || !eventId) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  try {
    // In a real implementation, you would verify the payment with Paystack here
    // For now, we'll assume the payment was successful

    // Update the event status
    await prisma.externalTraining.update({
      where: { id: eventId },
      data: {
        paymentStatus: "paid",
        approved: true,
      },
    })

    // Redirect to a success page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment-success?event_id=${eventId}`,
    )
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}

