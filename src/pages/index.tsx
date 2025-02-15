import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/projects";
import Contact from "../components/sections/contact";
import Support from "../components/sections/support";
import { ServicesSection } from "../components/sections/services/services-section";
import { ServiceProducts } from "../components/sections/services/service-products";
import { ProcessSection } from "../components/sections/services/process-section";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Alvaro Blog!</title>
        <meta name="description" content="Portafolio personal!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex-1">
        <Hero />
        <Projects />
        <ServicesSection />
        <ServiceProducts />
        <ProcessSection />
        <Contact />
        {/* <Support /> */}
      </main>
    </>
  );
}
