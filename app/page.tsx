import Link from "next/link"
import { ArrowRight, Code, Cpu, Layers, BarChart3 } from "lucide-react"
import CompanyHeader from "./components/company/Header"
import Footer from "./components/company/Footer"
import type { Metadata } from "next"
import { pageMetadata } from "./seo-config"
import JsonLd from "./components/JsonLd"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
}

// Testimonial data
const testimonials = [
  {
    quote:
      "HardyTech transformed our business operations with their TechSphere approach. The blockchain solution they built has streamlined our supply chain beyond expectations.",
    author: "Michael Reynolds",
    position: "CTO, Global Logistics Inc.",
    image: "/images/testimonials/testimonial-1.jpg",
  },
  {
    quote:
      "Their TechCraft methodology delivered a custom software solution that perfectly addressed our unique challenges. The team's technical expertise is matched by their business acumen.",
    author: "Sarah Johnson",
    position: "Operations Director, HealthSystems Ltd",
    image: "/images/testimonials/testimonial-2.jpg",
  },
  {
    quote:
      "From concept to execution, HardyTech's TechVision process helped us navigate complex technical requirements while keeping our business goals in focus.",
    author: "David Chen",
    position: "Founder, Fintech Innovations",
    image: "/images/testimonials/testimonial-3.jpg",
  },
]

// Featured project data
const featuredProjects = [
  {
    title: "CMDA Nigeria",
    category: "TechCraft Web Solution",
    description: "Complete member management platform with secure payment processing and resource library.",
    image: "/images/projects/cmda-nigeria.jpg",
    link: "https://cmdanigeria.org/",
  },
  {
    title: "Brotherly Relief",
    category: "TechSphere Integration",
    description: "Donation tracking and volunteer management system with impact reporting dashboard.",
    image: "/images/projects/brotherly-relief.jpg",
    link: "https://brotherlyrelief.org/",
  },
  {
    title: "Enterprise Resource Planning",
    category: "TechCore Business System",
    description: "Comprehensive solution integrating inventory, sales, HR and financial operations.",
    image: "/images/projects/erp-system.jpg",
    link: "/portfolio",
  },
]

export default function Home() {
  return (
    <>
      <JsonLd type="LocalBusiness" />
      <main className="min-h-screen">
        <CompanyHeader />

        {/* Modern Hero Section with Gradient Background */}
        <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/25 to-black/60" />

          <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Transforming Ideas into
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                  {" "}
                  Digital Reality
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8">
                We build innovative software solutions that drive business growth and enhance user experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200">
                  <Link href="/calculator">Calculate Project Cost</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Code className="h-10 w-10 text-blue-600" />,
                  title: "Web Development",
                  description: "Custom websites and web applications built with the latest technologies.",
                },
                {
                  icon: <Cpu className="h-10 w-10 text-purple-600" />,
                  title: "Software Solutions",
                  description: "Scalable software tailored to your business needs and objectives.",
                },
                {
                  icon: <Layers className="h-10 w-10 text-indigo-600" />,
                  title: "Blockchain Development",
                  description: "Secure and transparent blockchain applications for modern businesses.",
                },
                {
                  icon: <BarChart3 className="h-10 w-10 text-violet-600" />,
                  title: "Technical Training",
                  description: "Expert-led training programs to enhance your team's technical skills.",
                },
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's transform your ideas into reality. Our team of experts is ready to help you build the perfect
              solution.
            </p>
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-200">
              <Link href="/calculator" className="inline-flex items-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

