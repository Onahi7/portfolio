import { siteConfig } from "../seo-config"

interface JsonLdProps {
  type: "Organization" | "Course" | "FAQPage" | "LocalBusiness"
  data?: any
}

export default function JsonLd({ type, data }: JsonLdProps) {
  let jsonLd = {}

  if (type === "Organization") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
      sameAs: [siteConfig.links.twitter, siteConfig.links.github],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+234-816-283-1919",
        contactType: "customer service",
        areaServed: "NG",
        availableLanguage: "English",
      },
    }
  }

  if (type === "Course") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: data.title,
      description: data.description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        sameAs: siteConfig.url,
      },
      ...data,
    }
  }

  if (type === "LocalBusiness") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: siteConfig.name,
      image: `${siteConfig.url}/logo.png`,
      "@id": siteConfig.url,
      url: siteConfig.url,
      telephone: "+234-816-283-1919",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Abuja",
        addressLocality: "Abuja",
        addressRegion: "FCT",
        postalCode: "900001",
        addressCountry: "NG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 9.0765,
        longitude: 7.3986,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
      sameAs: [siteConfig.links.twitter, siteConfig.links.github],
    }
  }

  if (type === "FAQPage") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.map((item: any) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

