export interface Skill {
  name: string;
  point: number;
  icon: string;
}

export interface SkillSet {
  set: string;
  skills: Skill[];
  average: string;
}

const pasiveSkills: Skill[] = [
  {
    name: "Quick Learning",
    point: 10,
    icon: "/logoIcons/quicklearning.png",
  },
  {
    name: "Comunicación",
    point: 6,
    icon: "/logoIcons/quicklearning.png",
  },
];

const basicSkills: Skill[] = [
  { name: "HTML", point: 8, icon: "/logoIcons/html.png" },
  { name: "CSS", point: 7, icon: "/logoIcons/css.png" },
  { name: "Python", point: 5, icon: "/logoIcons/python.png" },
  { name: "C#", point: 4, icon: "/logoIcons/csharp.png" },
  { name: "Javascript", point: 8, icon: "/logoIcons/javascript.png" },
  { name: "Typescript", point: 6, icon: "/logoIcons/typescript.png" },
  { name: "Bash", point: 4, icon: "/logoIcons/bash.png" },
];

const lenguageSkills: Skill[] = [
  { name: "Spain", point: 10, icon: "" },
  { name: "English", point: 6, icon: "" },
];

const mobileDevelopment: Skill[] = [
  { name: "ReactNative", point: 4, icon: "/logoIcons/reactjs.png" },
];
const desktopDevelopment: Skill[] = [
  { name: "ElectronJS", point: 2, icon: "/logoIcons/electronjs.png" },
];
const frontendDevelopment: Skill[] = [
  { name: "ReactJS", point: 8, icon: "/logoIcons/reactjs.png" },
  { name: "NextJS", point: 6, icon: "/logoIcons/nextjs.png" },
];
const backendDevelopment: Skill[] = [
  { name: "NodeJS", point: 6, icon: "/logoIcons/nodejs.png" },
  { name: "Flask", point: 5, icon: "/logoIcons/flask.png" },
  { name: "ExpressJS", point: 7, icon: "/logoIcons/expressjs.png" },
];

const databases: Skill[] = [
  { name: "mongoDB", point: 6, icon: "/logoIcons/mongodb.png" },
  {
    name: "MySQL",
    point: 5,
    icon: "/logoIcons/mysql.png",
  },
];

const devOps: Skill[] = [
  { name: "Linux", point: 6, icon: "/logoIcons/linux.png" },
  { name: "Git", point: 6, icon: "/logoIcons/git.png" },
  { name: "AWS", point: 4, icon: "/logoIcons/aws.png" },
  { name: "Docker", point: 5, icon: "/logoIcons/docker.png" },
];
const gameDevelopment: Skill[] = [
  { name: "Unity3D", point: 7, icon: "/logoIcons/unity3d.png" },
  { name: "Unreal Engine", point: 2, icon: "/logoIcons/unreal.png" },
  { name: "Blender", point: 5, icon: "/logoIcons/blender.png" },
];

const sum = (total: number, { point }: Skill) => total + point;
const average = (values: Skill[] = []): string => {
  return (values.reduce(sum, 0) / values.length).toFixed(2);
};

const averagePasiveSkill: string = average(pasiveSkills);
const averageBasicSkill: string = average(basicSkills);
const averageMobileSkill: string = average(mobileDevelopment);
const averageDesktopSkill: string = average(desktopDevelopment);
const averageFrontendSkill: string = average(frontendDevelopment);
const averageBackendSkill: string = average(backendDevelopment);
const averageDevOps: string = average(devOps);
const averageGameDevelopmentSkill: string = average(gameDevelopment);
const averageDatabaseSkill: string = average(databases);

export const pasiveSkillPoints: number = pasiveSkills.reduce(sum, 0);
export const basicSkillPoints: number = basicSkills.reduce(sum, 0);
export const mobileSkillPoints: number = mobileDevelopment.reduce(sum, 0);
export const desktopSkillPoints: number = desktopDevelopment.reduce(sum, 0);
export const frontendSkillPoints: number = frontendDevelopment.reduce(sum, 0);
export const backendSkillPoints: number = backendDevelopment.reduce(sum, 0);
export const devOpsSkillPoints: number = devOps.reduce(sum, 0);
export const gameDevSkillPoints: number = gameDevelopment.reduce(sum, 0);
export const databaseSkillPoints: number = databases.reduce(sum, 0);

const skills: SkillSet[] = [
  { set: "Passive", skills: pasiveSkills, average: averagePasiveSkill },
  { set: "Basics", skills: basicSkills, average: averageBasicSkill },
  {
    set: "Frontend Development",
    skills: frontendDevelopment,
    average: averageFrontendSkill,
  },
  {
    set: "Backend Development",
    skills: backendDevelopment,
    average: averageBackendSkill,
  },
  {
    set: "Base de datos",
    skills: databases,
    average: averageDatabaseSkill,
  },
  {
    set: "Mobile Development",
    skills: mobileDevelopment,
    average: averageMobileSkill,
  },
  {
    set: "Desktop Development",
    skills: desktopDevelopment,
    average: averageDesktopSkill,
  },
  {
    set: "Game Development",
    skills: gameDevelopment,
    average: averageGameDevelopmentSkill,
  },
  { set: "DevOps", skills: devOps, average: averageDevOps },
];

export const totalSkills: number = skills.reduce(
  (total: number, curValue: SkillSet) => {
    return total + curValue.skills.length;
  },
  0
);

export const totalSkillPoints: number = skills.reduce(
  (total: number, curValue: SkillSet) =>
    total +
    curValue.skills.reduce(
      (subTotal: number, value: Skill) => subTotal + value.point,
      0
    ),
  0
);

export default skills;
