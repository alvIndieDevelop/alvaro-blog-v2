"use client";
import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";

const projects = [
  {
    title: "Flask Template",
    description: "A simple flask template for building web applications",
    technologies: ["Python", "flask"],
    githubUrl: "https://github.com/alvIndieDevelop/flask_template",
  },
  {
    title: "Project generator nodeJS",
    description:
      "A simple project generator in cmd for building web applications",
    technologies: ["NodeJS", "Javascript", "Typescript", "NPM"],
    githubUrl: "https://github.com/alvIndieDevelop/project-generator-nodejs",
  },
  {
    title: "ExpressJS Typescript Boilerplate",
    description:
      "A simple boilerplate for building web applications with express and typescript",
    technologies: ["NodeJS", "Javascript", "Typescript", "ExpressJS"],
    githubUrl:
      "https://github.com/alvIndieDevelop/expressjs-typescript-boilplate",
  },
  {
    title: "Sailo Clon API",
    description: "API for a clone of sailo, rent boats",
    technologies: ["Python", "flask"],
    githubUrl:
      "https://bitbucket.org/alvarosh40/sailoclone_api_sandbox/src/master/",
  },
  {
    title: "Sailo Clon Frontend",
    description: "Frontend of sailo, rent boats, with nextJS and materialUI",
    technologies: ["NodeJS", "Javascript", "NextJS", "MaterialUI"],
    githubUrl:
      "https://bitbucket.org/alvarosh40/yachtbunny_client_sandbox/src/master/",
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
