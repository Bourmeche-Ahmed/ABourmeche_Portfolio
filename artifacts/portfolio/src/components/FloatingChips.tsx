import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePageVisible } from "@/hooks/usePageVisible";
import { motionConfig } from "@/config/motion";

interface ChipDef {
  name: string;
  pkg: string;
  top: string;
  left: string;
  depth: number; // translateZ in px
  size: { w: number; h: number };
  pins: number;
}

const CHIPS: ChipDef[] = [
  { name: "STM32F103", pkg: "LQFP-48", top: "18%", left: "10%", depth: -40, size: { w: 46, h: 46 }, pins: 12 },
  { name: "ESP32-S3", pkg: "WROOM", top: "68%", left: "6%", depth: 20, size: { w: 52, h: 40 }, pins: 8 },
  { name: "SN65HVD230", pkg: "SOIC-8", top: "25%", left: "82%", depth: -20, size: { w: 34, h: 26 }, pins: 4 },
  { name: "TPS54360", pkg: "SO-8", top: "72%", left: "75%", depth: 10, size: { w: 32, h: 24 }, pins: 4 },
  { name: "MPU-6050", pkg: "QFN-24", top: "42%", left: "46%", depth: -60, size: { w: 36, h: 36 }, pins: 6 },
];

export function FloatingChips() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const isVisible = usePageVisible();

  const canAnimate =
    !reducedMotion &&
    isVisible &&
    motionConfig.flags.three_d.floatingChips;

  useEffect(() => {
    if (!isPointerFine || !canAnimate) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMouseOffset({
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isPointerFine, canAnimate]);

  if (!motionConfig.flags.three_d.floatingChips || reducedMotion) {
    return null;
  }

  return (
    <div
      className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40 dark:opacity-30"
      style={{ perspective: 1000 }}
      aria-hidden="true"
    >
      {CHIPS.map((chip, idx) => {
        const factor = chip.depth / 50;
        const offsetX = mouseOffset.x * factor * 18;
        const offsetY = mouseOffset.y * factor * 14;

        return (
          <motion.div
            key={chip.name}
            style={{
              position: "absolute",
              top: chip.top,
              left: chip.left,
              transformStyle: "preserve-3d",
              transform: `translate3d(${offsetX}px, ${offsetY}px, ${chip.depth}px)`,
              transition: "transform 0.25s ease-out",
            }}
            animate={
              canAnimate
                ? {
                    y: [0, -8, 0],
                    rotateZ: [0, idx % 2 === 0 ? 3 : -3, 0],
                  }
                : undefined
            }
            transition={{
              duration: 4.5 + idx * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Chip package body */}
            <div
              style={{ width: chip.size.w, height: chip.size.h }}
              className="relative bg-zinc-900 border border-zinc-700/80 rounded-[1px] shadow-sm flex flex-col items-center justify-center p-1"
            >
              {/* Pin 1 index dot */}
              <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-signal/80" />

              {/* Laser-etched chip markings */}
              <span className="font-mono text-[7px] text-zinc-400 font-bold leading-none tracking-tight">
                {chip.name}
              </span>
              <span className="font-mono text-[6px] text-zinc-500 leading-none mt-0.5">
                {chip.pkg}
              </span>

              {/* Side leads (gull-wing metal pins) */}
              <div className="absolute -left-1 inset-y-1 flex flex-col justify-between">
                {Array.from({ length: chip.pins }).map((_, i) => (
                  <span key={i} className="w-1 h-0.5 bg-zinc-400/80 rounded-[0.5px]" />
                ))}
              </div>
              <div className="absolute -right-1 inset-y-1 flex flex-col justify-between">
                {Array.from({ length: chip.pins }).map((_, i) => (
                  <span key={i} className="w-1 h-0.5 bg-zinc-400/80 rounded-[0.5px]" />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default FloatingChips;
