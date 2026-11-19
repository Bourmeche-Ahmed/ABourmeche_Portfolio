import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";
import { projects, type Project } from "@/data/projects";
import { Rotate3d, ExternalLink, Sparkles } from "lucide-react";

interface RingSkill {
  name: string;
  category: string;
  projectId: string;
  color: string;
}

const RING_SKILLS: RingSkill[] = [
  { name: "STM32 (Bare-metal C)", category: "Firmware", projectId: "farzit", color: "text-amber-500 border-amber-500/40" },
  { name: "ESP32 / ESP-IDF", category: "Firmware", projectId: "vroom", color: "text-orange-500 border-orange-500/40" },
  { name: "RS-485 & Modbus RTU", category: "Fieldbus", projectId: "iiot-predictive-maintenance", color: "text-sky-500 border-sky-500/40" },
  { name: "KiCad PCB Design", category: "Hardware", projectId: "vroom", color: "text-amber-500 border-amber-500/40" },
  { name: "MATLAB & Simulink", category: "Control", projectId: "pid-control-dashboard", color: "text-teal-500 border-teal-500/40" },
  { name: "Closed-Loop PID", category: "Control", projectId: "self-balancing-robot", color: "text-emerald-500 border-emerald-500/40" },
  { name: "HIL Simulation", category: "Control", projectId: "quarter-car-suspension-system", color: "text-teal-500 border-teal-500/40" },
  { name: "PPO Reinforcement Learning", category: "Robotics", projectId: "rl-navigation", color: "text-indigo-500 border-indigo-500/40" },
  { name: "CAN & OBD-II Bus", category: "Automotive", projectId: "vroom", color: "text-orange-500 border-orange-500/40" },
  { name: "MQTT & TimescaleDB", category: "IIoT", projectId: "iiot-predictive-maintenance", color: "text-sky-500 border-sky-500/40" },
  { name: "Onshape CAD & 3D Print", category: "Fabrication", projectId: "farzit", color: "text-amber-600 border-amber-600/40" },
  { name: "React & TypeScript", category: "Frontend", projectId: "pid-control-dashboard", color: "text-indigo-500 border-indigo-500/40" },
];

export function SkillRing3D() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentRot = useRef(0);
  const animFrameId = useRef<number | null>(null);

  const isVisible = usePageVisible();
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.three_d.skillRing;

  // Auto-rotation loop (slow, smooth, pauses on hover or hidden tab)
  useEffect(() => {
    if (!canAnimate || isHovered || isDragging || !isVisible) {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      return;
    }

    let lastTime = performance.now();
    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      // 8 degrees per second
      setRotation((prev) => (prev + delta * 8) % 360);
      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [canAnimate, isHovered, isDragging, isVisible]);

  // Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canAnimate) return;
    setIsDragging(true);
    startX.current = e.clientX;
    currentRot.current = rotation;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !canAnimate) return;
      const dx = e.clientX - startX.current;
      setRotation(currentRot.current + dx * 0.4);
    },
    [isDragging, canAnimate]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSkillClick = (projectId: string) => {
    const targetProject = projects.find((p) => p.id === projectId);
    if (targetProject) {
      window.dispatchEvent(
        new CustomEvent("open-project-modal", { detail: targetProject })
      );
    }
  };

  // Fallback for reduced motion: horizontal scrollable flex container
  if (reducedMotion || !motionConfig.flags.three_d.skillRing) {
    return (
      <div className="my-8 p-4 border border-rule bg-panel-raised rounded-[2px]">
        <div className="flex items-center gap-2 mb-3 font-mono text-xs text-ink-soft">
          <Sparkles className="w-3.5 h-3.5 text-signal" />
          <span className="font-semibold text-ink">Core Competencies Matrix:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {RING_SKILLS.map((skill) => (
            <button
              key={skill.name}
              onClick={() => handleSkillClick(skill.projectId)}
              className={`px-2.5 py-1 rounded-[2px] bg-panel-sunk border text-xs font-mono transition-colors hover:border-signal hover:text-signal ${skill.color}`}
            >
              <span>{skill.name}</span>
              <span className="ml-1 text-[10px] text-ink-soft opacity-70">
                ↗ {skill.category}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const radius = 260; // cylinder radius in pixels
  const count = RING_SKILLS.length;
  const angleStep = 360 / count;

  return (
    <div className="my-8 border border-rule bg-panel-raised p-4 sm:p-5 rounded-[2px] space-y-3">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-rule font-mono text-xs text-ink-soft">
        <div className="flex items-center gap-2">
          <Rotate3d className="w-4 h-4 text-signal" />
          <span className="font-heading font-bold text-base text-ink">
            Interactive 3D Skill Carousel
          </span>
          <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded-[1px] bg-signal/10 border border-signal/30 text-signal">
            12 Primary Disciplines
          </span>
        </div>
        <div className="text-[11px] text-ink-soft">
          <span>Drag to spin · Click chip to inspect project</span>
        </div>
      </div>

      {/* 3D Cylindrical Ring Stage */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        className={`relative h-56 sm:h-64 w-full bg-panel-sunk border border-rule rounded-[2px] overflow-hidden flex items-center justify-center select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: 900 }}
      >
        {/* Center pivot point indicator */}
        <div className="w-2 h-2 rounded-full bg-signal/40 pointer-events-none" />

        {/* 3D Ring Container */}
        <div
          className="relative w-0 h-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(-10deg) rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.05s linear",
          }}
        >
          {RING_SKILLS.map((skill, index) => {
            const angle = index * angleStep;

            return (
              <div
                key={skill.name}
                style={{
                  position: "absolute",
                  top: -24,
                  left: -85,
                  width: 170,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                  WebkitBackfaceVisibility: "visible",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkillClick(skill.projectId);
                  }}
                  className={`w-full px-2.5 py-1.5 rounded-[2px] bg-panel-raised/95 border backdrop-blur-xs shadow-xs text-left transition-all hover:scale-105 active:scale-95 group focus-visible:outline-none ${skill.color}`}
                  style={{
                    backgroundColor: "var(--panel-raised)",
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-ink-soft mb-0.5">
                    <span className="uppercase tracking-wider">{skill.category}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:text-signal transition-colors" />
                  </div>
                  <div className="font-heading font-bold text-xs text-ink truncate group-hover:text-signal transition-colors">
                    {skill.name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SkillRing3D;
