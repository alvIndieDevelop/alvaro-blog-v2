import React from "react";
import Image from "next/image";
import { SkillSet } from "../utils/skills";
import classNames from "../utils/classNames";

const SkillsView = ({ skills }: { skills: SkillSet[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {skills.map(({ set, skills }) => (
        <div key={set} className="bg-neutral rounded-lg shadow-md p-6 ">
          <h2 className="text-2xl font-bold mb-4 border-b border-white">
            {set}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={classNames(
                  "border-2 rounded-lg p-4 text-center hover:animate-pulse hover:border-yellow-500 ",
                  skill.point > 5 ? "bg-teal-900" : "bg-slate-600"
                )}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={
                      skill.icon === ""
                        ? "/logoIcons/quicklearning.png"
                        : skill.icon
                    }
                    alt="skill icon"
                    width={40}
                    height={40}
                    className=""
                  />
                </div>
                <div
                  className={classNames(
                    "text-sm font-bold  mb-2",
                    skill.point > 5 ? "text-slate-300" : "text-gray-900"
                  )}
                >
                  {skill.name}
                </div>
                {/* <div className="flex items-center justify-center gap-1">
                  {Array.from(Array(skill.point)).map((_, index) => (
                    <div key={index}>
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                    </div>
                  ))}
                </div> */}
                <div
                  className={classNames(
                    "text-sm font-medium mt-2",
                    skill.point > 5 ? "text-slate-300" : "text-gray-400"
                  )}
                >
                  {skill.point} / 10
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsView;
