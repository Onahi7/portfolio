"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { projectsData } from "../data/projectsData"

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeProject, setActiveProject] = useState(null)

  const filters = ["all", "web", "mobile", "design"]

  const filteredProjects =
    activeFilter === "all" ? projectsData : projectsData.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Projects</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-white dark:dark-border-glow"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:hover:dark-card-glow transition-all duration-300 flex flex-col h-full"
            >
              <img
                src={project.image || "/images/placeholder.jpg"}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveProject(activeProject === index ? null : index)}
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none transition-colors"
                >
                  {activeProject === index ? "Hide details" : "Learn more"}
                </button>
                {activeProject === index && (
                  <div className="mt-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{project.details}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none transition-colors"
                    >
                      View Live
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

