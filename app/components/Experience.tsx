"use client"

import { Briefcase, Calendar, MapPin, Globe } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

export default function Experience() {
  const experiences = [
    {
      company: "HARDYTECH HUB",
      location: "Abuja, Federal Capital Territory, Nigeria",
      period: "Jan 2023 - Present",
      role: "Software Lead",
      responsibilities: [
        "Led a team of developers to build decentralized applications on the Ethereum blockchain.",
        "Optimized smart contract deployment reducing gas fees by 15%.",
        "Managed project timelines and deliverables for multiple blockchain projects.",
        "Collaborated with cross-functional teams to align technical solutions with business objectives.",
      ],
    },
    {
      company: "HARDYTECH HUB",
      location: "Abuja, Federal Capital Territory, Nigeria",
      period: "Jul 2022 - Present",
      role: "Blockchain Developer",
      responsibilities: [
        "Developed and maintained blockchain platforms utilizing Hyperledger, Ethereum, and Corda.",
        "Built DApps integrating smart contracts with React front-end improving user experience.",
        "Implemented security best practices for smart contract development and auditing.",
        "Collaborated with team members to design and implement scalable blockchain solutions.",
      ],
    },
    {
      company: "BROTHERLY RELIEF MISSIONS INITIATIVE",
      location: "Benue State, Nigeria (Remote)",
      period: "Apr 2023 - Present",
      role: "Information Communication Technology Manager",
      responsibilities: [
        "Manage all information systems, networks, hardware, software, and tech support for the organization.",
        "Lead IT team to ensure systems run smoothly, are secure, and meet organization needs.",
        "Implement new technologies to improve operations, programs, and service delivery.",
        "Advise leadership on appropriate tech solutions and digital transformation.",
        "Develop and manage IT budget and contracts.",
      ],
    },
    {
      company: "Shopify",
      location: "Nigeria (Freelance)",
      period: "Jun 2022 - Present",
      role: "Enterprise Solutions Specialist",
      responsibilities: [
        "Provided enterprise solutions to clients leveraging the Shopify platform.",
        "Implemented CRM solutions increasing sales conversions by 20%.",
        "Customized Shopify themes and developed apps to meet specific client needs.",
        "Offered technical support and training to clients on Shopify platform usage.",
      ],
    },
  ]

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-gray-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Professional Experience" />
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl relative overflow-hidden group"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-700 rounded-bl-full z-0 opacity-50 
                transition-transform duration-300 group-hover:scale-110"
              ></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2 dark:text-white flex items-center">
                  {exp.company === "Freelance" ? <Globe className="w-6 h-6 mr-2 text-blue-500" /> : null}
                  {exp.company}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {exp.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {exp.period}
                </p>
                <p className="text-xl font-medium mb-4 dark:text-gray-200 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {exp.role}
                </p>
                <ul className="list-none space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </section>
  )
}

