import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-8 flex justify-center">
            <Image
              src="/media/Photo01.jpg"
              alt="Foto de perfil"
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Developer, Writer, and
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Digital Creator
            </span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Building innovative solutions and sharing knowledge through code,
            writing, and digital products.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">View Projects</Button>
            <Button size="lg" variant="outline">
              Read Blog
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    </section>
  );
}
