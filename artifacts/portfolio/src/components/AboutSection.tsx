import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Code2, Cpu, LineChart, Zap, CircuitBoard } from "lucide-react";
import { ASSET_PATHS } from "@/lib/paths";

const cards = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    desc: "Building pixel-perfect, performant UIs with React, TypeScript, and Tailwind — from design system components to full application shells.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Zap,
    title: "Backend & APIs",
    desc: "Building Python/Flask REST APIs that power real-time frontends, ML inference engines, and data pipelines with clean, validated contracts.",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: LineChart,
    title: "Data & Dashboards",
    desc: "Turning complex data and sensor streams into clear, interactive dashboards that help engineers and operators make faster decisions.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Cpu,
    title: "IIoT & Real-Time",
    desc: "Interfacing web dashboards with industrial telemetry, MQTT/WebSocket streams, PID control systems, and MATLAB Simulink digital twins.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: CircuitBoard,
    title: "Embedded Systems",
    desc: "Firmware in C on ESP32/ESP-IDF, industrial protocols (RS485, NB-IoT, LoRa), KiCad PCB design — bridging hardware directly to cloud dashboards.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <SectionHeader
        tag="About"
        title="From embedded firmware to interactive dashboards"
        subtitle="I work across the full hardware-to-browser stack — designing IoT nodes, writing bare-metal firmware, and building the real-time web interfaces that make sense of the data."
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
            I'm an engineer who operates across the full vertical —{" "}
            <span className="text-foreground font-medium">
              from bare-metal ESP32 firmware
            </span>{" "}
            and PCB design, up through Python APIs, all the way to{" "}
            <span className="text-foreground font-medium">
              React/TypeScript dashboards
            </span>
            . That full-stack reach lets me build systems where every layer actually talks to every other.
          </p>
          <p>
            On the embedded side, I've designed industrial IoT nodes integrating RS485, NB-IoT, LoRa, and CAN — writing firmware in C under ESP-IDF for sensor acquisition, anomaly detection, and long-range telemetry. On the web side, I've built PID control dashboards synchronized live with{" "}
            <span className="text-foreground font-medium">
              MATLAB Simulink digital twins
            </span>
            , IIoT predictive maintenance platforms, and AI-powered browser tools.
          </p>
          <p>
            I'm a co-founder and CTO at{" "}
            <a
              href="https://cybernexus.tn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-medium"
            >
              CyberNexus
            </a>
            , where I lead technical strategy and product development. The thread connecting everything is a preference for systems that are{" "}
            <span className="text-foreground font-medium">
              precise, real-time, and genuinely useful to engineers.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center"
        >
          <div className="relative w-80 rounded-2xl overflow-hidden">
            {/* Animated glow border */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500/40 to-blue-500/40 blur-xl -z-10"
            />

            {/* Picture frame with border */}
            <div className="relative rounded-2xl border-2 border-cyan-500/30 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-0.5">
              <motion.img
                src={ASSET_PATHS.photo()}
                alt="Ahmed Bourmeche"
                className="w-full h-auto object-cover rounded-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-950/40 via-transparent to-cyan-500/10 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
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
