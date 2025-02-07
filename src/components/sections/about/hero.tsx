"use client";
import { motion } from "framer-motion";
import Profile from "../../Profile";

export default function AboutHero() {
  return (
    <section className="bg-gradient-to-b from-muted/50 to-background ">
      <div className="container mx-auto text-center">
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
