export interface Project {
  title: string
  description: string
  details?: string
  image?: string
  technologies: string[]
  category: "web" | "mobile" | "design" | "other"
  link?: string
  github?: string
}

export const projectsData: Project[] = [
  {
    title: "Hardy Technology Website",
    description: "Official company website with service offerings, training events, and contact information.",
    details:
      "A Next.js-powered website with Tailwind CSS for styling, featuring responsive design, dark mode support, and integration with Paystack for payments.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    category: "web",
    link: "https://hardytechnology.xyz",
  },
  {
    title: "Training Event Management System",
    description: "Platform for managing technical training events and registrations.",
    details:
      "Full-stack application with user authentication, payment processing, email notifications, and admin dashboard for event management.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "PostgreSQL", "Prisma", "Paystack"],
    category: "web",
    link: "https://events.hardytechnology.xyz",
  },
  {
    title: "Developer Portfolio Template",
    description: "Customizable portfolio template for software developers.",
    details:
      "Clean, modern design with sections for projects, skills, experience, and contact information. Includes dark mode and animations.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    category: "web",
    link: "https://github.com/hardytech/portfolio-template",
  },
  {
    title: "Tech Conference Mobile App",
    description: "Mobile application for tech conference attendees.",
    details: "Features include schedule viewing, speaker profiles, session bookmarking, and networking opportunities.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React Native", "Expo", "Firebase"],
    category: "mobile",
    link: "https://play.google.com/store/apps/details?id=xyz.hardytech.conference",
  },
  {
    title: "E-Learning Platform UI Design",
    description: "Modern UI/UX design for an online learning platform.",
    details: "Comprehensive design system including components, color schemes, typography, and responsive layouts.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Figma", "Adobe XD", "UI/UX"],
    category: "design",
    link: "https://www.behance.net/gallery/hardytech-elearning",
  },
  {
    title: "Coding Bootcamp Dashboard",
    description: "Administrative dashboard for managing coding bootcamp operations.",
    details: "Includes student progress tracking, curriculum management, and performance analytics.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "Vuetify", "Chart.js", "Express"],
    category: "web",
    link: "https://dashboard.hardytech.xyz",
  },
]

