export interface Tool {
  name: string;
  point: number;
  icon: string;
}

export interface ToolSet {
  set: string;
  tools: Tool[];
  average: string;
}

const hardwareTool: Tool[] = [
  {
    name: "PC",
    point: 10,
    icon: "/logoIcons/quicklearning.png",
  },
  {
    name: "Laptop",
    point: 10,
    icon: "/logoIcons/quicklearning.png",
  },
];
const developTools: Tool[] = [
  { name: "VS Code", point: 10, icon: "" },
  { name: "Visual Studio 2022", point: 6, icon: "" },
  { name: "Firefox Browser", point: 10, icon: "" },
  { name: "Chrome Browser", point: 8, icon: "" },
  { name: "Github", point: 8, icon: "" },
  { name: "Bitbucket", point: 8, icon: "" },
];
const comunicationTools: Tool[] = [
  {
    name: "Slack",
    point: 8,
    icon: "",
  },
  {
    name: "Microsoft Teams",
    point: 5,
    icon: "",
  },
];
const frontendDevelopmentTools: Tool[] = [
  { name: "Material-UI", point: 8, icon: "" },
  { name: "TailwindCSS", point: 6, icon: "" },
  { name: "DaisyUI", point: 6, icon: "" },
];

const designTools: Tool[] = [
  { name: "Figma", point: 4, icon: "" },
  { name: "Canvas", point: 5, icon: "" },
];

const organizationTool: Tool[] = [
  { name: "Notion", point: 7, icon: "" },
  { name: "Jira", point: 6, icon: "" },
];

const backendDevelopmentTools: Tool[] = [
  { name: "Postman", point: 7, icon: "" },
];
const databasesTools: Tool[] = [
  { name: "mongoDB Atlas", point: 6, icon: "" },
  {
    name: "DBeaver",
    point: 5,
    icon: "",
  },
];

const sum = (total: number, { point }: Tool) => total + point;
const average = (values: Tool[] = []): string => {
  return (values.reduce(sum, 0) / values.length).toFixed(2);
};

const averagePasiveTool: string = average(hardwareTool);
const averageBasicTool: string = average(developTools);
const averageFrontendTool: string = average(frontendDevelopmentTools);
const averageBackendTool: string = average(backendDevelopmentTools);
const averageDatabaseTool: string = average(databasesTools);
const averageComunicationTool: string = average(comunicationTools);
const averageDesignTool: string = average(designTools);
const averageOrganizationTool: string = average(organizationTool);

export const pasiveSkillPoints: number = hardwareTool.reduce(sum, 0);
export const basicSkillPoints: number = developTools.reduce(sum, 0);
export const frontendSkillPoints: number = frontendDevelopmentTools.reduce(
  sum,
  0
);
export const backendSkillPoints: number = backendDevelopmentTools.reduce(
  sum,
  0
);
export const databaseSkillPoints: number = databasesTools.reduce(sum, 0);

const tools: ToolSet[] = [
  { set: "Basico", tools: hardwareTool, average: averagePasiveTool },
  { set: "Desarrollo", tools: developTools, average: averageBasicTool },
  {
    set: "Comunicación",
    tools: comunicationTools,
    average: averageComunicationTool,
  },
  {
    set: "Diseño",
    tools: designTools,
    average: averageDesignTool,
  },
  {
    set: "Organización",
    tools: organizationTool,
    average: averageOrganizationTool,
  },
  {
    set: "Frontend",
    tools: frontendDevelopmentTools,
    average: averageFrontendTool,
  },
  {
    set: "Backend",
    tools: backendDevelopmentTools,
    average: averageBackendTool,
  },
  {
    set: "Base de datos",
    tools: databasesTools,
    average: averageDatabaseTool,
  },
];

export const totalTools: number = tools.reduce(
  (total: number, curValue: ToolSet) => {
    return total + curValue.tools.length;
  },
  0
);

export const totalToolPoints: number = tools.reduce(
  (total: number, curValue: ToolSet) =>
    total +
    curValue.tools.reduce(
      (subTotal: number, value: Tool) => subTotal + value.point,
      0
    ),
  0
);

export default tools;
