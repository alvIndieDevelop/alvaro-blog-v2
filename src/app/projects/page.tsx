import type { Metadata } from "next";
import Projects from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of projects, from web applications to open-source contributions.",
};

export default function ProjectsPage() {
  return (
    <div className="flex-1">
      <Projects />
    </div>
  );
}
