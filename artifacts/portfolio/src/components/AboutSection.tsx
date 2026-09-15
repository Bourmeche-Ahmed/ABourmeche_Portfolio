import { SectionHeader } from "./SectionHeader";
import { Code2, Cpu, LineChart, Zap, CircuitBoard } from "lucide-react";
import { ASSET_PATHS } from "@/lib/paths";

const cards = [
  {
    icon: CircuitBoard,
    title: "Embedded Systems",
    desc: "Bare-metal firmware in C under ESP-IDF, RS-485 / Modbus RTU, NB-IoT, LoRa, and custom KiCad PCB design.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
  },
  {
    icon: Cpu,
    title: "Industrial IoT & Edge",
    desc: "Multi-protocol edge gateway architectures, device register profiling, and MQTT/Telegraf/TimescaleDB ingestion.",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
  },
  {
    icon: LineChart,
    title: "Control & Simulation",
    desc: "MATLAB Simulink digital twins, closed-loop PID control platforms, hardware-in-the-loop (HIL) simulation.",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
  },
  {
    icon: Zap,
    title: "Backend & Telemetry APIs",
    desc: "Python/Django REST Framework & Flask microservices, Mosquitto MQTT brokers, Redis caching, Docker Compose stacks.",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    icon: Code2,
    title: "Operator Dashboards",
    desc: "Real-time engineering dashboards, high-frequency telemetry visualization, and responsive operator tooling.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 border-b border-rule">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="About & Engineering Focus"
          subtitle="Operating across the vertical: from field buses and bare-metal firmware to containerized ingestion and operator dashboards."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Text column - max 68ch */}
          <div className="md:col-span-8 space-y-4 text-ink leading-relaxed font-sans text-base max-w-[68ch]">
            <div className="bg-panel-raised border-l-4 border-signal border border-rule p-4 rounded-[2px] text-ink">
              <span className="font-semibold text-ink">Final-year Industrial IT and Automation engineering student</span> at{" "}
              <span className="font-semibold">INSAT, University of Carthage</span>, currently seeking a{" "}
              <span className="font-semibold text-signal">final-year engineering internship (PFE)</span> in embedded systems, industrial IoT, or automation. Open to relocation and international opportunities.
            </div>

            <p className="text-ink-soft">
              I operate across the full vertical — from bare-metal <span className="font-mono text-[0.95em] text-ink font-semibold">ESP32</span> firmware and PCB design, up through Python APIs, all the way to React/TypeScript dashboards. That hardware-to-cloud integration ensures telemetry contracts, register mappings, and timing constraints are preserved end-to-end.
            </p>

            <p className="text-ink-soft">
              On the embedded side, I have engineered industrial IoT nodes and multi-protocol edge gateways integrating <span className="font-mono text-[0.95em] text-ink font-semibold">RS-485 / Modbus RTU</span>, <span className="font-mono text-[0.95em] text-ink font-semibold">BACnet</span>, <span className="font-mono text-[0.95em] text-ink font-semibold">OCPP</span>, <span className="font-mono text-[0.95em] text-ink font-semibold">NB-IoT</span>, and <span className="font-mono text-[0.95em] text-ink font-semibold">LoRa</span> — writing firmware in C under <span className="font-mono text-[0.95em] text-ink font-semibold">ESP-IDF</span> and containerized Python ingestion stacks. On the control side, I have built PID control dashboards synchronized live with MATLAB Simulink digital twins.
            </p>

            <p className="text-ink-soft">
              I am also co-founder and CTO at{" "}
              <a
                href="https://cybernexus.tn"
                target="_blank"
                rel="noopener noreferrer"
                className="panel-link font-medium text-ink"
              >
                CyberNexus
              </a>
              , leading technical architecture and product development.
            </p>
          </div>

          {/* Photo column */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="w-full max-w-[240px] border border-rule bg-panel-raised p-2.5 rounded-[2px] shadow-sm">
              <div className="border border-rule overflow-hidden rounded-[2px] relative group">
                <img
                  src={ASSET_PATHS.photo()}
                  alt="Ahmed Bourmeche"
                  className="w-full h-auto object-cover contrast-105"
                />
              </div>
              <div className="pt-2.5 text-center">
                <p className="font-heading font-bold text-base text-ink tracking-wide">
                  AHMED BOURMECHE
                </p>
                <p className="font-mono text-xs text-signal font-medium">
                  INSAT · Industrial Automation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Domain cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="border border-rule bg-panel-raised p-4 rounded-[2px] transition-all hover:border-ink-soft hover:shadow-sm"
            >
              <div className={`w-8 h-8 rounded-[2px] ${card.bg} ${card.border} border flex items-center justify-center mb-3 ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-ink mb-1.5 leading-tight">
                {card.title}
              </h3>
              <p className="font-sans text-xs text-ink-soft leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
