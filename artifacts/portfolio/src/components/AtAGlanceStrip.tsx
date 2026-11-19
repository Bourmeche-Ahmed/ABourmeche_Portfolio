import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";
import { projects } from "@/data/projects";
import { Gauge, ShieldCheck, Zap, Activity, ArrowUpRight } from "lucide-react";

interface GlanceStat {
  value: string;
  unit: string;
  label: string;
  desc: string;
  projectId: string;
  icon: React.ElementType;
  accent: string;
  border: string;
}

const STATS: GlanceStat[] = [
  {
    value: "13",
    unit: "×",
    label: "Modbus Polling Speedup",
    desc: "Contiguous register batching across industrial meters",
    projectId: "iiot-predictive-maintenance",
    icon: Zap,
    accent: "text-amber-500",
    border: "hover:border-amber-500/50",
  },
  {
    value: "81",
    unit: "%",
    label: "PPO Success Rate",
    desc: "Pioneer 3-AT autonomous navigation with 0% timeouts",
    projectId: "rl-navigation",
    icon: ShieldCheck,
    accent: "text-emerald-500",
    border: "hover:border-emerald-500/50",
  },
  {
    value: "87",
    unit: "%",
    label: "Peak Displacement Cut",
    desc: "Active PD suspension control vs passive 2-DOF baseline",
    projectId: "quarter-car-suspension-system",
    icon: Gauge,
    accent: "text-sky-500",
    border: "hover:border-sky-500/50",
  },
  {
    value: "100",
    unit: "Hz",
    label: "Deterministic Balance Loop",
    desc: "Bare-metal STM32 hardware-timer inverted pendulum loop",
    projectId: "self-balancing-robot",
    icon: Activity,
    accent: "text-orange-500",
    border: "hover:border-orange-500/50",
  },
];

export function AtAGlanceStrip() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.15 });
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.micro.glanceStrip;

  const handleClick = (projectId: string) => {
    const target = projects.find((p) => p.id === projectId);
    if (target) {
      window.dispatchEvent(
        new CustomEvent("open-project-modal", { detail: target })
      );
    }
  };

  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 mb-8">
      <div
        ref={ref}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-panel-raised border border-rule p-3 sm:p-4 rounded-[2px] shadow-sm select-none"
      >
        {STATS.map((stat, i) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              onClick={() => handleClick(stat.projectId)}
              initial={canAnimate ? { opacity: 0, y: 16 } : undefined}
              animate={inView || !canAnimate ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(stat.projectId);
                }
              }}
              className={`p-3 rounded-[2px] bg-panel-sunk border border-rule/60 transition-all duration-200 cursor-pointer group flex flex-col justify-between ${stat.border} hover:bg-panel hover:shadow-xs focus-visible:outline-none`}
            >
              {/* Header with icon and arrow */}
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${stat.accent}`} />
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-soft opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Number with unit */}
              <div className="font-heading font-bold text-3xl sm:text-4xl text-ink tracking-tight flex items-baseline gap-0.5">
                <span>{stat.value}</span>
                <span className={`text-xl ${stat.accent}`}>{stat.unit}</span>
              </div>

              {/* Label & Description */}
              <div className="mt-1">
                <div className="font-sans font-semibold text-xs text-ink truncate group-hover:text-signal transition-colors">
                  {stat.label}
                </div>
                <div className="font-sans text-[11px] text-ink-soft line-clamp-1 mt-0.5">
                  {stat.desc}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default AtAGlanceStrip;
