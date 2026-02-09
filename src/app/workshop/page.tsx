import type { Metadata } from "next";
import { RealmLayout, RealmHero, RealmSectionHeader } from "@/components/layouts/RealmLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Wrench, Beaker, Trophy, ExternalLink, Github, Play, Sparkles, Cpu, Palette } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Workshop | Creative Projects",
  description: "Game development, creative experiments, and passion projects crafted with imagination and code.",
};

// Sample creative projects
const workshopProjects = [
  {
    id: "1",
    title: "Pixel Dungeon Adventure",
    description: "A roguelike dungeon crawler with procedurally generated levels, pixel art graphics, and permadeath mechanics.",
    type: "game",
    platform: ["Windows", "Web"],
    status: "released",
    playable: true,
    technologies: ["Godot", "GDScript", "Aseprite"],
    links: { itch: "#", github: "#", play: "#" },
  },
  {
    id: "2",
    title: "AI Art Generator",
    description: "An experimental tool that generates unique art pieces using machine learning and creative algorithms.",
    type: "experiment",
    platform: ["Web"],
    status: "prototype",
    playable: true,
    technologies: ["Python", "TensorFlow", "React"],
    links: { github: "#", play: "#" },
  },
  {
    id: "3",
    title: "Game Jam: 48hr Challenge",
    description: "A puzzle platformer created in 48 hours for Ludum Dare. Theme: 'Deeper and Deeper'.",
    type: "jam",
    platform: ["Web"],
    status: "released",
    playable: true,
    technologies: ["Unity", "C#"],
    links: { itch: "#", play: "#" },
  },
  {
    id: "4",
    title: "Procedural Music Tool",
    description: "A tool that generates ambient music based on user-defined parameters and mood settings.",
    type: "tool",
    platform: ["Web"],
    status: "development",
    playable: false,
    technologies: ["TypeScript", "Web Audio API", "React"],
    links: { github: "#" },
  },
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    concept: { label: "Concept", className: "bg-muted text-muted-foreground" },
    prototype: { label: "Prototype", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    development: { label: "In Development", className: "bg-ethereal/20 text-ethereal border-ethereal/30" },
    released: { label: "Released", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  };

  const config = statusConfig[status] || statusConfig.concept;

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

// Type icon component
function TypeIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    game: <Gamepad2 className="h-5 w-5 text-ethereal" />,
    experiment: <Beaker className="h-5 w-5 text-purple-400" />,
    tool: <Wrench className="h-5 w-5 text-cyan-400" />,
    jam: <Trophy className="h-5 w-5 text-gold" />,
  };

  return icons[type] || icons.experiment;
}

export default function WorkshopPage() {
  const games = workshopProjects.filter(p => p.type === "game").length;
  const experiments = workshopProjects.filter(p => p.type === "experiment" || p.type === "tool").length;
  const jams = workshopProjects.filter(p => p.type === "jam").length;

  return (
    <RealmLayout realm="workshop">
      <RealmHero
        realm="workshop"
        badge="Creative Laboratory"
        title="The"
        titleAccent="Workshop"
        description="Where imagination meets code. Game development, creative experiments, and passion projects born from curiosity and play."
      >
        {/* Stats */}
        <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-void-surface/50 border border-ethereal/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ethereal/10 border border-ethereal/20">
              <Gamepad2 className="h-5 w-5 text-ethereal" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-ethereal">{games}</p>
              <p className="text-xs text-muted-foreground">Games</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-border" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Beaker className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-purple-400">{experiments}</p>
              <p className="text-xs text-muted-foreground">Experiments</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-border" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
              <Trophy className="h-5 w-5 text-gold" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-gold">{jams}</p>
              <p className="text-xs text-muted-foreground">Game Jams</p>
            </div>
          </div>
        </div>
      </RealmHero>

      <div className="container mx-auto px-4 py-16">
        {/* Projects Section */}
        <RealmSectionHeader
          realm="workshop"
          icon={<Sparkles className="h-5 w-5 text-ethereal" />}
          title="Creative Creations"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {workshopProjects.map((project) => (
            <Card
              key={project.id}
              variant="default"
              className="group relative overflow-hidden border-ethereal/20 hover:border-ethereal/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-ethereal/10"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <StatusBadge status={project.status} />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  {project.platform.map((p) => (
                    <Badge key={p} variant="secondary" className="text-xs">
                      {p}
                    </Badge>
                  ))}
                </div>
                
                <CardTitle className="text-xl group-hover:text-ethereal transition-colors flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-ethereal/10 border border-ethereal/20 group-hover:bg-ethereal/20 transition-colors">
                    <TypeIcon type={project.type} />
                  </div>
                  <span className="pt-1">{project.title}</span>
                </CardTitle>
                
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
                  {project.playable && project.links.play && (
                    <Button size="sm" className="flex-1 bg-ethereal hover:bg-ethereal/90" asChild>
                      <Link href={project.links.play}>
                        <Play className="h-3 w-3 mr-1" />
                        Play Now
                      </Link>
                    </Button>
                  )}
                  {project.links.itch && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.links.itch}>
                        <Gamepad2 className="h-3 w-3 mr-1" />
                        itch.io
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

        {/* Tools & Resources Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="workshop"
            icon={<Cpu className="h-5 w-5 text-ethereal" />}
            title="Tools of the Trade"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Game Engines",
                items: ["Godot", "Unity", "Unreal Engine"],
                icon: <Gamepad2 className="h-6 w-6 text-ethereal" />,
              },
              {
                title: "Art & Design",
                items: ["Aseprite", "Blender", "Figma"],
                icon: <Palette className="h-6 w-6 text-purple-400" />,
              },
              {
                title: "Development",
                items: ["TypeScript", "C#", "GDScript"],
                icon: <Wrench className="h-6 w-6 text-cyan-400" />,
              },
            ].map((category) => (
              <Card
                key={category.title}
                variant="default"
                className="border-ethereal/20"
              >
                <CardHeader>
                  <div className="mb-4">{category.icon}</div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <Badge key={item} variant="seal">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Card variant="parchment" className="inline-block p-8 border-ethereal/30">
            <h3 className="font-display text-2xl text-ethereal mb-4">Want to Collaborate?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              I'm always looking for interesting game jams and creative collaborations.
            </p>
            <Button size="lg" className="bg-ethereal hover:bg-ethereal/90">
              <Sparkles className="h-4 w-4 mr-2" />
              Let's Create Together
            </Button>
          </Card>
        </div>
      </div>
    </RealmLayout>
  );
}
