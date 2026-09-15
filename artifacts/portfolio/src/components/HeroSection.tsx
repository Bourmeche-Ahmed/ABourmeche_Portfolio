import { smoothScrollTo } from "@/lib/utils";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { Download, ArrowRight, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-rule">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
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

            {/* Name */}
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

              <button
                onClick={triggerResumeDownload}
                className="btn-secondary inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-signal" />
                <span>Download Resume</span>
              </button>
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

          {/* Right Column: Hero Profile Picture Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[290px] border border-rule bg-panel-raised p-3 rounded-[2px] shadow-sm">
              {/* Top status bar */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-rule font-mono text-[10px] text-ink-soft">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-signal rounded-[1px]" />
                  <span>SYS.ID // A_BOURMECHE</span>
                </span>
                <span className="text-signal font-semibold">ONLINE</span>
              </div>

              {/* Photo Frame */}
              <div className="border border-rule overflow-hidden rounded-[2px] bg-panel-sunk relative">
                <img
                  src={ASSET_PATHS.photo()}
                  alt="Ahmed Bourmeche"
                  className="w-full h-auto object-cover contrast-105"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
