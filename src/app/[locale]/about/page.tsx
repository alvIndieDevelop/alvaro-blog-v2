import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutHero from "@/components/sections/about/hero";
import { SkillTreeSection } from "@/components/sections/about/skill-tree/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage() {
  return (
    <div className="flex-1">
      <AboutHero />
      <div className="container mx-auto px-4 py-12 space-y-12">
        <SkillTreeSection />
      </div>
    </div>
  );
}
