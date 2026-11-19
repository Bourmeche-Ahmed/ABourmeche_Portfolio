import { SectionHeader } from "./SectionHeader";
import { SkillCharts } from "./SkillCharts";
import { SkillRing3D } from "./SkillRing3D";

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 border-b border-rule">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Technical Competencies & Matrix"
          subtitle="Engineering capabilities spanning low-level embedded protocols, field buses, telemetry architectures, and control theory."
        />
        <SkillRing3D />
        <SkillCharts />
      </div>
    </section>
  );
}
