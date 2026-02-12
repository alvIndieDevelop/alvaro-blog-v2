"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SkillTree from "./index";
import { Sparkles, Wand2 } from "lucide-react";

export function SkillTreeSection() {
  const t = useTranslations("skillTree");
  
  return (
    <section className="py-20 bg-void">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-20" />
      
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-ethereal/30 bg-ethereal/10">
            <Wand2 className="h-4 w-4 text-ethereal" />
            <span className="font-mono text-sm text-ethereal">{t("badge")}</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">{t("title")}</span>{" "}
            <span className="text-gradient-ethereal">{t("titleAccent")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>
        <div className="max-w-6xl mx-auto">
          <SkillTree />
        </div>
      </div>
    </section>
  );
}
