"use client";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function ServiceHero() {
  return (
    <section className="relative py-20 overflow-hidden bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              5.0 Average Rating
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Expert Web Development &
            <span className="block text-primary">Technical Services</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your ideas into reality with professional web development,
            consulting, and technical services.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* <Button size="lg" className="gap-2">
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Button> */}
            <Button size="lg" variant="outline">
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div>
              <div className="font-bold text-2xl text-foreground">100+</div>
              Projects Completed
            </div>
            <div>
              <div className="font-bold text-2xl text-foreground">50+</div>
              Happy Clients
            </div>
            <div>
              <div className="font-bold text-2xl text-foreground">5+</div>
              Years Experience
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
