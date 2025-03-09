import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hardytechnology.xyz"

  // Define all your routes
  const routes = ["", "/training", "/pricing", "/calculator", "/contact", "/vision", "/portfolio", "/blog"]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }))
}

