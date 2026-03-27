import { SectionHeader } from "./SectionHeader";
import { SkillCharts } from "./SkillCharts";

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <SectionHeader
        tag="Skills"
        title="Technical Expertise"
        subtitle="An overview of my technical capabilities across frontend, backend, and industrial systems domains."
      />
      <SkillCharts />
    </section>
  );
}
