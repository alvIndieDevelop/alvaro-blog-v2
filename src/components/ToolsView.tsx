import { ToolSet } from "@/utils/tools";
import Image from "next/image";
import classNames from "@/utils/classNames";

const ToolsView = ({ tools }: { tools: ToolSet[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      {tools.map(({ set, tools }) => (
        <div key={set} className="bg-neutral rounded-lg shadow-md p-6 ">
          <h2 className="text-2xl font-bold mb-4 border-b border-white">
            {set}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="border-2 rounded-lg p-4 text-center hover:animate-pulse hover:border-yellow-500 bg-slate-600"
              >
                <div className="flex items-center justify-center">
                  <Image
                    src={
                      tool.icon === ""
                        ? "/logoIcons/quicklearning.png"
                        : tool.icon
                    }
                    alt="tool icon"
                    width={40}
                    height={40}
                    className=""
                  />
                </div>
                <div className="text-sm font-bold  mb-2 text-gray-300">
                  {tool.name}
                </div>
                <div className="text-sm font-medium mt-2 text-gray-400">
                  {tool.point} / 10
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsView;
