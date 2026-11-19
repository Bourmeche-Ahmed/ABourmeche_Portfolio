import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ASSET_PATHS } from "@/lib/paths";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { RefreshCw, ShieldCheck, MapPin, Globe, GraduationCap } from "lucide-react";

export function AboutSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isPointerFine || reducedMotion || isFlipped) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - rect.height / 2) / (rect.height / 2)) * -6;
      const ry = ((x - rect.width / 2) / (rect.width / 2)) * 6;
      setTilt({ rx, ry });
    },
    [isPointerFine, reducedMotion, isFlipped]
  );

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const toggleFlip = () => {
    setIsFlipped((f) => !f);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section id="about" className="py-20 border-b border-hairline relative">
      {/* Background oversized numeral 04 */}
      <div className="absolute right-4 top-10 text-[18vw] font-heading font-extrabold numeral-outlined opacity-15 select-none pointer-events-none">
        04
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent mb-1">
              <span>04 // IDENTITY & CREDENTIALS</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-ink tracking-tight uppercase">
              Engineering Profile
            </h2>
          </div>
          <p className="font-mono text-[11px] text-soft max-w-xs text-left md:text-right">
            INSAT National Institute of Applied Science and Technology · State Engineering Degree candidate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: About Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-ink">
              Bridging Physical Hardware & Real-Time Intelligence
            </h3>

            <p className="font-sans text-sm sm:text-base text-soft leading-relaxed">
              I am an Industrial Automation and Embedded Systems engineer at INSAT (University of Carthage), specializing in the tight co-design of bare-metal firmware, industrial telemetry networks, and closed-loop robotic control.
            </p>

            <p className="font-sans text-sm sm:text-base text-soft leading-relaxed">
              Whether routing 2-layer automotive PCBs in KiCad, tuning cascaded PID loops with quadrature odometry on STM32, implementing multi-drop RS-485 / Modbus register batching, or scaling containerized edge microservices in Docker, I focus on deterministic real-world reliability over theoretical simulation.
            </p>

            {/* Quick credentials matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-surface border border-hairline rounded-[2px] space-y-1">
                <div className="flex items-center gap-2 text-accent font-mono text-xs font-semibold">
                  <GraduationCap className="w-4 h-4" />
                  <span>INSAT Tunis</span>
                </div>
                <p className="font-sans text-xs text-soft">
                  State Engineering Degree in Industrial Automation & Real-Time IoT (2022–2027)
                </p>
              </div>

              <div className="p-3 bg-surface border border-hairline rounded-[2px] space-y-1">
                <div className="flex items-center gap-2 text-accent font-mono text-xs font-semibold">
                  <MapPin className="w-4 h-4" />
                  <span>Availability & Relocation</span>
                </div>
                <p className="font-sans text-xs text-soft">
                  Final-Year Project (PFE) from February 2027 · Open to international relocation (including Paris)
                </p>
              </div>
            </div>
          </div>

          {/* Right: Framed Profile Card with Pointer Tilt & Click-Flip Back Face */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[300px] select-none"
              style={{ perspective: 1000 }}
              role="region"
              aria-label="Ahmed Bourmeche profile ID card"
            >
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={toggleFlip}
                  animate={{
                    rotateY: isFlipped ? 180 : tilt.ry,
                    rotateX: isFlipped ? 0 : tilt.rx,
                  }}
                  transition={{
                    duration: reducedMotion ? 0.01 : 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-full"
                >
                  {/* FRONT FACE: Photo */}
                  <div
                    className="w-full border border-hairline bg-surface p-3 rounded-[2px] relative overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-hairline font-mono text-[10px] text-soft">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-[1px] bg-accent animate-pulse" />
                        <span>SYS.ID // A_BOURMECHE</span>
                      </span>
                      <span className="text-accent font-semibold">ONLINE</span>
                    </div>

                    <div className="border border-hairline overflow-hidden rounded-[2px] bg-surface2 relative aspect-[4/5]">
                      <img
                        src={ASSET_PATHS.photo()}
                        alt="Ahmed Bourmeche"
                        className="w-full h-full object-cover contrast-105"
                      />
                    </div>

                    <div className="pt-3 text-center">
                      <p className="font-heading font-bold text-lg text-ink tracking-wide">
                        AHMED BOURMECHE
                      </p>
                      <p className="font-mono text-xs text-accent font-medium">
                        INSAT · University of Carthage
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip();
                        }}
                        className="mt-2.5 pt-2 border-t border-hairline w-full flex items-center justify-center gap-1 text-[10px] font-mono text-soft hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-[2px] cursor-pointer"
                      >
                        <RefreshCw className="w-2.5 h-2.5 text-accent" />
                        <span>Click to flip for verified specs</span>
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE: Verified Specs */}
                  <div
                    className="absolute inset-0 w-full h-full border border-accent/50 bg-surface p-4 rounded-[2px] flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-hairline font-mono text-[10px] text-soft">
                        <span className="flex items-center gap-1.5 text-accent font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                          <span>SPEC // VERIFIED_ID</span>
                        </span>
                        <span className="px-1.5 py-0.2 bg-accent/15 border border-accent/30 text-accent font-mono text-[9px] rounded-[1px]">
                          AUTHENTIC
                        </span>
                      </div>

                      <div className="space-y-2.5 font-mono text-[11px] text-soft leading-tight">
                        <div>
                          <span className="text-[10px] text-soft/70 block uppercase">Role:</span>
                          <span className="text-ink font-semibold">PFE candidate (6 months, from Feb 2027)</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-soft/70 block uppercase">Base:</span>
                          <span className="text-ink font-medium">Tunis, Tunisia</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-soft/70 block uppercase">Relocation:</span>
                          <span className="text-accent font-medium">Open to relocation (including Paris)</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-soft/70 block uppercase">Languages:</span>
                          <span className="text-ink">Arabic (native), French (fluent), English (fluent)</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-soft/70 block uppercase">Core Stack:</span>
                          <span className="text-soft text-[10px]">STM32, ESP32, FreeRTOS, Modbus, CAN, Docker</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-hairline font-mono text-[9px] text-soft flex items-center justify-between">
                      <span>CRC32: 0x7E3A9F1B</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip();
                        }}
                        className="text-accent flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-[2px] cursor-pointer"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>FLIP PHOTO</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
