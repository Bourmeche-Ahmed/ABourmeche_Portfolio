import { SectionHeader } from "./SectionHeader";
import { Code2, Cpu, LineChart, Zap, CircuitBoard, CheckCircle2 } from "lucide-react";

const cards = [
  {
    icon: CircuitBoard,
    title: "Embedded Systems",
    desc: "Bare-metal firmware in C under ESP-IDF & STM32, RS-485 / Modbus RTU, NB-IoT, LoRa, and custom KiCad PCB design.",
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
          title="About & Engineering Profile"
          subtitle="Operating across the vertical: from field buses and bare-metal firmware to containerized ingestion and operator dashboards."
        />

        {/* PFE Highlight Banner */}
        <div className="bg-panel-raised border-l-4 border-signal border border-rule p-5 rounded-[2px] mb-8 text-ink shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-signal shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base leading-relaxed font-sans">
              <span className="font-semibold text-ink">Final-year Industrial IT and Automation engineering student</span> at{" "}
              <span className="font-semibold text-ink">INSAT, University of Carthage</span>, currently seeking a{" "}
              <span className="font-semibold text-signal">final-year engineering internship (PFE)</span> in embedded systems, industrial IoT, or automation starting February 2027. Open to relocation and international opportunities.
            </div>
          </div>
        </div>

        {/* Engineering Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-sm text-ink-soft leading-relaxed font-sans">
          <div className="border border-rule bg-panel-raised p-5 rounded-[2px] space-y-2">
            <h3 className="font-heading font-bold text-lg text-ink flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-[1px]" />
              <span>Full-Stack Vertical</span>
            </h3>
            <p>
              I operate across the vertical — from bare-metal <span className="font-mono text-xs text-ink font-semibold">ESP32 & STM32</span> firmware and KiCad PCB design, up through Python APIs, all the way to React/TypeScript dashboards.
            </p>
          </div>

          <div className="border border-rule bg-panel-raised p-5 rounded-[2px] space-y-2">
            <h3 className="font-heading font-bold text-lg text-ink flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-[1px]" />
              <span>Protocols & Edge Gateways</span>
            </h3>
            <p>
              Engineered industrial IoT nodes and multi-protocol edge gateways integrating <span className="font-mono text-xs text-ink font-semibold">Modbus RTU, RS-485, BACnet, OCPP, NB-IoT</span>, and <span className="font-mono text-xs text-ink font-semibold">LoRa</span> with zero code changes for new meter models.
            </p>
          </div>

          <div className="border border-rule bg-panel-raised p-5 rounded-[2px] space-y-2">
            <h3 className="font-heading font-bold text-lg text-ink flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sky-500 rounded-[1px]" />
              <span>Leadership & Control</span>
            </h3>
            <p>
              Co-founder and CTO at{" "}
              <a
                href="https://cybernexus.tn"
                target="_blank"
                rel="noopener noreferrer"
                className="panel-link font-medium text-ink"
              >
                CyberNexus
              </a>
              . Also built PID control dashboards synchronized live with <span className="font-mono text-xs text-ink font-semibold">MATLAB Simulink digital twins</span>.
            </p>
          </div>
        </div>

        {/* Domain capability cards */}
        <div>
          <h3 className="font-heading font-bold text-xl text-ink mb-4">
            Technical Domains & Expertise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="border border-rule bg-panel-raised p-4 rounded-[2px] transition-all hover:border-ink-soft hover:shadow-sm"
              >
                <div className={`w-8 h-8 rounded-[2px] ${card.bg} ${card.border} border flex items-center justify-center mb-3 ${card.color}`}>
                  <card.icon className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-base text-ink mb-1.5 leading-tight">
                  {card.title}
                </h4>
                <p className="font-sans text-xs text-ink-soft leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
