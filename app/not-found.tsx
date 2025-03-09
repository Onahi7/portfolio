import Link from "next/link"
import { Button } from "@/components/ui/button"
import CompanyHeader from "@/app/components/company/Header"
import Footer from "@/app/components/company/Footer"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <CompanyHeader />

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Contact us</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

