import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";
import { getAssetPath } from "@/lib/paths";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { springPresets } from "@/config/motion";

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];

export const categoryStyles: Record<string, { badge: string; accent: string }> = {
  "Hardware / PCB Design": {
    badge: "bg-hardware/15 text-hardware-text border-hardware/30",
    accent: "bg-hardware",
  },
  "Robotics / AI": {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  },
  "Embedded Systems / Robotics": {
    badge: "bg-hardware/15 text-hardware-text border-hardware/30",
    accent: "bg-hardware",
  },
  "Control Systems / Simulation": {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  },
  "Real-time / Control": {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  },
  "IIoT / Analytics": {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  },
  "Web Apps": {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  },
  "Browser Extension": {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  },
  "Experimental": {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  },
  "Computer Vision / HCI": {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
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

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const catStyle = categoryStyles[project.category] || {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  };

  const coverFile = project.cover || project.gallery?.[0]?.file;
  const coverSrc = coverFile ? getAssetPath(`projects/${project.id}/${coverFile}`) : undefined;
  const expectedCoverPath = coverFile ? `public/projects/${project.id}/${coverFile}` : undefined;
  const coverGalleryItem = project.gallery?.find((g) => g.file === coverFile);
  const coverFit = coverGalleryItem?.fit || "cover";
  const coverFocus = coverGalleryItem?.focus;

  const canTilt = isPointerFine && !reducedMotion;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canTilt) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Max 4 degrees tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rx = ((y - centerY) / centerY) * -4;
      const ry = ((x - centerX) / centerX) * 4;

      setTilt({ rx, ry });
      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.15,
      });
      setIsHovered(true);
    },
    [canTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  }, []);

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={!isPointerFine ? { scale: 0.98 } : undefined}
        animate={{
          rotateX: canTilt ? tilt.rx : 0,
          rotateY: canTilt ? tilt.ry : 0,
        }}
        transition={{
          type: "spring",
          ...springPresets.snappy,
        }}
        style={{
          transformStyle: "preserve-3d",
          filter:
            isHovered && canTilt
              ? "drop-shadow(0 16px 24px rgba(11, 35, 33, 0.18))"
              : "none",
        }}
        className="group relative border border-rule bg-panel-raised rounded-[2px] overflow-hidden flex flex-col h-full cursor-pointer hover:border-ink transition-colors"
      >
        {/* Subtle Glare gradient following pointer */}
        {canTilt && glare.opacity > 0 && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-150"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.2) 0%, transparent 65%)`,
              opacity: glare.opacity,
            }}
            aria-hidden="true"
          />
        )}

        {/* Category top hairline indicator */}
        <div className={`h-0.5 w-full ${catStyle.accent}`} />

        {/* 16:10 Cover image slot - Depth Plane 0 */}
        <div
          style={{
            transform: canTilt ? "translateZ(0px)" : "none",
            transformStyle: "preserve-3d",
          }}
          className="relative aspect-[16/10] w-full overflow-hidden border-b border-rule bg-panel-sunk shrink-0"
        >
          <ProjectImage
            src={coverSrc}
            alt={project.title}
            category={project.category}
            fit={coverFit}
            focus={coverFocus}
            isCover
            expectedPath={expectedCoverPath}
            imgClassName="motion-safe:group-hover:scale-[1.03] motion-reduce:transform-none transition-transform duration-300"
          />
        </div>

        <div
          className="p-5 sm:p-6 flex flex-col flex-1 relative z-20"
          style={{ transformStyle: canTilt ? "preserve-3d" : "flat" }}
        >
          {/* Depth Plane 1: Category Badge, Title & Description (translateZ 20px) */}
          <div
            style={{
              transform: canTilt ? "translateZ(20px)" : "none",
              transformStyle: "preserve-3d",
            }}
            className="flex flex-col flex-1"
          >
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
          </div>

          {/* Depth Plane 2: Metrics, Tech Badges & Footer (translateZ 30px) */}
          <div
            style={{
              transform: canTilt ? "translateZ(30px)" : "none",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Static Metrics Chips */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {project.metrics.slice(0, 3).map((m, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-baseline gap-1 px-2 py-1 bg-panel-sunk border border-rule rounded-[2px]"
                  >
                    <span className="font-mono text-xs font-bold text-signal">{m.value}</span>
                    <span className="font-sans text-[10px] text-ink-soft">{m.label}</span>
                  </div>
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

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1 mb-4">
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
      </motion.div>
    </div>
  );
}
