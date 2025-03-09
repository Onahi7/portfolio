"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export default function ApiDocsPage() {
  const [html, setHtml] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch("/api/docs")
        const text = await response.text()

        // Extract the body content from the HTML
        const bodyContent = text.match(/<body>([\s\S]*)<\/body>/i)?.[1] || ""
        setHtml(bodyContent)
      } catch (error) {
        console.error("Error fetching API documentation:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocs()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Card className="p-6">
          <div
            className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Card>
      )}
    </div>
  )
}

