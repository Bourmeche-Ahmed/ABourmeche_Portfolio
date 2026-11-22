import { SectionHeader } from "./SectionHeader";
import { Code2, Cpu, LineChart, Zap, CircuitBoard, CheckCircle2 } from "lucide-react";

const cards = [
  {
    icon: CircuitBoard,
    title: "Embedded Systems",
    desc: "Bare-metal firmware in C under ESP-IDF & STM32, RS-485 / Modbus RTU, NB-IoT, LoRa, and custom KiCad PCB design.",
    color: "text-accent",
    bg: "bg-accent-soft",
    border: "border-border",
  },
  {
    icon: Cpu,
    title: "Industrial IoT & Edge",
    desc: "Multi-protocol edge gateway architectures, device register profiling, and MQTT/Telegraf/TimescaleDB ingestion.",
    color: "text-accent",
    bg: "bg-accent-soft",
    border: "border-border",
  },
  {
    icon: LineChart,
    title: "Control & Simulation",
    desc: "MATLAB Simulink digital twins, closed-loop PID control platforms, hardware-in-the-loop (HIL) simulation.",
    color: "text-accent",
    bg: "bg-accent-soft",
    border: "border-border",
  },
  {
    icon: Zap,
    title: "Backend & Telemetry APIs",
    desc: "Python/Django REST Framework & Flask microservices, Mosquitto MQTT brokers, Redis caching, Docker Compose stacks.",
    color: "text-accent",
    bg: "bg-accent-soft",
    border: "border-border",
  },
  {
    icon: Code2,
    title: "Operator Dashboards",
    desc: "Real-time engineering dashboards, high-frequency telemetry visualization, and responsive operator tooling.",
    color: "text-accent",
    bg: "bg-accent-soft",
    border: "border-border",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 border-b border-border bg-bg-alt">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="About & Engineering Profile"
          subtitle="Operating across the vertical: from field buses and bare-metal firmware to containerized ingestion and operator dashboards."
        />

        {/* PFE Highlight Banner */}
        <div className="bg-surface border-l-4 border-accent border border-border p-5 rounded-md mb-8 text-text shadow-card">
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base leading-relaxed font-sans">
              <span className="font-semibold text-text">PFE Availability:</span>{" "}
              Seeking a 6-month Final-Year Engineering Internship starting{" "}
              <span className="text-accent font-semibold">February 2027</span>.
              Specializing in industrial IoT edge gateways, low-level firmware engineering (C / ESP-IDF / STM32), real-time control, and supervisory software stacks. Open to relocation worldwide.
            </div>
          </div>
        </div>

        {/* Competency Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="p-5 rounded-md border border-border bg-surface shadow-card hover:border-accent transition-all duration-200"
              >
                <div className={`w-9 h-9 rounded-md ${c.bg} flex items-center justify-center mb-3 border border-border`}>
                  <Icon className={`w-4 h-4 ${c.color}`} />
                </div>
                <h3 className="font-heading font-bold text-lg text-text mb-2">
                  {c.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
