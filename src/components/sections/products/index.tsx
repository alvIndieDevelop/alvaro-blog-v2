"use client";
import { motion } from "framer-motion";
import { ProductCard } from "./product-card";

const products = [
  {
    title: "Starter Template",
    description: "A complete starter template for Next.js projects",
    price: 29,
    features: [
      "TypeScript Setup",
      "Tailwind CSS",
      "Authentication",
      "Database Integration",
    ],
    url: "/products/starter-template",
  },
  // Add more products as needed
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Digital Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools and resources to help you build better projects.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
