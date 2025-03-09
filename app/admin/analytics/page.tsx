import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import AdminHeader from "@/app/components/admin/AdminHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

export const metadata: Metadata = {
  title: "Analytics Dashboard | HardyTech Admin",
  description: "View analytics for training events",
}

export default async function AnalyticsPage() {
  // Get total views and clicks
  const totalViews = await prisma.eventView.count()
  const totalClicks = await prisma.eventClick.count()

  // Get top events by views
  const topEventsByViews = await prisma.eventView.groupBy({
    by: ["eventId"],
    _count: true,
    orderBy: {
      _count: {
        eventId: "desc",
      },
    },
    take: 5,
  })

  // Get event details for top events
  const topEventsDetails = await Promise.all(
    topEventsByViews.map(async (item) => {
      const event = await prisma.externalTraining.findUnique({
        where: { id: item.eventId },
        select: { id: true, title: true, organizerName: true },
      })
      return {
        ...item,
        event,
      }
    }),
  )

  // Get click breakdown by target
  const clicksByTarget = await prisma.eventClick.groupBy({
    by: ["target"],
    _count: true,
    orderBy: {
      _count: {
        target: "desc",
      },
    },
  })

  // Get recent admin actions
  const recentActions = await prisma.adminAction.findMany({
    orderBy: { timestamp: "desc" },
    take: 10,
  })

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalViews}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalClicks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalViews > 0 ? `${((totalClicks / totalViews) * 100).toFixed(1)}%` : "0%"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{recentActions.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="events">Top Events</TabsTrigger>
            <TabsTrigger value="clicks">Click Analysis</TabsTrigger>
            <TabsTrigger value="actions">Admin Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Top Events by Views</CardTitle>
                <CardDescription>The most viewed training events on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                {topEventsDetails.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Event</th>
                          <th className="text-left py-3 px-4">Organizer</th>
                          <th className="text-left py-3 px-4">Views</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topEventsDetails.map((item) => (
                          <tr key={item.eventId} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div className="font-medium">{item.event?.title || "Unknown Event"}</div>
                            </td>
                            <td className="py-3 px-4">{item.event?.organizerName || "Unknown Organizer"}</td>
                            <td className="py-3 px-4">{item._count.eventId}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No view data available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clicks">
            <Card>
              <CardHeader>
                <CardTitle>Click Analysis</CardTitle>
                <CardDescription>Breakdown of clicks by target type</CardDescription>
              </CardHeader>
              <CardContent>
                {clicksByTarget.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Target Type</th>
                          <th className="text-left py-3 px-4">Click Count</th>
                          <th className="text-left py-3 px-4">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clicksByTarget.map((item) => (
                          <tr key={item.target} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4 capitalize">{item.target}</td>
                            <td className="py-3 px-4">{item._count.target}</td>
                            <td className="py-3 px-4">
                              {totalClicks > 0 ? `${((item._count.target / totalClicks) * 100).toFixed(1)}%` : "0%"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No click data available</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Admin Actions</CardTitle>
                <CardDescription>Log of recent administrative actions</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Action</th>
                          <th className="text-left py-3 px-4">Details</th>
                          <th className="text-left py-3 px-4">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActions.map((action) => (
                          <tr key={action.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="py-3 px-4 capitalize">{action.action.replace(/_/g, " ")}</td>
                            <td className="py-3 px-4">
                              {action.metadata ? JSON.stringify(action.metadata) : "No details"}
                            </td>
                            <td className="py-3 px-4">{format(new Date(action.timestamp), "MMM d, yyyy HH:mm")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">No admin actions logged</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

