import React from "react";
import Image from "next/image";

export default function HeroMain() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("/background/winter_background_01.png")`,
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-8">Alvaro Martin Caballero</h1>
          <div className="mb-8 flex justify-center">
            <Image
              src="/media/Photo01.jpg"
              alt="Foto de perfil"
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
          <p className="mb-5 text-xl text-white">
            ¡Bienvenido a mi página web personal! Aquí encontrarás mi
            portafolio, mis blogs y artículos, y todo lo que necesitas saber
            sobre mí y mi trabajo.
          </p>
        </div>
      </div>
    </div>
  );
}
