"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../../../../components/ui/card";
import { GridBackground } from "../../../../components/ui/grid-background";
import { skillTreeData } from "./data";
import { SkillCard } from "./skill-card";

export default function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <Card className="relative p-6 overflow-hidden border-2 shadow-xl">
      <GridBackground>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillTreeData.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-primary bg-primary/5 p-2 rounded-lg shadow-sm">
                {category.name}
              </h3>
              <div className="grid gap-4">
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
      </GridBackground>
    </Card>
  );
}
