import type { Metadata } from "next"
import AdvertiseTrainingForm from "../components/AdvertiseTrainingForm"
import CompanyHeader from "../components/company/Header"
import Footer from "../components/company/Footer"

export const metadata: Metadata = {
  title: "Advertise Your Training | HardyTech",
  description: "Promote your tech training events to our growing community of tech enthusiasts and professionals.",
}

export default function AdvertiseTrainingPage() {
  return (
    <main className="min-h-screen">
      <CompanyHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200">
              Advertise Your Training
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Reach our community of tech enthusiasts and professionals by promoting your training events on our
              platform.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Submit Your Training Event</h2>
              <AdvertiseTrainingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Why Advertise With Us?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Promote your training events to a targeted audience of tech professionals and enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Targeted Audience",
                description:
                  "Reach tech professionals and enthusiasts who are actively looking for training opportunities.",
              },
              {
                title: "Increased Visibility",
                description: "Get your training events in front of our growing community of tech-focused individuals.",
              },
              {
                title: "Credibility Boost",
                description: "Association with HardyTech enhances your training event's credibility in the market.",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Advertising Rates</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose the package that best suits your promotional needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Basic Listing",
                price: "₦15,000",
                features: ["30-day listing", "Standard placement", "Basic event details", "Contact information"],
              },
              {
                title: "Premium Listing",
                price: "₦30,000",
                features: [
                  "60-day listing",
                  "Featured placement",
                  "Detailed event description",
                  "Contact information",
                  "Website link",
                  "Social media promotion",
                ],
                highlighted: true,
              },
              {
                title: "Extended Listing",
                price: "₦45,000",
                features: [
                  "90-day listing",
                  "Priority placement",
                  "Comprehensive event details",
                  "Contact information",
                  "Website link",
                  "Social media promotion",
                  "Email newsletter feature",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ${
                  plan.highlighted ? "border-2 border-blue-500 dark:border-blue-400 transform scale-105" : ""
                }`}
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{plan.title}</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

