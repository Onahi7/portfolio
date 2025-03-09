import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import CompanyHeader from "../components/company/Header"
import Footer from "../components/company/Footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Payment Successful | HardyTech",
  description: "Your payment has been successfully processed.",
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen">
      <CompanyHeader />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Payment Successful!</h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for advertising your training event with us. Your payment has been successfully processed and
              your event will be reviewed and published shortly.
            </p>

            <div className="space-y-4">
              <Link href="/training-events">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">View Training Events</Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

