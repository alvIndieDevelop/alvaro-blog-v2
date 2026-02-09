"use client";

import React from "react";
import Image from "next/image";
import { getCurrentExperience, getPercentOfCurrentYear } from "@/utils";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import {
  Sword,
  Scroll,
  Target,
  Lightbulb,
  Code2,
  Gamepad2,
  Cloud,
  Heart,
  Droplets,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const currAgeExp = getCurrentExperience();
  const currExp = getPercentOfCurrentYear();

  const stats = {
    health: 100,
    mana: 100,
    exp: currExp,
  };

  return (
    <section className="py-12 bg-void">
      <div className="container px-4 mx-auto">
        <Card variant="parchment" className="relative p-8 border-2 border-gold/30">
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 h-12 w-12 border-l-2 border-t-2 border-gold/40" />
          <div className="absolute top-4 right-4 h-12 w-12 border-r-2 border-t-2 border-gold/40" />
          <div className="absolute bottom-4 left-4 h-12 w-12 border-l-2 border-b-2 border-gold/40" />
          <div className="absolute bottom-4 right-4 h-12 w-12 border-r-2 border-b-2 border-gold/40" />

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 flex flex-col items-center"
          >
            {/* Title badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold/30 bg-gold/10">
              <Shield className="h-4 w-4 text-gold" />
              <span className="font-mono text-sm text-gold">Character Sheet</span>
            </div>

            {/* Portrait */}
            <div className="relative mb-6">
              <div className="absolute -inset-3 rounded-full border border-gold/20" />
              <div className="absolute -inset-1 rounded-full border-2 border-gold/40" />
              <Image
                src="/media/Photo01.jpg"
                alt="Alvaro Martin Caballero"
                width={180}
                height={180}
                className="rounded-full border-4 border-gold/50 shadow-xl shadow-gold/10"
              />
              {/* Level badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border-2 border-gold bg-void px-3 py-1">
                <Sparkles className="h-3 w-3 text-gold" />
                <span className="font-mono text-xs font-bold text-gold">LVL {currAgeExp}</span>
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="font-display text-4xl font-bold text-gradient-gold mb-2">
              Alvaro Martin Caballero
            </h1>
            <p className="text-lg text-muted-foreground mb-1">
              Senior Software Developer
            </p>
            <p className="text-sm text-muted-foreground/60">
              🏢 IntechIdeas • 🎮 IndieDev Guild
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto mb-12"
          >
            <h2 className="font-display text-xl text-gold text-center mb-6">Base Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-20">
                  <Heart className="h-5 w-5 text-[hsl(var(--health))]" />
                  <span className="text-sm font-medium text-muted-foreground">HP</span>
                </div>
                <Progress variant="health" value={stats.health} max={100} showValue className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-20">
                  <Droplets className="h-5 w-5 text-[hsl(var(--mana))]" />
                  <span className="text-sm font-medium text-muted-foreground">MP</span>
                </div>
                <Progress variant="mana" value={stats.mana} max={100} showValue className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-20">
                  <Zap className="h-5 w-5 text-gold" />
                  <span className="text-sm font-medium text-muted-foreground">EXP</span>
                </div>
                <Progress variant="default" value={stats.exp} max={100} showValue className="flex-1" />
              </div>
            </div>
          </motion.div>

          {/* Character Lore Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl text-gold text-center mb-8"
            >
              ═══ Character Lore ═══
            </motion.h2>

            {/* Backstory */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-void-surface/50 p-6 rounded-lg border-l-4 border-gold"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gold/10 rounded-lg border border-gold/30">
                  <Scroll className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-xl text-gold">Backstory</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                My journey began in 2019, when I first discovered the magic of
                turning ideas into digital reality. Since then, I&apos;ve been on a
                quest to master the art of software development, crafting
                experiences that blend creativity with technical excellence.
                Every project is a new adventure, every bug a puzzle to solve.
              </p>
            </motion.div>

            {/* Specializations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-void-surface/50 p-6 rounded-lg border-r-4 border-ethereal"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-ethereal/10 rounded-lg border border-ethereal/30">
                  <Sword className="w-5 h-5 text-ethereal" />
                </div>
                <h3 className="font-display text-xl text-ethereal">Specializations</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-3 p-4 bg-void/50 rounded-lg border border-border">
                  <Code2 className="w-6 h-6 text-ethereal" />
                  <div>
                    <p className="font-medium text-foreground">Web Development</p>
                    <p className="text-sm text-muted-foreground">React, Next.js, TypeScript</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-void/50 rounded-lg border border-border">
                  <Gamepad2 className="w-6 h-6 text-ember" />
                  <div>
                    <p className="font-medium text-foreground">Game Development</p>
                    <p className="text-sm text-muted-foreground">Unity, Godot, C#</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-void/50 rounded-lg border border-border">
                  <Cloud className="w-6 h-6 text-gold" />
                  <div>
                    <p className="font-medium text-foreground">Cloud Architecture</p>
                    <p className="text-sm text-muted-foreground">AWS, Serverless</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Current Quest */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-void-surface/50 p-6 rounded-lg border-l-4 border-ember"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-ember/10 rounded-lg border border-ember/30">
                  <Target className="w-5 h-5 text-ember" />
                </div>
                <h3 className="font-display text-xl text-ember">Current Quest</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Building innovative solutions at{" "}
                <span className="font-semibold text-gold">IntechIdeas</span>{" "}
                as a Senior Software Developer, while pursuing my indie game
                development dreams on the side. The goal? Create experiences
                that matter and tools that empower others.
              </p>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-void-surface/50 p-6 rounded-lg border-b-4 border-gold text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-2 bg-gold/10 rounded-lg border border-gold/30">
                  <Lightbulb className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-xl text-gold">Philosophy</h3>
              </div>
              <blockquote className="text-lg italic text-muted-foreground">
                &ldquo;Code is my craft, games are my passion, and every project
                is an adventure waiting to unfold.&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
}
