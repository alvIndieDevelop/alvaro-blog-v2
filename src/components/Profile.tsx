import Image from "next/image";

import {
  getCurrentAge,
  getCurrentExperience,
  getPercentOfCurrentYear,
} from "@/utils";
import { totalSkillPoints, totalSkills } from "@/utils/skills";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";

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
    <div className=" my-6">
      <div className="card lg:card-side bg-neutral shadow-xl">
        <figure className="bg-neutral-900">
          <Image
            src={"/media/Photo01.jpg"}
            alt={"Photo Alvaro Martin Caballero"}
            width={200}
            height={200}
          />
        </figure>
        <div className="card-body">
          <div className="grid lg:grid-cols-2 grid-cols-1">
            <p>Alvaro Martin Caballero</p>
            <p>Nivel: {currAge}</p>
            <p>Clase: Programador</p>
            <p>nivel de clase: {currAgeExp}</p>
            <p>puntos: {totalSkillPoints}</p>
            <p>habilidades: {totalSkills}</p>
            <p>Gremio: LHC</p>
          </div>
          <div className="flex justify-between mt-2">
            {stats.map((stat) => (
              <div
                key={stat.type}
                className={`radial-progress ${stat.color}`}
                style={
                  {
                    "--value": stat.value,
                  } as React.CSSProperties
                }
              >
                {stat.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
