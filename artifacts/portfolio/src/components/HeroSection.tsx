import React, { useRef, useCallback, useState, useEffect } from "react";
import { smoothScrollTo } from "@/lib/utils";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { Download, ArrowRight, Mail } from "lucide-react";
import { HolographicIdCard } from "./HolographicIdCard";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isPointerFine || reducedMotion) return;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      setMousePos({ x, y });
    },
    [isPointerFine, reducedMotion]
  );

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-rule overflow-hidden bg-panel"
      style={
        {
          "--mouse-x": `${mousePos.x}%`,
          "--mouse-y": `${mousePos.y}%`,
        } as React.CSSProperties
      }
    >
      {/* Soft radial teal glow background (pointer-following or centered on mobile) */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300 ease-out opacity-40 dark:opacity-25"
        style={{
          background: isPointerFine
            ? "radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 109, 104, 0.22), transparent 70%)"
            : "radial-gradient(circle 400px at 50% 40%, rgba(34, 109, 104, 0.2), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle decorative circuit trace lines - SVG draw once */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full stroke-rule/50 opacity-40 dark:opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 40 0 L 40 180 L 160 300 L 400 300"
          fill="none"
          strokeWidth="1"
          strokeDasharray="600"
          className="hero-trace-line"
        />
        <path
          d="M 85% 0 L 85% 120 L 75% 220 L 60% 220"
          fill="none"
          strokeWidth="1"
          strokeDasharray="500"
          className="hero-trace-line"
        />
        <circle cx="400" cy="300" r="3" className="fill-signal" />
        <circle cx="40" cy="180" r="2.5" className="fill-signal/60" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bio & Core Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability line */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-signal/10 border border-signal/30 rounded-[2px] text-xs sm:text-sm font-sans text-ink">
              <span
                className="w-2 h-2 bg-signal shrink-0 rounded-[1px] animate-pulse"
                aria-hidden="true"
              />
              <span className="font-medium">
                Seeking Final-Year Engineering Internship (PFE) — Feb 2027
              </span>
            </div>

            {/* Static Clean Title & Subtitle */}
            <div>
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.02]">
                Ahmed Bourmeche
              </h1>
              <p className="font-sans text-lg sm:text-xl text-signal font-semibold mt-2">
                Industrial Automation, Embedded Systems & Industrial IoT Engineer
              </p>
            </div>

            {/* Concise positioning */}
            <p className="font-sans text-sm sm:text-base text-ink-soft leading-relaxed max-w-xl">
              Engineering bare-metal firmware in C (<span className="text-ink font-medium">ESP-IDF, STM32</span>), multi-protocol edge gateways (<span className="text-ink font-medium">Modbus RTU, RS-485, BACnet, OCPP, MQTT</span>), closed-loop control systems, and real-time operator dashboards.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => smoothScrollTo("contact")}
                className="btn-primary"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </button>

              <button
                onClick={() => smoothScrollTo("projects")}
                className="btn-secondary"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={ASSET_PATHS.cv()}
                download="Ahmed_Bourmeche_RESUME.pdf"
                onClick={triggerResumeDownload}
                className="btn-secondary inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-signal" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Static spec tags */}
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs font-mono text-ink-soft">
              <span className="px-2.5 py-1 bg-panel-raised border border-rule rounded-[2px]">
                INSAT Engineering
              </span>
              <span className="px-2.5 py-1 bg-panel-raised border border-rule rounded-[2px]">
                Embedded C / ESP-IDF
              </span>
              <span className="px-2.5 py-1 bg-panel-raised border border-rule rounded-[2px]">
                RS-485 & Modbus
              </span>
              <span className="px-2.5 py-1 bg-panel-raised border border-rule rounded-[2px]">
                MATLAB / Simulink
              </span>
              <span className="px-2.5 py-1 bg-panel-raised border border-rule rounded-[2px]">
                TypeScript & Python
              </span>
            </div>
          </div>

          {/* Right Column: Hero Profile Picture Frame with 3D Holographic ID Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HolographicIdCard />
          </div>
        </div>
      </div>
    </section>
  );
}
