import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Briefcase, ExternalLink } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl: string | null;
  dates: string;
  location: string;
  badge: string;
  headline?: string;
  description: string;
  bullets: React.ReactNode[];
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "esd-vimar",
    role: "Industrial IoT Engineering Intern",
    company: "ESD Performance / Vimar SARL",
    companyUrl: null,
    dates: "Jun 2026 – Sep 2026",
    location: "Tunisia · 4 months",
    badge: "LATEST INTERNSHIP",
    headline: "DCU Edge — Multi-Protocol Industrial IoT Edge Gateway",
    description:
      "Designed and implemented a field-configurable industrial IoT edge gateway (DCU) for building energy metering and power-quality analysis, unifying Modbus RTU, BACnet and OCPP device data into a single containerized edge stack.",
    bullets: [
      <>
        Built a multi-protocol edge gateway polling Schneider Electric <span className="font-mono text-[0.95em] text-ink font-semibold">PM2230</span> three-phase power meters and EmbSys <span className="font-mono text-[0.95em] text-ink font-semibold">MG111-N01</span> air-quality transmitters over <span className="font-mono text-[0.95em] text-ink font-semibold">RS-485</span> / Modbus RTU, converging Modbus, BACnet and OCPP <span className="font-mono text-[0.95em] text-ink font-semibold">1.6J/2.0.1</span> telemetry onto a single MQTT topic namespace.
      </>,
      <>
        Engineered a vendor-agnostic Excel-to-JSON device profiling engine that replaced hardcoded register maps, scaling device onboarding from <span className="font-mono text-[0.95em] text-ink font-semibold">38</span> to <span className="font-mono text-[0.95em] text-ink font-semibold">241+</span> registers with zero code changes per new meter model.
      </>,
      <>
        Optimized <span className="font-mono text-[0.95em] text-ink font-semibold">RS-485</span> bus bandwidth through dynamic register pruning, cutting per-device polling cycle time from <span className="font-mono text-[0.95em] text-ink font-semibold">4.5 s</span> to <span className="font-mono text-[0.95em] text-ink font-semibold">350 ms</span> (<span className="font-mono text-[0.95em] text-ink font-semibold">13x</span>) on a shared multidrop segment.
      </>,
      <>
        Implemented live in-band hardware provisioning: remote write of slave ID, baud rate and parity to device registers (<span className="font-mono text-[0.95em] text-ink font-semibold">FC06</span> with <span className="font-mono text-[0.95em] text-ink font-semibold">FC16</span> fallback, <span className="font-mono text-[0.95em] text-ink font-semibold">CRC-16/MODBUS</span> validation, deterministic UART reconfiguration handshake), removing the need to open switchgear cabinets for commissioning.
      </>,
      <>
        Architected the ingestion and storage pipeline: Django REST Framework, MQTT (Mosquitto), Telegraf, TimescaleDB hypertables and Grafana dashboards, containerized as <span className="font-mono text-[0.95em] text-ink font-semibold">9 services</span> with Docker Compose.
      </>,
      <>
        Validated with a <span className="font-mono text-[0.95em] text-ink font-semibold">43-test</span> automated suite (protocol framing, CRC integrity, REST boundary conditions, bus-collision prevention), all passing, plus validation against physically wired <span className="font-mono text-[0.95em] text-ink font-semibold">PM2230</span> meters.
      </>,
    ],
    tags: [
      "Modbus RTU",
      "RS-485",
      "MQTT",
      "OCPP",
      "BACnet",
      "Python",
      "Django REST Framework",
      "TimescaleDB",
      "PostgreSQL",
      "Telegraf",
      "Grafana",
      "Docker Compose",
      "Redis",
      "Linux",
    ],
  },
  {
    id: "cybernexus",
    role: "Co-founder & CTO",
    company: "CyberNexus",
    companyUrl: "https://cybernexus.tn",
    dates: "2024 – Present",
    location: "Tunisia",
    badge: "FOUNDING",
    description:
      "Co-founded CyberNexus, building digital products at the intersection of sports data and web engineering. Leading all technical strategy, architecture decisions, and product delivery.",
    bullets: [
      <>
        Define and own the complete technical architecture across real-time data engines and client-facing web applications.
      </>,
      <>
        Manage engineering workflows, code review pipelines, and system quality benchmarks across TypeScript and Python services.
      </>,
      <>
        Drive the technical vision for low-latency telemetry ingestion, interactive operator dashboards, and scalable REST/WebSocket APIs.
      </>,
    ],
    tags: ["TypeScript", "Python", "React", "System Architecture", "Leadership", "Product"],
  },
  {
    id: "lab619",
    role: "Embedded Systems & IoT Engineering Intern",
    company: "LAB619",
    companyUrl: null,
    dates: "Jul 2025 – Sep 2025",
    location: "Tunisia · 2 months",
    badge: "R&D INTERNSHIP",
    headline: "Industrial IoT Node for Anomaly Detection",
    description:
      "Summer internship within LAB619's R&D department, developing an industrial IoT node for environmental anomaly detection and industrial supervision.",
    bullets: [
      <>
        Designed the complete hardware circuit integrating <span className="font-mono text-[0.95em] text-ink font-semibold">ESP32-S3</span> with multi-sensor array (microphone, accelerometer/gyroscope, temperature/humidity/pressure, gas).
      </>,
      <>
        Integrated industrial transceivers: <span className="font-mono text-[0.95em] text-ink font-semibold">RS-485</span>, <span className="font-mono text-[0.95em] text-ink font-semibold">RS-232</span>, <span className="font-mono text-[0.95em] text-ink font-semibold">LoRa</span>, and NB-IoT (<span className="font-mono text-[0.95em] text-ink font-semibold">SIM7022</span>) for long-range telemetry.
      </>,
      <>
        Developed bare-metal firmware in C under <span className="font-mono text-[0.95em] text-ink font-semibold">ESP-IDF</span> for sensor acquisition, protocol handling, and anomaly detection algorithms.
      </>,
      <>
        Performed KiCad PCB routing with RF constraints, power isolation design, and energy optimization.
      </>,
      <>
        Validated prototype end-to-end: power consumption benchmarks, physical bus validation, and industrial signal integrity.
      </>,
    ],
    tags: [
      "ESP32-S3",
      "ESP-IDF",
      "C / Bare-metal",
      "NB-IoT",
      "RS-485",
      "LoRa",
      "KiCad",
      "PCB Design",
      "Industrial IoT",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 border-b border-rule">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Professional Experience"
          subtitle="Engineering contributions across industrial IoT edge gateways, bare-metal firmware, and software systems."
        />

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="border border-rule bg-panel-raised p-6 rounded-[2px]"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 mb-4 border-b border-rule">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[2px] bg-panel-sunk border border-rule text-signal">
                      {exp.badge}
                    </span>
                    <span className="font-mono text-xs text-ink-soft">
                      {exp.dates}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-ink">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-ink-soft font-sans mt-0.5">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink hover:text-signal transition-colors inline-flex items-center gap-1 underline underline-offset-2"
                      >
                        <span>{exp.company}</span>
                        <ExternalLink className="w-3 h-3 text-ink-soft" />
                      </a>
                    ) : (
                      <span className="font-medium text-ink">{exp.company}</span>
                    )}
                    <span className="text-rule">·</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Headline */}
              {exp.headline && (
                <div className="mb-2.5 font-sans text-sm font-semibold text-ink flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-signal rounded-[1px]" />
                  <span>{exp.headline}</span>
                </div>
              )}

              {/* Description */}
              <p className="font-sans text-sm text-ink-soft leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-2 mb-5">
                {exp.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start text-xs sm:text-sm text-ink font-sans leading-relaxed"
                  >
                    <span
                      className="w-1.5 h-1.5 bg-rule shrink-0 mt-2 mr-2.5 rounded-[1px]"
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-3 border-t border-rule">
                {exp.tags.map((tag) => (
                  <span key={tag} className="tech-chip text-[11px] py-0.5 px-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
