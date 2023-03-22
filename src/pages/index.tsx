import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

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
      <main className="max-w-3xl mx-auto my-16">
        <h1 className="text-4xl font-bold mb-8">¡Bienvenido!</h1>
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <Image
              src="/profile.jpg"
              alt="Foto de perfil"
              width={500}
              height={500}
              className="rounded-full"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-xl mb-8">
              ¡Bienvenido a mi página web personal! Aquí encontrarás mi
              portafolio, mis blogs y artículos, y todo lo que necesitas saber
              sobre mí y mi trabajo.
            </p>
            <button className="btn btn-primary">Ver mi portafolio</button>
          </div>
        </div>
      </main>
    </>
  );
}
