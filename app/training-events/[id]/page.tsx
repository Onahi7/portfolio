import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Calendar, MapPin, Globe, Users, Mail, Phone } from "lucide-react"
import { prisma } from "@/lib/db"
import { trackEventView } from "@/lib/analytics"
import CompanyHeader from "@/app/components/company/Header"
import Footer from "@/app/components/company/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import EventClickTracker from "@/app/components/events/EventClickTracker"

interface EventPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await prisma.externalTraining.findUnique({
    where: { id: params.id },
  })

  if (!event) {
    return {
      title: "Event Not Found | HardyTech",
      description: "The requested training event could not be found.",
    }
  }

  return {
    title: `${event.title} | Training Events | HardyTech`,
    description: event.description.substring(0, 160),
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await prisma.externalTraining.findUnique({
    where: { id: params.id },
  })

  if (!event || !event.approved) {
    notFound()
  }

  // Track view
  await trackEventView(params.id)

  return (
    <main className="min-h-screen">
      <CompanyHeader />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Event Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Link href="/training-events" className="text-blue-600 dark:text-blue-400 hover:underline">
                  ← Back to Events
                </Link>
                {event.featured && <Badge className="bg-blue-600">Featured</Badge>}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>
                    {format(new Date(event.startDate), "MMM d, yyyy")}
                    {event.startDate !== event.endDate && ` - ${format(new Date(event.endDate), "MMM d, yyyy")}`}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>
                    {event.mode === "online" ? "Online" : event.mode === "in-person" ? "In-person" : "Hybrid"}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Image */}
            <div className="relative h-64 md:h-96 mb-8 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
              {event.imageUrl ? (
                <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-8xl">🎓</span>
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">About This Event</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{event.description}</p>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Event Details</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                      <p className="font-bold text-xl text-gray-900 dark:text-white">
                        {event.currency === "NGN" ? "₦" : "$"}
                        {event.price.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Organizer</p>
                      <p className="font-medium text-gray-900 dark:text-white">{event.organizerName}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <EventClickTracker
                          eventId={event.id}
                          target="email"
                          href={`mailto:${event.organizerEmail}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {event.organizerEmail}
                        </EventClickTracker>
                      </div>

                      {event.organizerPhone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <EventClickTracker
                            eventId={event.id}
                            target="phone"
                            href={`tel:${event.organizerPhone}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {event.organizerPhone}
                          </EventClickTracker>
                        </div>
                      )}

                      {event.website && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-gray-500" />
                          <EventClickTracker
                            eventId={event.id}
                            target="website"
                            href={event.website}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                            external
                          >
                            Visit Website
                          </EventClickTracker>
                        </div>
                      )}
                    </div>

                    <EventClickTracker
                      eventId={event.id}
                      target="register"
                      href={event.website || `mailto:${event.organizerEmail}`}
                      external={!!event.website}
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Register for Event</Button>
                    </EventClickTracker>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

