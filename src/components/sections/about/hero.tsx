"use client";
import { motion } from 'framer-motion';
import { Sword } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-background py-20">
      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center shadow-lg">
            <Sword className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Character Sheet
          </h1>
          <p className="text-primary/80 font-medium text-lg max-w-2xl mx-auto">
            Level 5 Software Developer | LHC Guild Member
          </p>
        </motion.div>
      </div>
    </section>
  );
}