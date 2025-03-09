"use client"

import { motion } from "framer-motion"
import { Code, Database, Server, Layers, Cloud, Terminal } from "lucide-react"
import Image from "next/image"

export default function About() {
  const skills = [
    {
      icon: <Code className="w-8 h-8 text-blue-500" />,
      title: "Blockchain",
      description: "Solidity, Hyperledger, Ethereum",
    },
    {
      icon: <Server className="w-8 h-8 text-green-500" />,
      title: "Languages",
      description: "JavaScript, Python, Java, C++",
    },
    { icon: <Cloud className="w-8 h-8 text-purple-500" />, title: "Cloud", description: "AWS, Azure" },
    {
      icon: <Database className="w-8 h-8 text-yellow-500" />,
      title: "Databases",
      description: "MySQL, MongoDB, PostgreSQL",
    },
    { icon: <Terminal className="w-8 h-8 text-red-500" />, title: "OS", description: "Linux, Windows" },
    {
      icon: <Layers className="w-8 h-8 text-indigo-500" />,
      title: "Other",
      description: "Problem-solving, Collaboration",
    },
  ]

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              As a Software Developer with over 3 years of experience, I specialize in designing, implementing, and
              supporting blockchain and enterprise solutions. My expertise spans across various technologies and
              platforms, allowing me to tackle complex problems and deliver innovative solutions.
            </p>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              With strong problem-solving, analytical, and cross-team collaboration skills, I thrive in dynamic
              environments where I can leverage my technical expertise to drive projects forward. My passion for
              blockchain technology and enterprise solutions has led me to work on cutting-edge projects that push the
              boundaries of what's possible in the digital world.
            </p>
          </motion.div>
          <motion.div
            className="md:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                {skill.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 dark:text-white">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-20">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </section>
  )
}

