"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { getAdminUsers, addAdminUser, removeAdminUser } from "@/app/actions/admin-settings"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const adminUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type AdminUserFormValues = z.infer<typeof adminUserSchema>

export default function AdminUsersForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [adminUsers, setAdminUsers] = useState<{ id: string; email: string }[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminUserFormValues>({
    resolver: zodResolver(adminUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Load existing admin users
  useEffect(() => {
    const loadAdminUsers = async () => {
      setIsLoading(true)
      try {
        const result = await getAdminUsers()
        if (result.success) {
          setAdminUsers(result.data)
        }
      } catch (error) {
        console.error("Error loading admin users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAdminUsers()
  }, [])

  const onSubmit = async (data: AdminUserFormValues) => {
    setIsLoading(true)

    try {
      const result = await addAdminUser(data)

      if (result.success) {
        toast({
          title: "Admin user added",
          description: "The admin user has been successfully added",
        })

        // Update the admin users list
        setAdminUsers((prev) => [...prev, { id: result.userId, email: data.email }])

        // Reset the form
        reset()
      } else {
        throw new Error(result.error || "Failed to add admin user")
      }
    } catch (error: any) {
      toast({
        title: "Error adding admin user",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    setIsLoading(true)

    try {
      const result = await removeAdminUser(userToDelete)

      if (result.success) {
        toast({
          title: "Admin user removed",
          description: "The admin user has been successfully removed",
        })

        // Update the admin users list
        setAdminUsers((prev) => prev.filter((user) => user.id !== userToDelete))

        // Close the dialog
        setIsDialogOpen(false)
        setUserToDelete(null)
      } else {
        throw new Error(result.error || "Failed to remove admin user")
      }
    } catch (error: any) {
      toast({
        title: "Error removing admin user",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Current Admin Users</h3>
        {adminUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setUserToDelete(user.id)
                          setIsDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-md">
            No admin users found
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Add New Admin User</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
              placeholder="admin@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Admin User"
            )}
          </Button>
        </form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Admin User</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this admin user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

