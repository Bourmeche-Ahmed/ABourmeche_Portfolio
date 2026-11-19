import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { smoothScrollTo } from "@/lib/utils";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { Download, ArrowRight, Mail, Zap, ShieldCheck, Server, Users } from "lucide-react";
import { useAppState } from "@/store";
import { RobotPlaceholderSvg } from "./RobotPlaceholderSvg";
import { projects } from "@/data/projects";

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  desc: string;
  projectId: string;
  icon: React.ElementType;
}

const STATS: StatItem[] = [
  {
    target: 13,
    suffix: "×",
    label: "Polling Speedup (4.5s → 350ms)",
    desc: "Contiguous register batching across Modbus meters",
    projectId: "iiot-predictive-maintenance",
    icon: Zap,
  },
  {
    target: 81,
    suffix: "%",
    label: "PPO Navigation Success",
    desc: "Autonomous obstacle avoidance with 0% timeouts",
    projectId: "rl-navigation",
    icon: ShieldCheck,
  },
  {
    target: 9,
    suffix: " Svcs",
    label: "Docker Microservices",
    desc: "Production containerized telemetry & gateway stack",
    projectId: "esd-vimar",
    icon: Server,
  },
  {
    target: 2500,
    suffix: "+",
    label: "Marathon Signups Handled",
    desc: "STEP'ACT real-time registration & payment flow",
    projectId: "stepact-2026-marathon",
    icon: Users,
  },
];

function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setVal(Math.round(latest)),
    });
    return () => controls.stop();
  }, [target]);

  return (
    <span>
      {val.toLocaleString()}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export function HeroSection() {
  const tier = useAppState((s) => s.tier);

  const handleOpenProject = (projectId: string) => {
    const p = projects.find((item) => item.id === projectId);
    if (p) {
      window.dispatchEvent(new CustomEvent("open-project-modal", { detail: p }));
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-24 pb-16 flex flex-col justify-between border-b border-hairline overflow-hidden"
    >
      {/* Background oversized outlined numeral 01 */}
      <div className="absolute right-4 top-16 text-[18vw] font-heading font-extrabold numeral-outlined opacity-15 select-none pointer-events-none">
        01
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Kinetic Title, Narrative & Actions */}
          <div className="lg:col-span-7 space-y-6 z-10">
            {/* Availability pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface2 border border-hairline rounded-[2px] font-mono text-xs text-ink">
              <span className="w-2 h-2 rounded-[1px] bg-accent animate-pulse" />
              <span>PFE, 6 months from February 2027, open to relocation</span>
            </div>

            {/* Kinetic Title (Split into masked lines revealing once) */}
            <div className="overflow-hidden space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-ink leading-[0.9]"
                >
                  AHMED
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-accent leading-[0.9]"
                >
                  BOURMECHE
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <p className="font-heading text-xl sm:text-2xl text-soft font-semibold max-w-xl">
              Industrial Automation, Embedded Systems & Industrial IoT Engineer
            </p>

            {/* Positioning text */}
            <p className="font-sans text-sm sm:text-base text-soft leading-relaxed max-w-xl">
              Engineering bare-metal firmware in C (<span className="text-ink font-medium">ESP-IDF, STM32</span>), multi-protocol edge gateways (<span className="text-ink font-medium">Modbus RTU, RS-485, CAN, MQTT</span>), closed-loop motion control, and real-time telemetry pipelines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => smoothScrollTo("projects")}
                className="btn-primary"
              >
                <span>Explore The Build</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => smoothScrollTo("contact")}
                className="btn-secondary"
              >
                <Mail className="w-4 h-4 text-accent" />
                <span>Contact Me</span>
              </button>

              <a
                href={ASSET_PATHS.cv()}
                download="Ahmed_Bourmeche_RESUME.pdf"
                onClick={triggerResumeDownload}
                className="btn-secondary inline-flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-soft" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Micro spec tags */}
            <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[11px] text-soft">
              <span className="px-2 py-0.5 bg-surface2 border border-hairline rounded-[2px]">INSAT Engineering</span>
              <span className="px-2 py-0.5 bg-surface2 border border-hairline rounded-[2px]">Embedded C / ESP-IDF</span>
              <span className="px-2 py-0.5 bg-surface2 border border-hairline rounded-[2px]">RS-485 & Modbus</span>
              <span className="px-2 py-0.5 bg-surface2 border border-hairline rounded-[2px]">MATLAB / Simulink</span>
              <span className="px-2 py-0.5 bg-surface2 border border-hairline rounded-[2px]">TypeScript & Python</span>
            </div>
          </div>

          {/* Right Column: In Static Tier, render Robot Blueprint Poster */}
          <div className="lg:col-span-5 flex justify-center items-center relative min-h-[340px]">
            {tier === "static" ? (
              <div className="w-full max-w-[340px] p-3 rounded-[2px] border border-hairline bg-surface">
                <RobotPlaceholderSvg className="w-full" />
              </div>
            ) : (
              <div className="w-full max-w-[340px] opacity-25 lg:opacity-0 pointer-events-none transition-opacity">
                <RobotPlaceholderSvg className="w-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom At-A-Glance Metric Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-10">
        <div className="border-t border-hairline pt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                onClick={() => handleOpenProject(stat.projectId)}
                className="p-3 rounded-[2px] bg-surface border border-hairline hover:border-accent transition-colors cursor-pointer group flex flex-col justify-between"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenProject(stat.projectId);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className="w-3.5 h-3.5 text-accent" />
                  <span className="font-mono text-[9px] text-soft opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW CASE →
                  </span>
                </div>
                <div className="font-heading font-bold text-3xl sm:text-4xl text-ink tracking-tight">
                  <CountUpNumber target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-[11px] text-ink font-semibold truncate group-hover:text-accent transition-colors mt-0.5">
                  {stat.label}
                </div>
                <div className="font-sans text-[10px] text-soft line-clamp-1 mt-0.5">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
