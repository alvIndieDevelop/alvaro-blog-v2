import type { Metadata } from "next";
import Projects from "@/components/sections/projects";
import { getAllProjects } from "@/lib/repositories";

export const metadata: Metadata = {
  title: "Quest Log | Achievements",
  description:
    "A chronicle of completed quests and crafted artifacts - explore my portfolio of projects and achievements.",
};

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

export default async function ProjectsPage() {
  // Fetch all projects from GitHub and Bitbucket
  const projects = await getAllProjects();

  return (
    <div className="flex-1">
      <Projects projects={projects} />
    </div>
  );
}
