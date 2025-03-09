"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, X } from "lucide-react"

interface AvatarUploadProps {
  onUpload: (url: string) => void
  defaultImage?: string
  fallback?: string
  className?: string
}

export function AvatarUpload({ onUpload, defaultImage, fallback = "User", className }: AvatarUploadProps) {
  const [image, setImage] = useState<string | null>(defaultImage || null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!file) return

    try {
      setUploading(true)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      setImage(data.url)
      onUpload(data.url)
    } catch (error) {
      console.error("Error uploading avatar:", error)
    } finally {
      setUploading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleRemove = () => {
    setImage(null)
    onUpload("")
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const getFallbackInitials = () => {
    return fallback
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={image || undefined} />
          <AvatarFallback>{getFallbackInitials()}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <Input
            id="avatar-upload"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            disabled={uploading}
            className="sr-only"
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {image ? "Change Avatar" : "Upload Avatar"}
              </>
            )}
          </Button>

          {image && (
            <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

