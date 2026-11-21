import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";
import { getAssetPath } from "@/lib/paths";

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];

export const categoryStyles: Record<string, { badge: string; accent: string }> = {
  "Hardware / PCB Design": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "Robotics / AI": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "Embedded Systems / Robotics": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "Control Systems / Simulation": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "Real-time / Control": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "IIoT / Analytics": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "Web Apps": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "Browser Extension": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "Experimental": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
  "Computer Vision / HCI": {
    badge: "bg-slate/20 text-orange border-slate/30",
    accent: "bg-orange",
  },
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const catStyle = categoryStyles[project.category] || {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  };

  const coverFile = project.cover || project.gallery?.[0]?.file;
  const coverSrc = coverFile ? getAssetPath(`projects/${project.id}/${coverFile}`) : undefined;
  const expectedCoverPath = coverFile ? `public/projects/${project.id}/${coverFile}` : undefined;
  const coverFit = project.gallery?.find((g) => g.file === coverFile)?.fit || "cover";

  return (
    <div
      onClick={onClick}
      className="group border border-rule bg-panel-raised rounded-[2px] overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-200 hover:border-ink hover:shadow-sm"
    >
      {/* Category top hairline indicator */}
      <div className={`h-0.5 w-full ${catStyle.accent}`} />

      {/* 16:10 Cover image slot */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-rule bg-panel-sunk shrink-0">
        <ProjectImage
          src={coverSrc}
          alt={project.title}
          category={project.category}
          fit={coverFit}
          isCover
          expectedPath={expectedCoverPath}
          imgClassName="motion-safe:group-hover:scale-[1.03] motion-reduce:transform-none transition-transform duration-300"
        />
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Category Badge & Repo Identifier */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[2px] border ${catStyle.badge}`}>
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-ink-soft truncate max-w-[130px]">
            {project.repo}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-heading font-bold text-lg sm:text-xl text-ink leading-tight mb-2 group-hover:text-signal transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed flex-1 mb-3.5">
          {project.description}
        </p>

        {/* Metrics Chips (up to 3) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {project.metrics.slice(0, 3).map((m, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-panel-sunk border border-rule text-[10px] font-mono"
              >
                <span className="text-ink-soft">{m.label}:</span>
                <span className="text-ink font-semibold">{m.value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Architecture Pipeline Snippet */}
        {project.architecture && (
          <div className="mb-4 px-2.5 py-1.5 bg-panel-sunk border border-rule rounded-[2px] font-mono text-[11px] text-ink truncate">
            <span className="text-ink-soft mr-1">ARCH:</span>
            {project.architecture}
          </div>
        )}

        {/* Language Breakdown Bar (hidden when absent) */}
        {project.languages && project.languages.length > 0 && (
          <div className="mb-4 pt-3 border-t border-rule">
            <div className="flex h-1.5 bg-panel-sunk border border-rule overflow-hidden rounded-[1px] mb-1.5">
              {project.languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] font-mono text-ink-soft">
              {project.languages.slice(0, 3).map((lang) => (
                <span key={lang.name} className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-[1px] inline-block"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-ink font-medium">{lang.name}</span>
                  <span>{lang.percentage}%</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1 mb-5">
          {project.techBadges.slice(0, 4).map((badge) => (
            <span key={badge} className="tech-chip text-[11px] py-0.5 px-2">
              {badge}
            </span>
          ))}
          {project.techBadges.length > 4 && (
            <span className="text-[11px] font-mono text-ink-soft px-1.5 py-0.5 self-center">
              +{project.techBadges.length - 4}
            </span>
          )}
        </div>

        {/* Interactive Action Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-rule mt-auto text-xs min-h-[44px]">
          <span className="font-sans font-semibold text-ink group-hover:text-signal transition-colors inline-flex items-center gap-1">
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="min-w-[44px] min-h-[44px] p-2 rounded-[2px] bg-panel-sunk hover:bg-panel border border-rule text-ink-soft hover:text-ink transition-colors no-custom-link flex items-center justify-center"
              aria-label={WEBSITE_PROJECTS.includes(project.id) ? "Go to website" : "GitHub repository"}
            >
              {WEBSITE_PROJECTS.includes(project.id) ? (
                <ExternalLink className="w-3.5 h-3.5" />
              ) : (
                <Github className="w-3.5 h-3.5" />
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
