import { Code, Cpu, Layers, BarChart3, Users, Lightbulb } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We offer a comprehensive range of technology services to help businesses thrive in the digital age.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" id="services">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden" id="web">
              <div className="p-8">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-6">
                  <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Web Development</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  We create responsive, user-friendly websites and web applications that deliver exceptional user
                  experiences.
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Custom Website Development
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    E-commerce Solutions
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Progressive Web Apps
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                    Content Management Systems
                  </li>
                </ul>
              </div>
            </div>

            {/* Software Solutions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden" id="software">
              <div className="p-8">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-6">
                  <Cpu className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Software Solutions</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  We develop custom software solutions that streamline operations and drive business growth.
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    Custom Software Development
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    Enterprise Applications
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    Mobile App Development
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                    API Development & Integration
                  </li>
                </ul>
              </div>
            </div>

            {/* Blockchain Development */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden" id="blockchain">
              <div className="p-8">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full w-fit mb-6">
                  <Layers className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Blockchain Development</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  We build secure and transparent blockchain applications for modern businesses.
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                    Smart Contract Development
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                    DApp Development
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                    Tokenization Solutions
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                    Blockchain Consulting
                  </li>
                </ul>
              </div>
            </div>

            {/* Technical Training */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden" id="training">
              <div className="p-8">
                <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-full w-fit mb-6">
                  <BarChart3 className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Technical Training</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  We provide expert-led training programs to enhance your team's technical skills.
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-violet-600 dark:text-violet-400 mr-2">•</span>
                    Web Development Courses
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 dark:text-violet-400 mr-2">•</span>
                    Blockchain Technology Training
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 dark:text-violet-400 mr-2">•</span>
                    Software Engineering Workshops
                  </li>
                  <li className="flex items-start">
                    <span className="text-violet-600 dark:text-violet-400 mr-2">•</span>
                    Custom Corporate Training
                  </li>
                </ul>
              </div>
            </div>

            {/* Consulting */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden" id="consulting">
              <div className="p-8">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-6">
                  <Lightbulb className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Consulting</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  We provide strategic technology consulting to help businesses make informed decisions.
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    Technology Strategy
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    Digital Transformation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    IT Infrastructure Assessment
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    Security Audits
                  </li>
                </ul>
              </div>
            </div>

            {/* Team Augmentation */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden" id="team">
              <div className="p-8">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full w-fit mb-6">
                  <Users className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Team Augmentation</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  We provide skilled professionals to augment your existing development team.
                </p>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    Developer Staffing
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    Project-Based Resources
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    Technical Leadership
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 dark:text-orange-400 mr-2">•</span>
                    QA and Testing Support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our services can help you achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/calculator"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Calculate Project Cost
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

