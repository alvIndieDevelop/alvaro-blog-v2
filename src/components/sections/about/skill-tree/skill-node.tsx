"use client";
import { motion } from "framer-motion";
import { Badge } from "../../../../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";
import type { SkillNode as SkillNodeType } from "./types";

export function SkillNode({
  name,
  level,
  maxLevel,
  description,
  icon: Icon,
  position,
  isUnlocked,
  prerequisites,
}: SkillNodeType) {
  const levelColor = level === maxLevel ? "bg-yellow-500" : "bg-blue-500";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <div className="flex flex-col items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={`w-20 h-20 rounded-full flex items-center justify-center border-2
                  ${isUnlocked ? "bg-primary/10 border-primary/50" : "bg-muted/20 border-muted"} 
                  ${isUnlocked ? "cursor-pointer hover:bg-primary/20" : "cursor-not-allowed opacity-50"}
                  transition-all duration-200`}
              >
                <Icon className="w-10 h-10" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="w-64 p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">{name}</h4>
                  <Badge className={`${levelColor} text-white`}>
                    Level {level}/{maxLevel}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
                {prerequisites && prerequisites.length > 0 && (
                  <div className="text-sm">
                    <span className="font-semibold">Prerequisites:</span>
                    <ul className="list-disc list-inside mt-1">
                      {prerequisites.map((prereq) => (
                        <li key={prereq}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="mt-2 text-center">
          <p className="font-medium text-sm">{name}</p>
          <Badge variant="secondary" className="mt-1">
            Lvl {level}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}
