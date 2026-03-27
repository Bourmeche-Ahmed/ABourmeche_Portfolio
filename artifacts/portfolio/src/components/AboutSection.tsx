import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Code2, Cpu, LineChart, Zap } from "lucide-react";

const cards = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    desc: "Building pixel-perfect, performant UIs with React, TypeScript, and Tailwind — from design system components to full application shells.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Cpu,
    title: "IIoT & Real-time Systems",
    desc: "Designing dashboards that interface with industrial control systems, sensor telemetry streams, and MATLAB digital twins.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: LineChart,
    title: "Data Visualization",
    desc: "Turning complex data into clear, interactive charts and dashboards that help engineers and operators make faster decisions.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Zap,
    title: "API Design",
    desc: "Building clean Python/Flask REST APIs that power real-time frontends, ML model integrations, and IoT data pipelines.",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <SectionHeader
        tag="About"
        title="Engineering at the intersection of web and industry"
        subtitle="I build interactive dashboards and real-time systems that bridge modern web stacks with industrial engineering environments."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-muted-foreground leading-relaxed"
        >
          <p>
            I'm a Full-Stack Engineer with a focus on{" "}
            <span className="text-foreground font-medium">
              React/TypeScript dashboards
            </span>{" "}
            and{" "}
            <span className="text-foreground font-medium">
              Python/Flask APIs
            </span>{" "}
            for industrial and real-time applications. My work sits at the crossroads
            of web engineering and control systems — where millisecond latency matters
            and data needs to tell a clear story.
          </p>
          <p>
            I've built PID control interfaces synchronized with MATLAB Simulink digital
            twins, IIoT predictive maintenance platforms, and AI-powered browser
            extensions — always prioritizing{" "}
            <span className="text-foreground font-medium">
              clean architecture, real performance, and operator-first UX
            </span>
            .
          </p>
          <p>
            Outside of production work, I explore advanced UI patterns, TypeScript
            generics for component systems, and the boundaries of browser-native APIs
            through experimental projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square max-w-xs mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-cyan-900/20 overflow-hidden flex items-center justify-center relative">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }} />
            <div className="relative z-10 text-center p-8">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300 mb-2">
                AB
              </div>
              <div className="text-sm text-cyan-400 font-mono">Full-Stack Engineer</div>
              <div className="mt-4 flex flex-col gap-1.5">
                {["React + TypeScript", "Python + Flask", "IIoT Systems"].map((s) => (
                  <span key={s} className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/8">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl border border-white/8 bg-card/40 backdrop-blur-sm p-5 hover:border-cyan-500/25 transition-all group"
          >
            <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <h3 className={`font-semibold text-sm mb-2 ${card.color}`}>{card.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
