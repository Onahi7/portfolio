import type { Metadata } from "next"
import { pageMetadata } from "../seo-config"
import TrainingContent from "../components/TrainingContent"
import JsonLd from "../components/JsonLd"

export const metadata: Metadata = {
  title: pageMetadata.training.title,
  description: pageMetadata.training.description,
  keywords: pageMetadata.training.keywords,
}

export default function TrainingPage() {
  // Course structured data for SEO
  const courseStructuredData = {
    title: "Professional Tech Training Programs",
    description:
      "Comprehensive tech training programs in cybersecurity, software development, digital marketing, and WordPress development.",
    provider: {
      name: "HardyTech",
      url: "https://hardytechnology.xyz",
    },
    offers: {
      "@type": "Offer",
      price: "200000",
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
      validFrom: "2023-05-01",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["ONSITE", "ONLINE"],
      courseWorkload: "PT10H",
      instructor: {
        "@type": "Person",
        name: "HardyTech Instructors",
      },
      location: {
        "@type": "Place",
        name: "HardyTech Training Center",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Abuja",
          addressRegion: "FCT",
          addressCountry: "NG",
        },
      },
      startDate: "2023-05-20",
    },
  }

  return (
    <>
      <JsonLd type="Course" data={courseStructuredData} />
      <TrainingContent />
    </>
  )
}

