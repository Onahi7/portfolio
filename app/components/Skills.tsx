"use client"

import { motion } from "framer-motion"
import { Server, Database, Cpu, Layers, Shield, GitBranch, Terminal, Cloud, Workflow, Zap } from "lucide-react"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

const SkillIcon = ({ icon: Icon, color }: { icon: any; color: string }) => (
  <div className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg`}>
    <Icon className={`w-6 h-6 ${color}`} />
  </div>
)

const skills = [
  {
    icon: Server,
    name: "Backend Development",
    tech: "Laravel, Node.js",
    description: "Building robust and scalable server-side applications with Laravel and Node.js.",
    color: "text-blue-500",
  },
  {
    icon: Database,
    name: "Database Management",
    tech: "MySQL, MongoDB",
    description: "Designing efficient database schemas and queries for optimal data management.",
    color: "text-green-500",
  },
  {
    icon: Cpu,
    name: "API Development",
    tech: "RESTful, GraphQL",
    description: "Creating efficient and secure APIs for seamless data communication.",
    color: "text-purple-500",
  },
  {
    icon: Layers,
    name: "Blockchain Development",
    tech: "Ethereum, Smart Contracts",
    description: "Developing decentralized applications and smart contracts on blockchain platforms.",
    color: "text-yellow-500",
  },
  {
    icon: Shield,
    name: "Security",
    tech: "Authentication, Encryption",
    description: "Implementing robust security measures to protect applications and user data.",
    color: "text-red-500",
  },
  {
    icon: GitBranch,
    name: "Version Control",
    tech: "Git, GitHub",
    description: "Managing code versions efficiently and collaborating effectively through Git and GitHub.",
    color: "text-orange-500",
  },
  {
    icon: Terminal,
    name: "Scripting",
    tech: "Bash, Python",
    description: "Writing efficient scripts for automation and data processing tasks.",
    color: "text-indigo-500",
  },
  {
    icon: Cloud,
    name: "Cloud Services",
    tech: "AWS, Digital Ocean",
    description: "Deploying and managing applications on cloud platforms for scalability and reliability.",
    color: "text-teal-500",
  },
  {
    icon: Workflow,
    name: "Agile Methodologies",
    tech: "Scrum, Kanban",
    description: "Working efficiently in agile environments with a focus on continuous delivery.",
    color: "text-cyan-500",
  },
  {
    icon: Zap,
    name: "Performance Optimization",
    tech: "Caching, Load Balancing",
    description: "Optimizing application performance for speed and efficiency at scale.",
    color: "text-pink-500",
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900"></div>

      {/* Skill Illustrations */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="skill-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50 30 L50 70 M30 50 L70 50" stroke="currentColor" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#skill-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Skills & Expertise" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <SkillIcon icon={skill.icon} color={skill.color} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.tech}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

