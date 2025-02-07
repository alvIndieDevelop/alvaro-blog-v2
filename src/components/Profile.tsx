import React from "react";
import Image from "next/image";
import {
  getCurrentAge,
  getCurrentExperience,
  getPercentOfCurrentYear,
} from "../utils";
import { totalSkillPoints, totalSkills } from "../utils/skills";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";
import { Card } from "./ui/card";
import { Sword } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const currAge = getCurrentAge();
  const currAgeExp = getCurrentExperience();
  const currExp = getPercentOfCurrentYear();

  const stats = [
    {
      type: "hp",
      value: 100,
      icon: <BsFillHeartPulseFill fontSize={26} />,
      color: "text-red-500",
    },
    {
      type: "mana",
      value: 100,
      icon: <GiWaterDrop fontSize={26} />,
      color: "text-blue-500",
    },
    {
      type: "exp",
      value: currExp,
      icon: "EXP",
      color: "text-yellow-500",
    },
  ];
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <Card className="p-6 border-2 shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Alvaro Martin Caballero</h2>
            <div className="mb-8 flex justify-center">
              <Image
                src={"/media/Photo01.jpg"}
                alt={"Photo Alvaro Martin Caballero"}
                width={300}
                height={300}
                className="rounded-full"
              />
            </div>
            <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center shadow-lg">
              <Sword className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Character Sheet
            </h1>
            <p className="text-primary/80 font-medium text-lg max-w-2xl mx-auto">
              Level 5 Software Developer | LHC Guild Member
            </p>
          </motion.div>
          <div>
            <p>Alvaro Martin Caballero</p>
            <p>Nivel: {currAge}</p>
            <p>Clase: Programador</p>
            <p>nivel de clase: {currAgeExp}</p>
            <p>puntos: {totalSkillPoints}</p>
            <p>habilidades: {totalSkills}</p>
            <p>Gremio: LHC</p>
          </div>
        </Card>
      </div>
    </section>

    // <div className=" my-6">
    //   <div className="card lg:card-side bg-neutral shadow-xl">
    //     <figure className="bg-neutral-900">
    //       <Image
    //         src={"/media/Photo01.jpg"}
    //         alt={"Photo Alvaro Martin Caballero"}
    //         width={200}
    //         height={200}
    //       />
    //     </figure>
    //     <div className="card-body">
    //       <div className="grid lg:grid-cols-2 grid-cols-1">
    //         <p>Alvaro Martin Caballero</p>
    //         <p>Nivel: {currAge}</p>
    //         <p>Clase: Programador</p>
    //         <p>nivel de clase: {currAgeExp}</p>
    //         <p>puntos: {totalSkillPoints}</p>
    //         <p>habilidades: {totalSkills}</p>
    //         <p>Gremio: LHC</p>
    //       </div>
    //       <div className="flex justify-between mt-2">
    //         {stats.map((stat) => (
    //           <div
    //             key={stat.type}
    //             className={`radial-progress ${stat.color}`}
    //             style={
    //               {
    //                 "--value": stat.value,
    //               } as React.CSSProperties
    //             }
    //           >
    //             {stat.icon}
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
