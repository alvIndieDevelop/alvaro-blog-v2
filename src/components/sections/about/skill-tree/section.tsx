"use client";
import { motion } from "framer-motion";
import SkillTree from "./index";

export function SkillTreeSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Skill Tree</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my technical skills and expertise visualized as an RPG skill
            tree
          </p>
        </motion.div>
        <div className="max-w-5xl mx-auto">
          <SkillTree />
        </div>
      </div>
    </section>
  );
}
