import React from "react";
import Head from "next/head";
import SkillsView from "@/components/SkillsView";
import ToolsView from "@/components/ToolsView";
import skills from "@/utils/skills";
import tools from "@/utils/tools";
import Profile from "@/components/Profile";

export default function Resumen() {
  return (
    <>
      <Head>
        <title>Resumen!</title>
        <meta
          name={"description"}
          title={"description"}
          content={"Mis habilidades"}
        />
        <meta name={"og:title"} title={"og:title"} content={"resumen!"} />
        <meta
          name={"og:description"}
          title={"og:description"}
          content={"Mis habilidades"}
        />
      </Head>
      <main className="lg:max-w-3xl max-w-xs mx-auto my-16">
        <div className="my-6">
          <Profile />
        </div>
        <div className="my-6">
          <div className="bg-neutral rounded-xl p-5 flex justify-center shadow-xl">
            <h2 className="text-4xl font-bold">Habilidades</h2>
          </div>
        </div>
        <div className="mx-auto">
          <SkillsView skills={skills} />
        </div>
        <div className="my-6">
          <div className="bg-neutral rounded-xl p-5 flex justify-center shadow-xl">
            <h2 className="text-4xl font-bold">Herramientas</h2>
          </div>
        </div>
        <div className="mx-auto">
          <ToolsView tools={tools} />
        </div>
      </main>
    </>
  );
}
