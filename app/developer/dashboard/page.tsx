import type { Metadata } from "next"
import Link from "next/link"
import { format } from "date-fns"
import { createServerClient } from "@/lib/supabase-server"
import { prisma } from "@/lib/db"
import DeveloperHeader from "@/app/components/developer/DeveloperHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Developer Dashboard | HardyTech",
  description: "Manage your training events",
}

export default async function DeveloperDashboardPage() {
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null // This should be handled by the layout
  }

  // Fetch events submitted by this user
  const events = await prisma.externalTraining.findMany({
    where: {
      organizerEmail: user.email,
    },
    orderBy: { createdAt: "desc" },
  })

  // Separate events by status
  const pendingEvents = events.filter((event) => !event.approved && event.paymentStatus === "paid")
  const approvedEvents = events.filter((event) => event.approved)
  const draftEvents = events.filter((event) => event.paymentStatus === "pending")

  // Get analytics for approved events
  const eventsWithAnalytics = await Promise.all(
    approvedEvents.map(async (event) => {
      const viewCount = await prisma.eventView.count({
        where: { eventId: event.id },
      })

      const clickCount = await prisma.eventClick.count({
        where: { eventId: event.id },
      })

      return {
        ...event,
        analytics: {
          viewCount,
          clickCount,
        },
      }
    }),
  )

  return (
    <>
      <DeveloperHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Developer Dashboard</h1>

        {/* Welcome Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome, {user.email}</CardTitle>
            <CardDescription>Manage your training events and view analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <p className="text-gray-700 dark:text-gray-300">You have {events.length} training events in total:</p>
                <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                  <li>{approvedEvents.length} approved events</li>
                  <li>{pendingEvents.length} pending approval</li>
                  <li>{draftEvents.length} drafts/unpaid</li>
                </ul>
              </div>
              <Link href="/advertise-training">
                <Button>Submit New Training Event</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Events Management */}
        <Tabs defaultValue="approved" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="approved">Approved Events ({approvedEvents.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval ({pendingEvents.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Events</CardTitle>
                <CardDescription>These events are live on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {eventsWithAnalytics.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Event</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Views</th>
                          <th className="text-left py-3 px-4">Clicks</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eventsWithAnalytics.map((event) => (
                          <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.location}</div>
                            </td>
                            <td className="py-3 px-4">{format(new Date(event.startDate), "MMM d, yyyy")}</td>
                            <td className="py-3 px-4">
                              {event.featured ? (
                                <Badge className="bg-blue-500">Featured</Badge>
                              ) : (
                                <Badge variant="outline">Standard</Badge>
                              )}
                            </td>
                            <td className="py-3 px-4">{event.analytics.viewCount}</td>
                            <td className="py-3 px-4">{event.analytics.clickCount}</td>
                            <td className="py-3 px-4">
                              <Link href={`/training-events/${event.id}`} target="_blank">
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No approved events</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Events</CardTitle>
                <CardDescription>These events are awaiting admin approval</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingEvents.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Event</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Submitted</th>
                          <th className="text-left py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingEvents.map((event) => (
                          <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.location}</div>
                            </td>
                            <td className="py-3 px-4">{format(new Date(event.startDate), "MMM d, yyyy")}</td>
                            <td className="py-3 px-4">{format(new Date(event.createdAt), "MMM d, yyyy")}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800"
                              >
                                Pending Approval
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No pending events</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drafts">
            <Card>
              <CardHeader>
                <CardTitle>Draft Events</CardTitle>
                <CardDescription>These events are incomplete or payment is pending</CardDescription>
              </CardHeader>
              <CardContent>
                {draftEvents.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Event</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Created</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {draftEvents.map((event) => (
                          <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.location}</div>
                            </td>
                            <td className="py-3 px-4">{format(new Date(event.startDate), "MMM d, yyyy")}</td>
                            <td className="py-3 px-4">{format(new Date(event.createdAt), "MMM d, yyyy")}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className="bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                              >
                                Payment Pending
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Link
                                href={`/api/payment?reference=${event.paymentReference}&amount=15000&email=${event.organizerEmail}&event_id=${event.id}`}
                              >
                                <Button size="sm">Complete Payment</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No draft events</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

