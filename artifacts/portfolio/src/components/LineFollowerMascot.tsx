import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";

interface LineFollowerMascotProps {
  progress: number; // 0 to 100
  activeSection?: string;
}

export function LineFollowerMascot({
  progress,
  activeSection,
}: LineFollowerMascotProps) {
  const [wheelRot, setWheelRot] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const lastSection = useRef(activeSection);
  const lastProgress = useRef(progress);
  const reducedMotion = useReducedMotion();

  const canAnimate =
    !reducedMotion && motionConfig.flags.micro.lineFollower;

  // Spin wheels proportional to scroll delta
  useEffect(() => {
    const delta = progress - lastProgress.current;
    lastProgress.current = progress;
    if (Math.abs(delta) > 0.05) {
      setWheelRot((r) => r + delta * 18);
    }
  }, [progress]);

  // Wiggle celebration when crossing section checkpoints
  useEffect(() => {
    if (activeSection !== lastSection.current && activeSection !== "home") {
      lastSection.current = activeSection;
      setIsWiggling(true);
      const timer = setTimeout(() => setIsWiggling(false), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [activeSection]);

  if (!canAnimate || progress <= 1) {
    return null;
  }

  // Clamp left position so robot stays within screen bounds (12px to 98%)
  const leftPct = Math.max(1.5, Math.min(98.5, progress));

  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none select-none z-30"
      style={{
        left: `${leftPct}%`,
        transform: "translate(-50%, 4px)",
      }}
      animate={
        isWiggling
          ? {
              y: [-2, -6, -2, -4, 0],
              rotate: [-5, 5, -4, 4, 0],
            }
          : { y: 0, rotate: 0 }
      }
      transition={{ duration: 0.45, ease: "easeOut" }}
      title="Autonomous Line-Follower Robot (PID tracking scroll progress)"
    >
      <svg
        width="22"
        height="18"
        viewBox="0 0 24 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xs"
      >
        {/* Robot Main Chassis (Dark Matte Engineering Enclosure) */}
        <rect
          x="4"
          y="4"
          width="16"
          height="12"
          rx="2"
          fill="var(--ink)"
          stroke="var(--rule)"
          strokeWidth="1"
        />

        {/* IR Sensor Array Bar (Front Facing Downwards) */}
        <rect x="7" y="16" width="10" height="2" rx="0.5" fill="#f59e0b" />
        <circle cx="9" cy="17" r="0.75" fill="#ef4444" />
        <circle cx="12" cy="17" r="0.75" fill="#10b981" />
        <circle cx="15" cy="17" r="0.75" fill="#ef4444" />

        {/* Status Heartbeat LED */}
        <circle cx="12" cy="7" r="1" fill="#38bdf8" />

        {/* Left Wheel with Spokes */}
        <g transform={`rotate(${wheelRot} 3 10)`}>
          <rect x="1" y="6" width="3" height="8" rx="1" fill="#1e293b" stroke="#f59e0b" strokeWidth="0.75" />
          <line x1="2.5" y1="6" x2="2.5" y2="14" stroke="#f59e0b" strokeWidth="0.5" />
        </g>

        {/* Right Wheel with Spokes */}
        <g transform={`rotate(${wheelRot} 21 10)`}>
          <rect x="20" y="6" width="3" height="8" rx="1" fill="#1e293b" stroke="#f59e0b" strokeWidth="0.75" />
          <line x1="21.5" y1="6" x2="21.5" y2="14" stroke="#f59e0b" strokeWidth="0.5" />
        </g>
      </svg>
    </motion.div>
  );
}

export default LineFollowerMascot;
