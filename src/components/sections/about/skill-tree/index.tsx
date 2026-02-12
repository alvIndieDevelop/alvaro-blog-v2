"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { skillTreeData } from "./data";
import { SkillCard } from "./skill-card";
import { Sparkles } from "lucide-react";

export default function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Calculate total skills and mastered skills
  const totalSkills = skillTreeData.reduce((acc, cat) => acc + cat.skills.length, 0);
  const masteredSkills = skillTreeData.reduce(
    (acc, cat) => acc + cat.skills.filter((s) => s.level === s.maxLevel).length,
    0
  );

  return (
    <Card variant="parchment" className="relative p-6 md:p-8 overflow-hidden border-2 border-gold/30">
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 h-10 w-10 border-l-2 border-t-2 border-gold/30" />
      <div className="absolute top-4 right-4 h-10 w-10 border-r-2 border-t-2 border-gold/30" />
      <div className="absolute bottom-4 left-4 h-10 w-10 border-l-2 border-b-2 border-gold/30" />
      <div className="absolute bottom-4 right-4 h-10 w-10 border-r-2 border-b-2 border-gold/30" />

      {/* Stats header */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-void-surface border border-gold/20">
          <Sparkles className="h-4 w-4 text-gold" />
          <span className="font-mono text-sm text-foreground">
            {masteredSkills}/{totalSkills} Mastered
          </span>
        </div>
      </div>

      {/* Skill categories grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillTreeData.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="space-y-4"
          >
            {/* Category header */}
            <div className="flex items-center gap-2">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/30" />
              <h3 className="font-display text-lg text-gold px-2">
                {category.name}
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/30" />
            </div>

            {/* Skills */}
            <div className="grid gap-3">
              {category.skills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  isSelected={selectedSkill === skill.id}
                  onSelect={() =>
                    setSelectedSkill(
                      selectedSkill === skill.id ? null : skill.id
                    )
                  }
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
