"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RealmLayout, RealmHero } from "@/components/layouts/RealmLayout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { realms, type RealmId } from "@/lib/realms";
import { cn } from "@/lib/utils";
import { Map, ArrowRight, Compass, Castle, Hammer, Gamepad2, Beer, Library } from "lucide-react";
import { Link } from "@/i18n/navigation";

// Get realm-specific colors
function getRealmColors(realmId: RealmId) {
  const colors: Record<RealmId, { bg: string; border: string; text: string; glow: string }> = {
    sanctum: { bg: "bg-gold/10", border: "border-gold/30", text: "text-gold", glow: "hover:shadow-gold/20" },
    forge: { bg: "bg-ember/10", border: "border-ember/30", text: "text-ember", glow: "hover:shadow-ember/20" },
    workshop: { bg: "bg-ethereal/10", border: "border-ethereal/30", text: "text-ethereal", glow: "hover:shadow-ethereal/20" },
    tavern: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-500", glow: "hover:shadow-amber-500/20" },
    library: { bg: "bg-blue-600/10", border: "border-blue-600/30", text: "text-blue-500", glow: "hover:shadow-blue-600/20" },
    map: { bg: "bg-gold/10", border: "border-gold/30", text: "text-gold", glow: "hover:shadow-gold/20" },
  };
  return colors[realmId];
}

export default function MapPage() {
  const t = useTranslations("map");
  const tRealms = useTranslations("realms");

  // Realm card data with translations
  const realmCards: { id: RealmId; taglineKey: string; featuresKey: string }[] = [
    {
      id: "sanctum",
      taglineKey: "sanctumTagline",
      featuresKey: "sanctumFeatures",
    },
    {
      id: "forge",
      taglineKey: "forgeTagline",
      featuresKey: "forgeFeatures",
    },
    {
      id: "workshop",
      taglineKey: "workshopTagline",
      featuresKey: "workshopFeatures",
    },
    {
      id: "tavern",
      taglineKey: "tavernTagline",
      featuresKey: "tavernFeatures",
    },
    {
      id: "library",
      taglineKey: "libraryTagline",
      featuresKey: "libraryFeatures",
    },
  ];

  return (
    <RealmLayout realm="map">
      <RealmHero
        realm="map"
        badge={t("badge")}
        title={t("heroTitle")}
        titleAccent={t("heroAccent")}
        description={t("heroDescription")}
      >
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-void-surface/50 border border-gold/20 backdrop-blur-sm">
          <Compass className="h-5 w-5 text-gold animate-pulse" />
          <span className="text-muted-foreground">{t("chooseDestination")}</span>
        </div>
      </RealmHero>

      <div className="container mx-auto px-4 py-16">
        {/* Realm Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {realmCards.map((card, index) => {
            const realm = realms[card.id];
            const colors = getRealmColors(card.id);
            const Icon = realm.icon;
            // Get features as raw value (array from JSON)
            const features = t.raw(card.featuresKey) as string[];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={realm.path}>
                  <Card
                    variant="default"
                    className={cn(
                      "group relative h-full overflow-hidden transition-all duration-300",
                      "hover:-translate-y-2 hover:shadow-xl",
                      colors.border,
                      colors.glow
                    )}
                  >
                    {/* Background gradient */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
                      `bg-gradient-to-br ${realm.colors.gradient}`
                    )} />

                    <CardHeader className="relative">
                      {/* Icon */}
                      <div className={cn(
                        "mb-4 inline-flex p-4 rounded-xl border transition-colors",
                        colors.bg,
                        colors.border,
                        "group-hover:scale-110 transition-transform"
                      )}>
                        <Icon className={cn("h-8 w-8", colors.text)} />
                      </div>

                      {/* Title */}
                      <CardTitle className={cn(
                        "text-2xl font-display transition-colors",
                        `group-hover:${colors.text}`
                      )}>
                        {tRealms(`${card.id}.name`)}
                      </CardTitle>

                      {/* Tagline */}
                      <CardDescription className="text-base">
                        {t(card.taglineKey)}
                      </CardDescription>

                      {/* Features */}
                      <div className="mt-4 space-y-2">
                        {features.map((feature: string) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div className={cn("h-1.5 w-1.5 rounded-full", colors.bg, colors.border)} />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Enter link */}
                      <div className={cn(
                        "mt-6 flex items-center gap-2 text-sm font-medium transition-colors",
                        colors.text
                      )}>
                        <span>{t("enterRealm")}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] flex-1 max-w-32 bg-gradient-to-r from-transparent to-gold/30" />
            <h3 className="font-display text-lg text-gold">{t("realmLegend")}</h3>
            <div className="h-[1px] flex-1 max-w-32 bg-gradient-to-l from-transparent to-gold/30" />
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Castle, labelKey: "sanctum", color: "text-gold" },
              { icon: Hammer, labelKey: "forge", color: "text-ember" },
              { icon: Gamepad2, labelKey: "workshop", color: "text-ethereal" },
              { icon: Beer, labelKey: "tavern", color: "text-amber-500" },
              { icon: Library, labelKey: "library", color: "text-blue-500" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.labelKey} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className={cn("h-4 w-4", item.color)} />
                  <span>{tRealms(`${item.labelKey}.name`)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decorative map illustration placeholder */}
        <div className="mt-20 text-center">
          <Card variant="parchment" className="inline-block p-8 border-gold/30">
            <Map className="h-16 w-16 text-gold/40 mx-auto mb-4" />
            <p className="text-muted-foreground/60 italic text-sm">
              "{t("journeyQuote")}"
            </p>
          </Card>
        </div>
      </div>
    </RealmLayout>
  );
}
