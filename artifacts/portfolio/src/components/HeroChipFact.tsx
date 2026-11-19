import React, { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";
import { projects } from "@/data/projects";

interface HeroChipFactProps {
  label: string;
  fact: string;
  projectId?: string;
}

export function HeroChipFact({ label, fact, projectId }: HeroChipFactProps) {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.micro.chipFacts;

  const handleClick = () => {
    if (!projectId) return;
    const target = projects.find((p) => p.id === projectId);
    if (target) {
      window.dispatchEvent(
        new CustomEvent("open-project-modal", { detail: target })
      );
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className="inline-block cursor-pointer select-none focus-visible:outline-none"
      style={{ perspective: 400 }}
      title={`Click to view ${label} project case study`}
    >
      <motion.div
        animate={{
          rotateX: canAnimate && isHovered ? 360 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`tech-chip text-[11px] py-0.5 px-2.5 transition-colors ${
          isHovered
            ? "border-signal text-signal bg-signal/10"
            : "text-ink-soft hover:text-ink hover:border-ink-soft"
        }`}
      >
        {isHovered ? (
          <span className="font-semibold text-signal flex items-center gap-1">
            <span>{fact}</span>
            <span className="text-[9px] opacity-70">↗</span>
          </span>
        ) : (
          <span>{label}</span>
        )}
      </motion.div>
    </div>
  );
}

export default HeroChipFact;
