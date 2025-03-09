import type { Metadata } from "next"
import { format } from "date-fns"
import { prisma } from "@/lib/db"
import AdminHeader from "@/app/components/admin/AdminHeader"
import AdminEventActions from "@/app/components/admin/AdminEventActions"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Admin Dashboard | HardyTech",
  description: "Manage training events and website content",
}

export default async function AdminDashboardPage() {
  // Fetch pending events
  const pendingEvents = await prisma.externalTraining.findMany({
    where: {
      approved: false,
      paymentStatus: "paid", // Only show events that have been paid for
    },
    orderBy: { createdAt: "desc" },
  })

  // Fetch approved events
  const approvedEvents = await prisma.externalTraining.findMany({
    where: {
      approved: true,
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })

  // Count statistics
  const totalEvents = await prisma.externalTraining.count()
  const pendingCount = await prisma.externalTraining.count({
    where: {
      approved: false,
      paymentStatus: "paid",
    },
  })
  const approvedCount = await prisma.externalTraining.count({
    where: { approved: true },
  })
  const featuredCount = await prisma.externalTraining.count({
    where: {
      approved: true,
      featured: true,
    },
  })

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalEvents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{approvedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Featured Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{featuredCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Events Management */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Pending Approval ({pendingCount})</TabsTrigger>
            <TabsTrigger value="approved">Approved Events ({approvedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Events Pending Approval</CardTitle>
                <CardDescription>Review and approve submitted training events</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingEvents.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Event</th>
                          <th className="text-left py-3 px-4">Organizer</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Package</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingEvents.map((event) => (
                          <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.location}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{event.organizerName}</div>
                              <div className="text-sm text-gray-500">{event.organizerEmail}</div>
                            </td>
                            <td className="py-3 px-4">{format(new Date(event.startDate), "MMM d, yyyy")}</td>
                            <td className="py-3 px-4">
                              {event.featured ? (
                                <Badge className="bg-blue-500">Featured</Badge>
                              ) : (
                                <Badge variant="outline">Standard</Badge>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <AdminEventActions event={event} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No events pending approval</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Approved Events</CardTitle>
                <CardDescription>Manage events that have been approved and published</CardDescription>
              </CardHeader>
              <CardContent>
                {approvedEvents.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Event</th>
                          <th className="text-left py-3 px-4">Organizer</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Views</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedEvents.map((event) => (
                          <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.location}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{event.organizerName}</div>
                              <div className="text-sm text-gray-500">{event.organizerEmail}</div>
                            </td>
                            <td className="py-3 px-4">{format(new Date(event.startDate), "MMM d, yyyy")}</td>
                            <td className="py-3 px-4">
                              {event.featured ? (
                                <Badge className="bg-blue-500">Featured</Badge>
                              ) : (
                                <Badge variant="outline">Standard</Badge>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {/* This will be populated from analytics data */}
                              {Math.floor(Math.random() * 100)}
                            </td>
                            <td className="py-3 px-4">
                              <AdminEventActions event={event} />
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
        </Tabs>
      </main>
    </>
  )
}

