"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { submitTrainingEvent } from "../actions/training-events"

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  organizerName: z.string().min(2, { message: "Organizer name is required" }),
  organizerEmail: z.string().email({ message: "Please enter a valid email address" }),
  organizerPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  mode: z.enum(["online", "in-person", "hybrid"], { required_error: "Please select a mode" }),
  price: z.number({ required_error: "Price is required" }).min(0),
  currency: z.enum(["NGN", "USD"], { required_error: "Please select a currency" }),
  packageType: z.enum(["basic", "premium", "extended"], { required_error: "Please select a package" }),
  imageUrl: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function AdvertiseTrainingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "NGN",
      mode: "in-person",
      packageType: "basic",
    },
  })

  const startDate = watch("startDate")
  const endDate = watch("endDate")
  const packageType = watch("packageType")

  // Calculate the fee based on the package type
  const getFee = () => {
    switch (packageType) {
      case "basic":
        return 15000
      case "premium":
        return 30000
      case "extended":
        return 45000
      default:
        return 15000
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      const result = await submitTrainingEvent({
        ...data,
        fee: getFee(),
      })

      if (result.success) {
        toast({
          title: "Payment initiated",
          description: "You'll be redirected to complete your payment.",
        })

        // Redirect to the payment page or handle payment flow
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to submit training event",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Event Details</h3>

          <div className="space-y-2">
            <Label htmlFor="title">
              Event Title <span className="text-red-500">*</span>
            </Label>
            <Input id="title" {...register("title")} className={errors.title ? "border-red-500" : ""} />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Event Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={5}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground",
                      errors.startDate ? "border-red-500" : "",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setValue("startDate", date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>
                End Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground",
                      errors.endDate ? "border-red-500" : "",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setValue("endDate", date)}
                    initialFocus
                    disabled={(date) => startDate && date < startDate}
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="e.g., Virtual, Abuja, Lagos"
              className={errors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>
              Training Mode <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              defaultValue="in-person"
              onValueChange={(value) => setValue("mode", value as "online" | "in-person" | "hybrid")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="mode-in-person" />
                <Label htmlFor="mode-in-person">In-person</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="mode-online" />
                <Label htmlFor="mode-online">Online</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="mode-hybrid" />
                <Label htmlFor="mode-hybrid">Hybrid</Label>
              </div>
            </RadioGroup>
            {errors.mode && <p className="text-red-500 text-xs">{errors.mode.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                {...register("price", { valueAsNumber: true })}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>
                Currency <span className="text-red-500">*</span>
              </Label>
              <Select defaultValue="NGN" onValueChange={(value) => setValue("currency", value as "NGN" | "USD")}>
                <SelectTrigger className={errors.currency ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                </SelectContent>
              </Select>
              {errors.currency && <p className="text-red-500 text-xs">{errors.currency.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Organizer Information</h3>

          <div className="space-y-2">
            <Label htmlFor="organizerName">
              Organizer Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="organizerName"
              {...register("organizerName")}
              className={errors.organizerName ? "border-red-500" : ""}
            />
            {errors.organizerName && <p className="text-red-500 text-xs">{errors.organizerName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizerEmail">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="organizerEmail"
              type="email"
              {...register("organizerEmail")}
              className={errors.organizerEmail ? "border-red-500" : ""}
            />
            {errors.organizerEmail && <p className="text-red-500 text-xs">{errors.organizerEmail.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organizerPhone">
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="organizerPhone"
              {...register("organizerPhone")}
              className={errors.organizerPhone ? "border-red-500" : ""}
            />
            {errors.organizerPhone && <p className="text-red-500 text-xs">{errors.organizerPhone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              {...register("website")}
              placeholder="https://example.com"
              className={errors.website ? "border-red-500" : ""}
            />
            {errors.website && <p className="text-red-500 text-xs">{errors.website.message}</p>}
          </div>

          <div className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Advertising Package</h3>

          <div className="space-y-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer ${packageType === "basic" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-gray-200 dark:border-gray-700"}`}
              onClick={() => setValue("packageType", "basic")}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <RadioGroupItem checked={packageType === "basic"} value="basic" id="package-basic" className="mr-2" />
                  <div>
                    <Label htmlFor="package-basic" className="text-base font-medium">
                      Basic Listing
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">30-day listing with standard placement</p>
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">₦15,000</div>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer ${packageType === "premium" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-gray-200 dark:border-gray-700"}`}
              onClick={() => setValue("packageType", "premium")}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <RadioGroupItem
                    checked={packageType === "premium"}
                    value="premium"
                    id="package-premium"
                    className="mr-2"
                  />
                  <div>
                    <Label htmlFor="package-premium" className="text-base font-medium">
                      Premium Listing
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      60-day listing with featured placement and social promotion
                    </p>
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">₦30,000</div>
              </div>
            </div>

            <div
              className={`border rounded-lg p-4 cursor-pointer ${packageType === "extended" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30" : "border-gray-200 dark:border-gray-700"}`}
              onClick={() => setValue("packageType", "extended")}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <RadioGroupItem
                    checked={packageType === "extended"}
                    value="extended"
                    id="package-extended"
                    className="mr-2"
                  />
                  <div>
                    <Label htmlFor="package-extended" className="text-base font-medium">
                      Extended Listing
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      90-day listing with priority placement, social promotion, and newsletter feature
                    </p>
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">₦45,000</div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit & Pay"
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}

