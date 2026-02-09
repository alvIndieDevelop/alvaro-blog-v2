"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { Trophy, Scroll, Target, Sword } from "lucide-react";
import type { Project } from "@/@types/repositories";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  // Calculate total XP
  const totalXP = projects.reduce((sum, p) => sum + p.xp, 0);
  const completedQuests = projects.filter((p) => p.status === "completed").length;

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
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.name}
                description={project.description}
                technologies={project.technologies}
                githubUrl={project.url}
                liveUrl={project.homepage}
                difficulty={project.difficulty}
                status={project.status}
                xp={project.xp}
              />
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
