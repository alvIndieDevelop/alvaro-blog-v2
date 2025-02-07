import React from "react";
import Image from "next/image";
import { getCurrentExperience, getPercentOfCurrentYear } from "../utils";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";
import { Card } from "./ui/card";
import { Sword } from "lucide-react";
import { motion } from "framer-motion";
import { SkillTreeBackground } from "./sections/about/skill-tree/background";

export default function Profile() {
  const currAgeExp = getCurrentExperience();
  const currExp = getPercentOfCurrentYear();

  const stats = {
    health: 100,
    mana: 100,
    exp: currExp,
  };

  const statsArray = [
    {
      type: "hp",
      value: stats.health,
      icon: <BsFillHeartPulseFill fontSize={26} />,
      color: "text-red-500",
    },
    {
      type: "mana",
      value: stats.mana,
      icon: <GiWaterDrop fontSize={26} />,
      color: "text-blue-500",
    },
    {
      type: "exp",
      value: stats.exp,
      icon: "EXP",
      color: "text-yellow-500",
    },
  ];
  return (
    <section className="py-8 bg-muted/30">
      <div className="container px-4 mx-auto">
        <Card className="relative p-6 border-2 shadow-xl">
          <SkillTreeBackground />
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
              Level {currAgeExp} Software Developer | IndieDev Guild Member
            </p>
          </motion.div>
          <div className="">
            <div className="flex justify-between my-6 max-w-2xl mx-auto">
              {statsArray.map((stat) => (
                <div className="flex flex-col items-center">
                  <span className="font-medium text-primary/90">
                    {stat.type}
                  </span>
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
                </div>
              ))}
            </div>
          </div>
          <div className="lg:max-w-3xl max-w-xs mx-auto">
            <h2 className="text-3xl font-bold mt-8">About Me</h2>
            <div className="text-xl text-white my-8">
              <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
                <p>
                  As a passionate software developer, I have dedicated a
                  significant part of my life to technology and its constant
                  evolution. My area of expertise includes game development and
                  web development, where I have over four years of experience
                  working independently.
                </p>
              </div>

              <br />
              <p>
                My passion for programming and my thirst for knowledge have
                always driven me to research and learn about new technologies
                and tools, applying them to my projects to ensure innovative and
                efficient solutions for my clients. Additionally, I am a
                dedicated, responsible, and committed person, which allows me to
                provide high-quality service and meet deadlines.
              </p>
              <br />
              <p>
                In game development, I have participated in the design and
                implementation of various games, from simple ones to complex
                games with graphics and special effects. I also make sure to use
                the latest technologies and market trends to offer an engaging
                and enriching gaming experience for players.
              </p>
              <br />
              <p>
                In web development, I have worked on a wide variety of projects,
                from small websites to complex web applications. I focus on
                using modern technologies and tools to ensure an attractive and
                efficient user experience while following web development
                standards to guarantee accessibility and performance.
              </p>
              <br />
              <p>
                In summary, my goal is to apply my skills and knowledge in an
                organization, company, or individual looking to innovate and
                take their projects to the next level. I am willing to work hard
                and continuously learn to achieve my goals and provide excellent
                service to my clients.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
