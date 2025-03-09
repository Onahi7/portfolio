import CompanyHeader from "../components/company/Header"
import Footer from "../components/company/Footer"
import ContactForm from "../components/ContactForm"
import { FaWhatsapp } from "react-icons/fa"
import type { Metadata } from "next"
import { pageMetadata } from "../seo-config"
import JsonLd from "../components/JsonLd"

export const metadata: Metadata = {
  title: pageMetadata.contact.title,
  description: pageMetadata.contact.description,
  keywords: pageMetadata.contact.keywords,
}

export default function ContactPage() {
  const faqData = [
    {
      question: "How long does it take to complete a website?",
      answer:
        "The timeline varies depending on the complexity of your project. A basic WordPress website typically takes 2-3 weeks, while more complex custom websites may take 6  A basic WordPress website typically takes 2-3 weeks, while more complex custom websites may take 6-8 weeks or more. We'll provide you with a specific timeline during our initial consultation.",
    },
    {
      question: "What information do you need to get started?",
      answer:
        "To get started, we'll need your business information, project goals, design preferences, and any existing brand assets you have (logo, colors, etc.). We'll guide you through this process with a detailed questionnaire after our initial consultation.",
    },
    {
      question: "Do you offer website maintenance services?",
      answer:
        "Yes, we offer ongoing maintenance packages to keep your website secure, updated, and running smoothly. Our maintenance services include regular updates, security monitoring, backups, and technical support.",
    },
    {
      question: "Can you help with website hosting?",
      answer:
        "We offer hosting solutions as part of our packages. Our hosting includes security features, regular backups, and technical support to ensure your website remains fast, secure, and reliable.",
    },
  ]

  return (
    <>
      <JsonLd type="FAQPage" data={faqData} />
      <main className="min-h-screen">
        <CompanyHeader />

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200">
                Get In Touch
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Have a question or ready to start your project? We're here to help you bring your vision to life.
              </p>
              <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-8">
                <FaWhatsapp className="h-6 w-6 mr-2" />
                <p className="text-lg font-medium">All messages are sent via WhatsApp for faster response</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find quick answers to common questions about our services
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How long does it take to complete a website?",
                  answer:
                    "The timeline varies depending on the complexity of your project. A basic WordPress website typically takes 2-3 weeks, while more complex custom websites may take 6-8 weeks or more. We'll provide you with a specific timeline during our initial consultation.",
                },
                {
                  question: "What information do you need to get started?",
                  answer:
                    "To get started, we'll need your business information, project goals, design preferences, and any existing brand assets you have (logo, colors, etc.). We'll guide you through this process with a detailed questionnaire after our initial consultation.",
                },
                {
                  question: "Do you offer website maintenance services?",
                  answer:
                    "Yes, we offer ongoing maintenance packages to keep your website secure, updated, and running smoothly. Our maintenance services include regular updates, security monitoring, backups, and technical support.",
                },
                {
                  question: "Can you help with website hosting?",
                  answer:
                    "We offer hosting solutions as part of our packages. Our hosting includes security features, regular backups, and technical support to ensure your website remains fast, secure, and reliable.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

