import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, MapPin, Building2, GraduationCap } from "lucide-react";

interface JourneyItem {
  id: string;
  year: string;
  role: string;
  org: string;
  location: string;
  type: "industry" | "robotics" | "leadership" | "education";
  summary: string;
  details: string[];
  tech: string[];
}

const JOURNEY_ITEMS: JourneyItem[] = [
  {
    id: "esd",
    year: "JUN 2024 – AUG 2024",
    role: "Embedded Systems & Industrial IoT Intern",
    org: "ESD (Electronic Systems Development) · Vimar Group",
    location: "Ariana, Tunisia",
    type: "industry",
    summary: "Built multi-protocol smart edge gateway bridging BACnet MS/TP, Modbus RTU, and OCPP 1.6J over RS-485 to cloud MQTT brokers.",
    details: [
      "Engineered containerized edge telemetry pipeline with Docker Compose running 9 microservices (Telegraf, Mosquitto, TimescaleDB, Redis, Grafana, Portainer).",
      "Streamed high-frequency power analyzer telemetry with deterministic sub-100ms update cycles for EV charger load-shedding algorithms.",
    ],
    tech: ["RS-485", "Modbus RTU", "BACnet", "OCPP", "Docker Compose", "TimescaleDB", "MQTT", "ESP32"],
  },
  {
    id: "lab619",
    year: "2023 – 2024",
    role: "Robotics & Embedded Hardware Developer",
    org: "LAB619 Makerspace",
    location: "Tunis, Tunisia",
    type: "robotics",
    summary: "Engineered autonomous mobile robot platforms integrating quadrature odometry, cascaded PID loops, and ToF distance sensing.",
    details: [
      "Designed and fabricated custom 2-layer PCBs in KiCad for regulated power delivery and sensor integration.",
      "Modeled multi-tier robot chassis in SolidWorks and 3D-printed rapid structural iterations deployed in international robotics competitions (Eurobot).",
    ],
    tech: ["STM32", "SolidWorks", "KiCad", "Cascaded PID", "Odometry", "3D Printing"],
  },
  {
    id: "cybernexus",
    year: "2023 – 2024",
    role: "Chief Technology Officer (CTO) & Lead Engineer",
    org: "CyberNexus Junior Enterprise",
    location: "INSAT, Tunis",
    type: "leadership",
    summary: "Led engineering roadmap and technical execution across multiple client embedded, IoT, and software projects.",
    details: [
      "Enforced rigorous code quality, git workflows, automated testing, and CI/CD pipelines across multidisciplinary developer teams.",
      "Architected backend APIs, high-throughput schemas, and real-time WebSocket communication layers.",
    ],
    tech: ["Team Leadership", "System Architecture", "Python", "TypeScript", "DevOps"],
  },
  {
    id: "stepact",
    year: "2023 – 2024",
    role: "Lead Full-Stack Web Developer",
    org: "Lions Club STEP'ACT 2026",
    location: "Tunis, Tunisia",
    type: "industry",
    summary: "Architected and deployed high-throughput registration and timing platform handling 2,500+ participants with zero downtime.",
    details: [
      "Integrated real-time payment gateway webhooks, automated SMS/email race bib confirmations, and dynamic dashboard analytics.",
      "Optimized query performance and asset caching to withstand high-volume spikes during nationwide event launch.",
    ],
    tech: ["TypeScript", "React", "High-Volume Traffic", "REST API", "Database Optimization"],
  },
  {
    id: "insat",
    year: "2022 – 2027",
    role: "State Engineering Degree Candidate",
    org: "INSAT · National Institute of Applied Science and Technology",
    location: "Tunis, Tunisia",
    type: "education",
    summary: "Rigorous 5-year engineering program specializing in Industrial Automation, Real-Time IoT, and Automatic Control.",
    details: [
      "Core curriculum: Digital control systems, state-space modeling, embedded microcontrollers, real-time operating systems (RTOS), and industrial robotics.",
      "Available for Final-Year Engineering Project (PFE) starting February 2027.",
    ],
    tech: ["Automatic Control", "State Space", "RTOS", "Embedded C", "Robotics", "Industrial Networks"],
  },
];

export function JourneySection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <section id="journey" className="py-24 border-b border-hairline relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-4 mb-16 font-mono text-xs text-soft">
          <div className="flex items-center gap-2">
            <span className="text-accent font-semibold">03 // JOURNEY</span>
            <span>·</span>
            <span>EXPERIENCE &amp; EDUCATION</span>
          </div>
          <div className="text-soft sm:text-right">
            5 MILESTONES · 2022–2027
          </div>
        </div>

        {/* --- DESKTOP: 3-COLUMN GRID / MOBILE: HORIZONTAL SCROLL-SNAP ROW --- */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none">
          {JOURNEY_ITEMS.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="w-[85vw] sm:w-[65vw] md:w-auto flex-shrink-0 snap-start border border-hairline bg-surface flex flex-col justify-between transition-colors focus-within:border-hairline-strong"
              >
                {/* Header row */}
                <div className="p-6 md:p-7 space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-soft">
                    <span className="text-accent font-semibold">{item.year}</span>
                    <span className="text-soft/60">0{idx + 1}</span>
                  </div>

                  <h3 className="font-heading font-black text-xl md:text-2xl text-ink uppercase tracking-tight leading-tight">
                    {item.role}
                  </h3>

                  <div className="space-y-1 font-sans text-xs text-soft">
                    <div className="text-ink font-medium">{item.org}</div>
                    <div className="font-mono text-[11px] text-soft/70">{item.location}</div>
                  </div>

                  <p className="font-sans text-sm text-soft leading-relaxed pt-2 border-t border-hairline">
                    {item.summary}
                  </p>

                  {/* Expandable Technical Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden space-y-3 pt-3 border-t border-hairline"
                      >
                        <div className="space-y-2">
                          {item.details.map((d, dIdx) => (
                            <p key={dIdx} className="font-sans text-xs text-soft/90 leading-relaxed pl-2 border-l border-accent/40">
                              {d}
                            </p>
                          ))}
                        </div>

                        <div className="font-mono text-[10px] text-accent pt-1 flex flex-wrap gap-1.5">
                          {item.tech.map((t) => (
                            <span key={t} className="bg-surface2 px-1.5 py-0.5 border border-hairline">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Toggle Bar */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full py-3 px-6 border-t border-hairline font-mono text-[11px] uppercase tracking-wider text-soft hover:text-accent hover:bg-surface2 transition-colors flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  <span>{isExpanded ? "Collapse Specs" : "View Technical Highlights"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
