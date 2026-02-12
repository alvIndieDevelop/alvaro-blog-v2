"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Gamepad2,
  Code2,
  Scroll,
  ChevronDown,
  Sword,
  Sparkles,
} from "lucide-react";
import { EmberParticles } from "@/components/effects/ember-particles";

export default function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-void">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--void))_70%)]" />

        {/* Bottom fog effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void via-void/80 to-transparent" />
      </div>

      {/* Ember particles */}
      <EmberParticles count={20} className="z-0" />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 h-20 w-20 border-l-2 border-t-2 border-gold/30" />
      <div className="absolute top-8 right-8 h-20 w-20 border-r-2 border-t-2 border-gold/30" />
      <div className="absolute bottom-8 left-8 h-20 w-20 border-l-2 border-b-2 border-gold/30" />
      <div className="absolute bottom-8 right-8 h-20 w-20 border-r-2 border-b-2 border-gold/30" />

      <div className="container relative z-10 mx-auto flex min-h-[90vh] flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Character Portrait with golden glow ring */}
          <motion.div
            className="relative mb-10 inline-block"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full border border-gold/20" />
            <div className="absolute -inset-2 rounded-full border-2 border-gold/40 animate-glow-pulse" />

            {/* Golden glow behind image */}
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl" />

            <Image
              src="/media/Photo01.jpg"
              alt="Alvaro - Indie Developer"
              width={200}
              height={200}
              className="relative rounded-full border-4 border-gold/50 shadow-2xl shadow-gold/20"
              priority
            />

            {/* Level badge */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="flex items-center gap-1 rounded-full border-2 border-gold bg-void px-4 py-1.5 shadow-lg shadow-gold/20">
                <Sparkles className="h-3 w-3 text-gold" />
                <span className="font-mono text-sm font-bold text-gold">
                  {t("level")}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Welcome text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="mb-4 font-mono text-sm tracking-[0.3em] text-gold/80 uppercase">
              {t("welcome")}
            </p>
          </motion.div>

          {/* Title with fantasy styling */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h1 className="mb-2 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-foreground">Alvaro</span>{" "}
              <span className="text-gradient-gold">Martin</span>
            </h1>
            <p className="mb-6 font-display text-2xl text-gold sm:text-3xl">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Class/Role badges */}
          <motion.div
            className="mb-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold">
              <Code2 className="h-4 w-4" />
              {t("role1")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-2 text-sm font-medium text-ember">
              <Gamepad2 className="h-4 w-4" />
              {t("role2")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ethereal/30 bg-ethereal/10 px-4 py-2 text-sm font-medium text-ethereal">
              <Scroll className="h-4 w-4" />
              {t("role3")}
            </span>
          </motion.div>

          {/* Quest description */}
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {t.rich("description", {
              web: (chunks) => (
                <span className="font-semibold text-gold">{chunks}</span>
              ),
              games: (chunks) => (
                <span className="font-semibold text-ember">{chunks}</span>
              ),
              tech: (chunks) => (
                <span className="font-semibold text-ethereal">{chunks}</span>
              ),
            })}
          </motion.p>

          {/* Action buttons styled as RPG menu options */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button size="lg" className="group min-w-[180px] gap-2" asChild>
              <Link href="/projects">
                <Sword className="h-4 w-4 transition-transform group-hover:rotate-12" />
                {t("viewQuests")}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group min-w-[180px] gap-2"
              asChild
            >
              <Link href="/about">
                <Sparkles className="h-4 w-4" />
                {t("characterInfo")}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="group min-w-[180px] gap-2"
              asChild
            >
              <Link href="/blog">
                <Scroll className="h-4 w-4" />
                {t("readScrolls")}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.5 },
            y: { delay: 1, duration: 1.5, repeat: Infinity },
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground/60">
              {tCommon("scrollDown")}
            </span>
            <ChevronDown className="h-5 w-5 text-gold/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
