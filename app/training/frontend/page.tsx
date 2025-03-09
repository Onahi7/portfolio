import type { Metadata } from "next"
import FrontendTrainingClientPage from "./FrontendTrainingClientPage"

export const metadata: Metadata = {
  title: "Frontend Development Training | Hardy Technology",
  description:
    "Master modern frontend development with our comprehensive training program. Learn React, Next.js, TypeScript and more.",
}

export default function FrontendTrainingPage() {
  return <FrontendTrainingClientPage />
}

