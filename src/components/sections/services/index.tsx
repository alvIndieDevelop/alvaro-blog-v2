"use client";
import { motion } from "framer-motion";
import servicesData from "./servicesData";
import { ServiceCard } from "./service-card";
import { ServiceHero } from "./service-hero";
// import { ProcessSection } from "./process-section";
// import { TestimonialsSection } from "./testimonials-section";
// import { BookingSection } from "./booking-section";

export default function Services() {
  return (
    <div className="flex-1">
      <ServiceHero />

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Services & Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional services tailored to your needs. Transparent pricing
              with no hidden fees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* <ProcessSection />
      <TestimonialsSection />
      <BookingSection /> */}
    </div>
  );
}
