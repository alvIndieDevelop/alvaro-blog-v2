"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Ember {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

interface EmberParticlesProps {
  count?: number;
  className?: string;
}

export function EmberParticles({ count = 15, className = "" }: EmberParticlesProps) {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    const newEmbers: Ember[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 2 + Math.random() * 4,
    }));
    setEmbers(newEmbers);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full"
          style={{
            left: `${ember.x}%`,
            bottom: "-10px",
            width: ember.size,
            height: ember.size,
            background: `radial-gradient(circle, hsl(var(--ember)) 0%, hsl(var(--gold)) 50%, transparent 100%)`,
            boxShadow: `0 0 ${ember.size * 2}px hsl(var(--ember) / 0.5)`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [0, -200, -400, -600],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
