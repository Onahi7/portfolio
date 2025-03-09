import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hardytechnology.xyz"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/developer/", "/api/", "/payment-success"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

