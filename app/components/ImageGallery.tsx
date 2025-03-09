"use client"

import { useState } from "react"
import OptimizedImage from "./OptimizedImage"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ImageGalleryProps {
  images: {
    src: string
    alt: string
    width: number
    height: number
  }[]
  columns?: 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  className?: string
}

export default function ImageGallery({ images, columns = 3, gap = "md", className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const gapClass = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  }[gap]

  const columnsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns]

  return (
    <div className={className}>
      <div className={`grid ${columnsClass} ${gapClass}`}>
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="aspect-square object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                width={image.width * 2}
                height={image.height * 2}
                className="h-auto w-full"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}

