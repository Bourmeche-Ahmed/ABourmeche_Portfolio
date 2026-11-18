import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";
import { CountUpMetric } from "./CountUpMetric";
import { getAssetPath } from "@/lib/paths";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];

export const categoryStyles: Record<string, { badge: string; accent: string }> = {
  "Hardware / PCB Design": {
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    accent: "bg-amber-500",
  },
  "Robotics / AI": {
    badge: "bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/30",
    accent: "bg-fuchsia-500",
  },
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
  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000, active: false });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const catStyle = categoryStyles[project.category] || {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  };

  const coverFile = project.cover || project.gallery?.[0]?.file;
  const coverSrc = coverFile ? getAssetPath(`projects/${project.id}/${coverFile}`) : undefined;
  const expectedCoverPath = coverFile ? `public/projects/${project.id}/${coverFile}` : undefined;
  const coverFit = project.gallery?.find((g) => g.file === coverFile)?.fit || "cover";

  // Mouse move handler for spotlight border and 3D tilt
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointerFine || reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y, active: true });

    if (motionConfig.flags.tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Max 3.5 degrees tilt
      const rx = ((y - centerY) / centerY) * -3.5;
      const ry = ((x - centerX) / centerX) * 3.5;
      setTilt({ rx, ry });
    }
  }, [isPointerFine, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, active: false }));
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform:
          isPointerFine && !reducedMotion && tilt.rx !== 0
            ? `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : "none",
        transition: "transform 0.15s ease-out, border-color 0.15s ease",
      }}
      className="group relative border border-rule bg-panel-raised rounded-[2px] overflow-hidden flex flex-col h-full cursor-pointer hover:border-ink"
    >
      {/* Cursor spotlight border effect on desktop */}
      {isPointerFine && mousePos.active && !reducedMotion && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[2px] opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.18), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Category top hairline indicator */}
      <div className={`h-0.5 w-full ${catStyle.accent}`} />

      {/* 16:10 Cover image slot with shared layout transition */}
      <motion.div
        layoutId={`project-cover-${project.id}`}
        className="relative aspect-[16/10] w-full overflow-hidden border-b border-rule bg-panel-sunk shrink-0"
      >
        <ProjectImage
          src={coverSrc}
          alt={project.title}
          category={project.category}
          fit={coverFit}
          isCover
          expectedPath={expectedCoverPath}
          imgClassName="motion-safe:group-hover:scale-[1.03] motion-reduce:transform-none transition-transform duration-300"
        />
      </motion.div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 relative z-20">
        {/* Category Badge & Repo Identifier */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[2px] border ${catStyle.badge}`}>
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-ink-soft truncate max-w-[130px]">
            {project.repo}
          </span>
        </div>

        {/* Project Title with shared layout transition */}
        <motion.h3
          layoutId={`project-title-${project.id}`}
          className="font-heading font-bold text-lg sm:text-xl text-ink leading-tight mb-2 group-hover:text-signal transition-colors"
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed flex-1 mb-3.5">
          {project.description}
        </p>

        {/* Metrics Chips (up to 3) with count-up animation */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {project.metrics.slice(0, 3).map((m, idx) => (
              <CountUpMetric key={idx} label={m.label} value={m.value} />
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
    </motion.div>
  );
}
