"use client";
import { motion } from "framer-motion";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Code2, Database, Terminal, Cpu } from "lucide-react";

export default function SkillTree() {
  const skills = {
    active: [
      { name: "JavaScript", level: "Master", icon: Code2 },
      { name: "TypeScript", level: "Advanced", icon: Code2 },
      { name: "Node.js", level: "Expert", icon: Terminal },
      { name: "React", level: "Master", icon: Code2 },
    ],
    passive: [
      { name: "Problem Solving", level: "Legendary", icon: Cpu },
      { name: "Team Leadership", level: "Advanced", icon: Database },
      { name: "Code Review", level: "Expert", icon: Terminal },
    ],
  };

  const SkillBadge = ({ level }: { level: string }) => {
    const colors = {
      Legendary: "bg-purple-500",
      Master: "bg-yellow-500",
      Expert: "bg-green-500",
      Advanced: "bg-blue-500",
    };
    return (
      <Badge className={`${colors[level as keyof typeof colors]} text-white`}>
        {level}
      </Badge>
    );
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Skill Tree</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Active Skills</h3>
          <div className="grid gap-4">
            {skills.active.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <skill.icon className="w-5 h-5" />
                <span>{skill.name}</span>
                <SkillBadge level={skill.level} />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Passive Skills</h3>
          <div className="grid gap-4">
            {skills.passive.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <skill.icon className="w-5 h-5" />
                <span>{skill.name}</span>
                <SkillBadge level={skill.level} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
