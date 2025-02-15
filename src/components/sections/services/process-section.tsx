"use client";
import { motion } from "framer-motion";
import { Card } from "../../ui/card";
import { Calendar, Code, MessageSquare, Rocket } from "lucide-react";

const process = [
  {
    title: "Discovery Call",
    description: "Discuss your project requirements and goals",
    icon: Calendar,
  },
  {
    title: "Planning",
    description: "Create a detailed roadmap and technical specifications",
    icon: MessageSquare,
  },
  {
    title: "Development",
    description: "Build your solution with regular updates and feedback",
    icon: Code,
  },
  {
    title: "Launch",
    description: "Deploy your project and provide ongoing support",
    icon: Rocket,
  },
];

export function ProcessSection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">How We Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined process to bring your project from concept to reality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {process.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
