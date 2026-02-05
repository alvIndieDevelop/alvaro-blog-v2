import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/hero";
import { SkillTreeSection } from "@/components/sections/about/skill-tree/section";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about my journey, skills, and experience in software development.",
};

export default function AboutPage() {
  return (
    <div className="flex-1">
      <AboutHero />
      <div className="container mx-auto px-4 py-12 space-y-12">
        <SkillTreeSection />
      </div>
    </div>
  );
}
