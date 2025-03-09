import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://hardytechnology.xyz"),
  title: {
    default: "Hardy Technology - Web Development & Training Services",
    template: "%s | Hardy Technology",
  },
  description: "Professional web development, training, and technology services in Nigeria.",
  keywords: ["web development", "training", "technology", "Nigeria", "frontend", "backend", "fullstack"],
  authors: [{ name: "Hardy Technology" }],
  creator: "Hardy Technology",
  publisher: "Hardy Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    title: "Hardy Technology - Web Development & Training Services",
    description: "Professional web development, training, and technology services in Nigeria.",
    siteName: "Hardy Technology",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hardy Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardy Technology - Web Development & Training Services",
    description: "Professional web development, training, and technology services in Nigeria.",
    images: ["/twitter-image.jpg"],
    creator: "@hardytech",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'