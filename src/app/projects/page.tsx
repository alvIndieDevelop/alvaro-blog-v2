import type { Metadata } from "next";
import Projects from "@/components/sections/projects";

export const metadata: Metadata = {
  title: "Quest Log | Achievements",
  description:
    "A chronicle of completed quests and crafted artifacts - explore my portfolio of projects and achievements.",
};

export default function ProjectsPage() {
  return (
    <div className="flex-1">
      <Projects />
    </div>
  );
}
