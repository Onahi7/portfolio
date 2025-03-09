"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, CheckCircle, Code, Layers, Palette, Zap } from "lucide-react"
import { Header } from "@/app/components/company/Header"
import { Footer } from "@/app/components/company/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaystackButton } from "@/app/components/PaystackButton"

export default function FrontendTrainingClientPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-600">New Cohort Starting May 20th</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200">
              Frontend Development Mastery
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Master modern frontend development with our comprehensive training program. Learn React, Next.js,
              TypeScript and more from industry experts.
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Registration Progress</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="mr-2 h-4 w-4" />
                <span>Only 5 seats remaining for this cohort!</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#curriculum">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Curriculum
                </Button>
              </Link>
              <Link href="#register">
                <Button size="lg" variant="outline">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Program Overview</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our frontend development program is designed to take you from beginner to professional through hands-on
              projects and expert mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Calendar className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>8-Week Program</CardTitle>
                <CardDescription>Intensive training with flexible scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Weekend and weekday options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">3 hours per session</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Recorded sessions for review</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Code className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Practical Projects</CardTitle>
                <CardDescription>Build a professional portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">5 real-world projects</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Code reviews from experts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">GitHub portfolio development</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Career Support</CardTitle>
                <CardDescription>Launch your frontend career</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Resume and LinkedIn optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Technical interview preparation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Job placement assistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Technologies You'll Master</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our curriculum covers the most in-demand frontend technologies that employers are looking for.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "HTML5 & CSS3", icon: Layers, color: "text-orange-500" },
              { name: "JavaScript (ES6+)", icon: Code, color: "text-yellow-500" },
              { name: "React.js", icon: Zap, color: "text-blue-500" },
              { name: "Next.js", icon: Zap, color: "text-black dark:text-white" },
              { name: "TypeScript", icon: Code, color: "text-blue-600" },
              { name: "Tailwind CSS", icon: Palette, color: "text-cyan-500" },
              { name: "Git & GitHub", icon: Code, color: "text-gray-700 dark:text-gray-300" },
              { name: "API Integration", icon: Layers, color: "text-green-500" },
            ].map((tech, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center text-center"
              >
                <tech.icon className={`h-8 w-8 mb-3 ${tech.color}`} />
                <h3 className="font-medium text-gray-900 dark:text-white">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16" id="curriculum">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Curriculum</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our comprehensive curriculum is designed to take you from the fundamentals to advanced frontend
              development.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="module1" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="module1">Module 1</TabsTrigger>
                <TabsTrigger value="module2">Module 2</TabsTrigger>
                <TabsTrigger value="module3">Module 3</TabsTrigger>
                <TabsTrigger value="module4">Module 4</TabsTrigger>
              </TabsList>
              <TabsContent value="module1">
                <Card>
                  <CardHeader>
                    <CardTitle>Module 1: Web Fundamentals</CardTitle>
                    <CardDescription>Weeks 1-2</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">HTML5 & CSS3 Mastery</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Semantic HTML, CSS layouts, Flexbox, Grid, responsive design, and CSS variables
                        </p>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">JavaScript Fundamentals</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          ES6+ features, DOM manipulation, event handling, and asynchronous JavaScript
                        </p>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Project: Personal Portfolio</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Build a responsive personal portfolio website with HTML, CSS, and JavaScript
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="module2">
                <Card>
                  <CardHeader>
                    <CardTitle>Module 2: React Fundamentals</CardTitle>
                    <CardDescription>Weeks 3-4</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">React Core Concepts</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Components, props, state, hooks, and the React component lifecycle
                        </p>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">State Management</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Context API, useReducer, and introduction to Redux
                        </p>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Project: Task Management App</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Build a task management application with React and local storage
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="module3">
                <Card>
                  <CardHeader>
                    <CardTitle>Module 3: Advanced Frontend</CardTitle>
                    <CardDescription>Weeks 5-6</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">TypeScript Integration</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Type systems, interfaces, generics, and TypeScript with React
                        </p>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Next.js Framework</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Server-side rendering, static site generation, API routes, and the App Router
                        </p>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Project: E-commerce Frontend</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Build an e-commerce frontend with Next.js, TypeScript, and Tailwind CSS
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="module4">
                <Card>
                  <CardHeader>
                    <CardTitle>Module 4: Professional Development</CardTitle>
                    <CardDescription>Weeks 7-8</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Testing & Performance</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Unit testing with Jest, component testing with React Testing Library, and performance
                          optimization
                        </p>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Deployment & CI/CD</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Vercel deployment, GitHub Actions, and continuous integration workflows
                        </p>
                      </li>
                      <li>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Final Project: Full-Stack Application
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Build a complete application with authentication, database integration, and advanced frontend
                          features
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="py-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900"
        id="register"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Program Options</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose the program option that best fits your schedule and learning goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative overflow-hidden">
              {/* Early Bird Badge */}
              <div className="absolute top-0 right-0">
                <Badge className="m-4 bg-green-600">Early Bird: 20% OFF</Badge>
              </div>

              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
                <CardTitle className="text-xl font-bold">Weekend Bootcamp</CardTitle>
                <CardDescription>Perfect for working professionals</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                    ₦480,000
                    <span className="text-lg line-through text-gray-500 ml-2">₦600,000</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Early bird pricing ends this month</p>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Saturday & Sunday sessions (10am - 1pm)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">8 weeks of intensive training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Recorded sessions for review</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">1-on-1 mentorship sessions (2 hours)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Job placement assistance</span>
                  </li>
                </ul>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Starts May 20th, 2023</span>
                  <Users className="h-4 w-4 ml-4 mr-2" />
                  <span>3 seats remaining</span>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                <PaystackButton
                  amount={480000}
                  metadata={{
                    course_id: "frontend-weekend",
                    course_name: "Frontend Development - Weekend",
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Register Now
                </PaystackButton>
              </CardFooter>
            </Card>

            <Card className="relative overflow-hidden">
              {/* Early Bird Badge */}
              <div className="absolute top-0 right-0">
                <Badge className="m-4 bg-green-600">Early Bird: 20% OFF</Badge>
              </div>

              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
                <CardTitle className="text-xl font-bold">Weekday Evenings</CardTitle>
                <CardDescription>Flexible evening schedule</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                    ₦520,000
                    <span className="text-lg line-through text-gray-500 ml-2">₦650,000</span>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Early bird pricing ends this month</p>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Monday, Wednesday, Friday (6pm - 9pm)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">8 weeks of intensive training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Recorded sessions for review</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">1-on-1 mentorship sessions (3 hours)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-500 mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Job placement assistance</span>
                  </li>
                </ul>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Starts May 22nd, 2023</span>
                  <Users className="h-4 w-4 ml-4 mr-2" />
                  <span>2 seats remaining</span>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-800/50">
                <PaystackButton
                  amount={520000}
                  metadata={{
                    course_id: "frontend-weekday",
                    course_name: "Frontend Development - Weekday",
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Register Now
                </PaystackButton>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Meet Your Instructors</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Learn from experienced frontend developers with years of industry experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "David Adeyemi",
                role: "Lead Frontend Instructor",
                bio: "8+ years of experience with React and modern frontend frameworks. Previously worked at Microsoft and Paystack.",
                image: "/images/team/placeholder.webp",
              },
              {
                name: "Sarah Johnson",
                role: "UI/UX Specialist",
                bio: "Designer turned developer with expertise in creating beautiful, accessible user interfaces and experiences.",
                image: "/images/team/placeholder.webp",
              },
              {
                name: "Michael Okonkwo",
                role: "Full Stack Developer",
                bio: "Full stack developer specializing in Next.js and backend integration. Technical author and open source contributor.",
                image: "/images/team/placeholder.webp",
              },
            ].map((instructor, index) => (
              <Card key={index}>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-full mb-4">
                    <Image
                      src={instructor.image || "/placeholder.svg"}
                      alt={instructor.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <CardTitle>{instructor.name}</CardTitle>
                  <CardDescription>{instructor.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center">{instructor.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find answers to common questions about our frontend development program.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[
                {
                  question: "Do I need prior programming experience?",
                  answer:
                    "While some basic understanding of HTML and CSS is helpful, our program is designed to accommodate beginners. We start with the fundamentals and gradually progress to more advanced topics.",
                },
                {
                  question: "What equipment do I need for the course?",
                  answer:
                    "You'll need a laptop with at least 8GB RAM, a modern operating system (Windows 10+, macOS, or Linux), and a stable internet connection. We'll help you set up all the necessary software during the first session.",
                },
                {
                  question: "Is there a payment plan available?",
                  answer:
                    "Yes, we offer flexible payment plans. You can pay in two installments: 60% before the program starts and 40% at the midpoint. Please contact us for more details.",
                },
                {
                  question: "Will I receive a certificate upon completion?",
                  answer:
                    "Yes, upon successful completion of the program and all required projects, you will receive a certificate of completion. Our certificates are recognized by many employers in the tech industry.",
                },
                {
                  question: "What kind of job support do you provide?",
                  answer:
                    "We provide resume reviews, LinkedIn profile optimization, mock interviews, and connections to our hiring partners. Our career support team will work with you to prepare you for the job market.",
                },
                {
                  question: "Can I attend the sessions remotely?",
                  answer:
                    "Yes, all sessions are available both in-person and online via Zoom. Remote students have access to the same materials, instructors, and support as in-person students.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Become a Frontend Developer?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our program today and start your journey to becoming a professional frontend developer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#register">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                Register Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

