import { smoothScrollTo } from "@/lib/utils";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { Download, ArrowRight, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-border overflow-hidden">
      {/* Background subtle radial glow & dotted circuit pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, var(--accent) 0%, transparent 60%)`,
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(var(--border) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bio & Core Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability line with Amber LED Dot */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-accent-soft border border-border rounded-md text-xs sm:text-sm font-sans text-text">
              <span
                className="w-2 h-2 bg-highlight shrink-0 rounded-full animate-pulse"
                aria-hidden="true"
              />
              <span className="font-medium">
                Seeking Final-Year Engineering Internship (PFE) — Feb 2027
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-[1.08]">
                Ahmed Bourmeche
              </h1>
              <p className="font-sans text-base sm:text-lg text-accent font-semibold mt-2 tracking-normal">
                Industrial Automation, Embedded Systems & Industrial IoT Engineer
              </p>
            </div>

            {/* Concise positioning */}
            <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed max-w-xl">
              Engineering bare-metal firmware in C (<span className="text-text font-medium">ESP-IDF, STM32</span>), multi-protocol edge gateways (<span className="text-text font-medium">Modbus RTU, RS-485, BACnet, OCPP, MQTT</span>), closed-loop control systems, and real-time operator dashboards.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => smoothScrollTo("contact")}
                className="btn-primary"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>

              <button
                onClick={() => smoothScrollTo("projects")}
                className="btn-secondary"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={ASSET_PATHS.cv()}
                download="Ahmed_Bourmeche_RESUME.pdf"
                onClick={triggerResumeDownload}
                className="btn-secondary inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Spec tags */}
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs font-mono text-text-muted">
              <span className="tech-chip text-[11px] py-0.5 px-2.5">INSAT Engineering</span>
              <span className="tech-chip text-[11px] py-0.5 px-2.5">Embedded C / ESP-IDF</span>
              <span className="tech-chip text-[11px] py-0.5 px-2.5">RS-485 & Modbus</span>
              <span className="tech-chip text-[11px] py-0.5 px-2.5">MATLAB / Simulink</span>
              <span className="tech-chip text-[11px] py-0.5 px-2.5">TypeScript & Python</span>
            </div>
          </div>

          {/* Right Column: Hero Profile Picture Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[290px] border border-border bg-surface p-3.5 rounded-lg shadow-card">
              {/* Top status bar */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-border font-mono text-[10px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-highlight rounded-full" />
                  <span>SYS.ID // A_BOURMECHE</span>
                </span>
                <span className="text-accent font-semibold tracking-wide">ONLINE</span>
              </div>

              {/* Photo Frame */}
              <div className="border border-border overflow-hidden rounded-md bg-bg-alt relative">
                <img
                  src={ASSET_PATHS.photo()}
                  alt="Ahmed Bourmeche"
                  className="w-full h-auto object-cover contrast-[1.02]"
                />
              </div>

              {/* Caption */}
              <div className="pt-3.5 text-center">
                <p className="font-heading font-bold text-lg text-text tracking-tight">
                  AHMED BOURMECHE
                </p>
                <p className="font-mono text-xs text-accent font-medium mt-0.5">
                  INSAT · University of Carthage
                </p>
                <p className="font-sans text-[11px] text-text-muted mt-1">
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
