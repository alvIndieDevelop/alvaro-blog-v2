import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RealmLayout, RealmHero, RealmSectionHeader } from "@/components/layouts/RealmLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Wrench, Beaker, Trophy, Sparkles, Cpu, Palette, Rocket, Clock, Hammer } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workshop" });
  
  return {
    title: `${t("title")} | ${t("pageTitle")}`,
    description: t("heroDescription"),
  };
}

export default async function WorkshopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workshop" });

  return (
    <RealmLayout realm="workshop">
      <RealmHero
        realm="workshop"
        badge={t("badge")}
        title={t("heroTitle")}
        titleAccent={t("heroAccent")}
        description={t("heroDescription")}
      >
        {/* Coming Soon indicator */}
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-void-surface/50 border border-ethereal/20 backdrop-blur-sm">
          <Hammer className="h-5 w-5 text-ethereal animate-pulse" />
          <span className="text-muted-foreground">{t("comingSoon")}</span>
        </div>
      </RealmHero>

      <div className="container mx-auto px-4 py-16">
        {/* Coming Soon Section */}
        <RealmSectionHeader
          realm="workshop"
          icon={<Sparkles className="h-5 w-5 text-ethereal" />}
          title={t("sectionTitle")}
        />

        {/* Coming Soon Card */}
        <Card variant="default" className="border-ethereal/20 overflow-hidden">
          <div className="relative">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ethereal/5 via-purple-500/5 to-cyan-500/5" />
            
            <CardContent className="relative py-16 text-center">
              {/* Animated icon */}
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-ethereal/20 rounded-full blur-xl animate-pulse" />
                <div className="relative p-6 rounded-full bg-void-surface border-2 border-ethereal/30">
                  <Rocket className="h-16 w-16 text-ethereal" />
                </div>
              </div>

              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                {locale === "es" ? "Próximamente" : "Coming"}{" "}
                <span className="text-ethereal">{locale === "es" ? "" : "Soon"}</span>
              </h2>
              
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                {t("comingSoon")}
              </p>

              {/* What's coming */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ethereal/10 border border-ethereal/20">
                  <Gamepad2 className="h-4 w-4 text-ethereal" />
                  <span className="text-sm text-ethereal">{t("gameDev")}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Beaker className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-purple-400">{t("experiments")}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <Wrench className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-cyan-400">{t("tools")}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/10 border border-gold/20">
                  <Trophy className="h-4 w-4 text-gold" />
                  <span className="text-sm text-gold">Game Jams</span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
                <span>{t("comingSoon")}</span>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Tools & Resources Section */}
        <div className="mt-20">
          <RealmSectionHeader
            realm="workshop"
            icon={<Cpu className="h-5 w-5 text-ethereal" />}
            title={locale === "es" ? "Herramientas del Oficio" : "Tools of the Trade"}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: locale === "es" ? "Motores de Juegos" : "Game Engines",
                items: ["Godot", "Unity", "Unreal Engine"],
                icon: <Gamepad2 className="h-6 w-6 text-ethereal" />,
              },
              {
                title: locale === "es" ? "Arte y Diseño" : "Art & Design",
                items: ["Aseprite", "Blender", "Figma"],
                icon: <Palette className="h-6 w-6 text-purple-400" />,
              },
              {
                title: locale === "es" ? "Desarrollo" : "Development",
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
            <h3 className="font-display text-2xl text-ethereal mb-4">
              {locale === "es" ? "¿Quieres Colaborar?" : "Want to Collaborate?"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {locale === "es" 
                ? "Siempre estoy buscando game jams interesantes y colaboraciones creativas."
                : "I'm always looking for interesting game jams and creative collaborations."}
            </p>
            <Button size="lg" className="bg-ethereal hover:bg-ethereal/90">
              <Sparkles className="h-4 w-4 mr-2" />
              {locale === "es" ? "Creemos Juntos" : "Let's Create Together"}
            </Button>
          </Card>
        </div>
      </div>
    </RealmLayout>
  );
}
