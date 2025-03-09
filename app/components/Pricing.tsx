"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"

// Define pricing period types
type BillingPeriod = "monthly" | "annually"

// Define the common Props interface
interface PricingProps {
  category: "websites" | "software" | "blockchain" | "all"
}

export default function Pricing({ category = "all" }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")
  const { theme } = useTheme()

  // Website pricing plans
  const websitePlans = [
    {
      name: "Basic WordPress Website",
      description: "Perfect for small businesses and personal brands",
      price: billingPeriod === "monthly" ? "₦500,000" : "₦800,000",
      period: billingPeriod === "monthly" ? "without hosting" : "with hosting",
      discount: billingPeriod === "annually" ? "Includes 1 year hosting & maintenance" : null,
      features: [
        "Responsive design",
        "Up to 5 pages",
        "Contact form",
        "Basic SEO optimization",
        "Mobile-friendly design",
        "Premium Elementor Pro plugin",
        "Standard theme customization",
        billingPeriod === "annually" ? "1 year hosting included" : "Hosting not included",
        billingPeriod === "annually" ? "3 months maintenance" : "Maintenance available separately",
      ],
      notIncluded: [
        "Content creation",
        "E-commerce functionality",
        "Custom integrations",
        "Fluent Forms Pro",
        "Yoast SEO Premium",
        "Custom theme development",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Business WordPress Website",
      description: "Ideal for growing businesses and organizations",
      price: billingPeriod === "monthly" ? "₦750,000" : "₦1,100,000",
      period: billingPeriod === "monthly" ? "without hosting" : "with hosting",
      discount: billingPeriod === "annually" ? "Includes 1 year hosting & maintenance" : null,
      features: [
        "Responsive design",
        "Up to 10 pages",
        "Advanced contact forms",
        "Comprehensive SEO optimization",
        "Blog/news section",
        "Social media integration",
        "Google Analytics setup",
        "Basic animations",
        "Premium Elementor Pro plugin",
        "Fluent Forms Pro plugin",
        "Yoast SEO Premium plugin",
        "E-commerce functionality",
        "Custom database development",
        "Enhanced theme customization",
        billingPeriod === "annually" ? "1 year hosting included" : "Hosting not included",
        billingPeriod === "annually" ? "6 months maintenance" : "Maintenance available separately",
      ],
      notIncluded: ["Content creation", "Advanced custom functionality", "Full custom theme development"],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Custom Native Website",
      description: "Complete solution for businesses requiring custom functionality",
      price: billingPeriod === "monthly" ? "₦2,000,000" : "₦2,500,000",
      period: billingPeriod === "monthly" ? "without hosting" : "with hosting",
      discount: billingPeriod === "annually" ? "Includes 1 year hosting & top priority support" : null,
      features: [
        "Custom design & development",
        "Unlimited pages",
        "Advanced functionality",
        "Custom database integration",
        "User authentication",
        "Advanced SEO optimization",
        "Performance optimization",
        "Cross-browser compatibility",
        "All premium plugins included",
        "E-commerce functionality",
        "Custom API development",
        "Advanced security features",
        "Top priority support",
        "Fully custom theme development",
        billingPeriod === "annually" ? "1 year hosting included" : "Hosting not included",
        billingPeriod === "annually" ? "1 year maintenance" : "Maintenance available separately",
      ],
      notIncluded: ["Content creation"],
      cta: "Get Started",
      popular: false,
    },
  ]

  // Software pricing plans
  const softwarePlans = [
    {
      name: "Custom Web App",
      description: "Basic custom software solution",
      price: billingPeriod === "monthly" ? "$4,500" : "$40,000",
      period: billingPeriod === "monthly" ? "starting at" : "typical project",
      discount: billingPeriod === "annually" ? "Enterprise Discount" : null,
      features: [
        "Requirements analysis",
        "User-friendly interface",
        "User authentication",
        "Basic database integration",
        "Responsive design",
        "2 rounds of revisions",
      ],
      notIncluded: ["Advanced analytics", "Third-party integrations", "Ongoing support (available separately)"],
      cta: "Request Quote",
      popular: false,
    },
    {
      name: "Enterprise Solution",
      description: "Comprehensive software for business operations",
      price: billingPeriod === "monthly" ? "$12,000" : "$110,000",
      period: billingPeriod === "monthly" ? "starting at" : "typical project",
      discount: billingPeriod === "annually" ? "Enterprise Discount" : null,
      features: [
        "In-depth requirements analysis",
        "Custom architecture design",
        "User role management",
        "Advanced database integration",
        "API development",
        "Third-party integrations",
        "Comprehensive testing",
        "User training",
        "30-day support",
      ],
      notIncluded: ["Ongoing maintenance (available as subscription)", "Hardware infrastructure"],
      cta: "Request Quote",
      popular: true,
    },
    {
      name: "SaaS Development",
      description: "Complete Software-as-a-Service solution",
      price: billingPeriod === "monthly" ? "$20,000" : "$180,000",
      period: billingPeriod === "monthly" ? "starting at" : "typical project",
      discount: billingPeriod === "annually" ? "Enterprise Discount" : null,
      features: [
        "Full-cycle development",
        "Subscription management",
        "Multi-tenant architecture",
        "Admin dashboard",
        "Analytics and reporting",
        "Scalable cloud infrastructure",
        "Payment processing",
        "Email notifications",
        "API documentation",
      ],
      notIncluded: ["Marketing website (available as add-on)", "Customer acquisition"],
      cta: "Request Quote",
      popular: false,
    },
  ]

  // Blockchain pricing plans
  const blockchainPlans = [
    {
      name: "Smart Contract Development",
      description: "Custom smart contracts for your blockchain needs",
      price: billingPeriod === "monthly" ? "$2,500" : "$22,000",
      period: billingPeriod === "monthly" ? "starting at" : "typical project",
      discount: billingPeriod === "annually" ? "Long-term Discount" : null,
      features: [
        "Requirements analysis",
        "Solidity development",
        "Contract optimization",
        "Security audit",
        "Test deployment",
        "Documentation",
      ],
      notIncluded: ["Frontend integration", "Ongoing maintenance", "Token generation"],
      cta: "Request Quote",
      popular: false,
    },
    {
      name: "DApp Development",
      description: "Complete decentralized application with frontend",
      price: billingPeriod === "monthly" ? "$8,000" : "$75,000",
      period: billingPeriod === "monthly" ? "starting at" : "typical project",
      discount: billingPeriod === "annually" ? "Long-term Discount" : null,
      features: [
        "Smart contract development",
        "Web3 frontend integration",
        "User authentication",
        "Wallet integration",
        "Transaction management",
        "User-friendly interface",
        "Security audit",
        "Testing on testnets",
      ],
      notIncluded: ["Custom token creation (available as add-on)", "Ongoing maintenance (available separately)"],
      cta: "Request Quote",
      popular: true,
    },
    {
      name: "Enterprise Blockchain",
      description: "Custom blockchain solutions for enterprises",
      price: billingPeriod === "monthly" ? "$20,000" : "$180,000",
      period: billingPeriod === "monthly" ? "starting at" : "typical project",
      discount: billingPeriod === "annually" ? "Long-term Discount" : null,
      features: [
        "Private blockchain deployment",
        "Consensus mechanism customization",
        "Node setup and configuration",
        "Smart contract development",
        "API integration",
        "Admin dashboard",
        "Security audit",
        "Documentation and training",
      ],
      notIncluded: ["Hardware infrastructure", "Legal compliance consulting"],
      cta: "Request Quote",
      popular: false,
    },
  ]

  // Determine which plans to show based on the category
  let plansToShow = []
  if (category === "websites") {
    plansToShow = websitePlans
  } else if (category === "software") {
    plansToShow = softwarePlans
  } else if (category === "blockchain") {
    plansToShow = blockchainPlans
  } else {
    // For the "all" category, select the popular plan from each category
    plansToShow = [
      websitePlans.find((plan) => plan.popular) || websitePlans[0],
      softwarePlans.find((plan) => plan.popular) || softwarePlans[0],
      blockchainPlans.find((plan) => plan.popular) || blockchainPlans[0],
    ]
  }

  // Function to handle period change
  const handlePeriodChange = (period: BillingPeriod) => {
    setBillingPeriod(period)
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Affordable Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Choose the perfect plan for your project needs
          </p>

          {/* Billing period toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => handlePeriodChange("monthly")}
              className={`px-4 py-2 text-sm rounded-md ${
                billingPeriod === "monthly"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Without Hosting
            </button>
            <button
              onClick={() => handlePeriodChange("annually")}
              className={`px-4 py-2 text-sm rounded-md ${
                billingPeriod === "annually"
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              With Hosting
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plansToShow.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden ${
                  plan.popular
                    ? "border-blue-500 dark:border-blue-400 dark:dark-card-glow"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">Popular</div>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{plan.period}</span>
                    </div>
                    {plan.discount && (
                      <p className="text-green-600 dark:text-green-400 text-sm mt-1">{plan.discount}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.notIncluded.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0">—</span>
                              <span className="text-gray-500 dark:text-gray-400 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Need a custom quote?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Every project is unique. Contact us for a personalized quote tailored to your specific requirements.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  )
}

