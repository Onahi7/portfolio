/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable React 19 features
    serverActions: true,
  },
  // Increase memory limit for builds if needed
  webpack: (config) => {
    config.externals = [...(config.externals || []), "canvas", "jsdom"]
    return config
  },
}

module.exports = nextConfig

