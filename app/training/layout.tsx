import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Training Programs | Hardy Technology",
  description:
    "Enhance your skills with our professional tech training programs in software development, cybersecurity, and digital marketing.",
}

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

