export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Example Project",
    description: "A sample project description",
    technologies: ["React", "TypeScript", "Next.js"],
    imageUrl: "/images/projects/example.png",
    githubUrl: "https://github.com/Onahi7/portfolio",
    liveUrl: "https://example.com"
  }
  // Add more projects as needed
];
