import type { Metadata } from "next";
import { ServiceHero } from "@/components/sections/services/service-hero";
import { ServicesSection } from "@/components/sections/services/services-section";
import { ServiceProducts } from "@/components/sections/services/service-products";
import { ProcessSection } from "@/components/sections/services/process-section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional web development services. From custom applications to consulting, I help bring your ideas to life.",
};

export default function ServicesPage() {
  return (
    <div className="flex-1">
      <ServiceHero />
      <ServicesSection />
      <ServiceProducts />
      <ProcessSection />
    </div>
  );
}
