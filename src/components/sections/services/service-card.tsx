"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Check, Code2, Lightbulb, Palette, Server } from "lucide-react";
import Link from "next/link";

const icons = {
  Code2,
  Lightbulb,
  Palette,
  Server,
};

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  timeUnit: string;
  features: string[];
  icon: keyof typeof icons | string;
  popular?: boolean;
}

export function ServiceCard({
  title,
  description,
  price,
  timeUnit,
  features,
  icon,
  popular,
}: ServiceCardProps) {
  const Icon = icons[icon as keyof typeof icons] || icon;

  return (
    <Card
      className={`relative flex flex-col h-full transition-all duration-200 ${
        popular
          ? "border-primary/50 shadow-xl scale-105"
          : "hover:border-primary/30"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{timeUnit}</span>
        </div>

        <ul className="space-y-3">
          {features.map((feature) => (
            <motion.li
              key={feature}
              className="flex items-center gap-2 text-sm"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary" />
              </div>
              {feature}
            </motion.li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/services/book">Get Started</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
