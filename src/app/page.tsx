import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/projects";
import { getFeaturedProjects } from "@/lib/repositories";

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

export default async function HomePage() {
  // Fetch featured projects from GitHub and Bitbucket
  const projects = await getFeaturedProjects(6);

  return (
    <>
      <Hero />
      <Projects projects={projects} />
    </>
  );
}
