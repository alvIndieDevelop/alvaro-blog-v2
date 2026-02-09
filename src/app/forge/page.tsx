import type { Metadata } from "next";
import { RealmLayout, RealmHero, RealmSectionHeader } from "@/components/layouts/RealmLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hammer, Flame, Star, ExternalLink, Github, Briefcase, Clock, Award, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Forge | Professional Work",
  description: "Professional projects, services, and career achievements forged through dedication and expertise.",
};

// Sample projects data - will be moved to content files later
const forgeProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    client: "TechCorp Inc.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    difficulty: 4,
    xpReward: 500,
    status: "completed",
    links: { live: "#", github: "#" },
  },
  {
    id: "2",
    title: "Healthcare Dashboard",
    description: "Patient management system with appointment scheduling, medical records, and analytics.",
    client: "MedHealth Solutions",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    difficulty: 5,
    xpReward: 750,
    status: "completed",
    links: { live: "#" },
  },
  {
    id: "3",
    title: "Real Estate Portal",
    description: "Property listing platform with virtual tours, mortgage calculator, and agent matching.",
    client: "HomeFind Realty",
    technologies: ["Next.js", "Prisma", "Tailwind", "Vercel"],
    difficulty: 3,
    xpReward: 400,
    status: "completed",
    links: { live: "#", github: "#" },
  },
];

// Difficulty stars component
function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3 w-3 ${
            star <= level ? "text-ember fill-ember" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function ForgePage() {
  const totalXP = forgeProjects.reduce((acc, p) => acc + p.xpReward, 0);
  const completedProjects = forgeProjects.filter(p => p.status === "completed").length;

  return (
    <RealmLayout realm="forge">
      <RealmHero
        realm="forge"
        badge="Professional Portfolio"
        title="The"
        titleAccent="Forge"
        description="Where ideas are hammered into reality. Professional projects crafted with precision, dedication, and expertise."
      >
        {/* Stats */}
        <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-void-surface/50 border border-ember/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ember/10 border border-ember/20">
              <Briefcase className="h-5 w-5 text-ember" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-ember">{completedProjects}</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-border" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
              <Award className="h-5 w-5 text-gold" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-gold">{totalXP}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
          </div>
        </div>
      </RealmHero>

      <div className="container mx-auto px-4 py-16">
        {/* Projects Section */}
        <RealmSectionHeader
          realm="forge"
          icon={<Hammer className="h-5 w-5 text-ember" />}
          title="Forged Creations"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {forgeProjects.map((project, index) => (
            <Card
              key={project.id}
              variant="default"
              className="group relative overflow-hidden border-ember/20 hover:border-ember/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-ember/10"
            >
              {/* XP Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-gold/10 border border-gold/30 text-xs font-mono text-gold">
                <Sparkles className="h-3 w-3" />
                +{project.xpReward} XP
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <DifficultyStars level={project.difficulty} />
                  <span className="text-xs text-muted-foreground">
                    {["Novice", "Apprentice", "Journeyman", "Expert", "Master"][project.difficulty - 1]}
                  </span>
                </div>
                
                <CardTitle className="text-xl group-hover:text-ember transition-colors flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-ember/10 border border-ember/20 group-hover:bg-ember/20 transition-colors">
                    <Flame className="h-5 w-5 text-ember" />
                  </div>
                  <span className="pt-1">{project.title}</span>
                </CardTitle>
                
                {project.client && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Briefcase className="h-3 w-3" />
                    {project.client}
                  </p>
                )}
                
                <CardDescription className="line-clamp-2 mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="skill" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-2">
                  {project.links.live && (
                    <Button size="sm" variant="default" className="flex-1" asChild>
                      <Link href={project.links.live}>
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={project.links.github}>
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="forge"
            icon={<Briefcase className="h-5 w-5 text-ember" />}
            title="Services Offered"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Web Development",
                description: "Full-stack web applications built with modern technologies and best practices.",
                icon: "🌐",
              },
              {
                title: "API Development",
                description: "Robust and scalable APIs designed for performance and reliability.",
                icon: "⚡",
              },
              {
                title: "Technical Consulting",
                description: "Expert guidance on architecture, technology choices, and best practices.",
                icon: "💡",
              },
            ].map((service) => (
              <Card
                key={service.title}
                variant="default"
                className="border-ember/20 hover:border-ember/40 transition-colors"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Card variant="parchment" className="inline-block p-8 border-ember/30">
            <h3 className="font-display text-2xl text-ember mb-4">Ready to Forge Something Great?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Let's discuss your project and bring your ideas to life.
            </p>
            <Button size="lg" className="bg-ember hover:bg-ember/90">
              <Flame className="h-4 w-4 mr-2" />
              Start a Project
            </Button>
          </Card>
        </div>
      </div>
    </RealmLayout>
  );
}
