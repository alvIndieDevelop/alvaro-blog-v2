import skills from "@/utils/skills";
import SkillsView from "@/components/SkillsView";

export default function Resumen() {
  const name = "Alvaro Martin Caballero";
  const className = "programador";
  const level = 30;
  const maxHp = 100;
  const currentHp = 100;
  const maxMp = 100;
  const currentMp = 100;
  const currentExp = 30;
  const nextLevelExp = 100;
  return (
    <main className="my-16">
      <div className="max-w-3xl mx-auto">
        <div className="card shadow-lg mb-4 p-4 bg-slate-50">
          <div className="card-header">
            <h2 className="card-title">{name}</h2>
            <p className="text-gray-500">
              Level {level} {className}
            </p>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <progress
                className="progress progress-error w-100"
                value={currentHp}
                max="100"
              ></progress>
              <progress
                className="progress progress-info w-100"
                value={currentMp}
                max="100"
              ></progress>
              <progress
                className="progress progress-warning w-100"
                value={currentExp}
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <SkillsView skills={skills} />
      </div>
    </main>
  );
}
