"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Lightbulb, Users, Database, Server, Lock } from "lucide-react"
import CompanyHeader from "../components/company/Header"
import Footer from "../components/company/Footer"

export default function VisionPage() {
  return (
    <main className="min-h-screen">
      <CompanyHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100 to-transparent opacity-70 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-70"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our TechVision
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Building robust backend systems and blockchain solutions that power the next generation of digital
              innovation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#mission"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Discover Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our <span className="text-blue-600 dark:text-blue-400">TechMission</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                At HardyTech, our mission is to deliver exceptional backend and blockchain solutions that form the
                foundation of transformative digital experiences. We specialize in building the robust, scalable systems
                that power modern applications.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We are committed to technical excellence, security-first development, and creating infrastructure that
                enables our clients to innovate with confidence and scale without limitations.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/mission-image.jpg"
                  alt="HardyTech Mission"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-24">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-600 rounded-3xl transform -rotate-3 opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/vision-image.jpg"
                  alt="HardyTech Vision"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our <span className="text-blue-600 dark:text-blue-400">TechVision</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                We envision a future where backend systems and blockchain technologies serve as the reliable foundation
                for digital innovation. Our goal is to make these complex technologies accessible and practical for
                businesses of all sizes.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                By focusing on the core infrastructure that powers applications, we enable our clients to build more
                secure, scalable, and efficient digital products that can adapt to changing market demands and
                technological advancements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="text-blue-600 dark:text-blue-400">TechValues</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              These core principles guide our approach to backend development, blockchain solutions, and client
              relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Server className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Technical Excellence",
                description:
                  "We maintain the highest standards of code quality, system architecture, and technical implementation in every project we undertake.",
              },
              {
                icon: <Lock className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Security-First",
                description:
                  "We prioritize security at every level, implementing robust measures to protect data, systems, and user privacy from emerging threats.",
              },
              {
                icon: <Database className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Scalable Design",
                description:
                  "We build systems that can grow with your business, handling increased loads and expanded functionality without requiring complete rebuilds.",
              },
              {
                icon: <Code className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Clean Code",
                description:
                  "We write maintainable, well-documented code that follows best practices and can be efficiently maintained and extended over time.",
              },
              {
                icon: <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Collaborative Process",
                description:
                  "We work closely with our clients, maintaining clear communication and involving stakeholders throughout the development process.",
              },
              {
                icon: <Lightbulb className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Continuous Innovation",
                description:
                  "We stay at the forefront of backend and blockchain technologies, constantly exploring new approaches to solve complex challenges.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="text-blue-600 dark:text-blue-400">TechExpertise</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We specialize in the technologies that form the backbone of modern digital systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Backend Development</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Core Technologies</h4>
                  <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Node.js
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Laravel
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Express.js
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Django
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      GraphQL
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      RESTful APIs
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Database Systems</h4>
                  <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      PostgreSQL
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      MongoDB
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      MySQL
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Redis
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Infrastructure</h4>
                  <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      AWS
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Docker
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Kubernetes
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      CI/CD Pipelines
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Blockchain Development</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Blockchain Platforms</h4>
                  <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Ethereum
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Binance Smart Chain
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Polygon
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Solana
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Smart Contract Development
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Solidity
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Web3.js
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Ethers.js
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Hardhat
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Truffle
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Blockchain Applications</h4>
                  <ul className="grid grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      DeFi Solutions
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      NFT Marketplaces
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      DAO Structures
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                      Supply Chain Tracking
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Outlook Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Our <span className="text-blue-600 dark:text-blue-400">TechFuture</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                As we look ahead, we're focused on pioneering innovations in backend systems and blockchain
                technologies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Research & Development</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Our R&D initiatives are focused on:</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Layer 2 scaling solutions for blockchain networks
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Serverless architecture optimization for backend systems
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Cross-chain interoperability protocols
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    AI-enhanced backend optimization
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Industry Focus</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">We're developing specialized solutions for:</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Financial services infrastructure modernization
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Healthcare data management and interoperability
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Supply chain transparency and verification
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Digital identity and access management systems
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                We believe that robust backend systems and thoughtfully implemented blockchain solutions will be
                critical infrastructure for the next generation of digital innovation. Our goal is to be at the
                forefront of this technological evolution.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your TechFoundation?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's collaborate to create the robust backend systems and blockchain solutions that will power your
              business into the future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-medium rounded-full hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105 shadow-lg"
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors duration-300 transform hover:scale-105"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

