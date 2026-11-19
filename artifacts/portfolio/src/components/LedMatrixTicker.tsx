import React, { useState, useEffect, useRef } from "react";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";
import { Cpu, FastForward } from "lucide-react";

const MESSAGES = [
  "SYS_STATUS: NOMINAL // 100% HARDWARE VERIFIED",
  "OPEN TO WORK: PFE INTERNSHIP FEB 2027 // EMBEDDED & IIOT",
  "CAN / OBD-II // STM32 // MODBUS RTU // MATLAB SIMULINK",
  "LOCATION: TUNIS, TUNISIA // WILLING TO RELOCATE",
  "HARDWARE-IN-THE-LOOP // PID DIGITAL TWIN READY",
];

export function LedMatrixTicker() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isVisible = usePageVisible();
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.micro.ledTicker;

  const currentMsg = MESSAGES[msgIndex];

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let currentX = canvas.width;

    const render = () => {
      ctx.fillStyle = "#0c0a09"; // Dark bezel
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint dot grid background (unlit LEDs)
      const dotRadius = 1.4;
      const step = 4;
      ctx.fillStyle = "#1c1408";
      for (let x = 2; x < canvas.width; x += step) {
        for (let y = 2; y < canvas.height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw scrolling text in amber phosphor LED style
      ctx.font = "bold 13px 'Courier New', monospace";
      ctx.fillStyle = "#f59e0b";
      ctx.shadowColor = "rgba(245, 158, 11, 0.7)";
      ctx.shadowBlur = 4;
      ctx.fillText(currentMsg, currentX, 16);
      ctx.shadowBlur = 0; // reset

      // Advance scroll
      const speed = isHovered ? 2.5 : 0.9;
      if (canAnimate && isVisible) {
        currentX -= speed;
        const textWidth = ctx.measureText(currentMsg).width;
        if (currentX < -textWidth - 20) {
          currentX = canvas.width;
          setMsgIndex((idx) => (idx + 1) % MESSAGES.length);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [currentMsg, isHovered, canAnimate, isVisible]);

  const cycleNext = () => {
    setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
  };

  return (
    <div
      onClick={cycleNext}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border border-rule bg-panel-raised p-3 rounded-[2px] shadow-sm select-none cursor-pointer group my-6"
      title="Click to cycle next message · Hover to fast-forward"
    >
      {/* Ticker Bezel Header */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-rule font-mono text-[10px] text-ink-soft">
        <div className="flex items-center gap-1.5 text-signal font-semibold">
          <Cpu className="w-3 h-3 text-signal" />
          <span>LED TELEMETRY MARQUEE [HUB75 SIM]</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-ink-soft group-hover:text-signal transition-colors">
          <FastForward className="w-2.5 h-2.5" />
          <span>{isHovered ? "FAST FORWARD" : "CLICK TO CYCLE"}</span>
        </div>
      </div>

      {/* LED Canvas Display */}
      <div className="relative w-full h-8 bg-zinc-950 rounded-[1px] border border-amber-950/60 overflow-hidden flex items-center">
        <canvas
          ref={canvasRef}
          width={640}
          height={24}
          className="w-full h-full block"
        />
      </div>
    </div>
  );
}

export default LedMatrixTicker;
