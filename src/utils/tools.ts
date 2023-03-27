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
    icon: "/logoIcons/pc.png",
  },
  {
    name: "Laptop",
    point: 10,
    icon: "/logoIcons/laptop.png",
  },
];
const developTools: Tool[] = [
  { name: "VS Code", point: 10, icon: "/logoIcons/vscode.png" },
];

const sum = (total: number, { point }: Tool) => total + point;
const average = (values: Tool[] = []): string => {
  return (values.reduce(sum, 0) / values.length).toFixed(2);
};

const averagePasiveTool: string = average(hardwareTool);
const averageBasicTool: string = average(developTools);

export const pasiveSkillPoints: number = hardwareTool.reduce(sum, 0);
export const basicSkillPoints: number = developTools.reduce(sum, 0);

const tools: ToolSet[] = [
  { set: "Basico", tools: hardwareTool, average: averagePasiveTool },
  { set: "Desarrollo", tools: developTools, average: averageBasicTool },
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
