import Projects from "../components/Projects"
import { ModeToggle } from "@/components/mode-toggle"

export default function PortfolioPage() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Our Portfolio</h1>
          <ModeToggle />
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mb-16">
          Explore our diverse portfolio of projects spanning web development, custom software solutions, blockchain
          applications, and API integrations. Each project represents our commitment to delivering high-quality,
          innovative technology solutions.
        </p>
      </div>
      <Projects />
    </main>
  )
}

