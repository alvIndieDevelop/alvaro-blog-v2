"use client";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Coffee, Heart } from "lucide-react";

export default function Support() {
  return (
    <section id="support" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Support My Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you find my content helpful, consider supporting my work!
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Buy Me a Coffee</CardTitle>
              <CardDescription>
                Support with a one-time donation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <a
                  href="https://buymeacoffee.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Buy me a coffee
                </a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Support</CardTitle>
              <CardDescription>Become a monthly supporter</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Heart className="mr-2 h-4 w-4" />
                  Support Monthly
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
