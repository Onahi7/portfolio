import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Globe, Users } from "lucide-react"
import { format } from "date-fns"
import CompanyHeader from "@/app/components/company/Header"
import Footer from "@/app/components/company/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase-server"
import EventClickTracker from "@/app/components/events/EventClickTracker"

export const metadata: Metadata = {
  title: "Frontend Development Training Events | HardyTech",
  description: "Discover frontend development training events from various providers in Nigeria and beyond.",
}

// Function to get frontend-related training events
async function getFrontendTrainingEvents() {
  try {
    const supabase = createClient()

    const { data: events, error } = await supabase
      .from("external_trainings")
      .select("*")
      .eq("approved", true)
      .gte("end_date", new Date().toISOString())
      .or(
        "title.ilike.%frontend%,title.ilike.%front-end%,title.ilike.%front end%,title.ilike.%web development%," +
          "title.ilike.%react%,title.ilike.%javascript%,title.ilike.%html%,title.ilike.%css%,title.ilike.%ui%," +
          "description.ilike.%frontend%,description.ilike.%front-end%,description.ilike.%front end%," +
          "description.ilike.%web development%,description.ilike.%react%,description.ilike.%javascript%," +
          "description.ilike.%html%,description.ilike.%css%,description.ilike.%ui%",
      )
      .order("featured", { ascending: false })
      .order("start_date", { ascending: true })

    if (error) throw error

    return { success: true, events: events || [] }
  } catch (error) {
    console.error("Error fetching frontend training events:", error)
    return { success: false, events: [] }
  }
}

export default async function FrontendTrainingEventsPage() {
  const { success, events } = await getFrontendTrainingEvents()

  return (
    <main className="min-h-screen">
      <CompanyHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200">
              Frontend Development Events
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Discover upcoming frontend development training events from various providers to enhance your web
              development skills.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/training/frontend">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Our Frontend Program
                </Button>
              </Link>
              <Link href="/advertise-training">
                <Button size="lg" variant="outline">
                  Advertise Your Training
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
                    {event.image_url ? (
                      <Image
                        src={event.image_url || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-6xl">💻</span>
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
                          {format(new Date(event.start_date), "MMM d, yyyy")}
                          {event.start_date !== event.end_date &&
                            ` - ${format(new Date(event.end_date), "MMM d, yyyy")}`}
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
                          <EventClickTracker
                            eventId={event.id}
                            target="website"
                            href={event.website}
                            className="hover:underline"
                            external
                          >
                            Visit Website
                          </EventClickTracker>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {event.currency === "NGN" ? "₦" : "$"}
                        {event.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">By {event.organizer_name}</div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Link href={`/training-events/${event.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No Frontend Events Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There are currently no upcoming frontend development training events. Check back later or advertise your
                own event.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/advertise-training">
                  <Button className="bg-blue-600 hover:bg-blue-700">Advertise Your Training</Button>
                </Link>
                <Link href="/training/frontend">
                  <Button variant="outline">View Our Frontend Program</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Our Program CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Frontend Development Program</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Learn frontend development from industry experts with our comprehensive 8-week program.
          </p>
          <Link href="/training/frontend">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              Explore Our Program
            </Button>
          </Link>
        </div>
      </section>

      {/* Advertise CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Are You a Training Provider?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Reach our community of tech enthusiasts and professionals by advertising your frontend development
                training events on our platform.
              </p>
              <Link href="/advertise-training">
                <Button className="bg-blue-600 hover:bg-blue-700">Advertise Your Training</Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative h-64 w-full max-w-md">
                <Image
                  src="/placeholder.svg?height=256&width=384"
                  alt="Advertise your training"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

