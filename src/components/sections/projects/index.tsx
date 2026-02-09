"use client";

import { motion } from "framer-motion";
import { ProjectCard, type Difficulty, type ProjectStatus } from "./project-card";
import { Trophy, Scroll, Target, Sword } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  difficulty: Difficulty;
  status: ProjectStatus;
  xp: number;
}

const projects: Project[] = [
  {
    title: "Flask Template",
    description: "A battle-tested flask template for rapid web application deployment",
    technologies: ["Python", "Flask"],
    githubUrl: "https://github.com/alvIndieDevelop/flask_template",
    difficulty: "Apprentice",
    status: "completed",
    xp: 150,
  },
  {
    title: "Project Generator NodeJS",
    description: "CLI tool that conjures project scaffolds from the command line",
    technologies: ["NodeJS", "JavaScript", "TypeScript", "NPM"],
    githubUrl: "https://github.com/alvIndieDevelop/project-generator-nodejs",
    difficulty: "Journeyman",
    status: "completed",
    xp: 250,
  },
  {
    title: "ExpressJS TypeScript Boilerplate",
    description: "A fortified boilerplate for building robust Express applications",
    technologies: ["NodeJS", "TypeScript", "ExpressJS"],
    githubUrl: "https://github.com/alvIndieDevelop/expressjs-typescript-boilplate",
    difficulty: "Journeyman",
    status: "completed",
    xp: 200,
  },
  {
    title: "Sailo Clone API",
    description: "Backend API for a boat rental marketplace - a full-stack quest",
    technologies: ["Python", "Flask"],
    githubUrl: "https://bitbucket.org/alvarosh40/sailoclone_api_sandbox/src/master/",
    difficulty: "Expert",
    status: "completed",
    xp: 400,
  },
  {
    title: "Sailo Clone Frontend",
    description: "Modern frontend for boat rentals, crafted with Next.js magic",
    technologies: ["NextJS", "JavaScript", "MaterialUI"],
    githubUrl: "https://bitbucket.org/alvarosh40/yachtbunny_client_sandbox/src/master/",
    difficulty: "Expert",
    status: "completed",
    xp: 450,
  },
];

// Calculate total XP
const totalXP = projects.reduce((sum, p) => sum + p.xp, 0);
const completedQuests = projects.filter((p) => p.status === "completed").length;

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 bg-void">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-30" />
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container px-4 mx-auto">
        {/* RPG-styled Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Quest Log Title */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold/30 bg-gold/10">
            <Scroll className="h-4 w-4 text-gold" />
            <span className="font-mono text-sm text-gold">Quest Log</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Completed{" "}
            <span className="text-gradient-gold">Achievements</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A chronicle of quests conquered and artifacts crafted throughout my journey.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-void-surface border border-gold/20">
              <Trophy className="h-4 w-4 text-gold" />
              <span className="font-mono text-sm text-foreground">{completedQuests} Quests</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-void-surface border border-gold/20">
              <Target className="h-4 w-4 text-[hsl(var(--stamina))]" />
              <span className="font-mono text-sm text-foreground">{totalXP.toLocaleString()} XP</span>
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* More Quests Coming */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground/60">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold/30" />
            <Sword className="h-4 w-4 text-gold/40" />
            <span className="text-sm italic">More quests are being undertaken...</span>
            <Sword className="h-4 w-4 text-gold/40 rotate-180" />
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
