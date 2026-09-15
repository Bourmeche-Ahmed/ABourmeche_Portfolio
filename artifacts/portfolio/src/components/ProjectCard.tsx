import { Github, ExternalLink, Cpu, Terminal, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];

const categoryStyles: Record<string, { badge: string; accent: string }> = {
  "Embedded Systems / Robotics": {
    badge: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    accent: "bg-orange-500",
  },
  "Control Systems / Simulation": {
    badge: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30",
    accent: "bg-sky-500",
  },
  "Real-time / Control": {
    badge: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    accent: "bg-cyan-500",
  },
  "IIoT / Analytics": {
    badge: "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30",
    accent: "bg-teal-500",
  },
  "Web Apps": {
    badge: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    accent: "bg-indigo-500",
  },
  "Browser Extension": {
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    accent: "bg-emerald-500",
  },
  "Experimental": {
    badge: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
    accent: "bg-rose-500",
  },
  "Computer Vision / HCI": {
    badge: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
    accent: "bg-purple-500",
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

  return (
    <div
      onClick={onClick}
      className="group border border-rule bg-panel-raised rounded-[2px] overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-200 hover:border-ink hover:shadow-sm"
    >
      {/* Category top hairline indicator */}
      <div className={`h-0.5 w-full ${catStyle.accent}`} />

      <div className="p-5 sm:p-6 flex flex-col h-full">
        {/* Category Badge & Architecture Label */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[2px] border ${catStyle.badge}`}>
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-ink-soft truncate max-w-[120px]">
            {project.repo}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-heading font-bold text-xl text-ink leading-tight mb-2 group-hover:text-signal transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Architecture Pipeline Snippet */}
        {project.architecture && (
          <div className="mb-4 px-2.5 py-1.5 bg-panel-sunk border border-rule rounded-[2px] font-mono text-[11px] text-ink truncate">
            <span className="text-ink-soft mr-1">ARCH:</span>
            {project.architecture}
          </div>
        )}

        {/* Language Breakdown Bar */}
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
        <div className="flex items-center justify-between pt-3 border-t border-rule mt-auto text-xs">
          <span className="font-sans font-semibold text-ink group-hover:text-signal transition-colors inline-flex items-center gap-1">
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-[2px] bg-panel-sunk hover:bg-panel border border-rule text-ink-soft hover:text-ink transition-colors no-custom-link"
            aria-label={WEBSITE_PROJECTS.includes(project.id) ? "Go to website" : "GitHub repository"}
          >
            {WEBSITE_PROJECTS.includes(project.id) ? (
              <ExternalLink className="w-3.5 h-3.5" />
            ) : (
              <Github className="w-3.5 h-3.5" />
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
