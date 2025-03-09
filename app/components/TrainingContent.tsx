"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaCheck, FaGraduationCap, FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa"
import CompanyHeader from "./company/Header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PaystackButton } from "./PaystackButton"
import { toast } from "@/hooks/use-toast"

// Course data
const courses = [
  {
    id: "cybersecurity",
    title: "Cybersecurity Training",
    description: "Comprehensive cybersecurity training to protect digital assets and prevent cyber attacks",
    longDescription:
      "Our cybersecurity program equips you with the skills to identify vulnerabilities, implement security measures, and respond to cyber threats effectively.",
    options: [
      { duration: 6, price: 350000, label: "6 Months Program" },
      { duration: 3, price: 450000, label: "3 Months Accelerated" },
    ],
    learningOutcomes: [
      "Network security fundamentals",
      "Ethical hacking techniques",
      "Security auditing and compliance",
      "Incident response and management",
      "Cryptography and secure communications",
      "Security policies and risk management",
    ],
    icon: "🔐",
    maxSeats: 30,
  },
  {
    id: "software-development",
    title: "Software & App Development",
    description: "Learn to build professional software applications from scratch",
    longDescription:
      "Master the art of software development with our comprehensive program covering web, mobile, and desktop application development.",
    options: [
      {
        duration: 8,
        price: 800000,
        discountPercentage: 17,
        discountedPrice: 664000,
        label: "8 Months Full Program",
      },
    ],
    learningOutcomes: [
      "Frontend development (HTML, CSS, JavaScript)",
      "Backend development (Node.js, Python)",
      "Mobile app development (React Native)",
      "Database design and management",
      "API development and integration",
      "Version control and deployment workflows",
    ],
    icon: "💻",
    maxSeats: 25,
  },
  {
    id: "digital-marketing",
    title: "Full Scale Digital Marketing",
    description: "Master digital marketing strategies to grow businesses online",
    longDescription:
      "Our digital marketing program covers all aspects of online marketing including SEO, social media, email marketing, and analytics.",
    options: [{ duration: 2, price: 200000, label: "2 Months Intensive" }],
    learningOutcomes: [
      "Search Engine Optimization (SEO)",
      "Social media marketing strategies",
      "Email marketing campaigns",
      "Content marketing and creation",
      "Digital advertising (Google Ads, Facebook Ads)",
      "Analytics and performance tracking",
    ],
    icon: "📊",
    maxSeats: 40,
  },
  {
    id: "wordpress",
    title: "WordPress Web Development",
    description: "Learn to build and customize professional WordPress websites",
    longDescription:
      "Master WordPress development from basic site setup to advanced theme customization and plugin development.",
    options: [{ duration: 2, price: 200000, label: "2 Months Intensive" }],
    learningOutcomes: [
      "WordPress installation and configuration",
      "Theme customization and development",
      "Plugin integration and development",
      "E-commerce with WooCommerce",
      "WordPress security best practices",
      "Performance optimization techniques",
    ],
    icon: "🌐",
    maxSeats: 35,
  },
]

// Calculate total seats across all courses
const totalSeats = courses.reduce((total, course) => total + course.maxSeats, 0)

