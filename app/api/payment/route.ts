import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const reference = searchParams.get("reference")
  const amount = searchParams.get("amount")
  const email = searchParams.get("email")
  const eventId = searchParams.get("event_id")

  if (!reference || !amount || !email || !eventId) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  try {
    // In a real implementation, you would initialize the Paystack payment here
    // For now, we'll create a mock Paystack payment URL

    // This would be your actual Paystack public key
    const paystackPublicKey = process.env.PAYSTACK_PUBLIC_KEY || "pk_test_your_key_here"

    // Construct the Paystack payment URL
    const paystackUrl = `https://checkout.paystack.com/p/${reference}?amount=${Number.parseFloat(amount) * 100}&email=${encodeURIComponent(email)}&reference=${reference}&callback_url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payment/verify?event_id=${eventId}`)}`

    // Redirect to the Paystack payment page
    return NextResponse.redirect(paystackUrl)
  } catch (error) {
    console.error("Error initializing payment:", error)
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 })
  }
}

