import type { Metadata } from "next"
import AdminHeader from "@/app/components/admin/AdminHeader"
import ApiKeysForm from "@/app/components/admin/ApiKeysForm"
import AdminUsersForm from "@/app/components/admin/AdminUsersForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Admin Settings | HardyTech",
  description: "Manage API keys and admin users",
}

export default function AdminSettingsPage() {
  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>

        <Tabs defaultValue="api-keys" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="users">Admin Users</TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle>API Keys Configuration</CardTitle>
                <CardDescription>Manage API keys for email notifications and social media integration</CardDescription>
              </CardHeader>
              <CardContent>
                <ApiKeysForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Admin Users</CardTitle>
                <CardDescription>Manage admin users who can access the dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminUsersForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

