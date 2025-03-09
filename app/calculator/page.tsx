"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import CompanyHeader from "../components/company/Header"
import Footer from "../components/company/Footer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"

export default function PriceCalculator() {
  // Project type state
  const [projectType, setProjectType] = useState("website")

  // Specific options based on project type
  const [websiteType, setWebsiteType] = useState("wordpress_basic")
  const [pages, setPages] = useState(5)
  const [softwareType, setSoftwareType] = useState("webapp")
  const [complexity, setComplexity] = useState("medium")
  const [blockchainType, setBlockchainType] = useState("smartcontract")

  // Image scraping options
  const [imageScraping, setImageScraping] = useState("none")

  // Common features
  const [features, setFeatures] = useState({
    design: true,
    cms: false,
    ecommerce: false,
    seo: true,
    analytics: false,
    multiLanguage: false,
    userAuth: false,
    paymentGateway: false,
    api: false,
    elementorPro: false,
    fluentForms: false,
    yoastSEO: false,
    prioritySupport: false,
    customTheme: false,
  })

  // Timeline
  const [timeline, setTimeline] = useState(1) // In months

  // Result
  const [estimatedPrice, setEstimatedPrice] = useState({
    min: 0,
    max: 0,
  })

  // Calculate price whenever inputs change
  useEffect(() => {
    calculatePrice()
  }, [projectType, websiteType, pages, softwareType, complexity, blockchainType, features, timeline, imageScraping])

  // Price calculation function
  const calculatePrice = () => {
    let baseMin = 0
    let baseMax = 0
    let currency = "₦"

    // Base price by project type
    if (projectType === "website") {
      if (websiteType === "wordpress_basic") {
        baseMin = 500000
        baseMax = 800000

        // Add premium plugins
        if (features.elementorPro) baseMin += 0 // Already included
        if (features.fluentForms) baseMin += 40000
        if (features.yoastSEO) baseMin += 40000
        if (features.customTheme) baseMin += 150000
      } else if (websiteType === "wordpress_business") {
        baseMin = 750000
        baseMax = 1100000

        // These are already included in the business package
        features.elementorPro = true
        features.fluentForms = true
        features.yoastSEO = true
        features.ecommerce = true

        // Custom theme is an add-on
        if (features.customTheme) baseMin += 100000
      } else if (websiteType === "custom_native") {
        baseMin = 2000000
        baseMax = 2500000

        // Everything is included
        features.elementorPro = true
        features.fluentForms = true
        features.yoastSEO = true
        features.ecommerce = true
        features.prioritySupport = true
        features.api = true
        features.userAuth = true
        features.customTheme = true
      }

      // Add image scraping costs
      if (imageScraping === "basic") {
        baseMin += 50000
        baseMax += 80000
      } else if (imageScraping === "advanced") {
        baseMin += 150000
        baseMax += 200000
      } else if (imageScraping === "unlimited") {
        baseMin += 300000
        baseMax += 400000
      }

      // Adjust for number of pages
      const pageMultiplier = Math.max(1, Math.log(pages) / Math.log(5))
      baseMin *= pageMultiplier
      baseMax *= pageMultiplier
    } else if (projectType === "software") {
      currency = "$"
      if (softwareType === "webapp") {
        baseMin = 4500
        baseMax = 12000
      } else if (softwareType === "mobile") {
        baseMin = 6000
        baseMax = 15000
      } else if (softwareType === "desktop") {
        baseMin = 5000
        baseMax = 14000
      }

      // Add image scraping costs for software
      if (imageScraping === "basic") {
        baseMin += 1000
        baseMax += 2000
      } else if (imageScraping === "advanced") {
        baseMin += 3000
        baseMax += 5000
      } else if (imageScraping === "unlimited") {
        baseMin += 7000
        baseMax += 10000
      }

      // Adjust for complexity
      if (complexity === "simple") {
        baseMin *= 0.7
        baseMax *= 0.7
      } else if (complexity === "complex") {
        baseMin *= 1.5
        baseMax *= 1.5
      }
    } else if (projectType === "blockchain") {
      currency = "$"
      if (blockchainType === "smartcontract") {
        baseMin = 2500
        baseMax = 6000
      } else if (blockchainType === "dapp") {
        baseMin = 8000
        baseMax = 20000
      } else if (blockchainType === "token") {
        baseMin = 4000
        baseMax = 12000
      }

      // Add image scraping costs for blockchain (NFT related)
      if (imageScraping === "basic") {
        baseMin += 1500
        baseMax += 3000
      } else if (imageScraping === "advanced") {
        baseMin += 4000
        baseMax += 7000
      } else if (imageScraping === "unlimited") {
        baseMin += 10000
        baseMax += 15000
      }
    }

    // Feature adjustments
    let featureMultiplier = 1.0

    if (features.cms) featureMultiplier += 0.1
    if (features.ecommerce && projectType !== "website") featureMultiplier += 0.3 // Only add if not already included in website package
    if (features.seo) featureMultiplier += 0.1
    if (features.analytics) featureMultiplier += 0.1
    if (features.multiLanguage) featureMultiplier += 0.15
    if (features.userAuth && projectType !== "website") featureMultiplier += 0.25 // Only add if not already included in website package
    if (features.paymentGateway) featureMultiplier += 0.2
    if (features.api && projectType !== "website") featureMultiplier += 0.25 // Only add if not already included in website package
    if (features.prioritySupport && websiteType !== "custom_native") featureMultiplier += 0.15 // Only add if not already included

    baseMin *= featureMultiplier
    baseMax *= featureMultiplier

    // Timeline adjustment (rush projects cost more)
    if (timeline < 1) {
      baseMin *= 1.5
      baseMax *= 1.5
    } else if (timeline > 3) {
      baseMin *= 0.9
      baseMax *= 0.9
    }

    // Format the numbers appropriately based on currency
    if (currency === "₦") {
      // Round to nearest thousand for Naira
      baseMin = Math.round(baseMin / 1000) * 1000
      baseMax = Math.round(baseMax / 1000) * 1000

      // Format with commas for thousands
      const formatNaira = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }

      setEstimatedPrice({
        min: `${currency}${formatNaira(baseMin)}`,
        max: `${currency}${formatNaira(baseMax)}`,
      })
    } else {
      // Round to nearest hundred for USD
      baseMin = Math.round(baseMin / 100) * 100
      baseMax = Math.round(baseMax / 100) * 100

      setEstimatedPrice({
        min: `${currency}${baseMin.toLocaleString()}`,
        max: `${currency}${baseMax.toLocaleString()}`,
      })
    }
  }

  const sendEstimateToWhatsApp = () => {
    // Create a summary of the selected options
    let summary = `
*Project Estimate Request*
---------------------------
*Project Type:* ${projectType.charAt(0).toUpperCase() + projectType.slice(1)}
`

    if (projectType === "website") {
      summary += `*Website Type:* ${websiteType.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}\n`
      summary += `*Number of Pages:* ${pages}\n`
    } else if (projectType === "software") {
      summary += `*Software Type:* ${softwareType.charAt(0).toUpperCase() + softwareType.slice(1)}\n`
      summary += `*Complexity:* ${complexity.charAt(0).toUpperCase() + complexity.slice(1)}\n`
    } else if (projectType === "blockchain") {
      summary += `*Blockchain Solution:* ${blockchainType.charAt(0).toUpperCase() + blockchainType.slice(1)}\n`
    }

    summary += `*Image Scraping:* ${imageScraping.charAt(0).toUpperCase() + imageScraping.slice(1)}\n`
    summary += `*Timeline:* ${timeline} month${timeline !== 1 ? "s" : ""}\n\n`

    // Add selected features
    summary += "*Selected Features:*\n"
    Object.entries(features).forEach(([key, value]) => {
      if (value) {
        summary += `- ${key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}\n`
      }
    })

    summary += `\n*Estimated Price Range:* ${estimatedPrice.min} - ${estimatedPrice.max}\n`
    summary += "---------------------------\n"
    summary += "I'd like to discuss this project estimate further."

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(summary)

    // Open WhatsApp with the formatted message
    window.open(`https://wa.me/2348162831919?text=${encodedMessage}`, "_blank")
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
              Project Cost Calculator
            </motion.h1>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get an instant ballpark estimate for your project. Adjust the options below to see how different features
              affect the price.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>Customize your project requirements to get an estimate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Project Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Project Type</label>
                    <Select value={projectType} onValueChange={(value) => setProjectType(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="software">Software Application</SelectItem>
                        <SelectItem value="blockchain">Blockchain Solution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Website-specific options */}
                  {projectType === "website" && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Website Type</label>
                        {/* Update the website type options */}
                        <Select value={websiteType} onValueChange={(value) => setWebsiteType(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select website type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wordpress_basic">Basic WordPress (₦500,000)</SelectItem>
                            <SelectItem value="wordpress_business">Business WordPress (₦750,000)</SelectItem>
                            <SelectItem value="custom_native">Custom Native Website (₦2,000,000)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Number of Pages: {pages}</label>
                        <Slider
                          defaultValue={[5]}
                          min={1}
                          max={20}
                          step={1}
                          onValueChange={(value) => setPages(value[0])}
                          className="py-4"
                        />
                      </div>

                      {/* Website-specific features */}
                      {websiteType === "wordpress_basic" && (
                        <div>
                          <label className="text-sm font-medium mb-4 block">Premium Plugins & Features</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="elementorPro" checked={true} disabled={true} />
                              <label htmlFor="elementorPro" className="text-sm">
                                Elementor Pro (Included)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="fluentForms"
                                checked={features.fluentForms}
                                onCheckedChange={(checked) =>
                                  setFeatures({ ...features, fluentForms: checked === true })
                                }
                              />
                              <label htmlFor="fluentForms" className="text-sm">
                                Fluent Forms Pro (+₦40,000)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="yoastSEO"
                                checked={features.yoastSEO}
                                onCheckedChange={(checked) => setFeatures({ ...features, yoastSEO: checked === true })}
                              />
                              <label htmlFor="yoastSEO" className="text-sm">
                                Yoast SEO Premium (+₦40,000)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="customTheme"
                                checked={features.customTheme}
                                onCheckedChange={(checked) =>
                                  setFeatures({ ...features, customTheme: checked === true })
                                }
                              />
                              <label htmlFor="customTheme" className="text-sm">
                                Custom Theme Development (+₦150,000)
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Business WordPress specific features */}
                      {websiteType === "wordpress_business" && (
                        <div>
                          <label className="text-sm font-medium mb-4 block">Premium Features</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="customTheme"
                                checked={features.customTheme}
                                onCheckedChange={(checked) =>
                                  setFeatures({ ...features, customTheme: checked === true })
                                }
                              />
                              <label htmlFor="customTheme" className="text-sm">
                                Custom Theme Development (+₦100,000)
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Image Scraping Options */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Image Scraping</label>
                    <Select value={imageScraping} onValueChange={(value) => setImageScraping(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select image scraping level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="basic">Basic (up to 50 images)</SelectItem>
                        <SelectItem value="advanced">Advanced (up to 200 images)</SelectItem>
                        <SelectItem value="unlimited">Unlimited with AI categorization</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Note: Image scraping should only be used for content you have rights to or is under fair use.
                    </p>
                  </div>

                  {/* Software-specific options */}
                  {projectType === "software" && (
                    <>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Software Type</label>
                        <Select value={softwareType} onValueChange={(value) => setSoftwareType(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select software type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="webapp">Web Application</SelectItem>
                            <SelectItem value="mobile">Mobile App</SelectItem>
                            <SelectItem value="desktop">Desktop Application</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Complexity</label>
                        <Select value={complexity} onValueChange={(value) => setComplexity(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select complexity level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">Simple</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="complex">Complex</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Blockchain-specific options */}
                  {projectType === "blockchain" && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Blockchain Solution</label>
                      <Select value={blockchainType} onValueChange={(value) => setBlockchainType(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blockchain type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smartcontract">Smart Contract</SelectItem>
                          <SelectItem value="dapp">Decentralized Application (DApp)</SelectItem>
                          <SelectItem value="token">Token or Coin Creation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Common features */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">Features</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cms"
                          checked={features.cms}
                          onCheckedChange={(checked) => setFeatures({ ...features, cms: checked === true })}
                        />
                        <label htmlFor="cms" className="text-sm">
                          Content Management System
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="ecommerce"
                          checked={
                            features.ecommerce ||
                            websiteType === "wordpress_business" ||
                            websiteType === "custom_native"
                          }
                          disabled={websiteType === "wordpress_business" || websiteType === "custom_native"}
                          onCheckedChange={(checked) => setFeatures({ ...features, ecommerce: checked === true })}
                        />
                        <label htmlFor="ecommerce" className="text-sm">
                          {websiteType === "wordpress_business" || websiteType === "custom_native"
                            ? "E-commerce Functionality (Included)"
                            : "E-commerce Functionality"}
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="seo"
                          checked={features.seo}
                          onCheckedChange={(checked) => setFeatures({ ...features, seo: checked === true })}
                        />
                        <label htmlFor="seo" className="text-sm">
                          SEO Optimization
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="analytics"
                          checked={features.analytics}
                          onCheckedChange={(checked) => setFeatures({ ...features, analytics: checked === true })}
                        />
                        <label htmlFor="analytics" className="text-sm">
                          Analytics Integration
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="multiLanguage"
                          checked={features.multiLanguage}
                          onCheckedChange={(checked) => setFeatures({ ...features, multiLanguage: checked === true })}
                        />
                        <label htmlFor="multiLanguage" className="text-sm">
                          Multi-language Support
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="userAuth"
                          checked={features.userAuth || websiteType === "custom_native"}
                          disabled={websiteType === "custom_native"}
                          onCheckedChange={(checked) => setFeatures({ ...features, userAuth: checked === true })}
                        />
                        <label htmlFor="userAuth" className="text-sm">
                          {websiteType === "custom_native" ? "User Authentication (Included)" : "User Authentication"}
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="paymentGateway"
                          checked={features.paymentGateway}
                          onCheckedChange={(checked) => setFeatures({ ...features, paymentGateway: checked === true })}
                        />
                        <label htmlFor="paymentGateway" className="text-sm">
                          Payment Gateway
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="api"
                          checked={features.api || websiteType === "custom_native"}
                          disabled={websiteType === "custom_native"}
                          onCheckedChange={(checked) => setFeatures({ ...features, api: checked === true })}
                        />
                        <label htmlFor="api" className="text-sm">
                          {websiteType === "custom_native" ? "API Integration (Included)" : "API Integration"}
                        </label>
                      </div>
                      {projectType === "website" && websiteType !== "custom_native" && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="prioritySupport"
                            checked={features.prioritySupport || websiteType === "custom_native"}
                            disabled={websiteType === "custom_native"}
                            onCheckedChange={(checked) =>
                              setFeatures({ ...features, prioritySupport: checked === true })
                            }
                          />
                          <label htmlFor="prioritySupport" className="text-sm">
                            Top Priority Support
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Timeline (months): {timeline}</label>
                    <Slider
                      defaultValue={[1]}
                      min={0.5}
                      max={6}
                      step={0.5}
                      onValueChange={(value) => setTimeline(value[0])}
                      className="py-4"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Estimated Price Range</CardTitle>
                  <CardDescription>Based on your selected options</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Update the estimated price display */}
                  <div className="text-center py-8">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {estimatedPrice.min} - {estimatedPrice.max}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">This is a preliminary estimate</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Need a more accurate quote? Contact us for a detailed consultation.
                  </p>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                    onClick={sendEstimateToWhatsApp}
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    Send Estimate to WhatsApp
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Important Note</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This calculator provides a rough estimate based on typical project parameters. Actual project costs may
              vary based on specific requirements, complexities, and technologies used. For an accurate quote, please
              contact us for a personalized consultation.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              <strong>Legal Disclaimer:</strong> Image scraping services are provided for content you have rights to use
              or that falls under fair use. We do not support or encourage copyright infringement. Clients are
              responsible for ensuring they have proper rights to use scraped images.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

