import React from "react";
import { motion } from "framer-motion";
import { smoothScrollTo } from "@/lib/utils";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { EngineeringSignalVisual } from "./EngineeringSignalVisual";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] md:min-h-[92vh] pt-28 pb-16 flex flex-col justify-between border-b border-hairline overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between">
        {/* Top Meta Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-soft border-b border-hairline pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-none bg-accent animate-pulse" />
            <span className="text-ink font-medium tracking-wide">
              INSAT TUNIS // CANDIDATE 2022–2027
            </span>
          </div>
          <div className="text-accent tracking-wider font-semibold">
            AVAILABLE FOR PFE · FEB 2027
          </div>
        </div>

        {/* Central Asymmetric Typography & Signal Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-8">
          {/* Main Typographic Monolith (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-ink uppercase tracking-tight leading-[0.9] text-left select-none"
              style={{ fontSize: "clamp(3.25rem, 8.5vw, 6.75rem)" }}
            >
              AHMED
              <br />
              BOURMECHE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base sm:text-lg md:text-xl text-soft max-w-2xl leading-relaxed"
            >
              Industrial Automation & Embedded Systems Engineer specializing in real-time firmware,
              industrial fieldbus telemetry, and closed-loop robotic control.
            </motion.p>
          </div>

          {/* Right Column: Engineering Signal Oscilloscope (4 Columns) */}
          <div className="lg:col-span-4 h-48 lg:h-64 border border-hairline bg-surface/50 relative">
            <div className="absolute top-2 left-3 z-10 font-mono text-[10px] text-soft/80 flex items-center justify-between w-[calc(100%-1.5rem)]">
              <span>CTRL_LOOP // STEP_RESP</span>
              <span className="text-accent">100 Hz</span>
            </div>
            <EngineeringSignalVisual className="w-full h-full" />
            <div className="absolute bottom-2 left-3 z-10 font-mono text-[9px] text-soft/60">
              AXIS // EULER_INTEG_v2
            </div>
          </div>
        </div>

        {/* Bottom Interactive CTA Strip (Asymmetric Grid) */}
        <div className="pt-8 border-t border-hairline grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          <div className="sm:col-span-6 flex items-center gap-4">
            <button
              onClick={() => smoothScrollTo("projects")}
              className="inline-flex items-center gap-2 px-5 py-3 bg-surface border border-hairline text-ink font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-colors cursor-pointer group"
            >
              <span>Explore Selected Work</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => smoothScrollTo("contact")}
              className="inline-flex items-center gap-2 px-5 py-3 text-soft font-mono text-xs uppercase tracking-wider hover:text-ink transition-colors cursor-pointer group"
            >
              <span>Direct Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="sm:col-span-6 font-mono text-xs text-soft sm:text-right">
            <span>Specialization: </span>
            <span className="text-ink">STM32 / ESP32-S3 / RS-485 / Modbus / PPO RL / KiCad</span>
          </div>
        </div>
      </div>
    </section>
  );
}
