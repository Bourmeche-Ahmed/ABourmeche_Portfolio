import { SectionHeader } from "./SectionHeader";
import { SkillCharts } from "./SkillCharts";

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 border-b border-rule">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Technical Competencies & Matrix"
          subtitle="Engineering capabilities spanning low-level embedded protocols, field buses, telemetry architectures, and control theory."
        />
        <SkillCharts />
      </div>
    </section>
  );
}
