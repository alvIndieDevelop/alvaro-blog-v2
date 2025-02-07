"use client";
import { motion } from "framer-motion";
import { Sword } from "lucide-react";
import Profile from "../../Profile";

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-background py-20">
      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <Profile />
        </motion.div>
      </div>
    </section>
  );
}
