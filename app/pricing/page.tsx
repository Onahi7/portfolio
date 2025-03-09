"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import CompanyHeader from "../components/company/Header"
import Footer from "../components/company/Footer"
import Pricing from "../components/Pricing"
import { Building, Code, Database } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("all")

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
              Transparent Pricing for Quality Tech Solutions
            </motion.h1>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We offer competitive pricing for websites in Naira, with custom software and blockchain solutions in USD,
              all tailored to your needs.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pricing Tabs Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <span className="hidden md:inline">All Services</span>
                  <span className="md:hidden">All</span>
                </TabsTrigger>
                <TabsTrigger value="websites" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="hidden md:inline">Websites</span>
                  <span className="md:hidden">Web</span>
                </TabsTrigger>
                <TabsTrigger value="software" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="hidden md:inline">Software</span>
                  <span className="md:hidden">Apps</span>
                </TabsTrigger>
                <TabsTrigger value="blockchain" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="hidden md:inline">Blockchain</span>
                  <span className="md:hidden">Chain</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <Pricing category="all" />
            </TabsContent>
            <TabsContent value="websites">
              <Pricing category="websites" />
            </TabsContent>
            <TabsContent value="software">
              <Pricing category="software" />
            </TabsContent>
            <TabsContent value="blockchain">
              <Pricing category="blockchain" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Process */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Pricing Process</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We follow a transparent process to provide you with accurate pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Requirements Analysis",
                description:
                  "We start by understanding your project needs, objectives, timeline, and specific requirements.",
              },
              {
                step: "2",
                title: "Custom Quote",
                description:
                  "Based on your requirements, we provide a detailed quote breaking down the costs for transparency.",
              },
              {
                step: "3",
                title: "Flexible Payment",
                description: "We offer flexible payment schedules with milestone-based payments for larger projects.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white mt-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Get an Instant Estimate</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Use our project calculator to get an instant ballpark estimate for your project
          </p>
          <a
            href="/calculator"
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-blue-600 font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            Try Our Calculator
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do you determine the cost of a project?</AccordionTrigger>
                <AccordionContent>
                  We consider several factors, including project complexity, features required, timeline, and resources
                  needed. After a detailed consultation, we provide a transparent quote breaking down all costs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you offer payment plans?</AccordionTrigger>
                <AccordionContent>
                  Yes, for larger projects we offer milestone-based payment schedules. Typically, this includes an
                  initial deposit, payments at key project milestones, and a final payment upon project completion.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What if my project doesn't fit into the standard packages?</AccordionTrigger>
                <AccordionContent>
                  Many of our clients have unique requirements. We offer custom quotes tailored to your specific needs.
                  Contact us for a personalized consultation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Are there any hidden costs?</AccordionTrigger>
                <AccordionContent>
                  No, we pride ourselves on transparency. Our quotes include all development costs. The only potential
                  additional costs would be third-party services (like hosting or premium plugins) which we clearly
                  identify upfront.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Do you offer maintenance plans after project completion?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer various maintenance plans to keep your project updated, secure, and running smoothly.
                  These can be discussed during the project planning phase.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>What's your refund policy?</AccordionTrigger>
                <AccordionContent>
                  We work with milestone-based deliverables. If you're not satisfied with a deliverable, we'll revise it
                  until it meets the agreed-upon specifications. For cancelled projects, any unused portion of the
                  milestone payment may be refunded, minus administrative costs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Discuss Your Project?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let's turn your ideas into reality
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            Schedule a Consultation
          </a>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let's bring your project to life
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-medium rounded-full hover:bg-blue-50 transition-colors duration-300"
            >
              Contact Us
            </a>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/2348162831919?text=Hello%20HardyTech,%20I%20want%20to%20discuss%20pricing",
                  "_blank",
                )
              }
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors duration-300"
            >
              <FaWhatsapp className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

