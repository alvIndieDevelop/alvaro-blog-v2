import { NextSeo } from "next-seo";
import Projects from "../../components/sections/projects";

export default function ProjectsPage() {
  return (
    <>
      <NextSeo
        title="Projects | Your Name"
        description="Explore my portfolio of web development projects, including full-stack applications, websites, and open-source contributions."
        openGraph={{
          title: "Projects | Your Name",
          description: "Explore my portfolio of web development projects.",
          url: "https://alvaro-blog.netlify.app/projects",
        }}
      />
      <main className="flex-1">
        <Projects />
      </main>
    </>
  );
}
