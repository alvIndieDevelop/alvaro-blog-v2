import { NextSeo } from "next-seo";
import AboutHero from "../../components/sections/about/hero";
//import CharacterStats from "../../components/sections/about/character-stats";
import { SkillTreeSection } from "../../components/sections/about/skill-tree/section";

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title="About Me | Your Name"
        description="Learn more about my journey, skills, and experience in software development."
      />
      <div className="flex-1">
        <AboutHero />
        <div className="container mx-auto px-4 py-12 space-y-12">
          
          <SkillTreeSection />
        </div>
      </div>
    </>
  );
}
