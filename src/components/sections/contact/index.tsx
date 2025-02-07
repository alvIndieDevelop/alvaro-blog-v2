"use client";
import { motion } from "framer-motion";
import { ContactForm } from "./contact-form";
import { Card } from "../../../components/ui/card";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Drop me a message!
          </p>
        </motion.div>
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <ContactForm />
          </Card>
        </div>
      </div>
    </section>
  );
}
