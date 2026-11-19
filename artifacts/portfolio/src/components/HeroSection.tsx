import { smoothScrollTo } from "@/lib/utils";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { Download, ArrowRight, Mail } from "lucide-react";
import { PcbHeroCanvas } from "./PcbHeroCanvas";
import { ScrambleText } from "./ScrambleText";
import { TelemetryHud } from "./TelemetryHud";
import { HolographicIdCard } from "./HolographicIdCard";
import { FloatingChips } from "./FloatingChips";
import { NamePowerOn } from "./NamePowerOn";

interface HeroSectionProps {
  isOscilloscope?: boolean;
}

export function HeroSection({ isOscilloscope = false }: HeroSectionProps) {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-rule overflow-hidden">
      {/* Interactive PCB Trace Canvas Field */}
      <PcbHeroCanvas
        isOscilloscope={isOscilloscope}
        className="opacity-70 dark:opacity-50"
      />

      {/* 3D Floating IC Chips at depth behind hero text */}
      <FloatingChips />

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

            {/* Name with LED power-on sequence */}
            <div>
              <NamePowerOn className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.02]" />
              <ScrambleText
                phrases={[
                  "Industrial Automation, Embedded Systems & Industrial IoT Engineer",
                  "Robotics, Control Systems & Firmware Engineer",
                  "Automotive Electronics & Real-Time Telemetry Specialist",
                ]}
                className="font-sans text-lg sm:text-xl text-signal font-semibold mt-2 block min-h-[1.75rem]"
              />
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

            {/* Spec tags */}
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs font-mono text-ink-soft">
              <span className="tech-chip text-[11px] py-0.5 px-2">INSAT Engineering</span>
              <span className="tech-chip text-[11px] py-0.5 px-2">Embedded C / ESP-IDF</span>
              <span className="tech-chip text-[11px] py-0.5 px-2">RS-485 & Modbus</span>
              <span className="tech-chip text-[11px] py-0.5 px-2">MATLAB / Simulink</span>
              <span className="tech-chip text-[11px] py-0.5 px-2">TypeScript & Python</span>
            </div>
          </div>

          {/* Right Column: Hero Profile Picture Frame with 3D Holographic ID Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HolographicIdCard />
          </div>
        </div>

        {/* Telemetry HUD (Desktop bottom right) */}
        <div className="mt-8 flex justify-end">
          <TelemetryHud />
        </div>
      </div>
    </section>
  );
}
