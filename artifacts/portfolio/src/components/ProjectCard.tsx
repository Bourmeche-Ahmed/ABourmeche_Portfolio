import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";
import { getAssetPath } from "@/lib/paths";

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];

export const categoryStyles: Record<string, { badge: string; accent: string }> = {
  "Hardware / PCB Design": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "Robotics / AI": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "Embedded Systems / Robotics": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "Control Systems / Simulation": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "Real-time / Control": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "IIoT / Analytics": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "Web Apps": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "Browser Extension": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "Experimental": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
  "Computer Vision / HCI": {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  },
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const catStyle = categoryStyles[project.category] || {
    badge: "bg-accent-soft text-accent border-border",
    accent: "bg-accent",
  };

  const coverFile = project.cover || project.gallery?.[0]?.file;
  const coverSrc = coverFile ? getAssetPath(`projects/${project.id}/${coverFile}`) : undefined;
  const expectedCoverPath = coverFile ? `public/projects/${project.id}/${coverFile}` : undefined;
  const coverFit = project.gallery?.find((g) => g.file === coverFile)?.fit || "cover";

  return (
    <div
      onClick={onClick}
      className="group border border-border bg-surface rounded-lg overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-200 hover:border-accent shadow-card"
    >
      {/* Category top hairline indicator */}
      <div className={`h-1 w-full ${catStyle.accent}`} />

      {/* 16:10 Cover image slot */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg-alt shrink-0">
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
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${catStyle.badge}`}>
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-text-muted truncate max-w-[130px]">
            {project.repo}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-heading font-bold text-lg sm:text-xl text-text leading-tight mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed flex-1 mb-3.5">
          {project.description}
        </p>

        {/* Metrics Chips (up to 3) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {project.metrics.slice(0, 3).map((m, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-bg-alt border border-border text-[10px] font-mono"
              >
                <span className="text-text-muted">{m.label}:</span>
                <span className="text-text font-semibold">{m.value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Architecture Pipeline Snippet */}
        {project.architecture && (
          <div className="mb-4 px-2.5 py-1.5 bg-bg-alt border border-border rounded-md font-mono text-[11px] text-text truncate">
            <span className="text-text-muted mr-1 font-medium">ARCH:</span>
            <span>{project.architecture}</span>
          </div>
        )}

        {/* Language Breakdown Bar */}
        {project.languages && project.languages.length > 0 && (
          <div className="mb-4 pt-3 border-t border-border">
            <div className="flex h-1.5 bg-bg-alt border border-border overflow-hidden rounded-[2px] mb-1.5">
              {project.languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] font-mono text-text-muted">
              {project.languages.slice(0, 3).map((lang) => (
                <span key={lang.name} className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-[1px] inline-block"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-text font-medium">{lang.name}</span>
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
            <span className="text-[11px] font-mono text-text-muted px-1.5 py-0.5 self-center">
              +{project.techBadges.length - 4}
            </span>
          )}
        </div>

        {/* Interactive Action Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto text-xs min-h-[44px]">
          <span className="font-sans font-semibold text-text group-hover:text-accent transition-colors inline-flex items-center gap-1">
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="min-w-[40px] min-h-[40px] p-2 rounded-md bg-bg-alt hover:bg-surface border border-border text-text-muted hover:text-text transition-colors no-custom-link flex items-center justify-center"
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
