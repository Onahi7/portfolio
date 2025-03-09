"use client"

import type { ReactNode } from "react"
import Link from "next/link"

interface EventClickTrackerProps {
  eventId: string
  target: string
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}

export default function EventClickTracker({
  eventId,
  target,
  href,
  children,
  className = "",
  external = false,
}: EventClickTrackerProps) {
  const handleClick = async () => {
    try {
      await fetch("/api/analytics/click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId, target }),
      })
    } catch (error) {
      console.error("Error tracking click:", error)
    }
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

