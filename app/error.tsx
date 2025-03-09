"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline">Go back home</Button>
        </Link>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md text-left max-w-2xl overflow-auto">
          <p className="font-mono text-sm">{error.message}</p>
          <p className="font-mono text-sm mt-2">{error.stack}</p>
        </div>
      )}
    </div>
  )
}

