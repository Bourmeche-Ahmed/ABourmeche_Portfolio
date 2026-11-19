import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ASSET_PATHS } from "@/lib/paths";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";
import { RefreshCw, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

export function HolographicIdCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const canAnimate =
    isPointerFine && !reducedMotion && motionConfig.flags.three_d.idCard;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canAnimate || isFlipped) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Max tilt: ±8 deg
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rx = ((y - centerY) / centerY) * -8;
      const ry = ((x - centerX) / centerX) * 8;

      setTilt({ rx, ry });
      setGlare({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.25,
      });
    },
    [canAnimate, isFlipped]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
    setTilt({ rx: 0, ry: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className="w-full max-w-[290px] select-none"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onClick={toggleFlip}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label="Ahmed Bourmeche engineering ID card. Click to flip for technical specifications."
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFlip();
          }
        }}
        className="relative w-full cursor-pointer focus-visible:outline-none"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: isFlipped ? 180 : tilt.ry,
          rotateX: isFlipped ? 0 : tilt.rx,
        }}
        transition={{
          duration: reducedMotion ? 0.01 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* ================= FRONT FACE ================= */}
        <div
          className="w-full border border-rule bg-panel-raised p-3 rounded-[2px] shadow-sm relative overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Glare Gradient Overlay */}
          {canAnimate && !isFlipped && (
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-[2px] transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(245, 158, 11, 0.15) 35%, transparent 70%)`,
                opacity: glare.opacity,
              }}
              aria-hidden="true"
            />
          )}

          {/* Top status bar */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-rule font-mono text-[10px] text-ink-soft">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-signal rounded-[1px] animate-pulse" />
              <span>SYS.ID // A_BOURMECHE</span>
            </span>
            <div className="flex items-center gap-1.5 text-signal font-semibold">
              <span>ONLINE</span>
              <RefreshCw className="w-2.5 h-2.5 opacity-70" />
            </div>
          </div>

          {/* Photo Frame */}
          <div className="border border-rule overflow-hidden rounded-[2px] bg-panel-sunk relative group">
            <img
              src={ASSET_PATHS.photo()}
              alt="Ahmed Bourmeche"
              className="w-full h-auto object-cover contrast-105"
            />
            {/* Holographic grid watermark */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(245, 158, 11, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>

          {/* Caption */}
          <div className="pt-3 text-center">
            <p className="font-heading font-bold text-lg text-ink tracking-wide">
              AHMED BOURMECHE
            </p>
            <p className="font-mono text-xs text-signal font-medium">
              INSAT · University of Carthage
            </p>
            <p className="font-sans text-[11px] text-ink-soft mt-0.5">
              Industrial Automation & Real-Time IoT
            </p>

            {/* Flip hint chip */}
            <div className="mt-2.5 pt-2 border-t border-rule/60 flex items-center justify-center gap-1 text-[10px] font-mono text-ink-soft hover:text-signal transition-colors">
              <RefreshCw className="w-2.5 h-2.5 text-signal" />
              <span>Click or tap to flip for SPECS</span>
            </div>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div
          className="absolute inset-0 w-full h-full border border-signal/40 bg-panel-raised p-3.5 rounded-[2px] shadow-sm flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-rule font-mono text-[10px] text-ink-soft">
              <span className="flex items-center gap-1.5 text-signal font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-signal" />
                <span>SPEC // HARDWARE_ID</span>
              </span>
              <span className="px-1.5 py-0.2 bg-signal/15 border border-signal/30 text-signal font-mono text-[9px] rounded-[1px]">
                AUTHENTIC
              </span>
            </div>

            {/* Engineering specs */}
            <div className="space-y-2 text-[11px] font-mono text-ink-soft leading-tight">
              <div>
                <span className="text-[10px] text-ink-soft/70 block uppercase">
                  Role:
                </span>
                <span className="text-ink font-semibold text-[11px]">
                  Embedded Systems, Robotics & IIoT
                </span>
              </div>

              <div>
                <span className="text-[10px] text-ink-soft/70 block uppercase">
                  Education:
                </span>
                <span className="text-ink font-medium">
                  INSAT (State Eng. Degree, 2022–2027)
                </span>
              </div>

              <div>
                <span className="text-[10px] text-ink-soft/70 block uppercase">
                  Availability:
                </span>
                <span className="text-signal font-medium">
                  PFE Internship (Feb 2027) · Relocatable
                </span>
              </div>

              <div>
                <span className="text-[10px] text-ink-soft/70 block uppercase">
                  Core Firmware:
                </span>
                <span className="text-ink text-[10px]">
                  STM32 (C), ESP32 / ESP-IDF, FreeRTOS
                </span>
              </div>

              <div>
                <span className="text-[10px] text-ink-soft/70 block uppercase">
                  Field Protocols:
                </span>
                <span className="text-ink text-[10px]">
                  RS-485, Modbus RTU, CAN, MQTT, BLE
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer with Hash */}
          <div className="pt-2 border-t border-rule font-mono text-[9px] text-ink-soft flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-telemetry" />
              <span>CRC32: 0x7E3A9F1B</span>
            </span>
            <span className="text-signal flex items-center gap-1 hover:underline">
              <RefreshCw className="w-2.5 h-2.5" />
              <span>FLIP PHOTO</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
