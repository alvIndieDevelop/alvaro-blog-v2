import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RealmLayout, RealmHero, RealmSectionHeader } from "@/components/layouts/RealmLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hammer, Flame, Star, ExternalLink, Github, Briefcase, Award, Sparkles, Code2 } from "lucide-react";
import { getForgeProjects } from "@/lib/repositories";
import type { Project, Difficulty } from "@/@types/repositories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forge" });
  
  return {
    title: `${t("title")} | ${t("pageTitle")}`,
    description: t("heroDescription"),
  };
}

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

// Map difficulty to numeric level for stars
const difficultyLevel: Record<Difficulty, number> = {
  'Novice': 1,
  'Apprentice': 2,
  'Journeyman': 3,
  'Expert': 4,
  'Master': 5,
};

// Difficulty stars component
function DifficultyStars({ difficulty }: { difficulty: Difficulty }) {
  const level = difficultyLevel[difficulty];
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

// Project card component
function ForgeProjectCard({ project, translations }: { project: Project; translations: { live: string; viewCode: string } }) {
  const isBitbucket = project.source === 'bitbucket';
  
  return (
    <Card
      variant="default"
      className="group relative overflow-hidden border-ember/20 hover:border-ember/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-ember/10"
    >
      {/* XP Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-gold/10 border border-gold/30 text-xs font-mono text-gold">
        <Sparkles className="h-3 w-3" />
        +{project.xp} XP
      </div>

      {/* Source indicator */}
      <div className="absolute top-4 left-4">
        <div className={`p-1.5 rounded-md ${isBitbucket ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-white/10 border border-white/20'}`}>
          {isBitbucket ? (
            <Code2 className="h-3 w-3 text-blue-400" />
          ) : (
            <Github className="h-3 w-3 text-white/70" />
          )}
        </div>
      </div>

      <CardHeader className="pb-3 pt-12">
        <div className="flex items-center gap-2 mb-2">
          <DifficultyStars difficulty={project.difficulty} />
          <span className="text-xs text-muted-foreground">
            {project.difficulty}
          </span>
        </div>
        
        <CardTitle className="text-xl group-hover:text-ember transition-colors flex items-start gap-3">
          <div className="p-2 rounded-lg bg-ember/10 border border-ember/20 group-hover:bg-ember/20 transition-colors">
            <Flame className="h-5 w-5 text-ember" />
          </div>
          <span className="pt-1">{project.name}</span>
        </CardTitle>
        
        {project.client && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Briefcase className="h-3 w-3" />
            {project.client}
          </p>
        )}
        
        {project.language && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Code2 className="h-3 w-3" />
            {project.language}
          </p>
        )}
        
        <CardDescription className="line-clamp-2 mt-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="skill" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{project.technologies.length - 5}
            </Badge>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          {project.homepage && (
            <Button size="sm" variant="default" className="flex-1" asChild>
              <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                {translations.live}
              </a>
            </Button>
          )}
          <Button size="sm" variant={project.homepage ? "ghost" : "default"} className={project.homepage ? "" : "flex-1"} asChild>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              {!project.homepage && <span className="ml-1">{translations.viewCode}</span>}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ForgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forge" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  
  // Fetch projects from GitHub and Bitbucket
  const projects = await getForgeProjects();
  
  const totalXP = projects.reduce((acc, p) => acc + p.xp, 0);
  const completedProjects = projects.length;

  const cardTranslations = {
    live: tCommon("live"),
    viewCode: tCommon("viewCode"),
  };

  return (
    <RealmLayout realm="forge">
      <RealmHero
        realm="forge"
        badge={t("badge")}
        title={t("heroTitle")}
        titleAccent={t("heroAccent")}
        description={t("heroDescription")}
      >
        {/* Stats */}
        <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-void-surface/50 border border-ember/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ember/10 border border-ember/20">
              <Briefcase className="h-5 w-5 text-ember" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-ember">{completedProjects}</p>
              <p className="text-xs text-muted-foreground">{t("projectsLabel")}</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-border" />
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold/10 border border-gold/20">
              <Award className="h-5 w-5 text-gold" />
            </div>
            <div className="text-left">
              <p className="font-mono text-2xl font-bold text-gold">{totalXP.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{t("totalXpLabel")}</p>
            </div>
          </div>
        </div>
      </RealmHero>

      <div className="container mx-auto px-4 py-16">
        {/* Projects Section */}
        <RealmSectionHeader
          realm="forge"
          icon={<Hammer className="h-5 w-5 text-ember" />}
          title={t("sectionTitle")}
        />

        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ForgeProjectCard key={project.id} project={project} translations={cardTranslations} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("loadingProjects")}</p>
          </div>
        )}

        {/* Services Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="forge"
            icon={<Briefcase className="h-5 w-5 text-ember" />}
            title={t("servicesTitle")}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t("services.webDev.title"),
                description: t("services.webDev.description"),
                icon: "🌐",
              },
              {
                title: t("services.apiDev.title"),
                description: t("services.apiDev.description"),
                icon: "⚡",
              },
              {
                title: t("services.consulting.title"),
                description: t("services.consulting.description"),
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
            <h3 className="font-display text-2xl text-ember mb-4">{t("ctaTitle")}</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t("ctaDescription")}
            </p>
            <Button size="lg" className="bg-ember hover:bg-ember/90">
              <Flame className="h-4 w-4 mr-2" />
              {tCommon("startProject")}
            </Button>
          </Card>
        </div>
      </div>
    </RealmLayout>
  );
}
