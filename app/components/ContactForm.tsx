"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaWhatsapp } from "react-icons/fa"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValues) => {
    try {
      // Format the message for WhatsApp
      const whatsappMessage = `
*New Contact Form Submission*
---------------------------
*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone || "Not provided"}
*Subject:* ${data.subject}

*Message:*
${data.message}
---------------------------
      `.trim()

      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(whatsappMessage)

      // Open WhatsApp with the formatted message
      window.open(`https://wa.me/2348162831919?text=${encodedMessage}`, "_blank")

      // Show success message
      toast({
        title: "Form Ready to Send",
        description: "WhatsApp has been opened with your message. Click send to complete.",
      })

      // Reset form
      reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem opening WhatsApp. Please try the WhatsApp button directly.",
        variant: "destructive",
      })
    }
  }

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/2348162831919?text=Hello%20HardyTech,%20I'm%20interested%20in%20your%20services.`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Send Us a Message</CardTitle>
          <CardDescription>Fill out the form below and we'll receive your message via WhatsApp.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number (Optional)
              </label>
              <Input id="phone" placeholder="+234 800 000 0000" {...register("phone")} />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="What is this regarding?"
                {...register("subject")}
                className={errors.subject ? "border-red-500" : ""}
              />
              {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us about your project or inquiry..."
                rows={5}
                {...register("message")}
                className={errors.message ? "border-red-500" : ""}
              />
              {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="h-5 w-5" />
              Submit via WhatsApp
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Reach out to us directly through any of these channels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">
              <a href="mailto:hardytechabuja@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                hardytechabuja@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Phone</h3>
            <p className="text-gray-600 dark:text-gray-400">
              <a href="tel:+2348162831919" className="hover:text-blue-600 dark:hover:text-blue-400">
                +234 816 283 1919
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Address</h3>
            <p className="text-gray-600 dark:text-gray-400">Abuja, Nigeria</p>
          </div>

          <div className="pt-4">
            <Button
              onClick={openWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

