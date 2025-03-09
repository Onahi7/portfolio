import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Globe, Users } from "lucide-react"
import { format } from "date-fns"
import CompanyHeader from "../components/company/Header"
import Footer from "../components/company/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getExternalTrainings } from "../actions/training-events"

export const metadata: Metadata = {
  title: "Tech Training Events | HardyTech",
  description: "Discover tech training events from various providers in Nigeria and beyond.",
}

export default async function TrainingEventsPage() {
  const { success, events } = await getExternalTrainings()

  return (
    <main className="min-h-screen">
      <CompanyHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200">
              Tech Training Events
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Discover upcoming tech training events from various providers to enhance your skills and advance your
              career.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/advertise-training">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Advertise Your Training
                </Button>
              </Link>
              <Link href="/training">
                <Button size="lg" variant="outline">
                  View Our Training Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                  {/* Event Image */}
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-6xl">🎓</span>
                      </div>
                    )}
                    {event.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-600">Featured</Badge>
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{event.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {format(new Date(event.startDate), "MMM d, yyyy")}
                          {event.startDate !== event.endDate && ` - ${format(new Date(event.endDate), "MMM d, yyyy")}`}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>

                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <Users className="h-4 w-4 mr-2" />
                        <span>
                          {event.mode === "online" ? "Online" : event.mode === "in-person" ? "In-person" : "Hybrid"}
                        </span>
                      </div>

                      {event.website && (
                        <div className="flex items-center text-blue-600 dark:text-blue-400">
                          <Globe className="h-4 w-4 mr-2" />
                          <a href={event.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {event.currency === "NGN" ? "₦" : "$"}
                        {event.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">By {event.organizerName}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No Events Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There are currently no upcoming training events. Check back later or advertise your own event.
              </p>
              <Link href="/advertise-training">
                <Button className="bg-blue-600 hover:bg-blue-700">Advertise Your Training</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Promote Your Tech Training</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Reach our community of tech enthusiasts and professionals by advertising your training events on our
            platform.
          </p>
          <Link href="/advertise-training">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              Advertise Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