export default function TrainingContent() {
  const [selectedCourses, setSelectedCourses] = useState<{ [key: string]: number }>({})
  const [registrationProgress, setRegistrationProgress] = useState(0) // Will be calculated from actual data
  const [isEarlyBird, setIsEarlyBird] = useState(true)
  const [registrationCounts, setRegistrationCounts] = useState<{ [key: string]: number }>({})

  // Check if current date is still in early bird period (current month)
  useEffect(() => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    // Early bird is valid only for the current month
    const earlyBirdEndDate = new Date(currentYear, currentMonth + 1, 0) // Last day of current month
    setIsEarlyBird(currentDate <= earlyBirdEndDate)

    // Load registration data from localStorage
    try {
      const registrations = JSON.parse(localStorage.getItem("courseRegistrations") || "[]")

      // Count registrations per course
      const counts: { [key: string]: number } = {}
      courses.forEach((course) => {
        counts[course.id] = 0
      })

      registrations.forEach((reg: any) => {
        if (counts[reg.courseId] !== undefined) {
          counts[reg.courseId]++
        }
      })

      setRegistrationCounts(counts)

      // Calculate overall progress
      const totalRegistrations = Object.values(counts).reduce((sum, count) => sum + count, 0)
      const progressPercentage = Math.min(Math.round((totalRegistrations / totalSeats) * 100), 100)

      // If no registrations yet, set a default value to show some progress
      setRegistrationProgress(totalRegistrations > 0 ? progressPercentage : 65)
    } catch (error) {
      console.error("Error loading registration data", error)
      setRegistrationProgress(65) // Default fallback
    }
  }, [])

  const handleSelectCourseOption = (courseId: string, optionIndex: number) => {
    setSelectedCourses({
      ...selectedCourses,
      [courseId]: optionIndex,
    })
  }

  const calculatePrice = (course: any, optionIndex: number) => {
    const option = course.options[optionIndex]
    let price = option.discountedPrice || option.price

    // Apply early bird discount if applicable
    if (isEarlyBird) {
      price = price * 0.8 // 20% off
    }

    return price
  }

  const handlePaymentSuccess = (reference: any) => {
    toast({
      title: "Payment Successful!",
      description: `Your registration has been confirmed. Reference: ${reference.reference}`,
    })

    // Reload the page to update registration counts
    window.location.reload()
  }

  // Calculate seats remaining for a course
  const getSeatsRemaining = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    if (!course) return 0

    const registered = registrationCounts[courseId] || 0
    return Math.max(0, course.maxSeats - registered)
  }

  // Calculate percentage filled for a course
  const getPercentageFilled = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    if (!course) return 0

    const registered = registrationCounts[courseId] || 0
    return Math.min(Math.round((registered / course.maxSeats) * 100), 100)
  }

  return (
    <main className="min-h-screen">
      <CompanyHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Professional Tech Training
            </motion.h1>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join our Cohort 5 starting May 20th and transform your career with industry-relevant skills
            </motion.p>

            {isEarlyBird && (
              <motion.div
                className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-3 rounded-lg mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="font-bold">Early Bird Discount!</span> Register this month and get 20% off any course.
              </motion.div>
            )}

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Registration Progress</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{registrationProgress}%</span>
              </div>
              <Progress value={registrationProgress} className="h-2" />
              <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                <FaUsers className="mr-2" />
                <span>Limited seats available. Reserve your spot now!</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View Course Details
              </Button>
              <Button size="lg" variant="outline">
                Download Curriculum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16" id="register">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Training Programs</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose from our range of professional tech training programs designed to equip you with in-demand skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center">
                        <span className="text-3xl mr-2">{course.icon}</span>
                        {course.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{course.description}</CardDescription>
                    </div>
                    {course.id === "software-development" && (
                      <Badge className="bg-red-500 hover:bg-red-600">17% OFF</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{course.longDescription}</p>

                  <div className="space-y-4 mb-6">
                    <h4 className="font-semibold flex items-center">
                      <FaGraduationCap className="mr-2" /> What You'll Learn
                    </h4>
                    <ul className="space-y-2">
                      {course.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Registration progress for this course */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Course Enrollment</span>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
                        {getPercentageFilled(course.id)}% Full
                      </span>
                    </div>
                    <Progress value={getPercentageFilled(course.id)} className="h-1.5" />
                    <div className="flex items-center mt-1 text-xs text-gray-600 dark:text-gray-400">
                      <FaUsers className="mr-1" />
                      <span>
                        {getSeatsRemaining(course.id)} of {course.maxSeats} seats remaining
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Program Options</h4>
                    <div className="space-y-3">
                      {course.options.map((option, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            selectedCourses[course.id] === index
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                              : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                          }`}
                          onClick={() => handleSelectCourseOption(course.id, index)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div
                                className="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                              border-blue-500"
                              >
                                {selectedCourses[course.id] === index && (
                                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{option.label}</p>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                  <FaCalendarAlt className="mr-1" />
                                  <span>
                                    {option.duration} month{option.duration > 1 ? "s" : ""}
                                  </span>
                                  <FaClock className="ml-3 mr-1" />
                                  <span>Cohort 5 (May 20th)</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              {option.discountPercentage && (
                                <div className="flex items-center">
                                  <span className="line-through text-gray-500 text-sm mr-2">
                                    ₦{option.price.toLocaleString()}
                                  </span>
                                  <Badge className="bg-red-500">-{option.discountPercentage}%</Badge>
                                </div>
                              )}
                              <div className="font-bold text-lg">
                                ₦{(option.discountedPrice || option.price).toLocaleString()}
                              </div>
                              {isEarlyBird && (
                                <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                                  Early Bird: ₦
                                  {Math.round((option.discountedPrice || option.price) * 0.8).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <FaUsers className="inline mr-1" />
                    {getSeatsRemaining(course.id) > 0
                      ? `${getSeatsRemaining(course.id)} seats remaining`
                      : "Course fully booked"}
                  </div>
                  {selectedCourses[course.id] !== undefined && getSeatsRemaining(course.id) > 0 && (
                    <PaystackButton
                      amount={calculatePrice(course, selectedCourses[course.id])}
                      metadata={{
                        course_id: course.id,
                        course_name: course.title,
                        option_index: selectedCourses[course.id],
                      }}
                      onSuccess={handlePaymentSuccess}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Register Now
                    </PaystackButton>
                  )}
                  {getSeatsRemaining(course.id) === 0 && (
                    <Button disabled className="bg-gray-400">
                      Fully Booked
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* ... */}
    </main>
  )
}

