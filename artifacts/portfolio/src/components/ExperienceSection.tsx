import React from "react";
import { SectionHeader } from "./SectionHeader";
import { Briefcase, Building2, ExternalLink } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl: string | null;
  dates: string;
  location: string;
  badge: string;
  badgeColor: string;
  accentBar: string;
  headline?: string;
  description: string;
  bullets: React.ReactNode[];
  tags: string[];
  isCurrentOrRecent: boolean;
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
    badgeColor: "bg-signal/15 text-signal border-signal/30",
    accentBar: "bg-signal",
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
    isCurrentOrRecent: true,
  },
  {
    id: "cybernexus",
    role: "Co-founder & CTO",
    company: "CyberNexus",
    companyUrl: "https://cybernexus.tn",
    dates: "2024 – Present",
    location: "Tunisia",
    badge: "EXECUTIVE / FOUNDING",
    badgeColor: "bg-telemetry/15 text-telemetry border-telemetry/30",
    accentBar: "bg-telemetry",
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
    isCurrentOrRecent: false,
  },
  {
    id: "lab619",
    role: "Embedded Systems & IoT Engineering Intern",
    company: "LAB619",
    companyUrl: null,
    dates: "Jul 2025 – Sep 2025",
    location: "Tunisia · 2 months",
    badge: "R&D INTERNSHIP",
    badgeColor: "bg-hardware/15 text-hardware border-hardware/30",
    accentBar: "bg-hardware",
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
    isCurrentOrRecent: false,
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

        {/* Bus Rail Column Layout */}
        <div className="relative pl-6 sm:pl-36">
          {/* Vertical Multidrop Bus Rail */}
          <div
            className="absolute left-[7px] sm:left-[118px] top-4 bottom-4 w-px bg-rule pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Desktop Date Gutter */}
                <div className="hidden sm:block absolute -left-36 top-2 w-28 text-right pr-4">
                  <span className="font-mono text-[13px] text-ink-soft block leading-tight font-medium">
                    {exp.dates}
                  </span>
                </div>

                {/* Node marker: 8px square node on the rail with tap line */}
                <div
                  className={`absolute -left-[21px] sm:-left-[31px] top-3.5 w-2 h-2 rounded-[1px] ${
                    exp.isCurrentOrRecent
                      ? "bg-signal ring-2 ring-signal/30 ring-offset-2 ring-offset-panel"
                      : "bg-ink"
                  }`}
                  aria-hidden="true"
                />

                {/* Experience Card */}
                <div className="border border-rule bg-panel-raised rounded-[2px] overflow-hidden transition-all duration-200 hover:border-ink-soft">
                  {/* Top colored accent indicator rail */}
                  <div className={`h-1 w-full ${exp.accentBar}`} />

                  <div className="p-5 sm:p-7">
                    {/* Mobile Date Display */}
                    <div className="sm:hidden mb-2">
                      <span className="font-mono text-[12px] text-ink-soft font-medium">
                        {exp.dates}
                      </span>
                    </div>

                    {/* Card Header with Role & Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3 pb-3 border-b border-rule">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[2px] border ${exp.badgeColor}`}>
                            {exp.badge}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink leading-tight">
                          {exp.role}
                        </h3>
                        <div className="font-sans text-sm text-ink-soft mt-1 flex items-center gap-2 flex-wrap">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-ink hover:text-signal transition-colors inline-flex items-center gap-1 no-custom-link underline underline-offset-2"
                            >
                              <span>{exp.company}</span>
                              <ExternalLink className="w-3 h-3 text-ink-soft" />
                            </a>
                          ) : (
                            <span className="font-medium text-ink">{exp.company}</span>
                          )}
                          <span className="text-rule">|</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Headline if present */}
                    {exp.headline && (
                      <div className="mb-3 font-sans text-sm font-semibold text-ink flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-signal rounded-[1px]" />
                        <span>{exp.headline}</span>
                      </div>
                    )}

                    {/* Short Summary */}
                    <p className="font-sans text-sm text-ink-soft leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Key Contributions with hairline tick */}
                    <div className="mb-6">
                      <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-ink-soft mb-2.5">
                        Key Engineering Deliverables
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.bullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-ink font-sans leading-relaxed"
                          >
                            <span
                              className="w-3 h-px bg-rule shrink-0 mt-[10px] mr-2.5"
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Tags */}
                    <div className="pt-3 border-t border-rule">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="tech-chip text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
