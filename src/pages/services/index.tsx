import { NextSeo } from "next-seo";
import Projects from "../../components/sections/projects";
import Services from "../../components/sections/services";

export default function ServicesPage() {
  return (
    <>
      <NextSeo
        title="Servives | Alvaro Martin Caballero"
        description="Explore my portfolio of web development projects, including full-stack applications, websites, and open-source contributions."
        openGraph={{
          title: "Servives | Alvaro Martin Caballero",
          description: "Explore my portfolio of web development projects.",
          url: "https://alvaro-blog.netlify.app/services",
        }}
      />
      <main className="flex-1">
        <Services />
      </main>
    </>
  );
}
