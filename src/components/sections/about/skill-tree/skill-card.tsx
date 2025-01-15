"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "../../../../components/ui/progress";
import { Badge } from "../../../../components/ui/badge";
import type { Skill } from "./types";

interface SkillCardProps {
  skill: Skill;
  isSelected: boolean;
  onSelect: () => void;
}

export function SkillCard({ skill, isSelected, onSelect }: SkillCardProps) {
  const Icon = skill.icon;
  const levelColor =
    skill.level === skill.maxLevel ? "bg-yellow-500" : "bg-blue-500";

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={onSelect}
      className={`
        relative p-4 rounded-lg cursor-pointer
        border-2 shadow-lg
        ${
          isSelected
            ? "border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5"
            : "border-muted-foreground/20 bg-gradient-to-br from-muted/80 to-background hover:from-muted/90"
        }
        transition-all duration-200
      `}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-primary/20 shadow-inner">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className="font-bold text-primary/90">{skill.name}</h4>
          <Badge
            variant="secondary"
            className={`${levelColor} text-white mt-1`}
          >
            Level {skill.level}/{skill.maxLevel}
          </Badge>
        </div>
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex justify-between text-sm font-medium text-primary/80">
          <span>Experience</span>
          <span>
            {skill.experience}/{skill.nextLevelExp}
          </span>
        </div>
        <Progress
          value={(skill.experience / skill.nextLevelExp) * 100}
          className="h-2.5 bg-primary/10"
        />
      </div>

      <AnimatePresence mode="wait">
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 pt-2 border-t border-primary/10"
          >
            <p className="text-sm text-primary/80 leading-relaxed">
              {skill.description}
            </p>
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-primary/90">
                Effects:
              </h5>
              <ul className="grid gap-2">
                {skill.effects.map((effect, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-primary/80 bg-primary/5 p-2 rounded-lg"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {effect}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
