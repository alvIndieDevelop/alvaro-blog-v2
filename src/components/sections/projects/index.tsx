"use client";
import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";

const projects = [
  {
    title: "Project One",
    description: "A full-stack web application built with Next.js and TypeScript",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project-one",
    liveUrl: "https://project-one.com"
  },
  // Add more projects as needed
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work and personal projects.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}