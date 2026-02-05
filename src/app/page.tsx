import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import { ServicesSection } from "@/components/sections/services/services-section";
import { ServiceProducts } from "@/components/sections/services/service-products";
import { ProcessSection } from "@/components/sections/services/process-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <ServicesSection />
      <ServiceProducts />
      <ProcessSection />
      <Contact />
    </>
  );
}
