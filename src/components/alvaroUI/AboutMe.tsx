import React from "react";
import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="lg:max-w-3xl max-w-xs mx-auto">
      <h2 className="text-3xl font-bold mt-8">Acerca de mi</h2>
      <div className="text-xl text-white my-8">
        <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
          <Image
            src="/media/Photo01.jpg"
            alt="Foto de perfil"
            width={160}
            height={160}
            className="rounded-full mx-2"
          />
          <p>
            Como desarrollador de software apasionado, he dedicado gran parte de
            mi vida a la tecnología y su constante evolución. Mi área de
            especialización incluye el desarrollo de videojuegos y el desarrollo
            web, en la que tengo más de 4 años de experiencia trabajando de
            forma independiente.
          </p>
        </div>

        <br />
        <p>
          Mi pasión por la programación y mi sed de conocimiento siempre me han
          impulsado a investigar y aprender acerca de las nuevas tecnologías y
          herramientas, para aplicarlas en mis proyectos y garantizar una
          solución innovadora y eficiente para mis clientes. Además, soy una
          persona dedicada, responsable y comprometida con mis proyectos, lo que
          me permite brindar un servicio de alta calidad y cumplir con los
          plazos establecidos.
        </p>
        <br />
        <p>
          En el desarrollo de videojuegos, he participado en el diseño y la
          implementación de diversos juegos, desde juegos simples hasta juegos
          complejos con gráficos y efectos especiales. Además, me aseguro de
          utilizar las últimas tecnologías y tendencias en el mercado para
          ofrecer una experiencia de juego atractiva y enriquecedora para los
          jugadores.
        </p>
        <br />
        <p>
          En el desarrollo web, he trabajado en una amplia variedad de
          proyectos, desde pequeños sitios web hasta aplicaciones web complejas.
          Me enfoco en utilizar tecnologías y herramientas modernas para
          garantizar una experiencia de usuario atractiva y eficiente, así como
          en seguir los estándares de desarrollo web para garantizar la
          accesibilidad y el rendimiento de los sitios web.
        </p>
        <br />
        <p>
          En resumen, mi objetivo es aplicar mis habilidades y conocimientos en
          una organización, empresa o persona que quiera innovar y llevar sus
          proyectos a un nivel superior. Estoy dispuesto a trabajar duro y
          aprender constantemente para lograr mis objetivos y brindar un
          excelente servicio a mis clientes.
        </p>
      </div>
    </div>
  );
}
