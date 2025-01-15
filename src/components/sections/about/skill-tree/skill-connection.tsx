"use client";
import { motion } from 'framer-motion';
import type { Position } from './types';

interface SkillConnectionProps {
  start: Position;
  end: Position;
  isUnlocked: boolean;
}

export function SkillConnection({ start, end, isUnlocked }: SkillConnectionProps) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const length = Math.sqrt(dx * dx + dy * dy);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute"
      style={{
        left: `${start.x}%`,
        top: `${start.y}%`,
        width: `${length}%`,
        height: '4px',
        background: `linear-gradient(90deg, 
          ${isUnlocked ? 'var(--primary)' : 'var(--muted)'} 0%, 
          ${isUnlocked ? 'var(--primary)' : 'var(--muted)'} 100%)`,
        opacity: isUnlocked ? 0.7 : 0.2,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        zIndex: 0,
        boxShadow: isUnlocked ? '0 0 8px var(--primary)' : 'none',
      }}
    >
      <div 
        className={`absolute right-0 top-1/2 w-2 h-2 rounded-full transform translate-x-1/2 -translate-y-1/2
          ${isUnlocked ? 'bg-primary' : 'bg-muted'}`}
      />
    </motion.div>
  );
}