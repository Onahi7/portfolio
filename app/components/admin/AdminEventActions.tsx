"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Eye, Check, X, Share2, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { approveEvent, rejectEvent, deleteEvent, shareEvent } from "@/app/actions/admin-events"

interface AdminEventActionsProps {
  event: any
}

export default function AdminEventActions({ event }: AdminEventActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | "delete" | "">("")
  const router = useRouter()

  const handleAction = async () => {
    setIsLoading(true)

    try {
      let result

      switch (actionType) {
        case "approve":
          result = await approveEvent(event.id)
          if (result.success) {
            toast({
              title: "Event approved",
              description: "The event has been published successfully",
            })
          }
          break

        case "reject":
          result = await rejectEvent(event.id)
          if (result.success) {
            toast({
              title: "Event rejected",
              description: "The event has been rejected",
            })
          }
          break

        case "delete":
          result = await deleteEvent(event.id)
          if (result.success) {
            toast({
              title: "Event deleted",
              description: "The event has been permanently deleted",
            })
          }
          break

        default:
          throw new Error("Invalid action type")
      }

      if (!result.success) {
        throw new Error(result.error || "Operation failed")
      }

      setIsDialogOpen(false)
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    setIsLoading(true)

    try {
      const result = await shareEvent(event.id)

      if (result.success) {
        toast({
          title: "Event shared",
          description: "The event has been shared to social media",
        })
      } else {
        throw new Error(result.error || "Failed to share event")
      }
    } catch (error: any) {
      toast({
        title: "Error sharing event",
        description: error.message || "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const openDialog = (type: "approve" | "reject" | "delete") => {
    setActionType(type)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={() => window.open(`/training-events/${event.id}`, "_blank")}>
        <Eye className="h-4 w-4" />
      </Button>

      {!event.approved && (
        <Button
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          onClick={() => openDialog("approve")}
        >
          <Check className="h-4 w-4" />
        </Button>
      )}

      {!event.approved && (
        <Button
          variant="default"
          size="sm"
          className="bg-red-600 hover:bg-red-700"
          onClick={() => openDialog("reject")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {event.approved && event.featured && (
        <Button
          variant="default"
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleShare}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
        </Button>
      )}

      <Button variant="destructive" size="sm" onClick={() => openDialog("delete")}>
        <Trash className="h-4 w-4" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" ? "Approve Event" : actionType === "reject" ? "Reject Event" : "Delete Event"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? "This will publish the event to the public training events page."
                : actionType === "reject"
                  ? "This will reject the event and notify the organizer."
                  : "This will permanently delete the event. This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={actionType === "delete" ? "destructive" : "default"}
              onClick={handleAction}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : actionType === "approve" ? (
                "Approve"
              ) : actionType === "reject" ? (
                "Reject"
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

