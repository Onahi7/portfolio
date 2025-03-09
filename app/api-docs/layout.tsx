import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Documentation | Hardy Technology",
  description: "Comprehensive documentation for the Hardy Technology API endpoints",
}

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
}

