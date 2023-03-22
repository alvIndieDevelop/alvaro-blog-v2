import { SkillSet } from "@/utils/skills";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import classNames from "@/utils/classNames";

const SkillsView = ({ skills }: { skills: SkillSet[] }) => {
  return (
    <div className="flex flex-col gap-6">
      {skills.map(({ set, skills, average }) => (
        <div key={set} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{set}</h2>
          <div className="grid grid-cols-3 gap-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={classNames(
                  "border border-gray-300 rounded-lg p-4 text-center",
                  skill.point >= +average ? "bg-green-100" : "bg-gray-100"
                )}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={skill.icon}
                    alt="skill icon"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div className="text-lg font-bold text-gray-800 mb-2">
                  {skill.name}
                </div>
                <div className="flex items-center justify-center gap-1">
                  {Array.from(Array(skill.point)).map((_, index) => (
                    <div key={index}>
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-gray-500 mt-2">
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
