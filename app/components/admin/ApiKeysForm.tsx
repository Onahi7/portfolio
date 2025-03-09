"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { updateApiKeys, getApiKeys } from "@/app/actions/admin-settings"

const apiKeysSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "Resend API key is required"),
  TWITTER_API_KEY: z.string().optional(),
  LINKEDIN_API_KEY: z.string().optional(),
  FACEBOOK_API_KEY: z.string().optional(),
})

type ApiKeysFormValues = z.infer<typeof apiKeysSchema>

export default function ApiKeysForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApiKeysFormValues>({
    resolver: zodResolver(apiKeysSchema),
    defaultValues: {
      RESEND_API_KEY: "",
      TWITTER_API_KEY: "",
      LINKEDIN_API_KEY: "",
      FACEBOOK_API_KEY: "",
    },
  })

  // Load existing API keys
  useEffect(() => {
    const loadApiKeys = async () => {
      setIsLoading(true)
      try {
        const result = await getApiKeys()
        if (result.success) {
          reset(result.data)
        }
      } catch (error) {
        console.error("Error loading API keys:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadApiKeys()
  }, [reset])

  const onSubmit = async (data: ApiKeysFormValues) => {
    setIsLoading(true)

    try {
      const result = await updateApiKeys(data)

      if (result.success) {
        toast({
          title: "API keys updated",
          description: "Your API keys have been successfully updated",
        })
      } else {
        throw new Error(result.error || "Failed to update API keys")
      }
    } catch (error: any) {
      toast({
        title: "Error updating API keys",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleShowKey = (key: string) => {
    setShowKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="RESEND_API_KEY">
            Resend API Key <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="RESEND_API_KEY"
              type={showKeys.RESEND_API_KEY ? "text" : "password"}
              {...register("RESEND_API_KEY")}
              className={errors.RESEND_API_KEY ? "border-red-500 pr-10" : "pr-10"}
              placeholder="re_..."
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => toggleShowKey("RESEND_API_KEY")}
            >
              {showKeys.RESEND_API_KEY ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.RESEND_API_KEY && <p className="text-red-500 text-xs">{errors.RESEND_API_KEY.message}</p>}
          <p className="text-xs text-gray-500">
            Required for sending email notifications. Get your API key from{" "}
            <a
              href="https://resend.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Resend.com
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="TWITTER_API_KEY">Twitter API Key</Label>
          <div className="relative">
            <Input
              id="TWITTER_API_KEY"
              type={showKeys.TWITTER_API_KEY ? "text" : "password"}
              {...register("TWITTER_API_KEY")}
              className="pr-10"
              placeholder="Optional"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => toggleShowKey("TWITTER_API_KEY")}
            >
              {showKeys.TWITTER_API_KEY ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            For sharing events to Twitter. Get your API key from{" "}
            <a
              href="https://developer.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Twitter Developer Portal
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="LINKEDIN_API_KEY">LinkedIn API Key</Label>
          <div className="relative">
            <Input
              id="LINKEDIN_API_KEY"
              type={showKeys.LINKEDIN_API_KEY ? "text" : "password"}
              {...register("LINKEDIN_API_KEY")}
              className="pr-10"
              placeholder="Optional"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => toggleShowKey("LINKEDIN_API_KEY")}
            >
              {showKeys.LINKEDIN_API_KEY ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            For sharing events to LinkedIn. Get your API key from{" "}
            <a
              href="https://www.linkedin.com/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn Developer Portal
            </a>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="FACEBOOK_API_KEY">Facebook API Key</Label>
          <div className="relative">
            <Input
              id="FACEBOOK_API_KEY"
              type={showKeys.FACEBOOK_API_KEY ? "text" : "password"}
              {...register("FACEBOOK_API_KEY")}
              className="pr-10"
              placeholder="Optional"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => toggleShowKey("FACEBOOK_API_KEY")}
            >
              {showKeys.FACEBOOK_API_KEY ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            For sharing events to Facebook. Get your API key from{" "}
            <a
              href="https://developers.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Facebook Developer Portal
            </a>
          </p>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save API Keys"
        )}
      </Button>
    </form>
  )
}

