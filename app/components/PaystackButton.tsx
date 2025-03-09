"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaystackButtonProps {
  amount: number
  metadata?: Record<string, any>
  onSuccess?: (reference: any) => void
  onClose?: () => void
  children: React.ReactNode
  className?: string
}

interface RegistrationFormData {
  fullName: string
  email: string
  phone: string
  alternatePhone: string
  occupation: string
  hasLaptop: string
  trainingGoals: string
  trainingMode: string
}

export function PaystackButton({
  amount,
  metadata = {},
  onSuccess,
  onClose,
  children,
  className = "",
}: PaystackButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    occupation: "",
    hasLaptop: "yes",
    trainingGoals: "",
    trainingMode: "onsite",
  })
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({})

  // Load Paystack script
  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById("paystack-script")) {
      setScriptLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.id = "paystack-script"
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    script.onload = () => {
      console.log("Paystack script loaded successfully")
      setScriptLoaded(true)
    }
    script.onerror = (error) => {
      console.error("Error loading Paystack script:", error)
      toast({
        title: "Payment System Error",
        description: "Could not load payment system. Please try again later.",
        variant: "destructive",
      })
    }

    document.body.appendChild(script)

    return () => {
      // Don't remove the script on component unmount to avoid reloading it
    }
  }, [])

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    // Basic validation for Nigerian phone numbers
    const re = /^(\+?234|0)[0-9]{10}$/
    return re.test(phone.replace(/\s/g, ""))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name as keyof RegistrationFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user selects
    if (formErrors[name as keyof RegistrationFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {}

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required"
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = "Please enter a valid Nigerian phone number"
      }

      if (formData.alternatePhone.trim() && !validatePhone(formData.alternatePhone)) {
        newErrors.alternatePhone = "Please enter a valid Nigerian phone number"
      }
    }

    if (step === 2) {
      if (!formData.occupation.trim()) {
        newErrors.occupation = "Occupation is required"
      }

      if (!formData.trainingGoals.trim()) {
        newErrors.trainingGoals = "Please tell us what you want to achieve"
      }
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleButtonClick = () => {
    setShowRegistrationDialog(true)
  }

  const handlePayment = () => {
    if (!validateStep(currentStep)) {
      return
    }

    setIsLoading(true)

    if (!scriptLoaded || typeof window.PaystackPop === "undefined") {
      console.error("Paystack script not loaded or PaystackPop not available")
      toast({
        title: "Payment System Error",
        description: "Payment system is not ready. Please try again in a moment.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const handler = window.PaystackPop.setup({
        key: "pk_live_b86f31f4d4eefab3de0668cb7a4452c7e1ae35de",
        email: formData.email,
        amount: amount * 100, // Paystack amount is in kobo
        currency: "NGN",
        ref: "" + Math.floor(Math.random() * 1000000000),
        metadata: {
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: formData.fullName,
            },
            {
              display_name: "Email",
              variable_name: "email",
              value: formData.email,
            },
            {
              display_name: "Phone Number",
              variable_name: "phone",
              value: formData.phone,
            },
            {
              display_name: "Alternate Phone",
              variable_name: "alternate_phone",
              value: formData.alternatePhone,
            },
            {
              display_name: "Occupation",
              variable_name: "occupation",
              value: formData.occupation,
            },
            {
              display_name: "Has Laptop",
              variable_name: "has_laptop",
              value: formData.hasLaptop,
            },
            {
              display_name: "Training Goals",
              variable_name: "training_goals",
              value: formData.trainingGoals,
            },
            {
              display_name: "Training Mode",
              variable_name: "training_mode",
              value: formData.trainingMode,
            },
            ...Object.entries(metadata).map(([key, value]) => ({
              display_name: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
              variable_name: key,
              value: value,
            })),
          ],
        },
        callback: (response: any) => {
          console.log("Payment successful:", response)
          setIsLoading(false)
          setShowRegistrationDialog(false)

          // Store the registration in localStorage to track progress
          try {
            const registrations = JSON.parse(localStorage.getItem("courseRegistrations") || "[]")
            registrations.push({
              ...formData,
              courseId: metadata.course_id,
              courseName: metadata.course_name,
              timestamp: new Date().toISOString(),
              reference: response.reference,
            })
            localStorage.setItem("courseRegistrations", JSON.stringify(registrations))
          } catch (error) {
            console.error("Error storing registration data", error)
          }

          if (onSuccess) onSuccess(response)
        },
        onClose: () => {
          console.log("Payment window closed")
          setIsLoading(false)
          if (onClose) onClose()
        },
      })

      handler.openIframe()
    } catch (error) {
      console.error("Error initializing Paystack:", error)
      toast({
        title: "Payment Error",
        description: "There was a problem initializing the payment. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleCloseDialog = () => {
    setShowRegistrationDialog(false)
    setCurrentStep(1)
    setFormErrors({})
  }

  return (
    <>
      <Button onClick={handleButtonClick} disabled={isLoading} className={className}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          children
        )}
      </Button>

      <Dialog open={showRegistrationDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Registration</DialogTitle>
            <DialogDescription>Please provide your details to complete the registration process.</DialogDescription>
          </DialogHeader>

          {currentStep === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={formErrors.fullName ? "border-red-500" : ""}
                />
                {formErrors.fullName && <p className="text-red-500 text-xs">{formErrors.fullName}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className={formErrors.email ? "border-red-500" : ""}
                />
                {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 800 000 0000"
                  className={formErrors.phone ? "border-red-500" : ""}
                />
                {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="alternatePhone" className="text-sm font-medium">
                  Alternate Phone Number (Optional)
                </Label>
                <Input
                  id="alternatePhone"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                  placeholder="+234 800 000 0000"
                  className={formErrors.alternatePhone ? "border-red-500" : ""}
                />
                {formErrors.alternatePhone && <p className="text-red-500 text-xs">{formErrors.alternatePhone}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="occupation" className="text-sm font-medium">
                  Occupation <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="Software Developer, Student, etc."
                  className={formErrors.occupation ? "border-red-500" : ""}
                />
                {formErrors.occupation && <p className="text-red-500 text-xs">{formErrors.occupation}</p>}
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium">
                  Do you have a laptop? <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.hasLaptop}
                  onValueChange={(value) => handleSelectChange("hasLaptop", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="laptop-yes" />
                    <Label htmlFor="laptop-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="laptop-no" />
                    <Label htmlFor="laptop-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="trainingMode" className="text-sm font-medium">
                  Preferred Training Mode <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.trainingMode}
                  onValueChange={(value) => handleSelectChange("trainingMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select training mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">Onsite (Physical Classroom)</SelectItem>
                    <SelectItem value="online">Online (Virtual Classroom)</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Both Onsite & Online)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="trainingGoals" className="text-sm font-medium">
                  What do you want to achieve from this training? <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="trainingGoals"
                  name="trainingGoals"
                  value={formData.trainingGoals}
                  onChange={handleInputChange}
                  placeholder="Please share your goals and expectations..."
                  className={`min-h-[100px] ${formErrors.trainingGoals ? "border-red-500" : ""}`}
                />
                {formErrors.trainingGoals && <p className="text-red-500 text-xs">{formErrors.trainingGoals}</p>}
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
            )}

            {currentStep < 2 ? (
              <Button onClick={handleNextStep}>Next</Button>
            ) : (
              <Button onClick={handlePayment} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Add TypeScript declaration for PaystackPop
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => {
        openIframe: () => void
      }
    }
  }
}

