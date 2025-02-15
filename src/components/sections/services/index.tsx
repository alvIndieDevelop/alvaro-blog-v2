"use client";
import { ServiceHero } from "./service-hero";
import { ProcessSection } from "./process-section";
import { ServiceProducts } from "./service-products";
import { ServicesSection } from "./services-section";

export default function Services() {
  return (
    <div className="flex-1">
      <ServiceHero />
      <ServicesSection />
      <ServiceProducts />
      <ProcessSection />
    </div>
  );
}
