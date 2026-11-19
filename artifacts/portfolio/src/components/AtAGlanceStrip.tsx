import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/data/projects";
import { Zap, ShieldCheck, Server, Users, ArrowUpRight } from "lucide-react";

interface GlanceStat {
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
  desc: string;
  projectId: string;
  icon: React.ElementType;
}

const STATS: GlanceStat[] = [
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
    prefix: "",
    suffix: "+",
    label: "Marathon Signups Handled",
    desc: "STEP'ACT real-time registration & payment flow",
    projectId: "stepact-2026-marathon",
    icon: Users,
  },
];

function CountUpTile({
  stat,
  inView,
  reducedMotion,
  index,
  onClick,
}: {
  stat: GlanceStat;
  inView: boolean;
  reducedMotion: boolean;
  index: number;
  onClick: () => void;
}) {
  const [displayVal, setDisplayVal] = useState(reducedMotion ? stat.target : 0);
  const Icon = stat.icon;

  useEffect(() => {
    if (reducedMotion) {
      setDisplayVal(stat.target);
      return;
    }
    if (!inView) return;

    const controls = animate(0, stat.target, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayVal(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [inView, reducedMotion, stat.target]);

  return (
    <motion.div
      onClick={onClick}
      initial={!reducedMotion ? { opacity: 0, y: 16 } : undefined}
      animate={inView || reducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="min-w-[220px] sm:min-w-0 shrink-0 snap-start p-3 sm:p-4 rounded-[2px] bg-panel-sunk border border-rule transition-colors duration-200 cursor-pointer group flex flex-col justify-between hover:border-signal hover:bg-panel focus-visible:outline-none"
    >
      {/* Header with icon and arrow */}
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-4 h-4 text-signal" />
        <ArrowUpRight className="w-3.5 h-3.5 text-ink-soft opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Number with unit */}
      <div className="font-heading font-bold text-3xl sm:text-4xl text-ink tracking-tight flex items-baseline gap-0.5">
        <span>{stat.prefix || ""}{displayVal.toLocaleString()}</span>
        <span className="text-xl text-hardware font-medium">{stat.suffix}</span>
      </div>

      {/* Label & Description */}
      <div className="mt-2">
        <div className="font-sans font-semibold text-xs text-ink truncate group-hover:text-signal transition-colors">
          {stat.label}
        </div>
        <div className="font-sans text-[11px] text-ink-soft line-clamp-1 mt-0.5">
          {stat.desc}
        </div>
      </div>
    </motion.div>
  );
}

export function AtAGlanceStrip() {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.15 });
  const reducedMotion = useReducedMotion();

  const handleClick = (projectId: string) => {
    const target = projects.find((p) => p.id === projectId);
    if (target) {
      window.dispatchEvent(
        new CustomEvent("open-project-modal", { detail: target })
      );
    }
  };

  return (
    <section id="glance" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 mb-10">
      <div
        ref={ref}
        className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-panel-raised border border-rule p-3 sm:p-4 rounded-[2px] shadow-sm select-none scrollbar-none"
      >
        {STATS.map((stat, i) => (
          <CountUpTile
            key={stat.label}
            stat={stat}
            inView={inView}
            reducedMotion={reducedMotion}
            index={i}
            onClick={() => handleClick(stat.projectId)}
          />
        ))}
      </div>
    </section>
  );
}

export default AtAGlanceStrip;
