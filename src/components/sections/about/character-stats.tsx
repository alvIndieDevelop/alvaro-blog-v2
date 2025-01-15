"use client";
import { motion } from "framer-motion";
import { Card } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { Heart, Brain, Zap, Shield } from "lucide-react";

export default function CharacterStats() {
  const stats = {
    health: 85,
    mana: 95,
    exp: 28,
    level: 5,
  };

  const baseStats = [
    { icon: Heart, label: "Health", value: stats.health, color: "bg-red-500" },
    { icon: Brain, label: "Mana", value: stats.mana, color: "bg-blue-500" },
    { icon: Zap, label: "EXP", value: stats.exp, color: "bg-yellow-500" },
    {
      icon: Shield,
      label: "Level",
      value: stats.level * 20,
      color: "bg-green-500",
    },
  ];

  return (
    <Card className="p-6 border-2 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-primary bg-primary/5 p-2 rounded-lg inline-block">
        Base Stats
      </h2>
      <div className="space-y-6">
        {baseStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-primary/90">{stat.label}</span>
              <span className="ml-auto font-semibold text-primary/80">
                {stat.value}/100
              </span>
            </div>
            <Progress
              value={stat.value}
              className={`${stat.color} h-2.5 shadow-sm`}
            />
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
