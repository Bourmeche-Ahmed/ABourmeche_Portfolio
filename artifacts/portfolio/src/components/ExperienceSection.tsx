import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  badge: string;
  highlights: string[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "esd-vimar",
    role: "Embedded Systems & Industrial IoT Intern",
    company: "ESD (Electronic Systems Development) · Vimar Group",
    period: "Jun 2024 – Aug 2024",
    location: "Ariana, Tunisia",
    badge: "IIoT GATEWAY",
    highlights: [
      "Built multi-protocol smart edge gateway bridging BACnet MS/TP, Modbus RTU, and OCPP 1.6J over RS-485 to cloud MQTT brokers.",
      "Engineered containerized edge telemetry pipeline with Docker Compose running 9 microservices (Telegraf, Mosquitto, TimescaleDB, Redis, Grafana, Portainer).",
      "Streamed high-frequency power analyzer telemetry with deterministic sub-100ms update cycles for EV charger load-shedding algorithms.",
    ],
    skills: ["RS-485", "Modbus RTU", "BACnet", "OCPP", "Docker Compose", "TimescaleDB", "MQTT", "ESP32"],
  },
  {
    id: "lab619",
    role: "Robotics & Embedded Hardware Developer",
    company: "LAB619 Makerspace",
    period: "2023 – 2024",
    location: "Tunis, Tunisia",
    badge: "ROBOTICS R&D",
    highlights: [
      "Engineered autonomous mobile robot platforms integrating quadrature odometry, cascaded PID loops, and ToF distance sensing.",
      "Designed and fabricated custom 2-layer PCBs in KiCad for regulated power delivery and high-speed sensor integration.",
      "Modeled multi-tier robot chassis in SolidWorks and 3D-printed rapid structural iterations deployed in international robotics competitions (Eurobot).",
    ],
    skills: ["STM32", "SolidWorks", "KiCad", "Cascaded PID", "Odometry", "3D Printing"],
  },
  {
    id: "cybernexus",
    role: "Chief Technology Officer (CTO) & Lead Engineer",
    company: "CyberNexus Junior Enterprise",
    period: "2023 – 2024",
    location: "INSAT, Tunis",
    badge: "LEADERSHIP",
    highlights: [
      "Led engineering roadmap and technical execution across multiple client embedded, IoT, and full-stack web projects.",
      "Enforced rigorous code quality, git workflows, automated testing, and CI/CD pipelines across multidisciplinary developer teams.",
      "Architected backend APIs, high-throughput database schemas, and real-time WebSocket communication layers.",
    ],
    skills: ["Team Leadership", "System Architecture", "Python", "TypeScript", "DevOps"],
  },
  {
    id: "stepact",
    role: "Lead Full-Stack Web Developer",
    company: "Lions Club STEP'ACT 2026",
    period: "2023 – 2024",
    location: "Tunis, Tunisia",
    badge: "HIGH-SCALE EVENT",
    highlights: [
      "Architected and deployed high-throughput registration, timing, and ticket verification platform handling 2,500+ participants with zero downtime.",
      "Integrated real-time payment gateway webhooks, automated SMS/email race bib confirmations, and dynamic dashboard analytics.",
      "Optimized query performance and asset caching to withstand high-volume spikes during nationwide event launch.",
    ],
    skills: ["TypeScript", "React", "High-Volume Traffic", "REST API", "Database Optimization"],
  },
];

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const top = rect.top;
      const total = rect.height;

      if (top < windowHeight && top + total > 0) {
        const scrolled = (windowHeight - top) / (windowHeight + total * 0.7);
        setLineHeight(Math.min(100, Math.max(0, scrolled * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="py-20 border-b border-hairline relative">
      {/* Background oversized numeral 05 */}
      <div className="absolute right-4 top-10 text-[18vw] font-heading font-extrabold numeral-outlined opacity-15 select-none pointer-events-none">
        05
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-4 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent mb-1">
              <span>05 // TRACK RECORD</span>
              <span className="text-soft">·</span>
              <span>CHRONOLOGICAL TIMELINE</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-ink tracking-tight uppercase">
              Engineering Experience
            </h2>
          </div>
          <p className="font-mono text-[11px] text-soft max-w-xs text-left md:text-right">
            Practical deployments in industrial IoT, edge computing, robotics fabrication, and high-scale software.
          </p>
        </div>

        {/* Timeline with line-draw on scroll */}
        <div ref={containerRef} className="relative pl-6 sm:pl-10 space-y-10 sm:space-y-12">
          {/* Base background line */}
          <div className="absolute left-2.5 sm:left-4 top-2 bottom-4 w-[1px] bg-hairline" />

          {/* Dynamic drawing accent line */}
          <div
            className="absolute left-2.5 sm:left-4 top-2 w-[1px] bg-accent transition-all duration-150 origin-top"
            style={{ height: `${lineHeight}%` }}
          />

          {EXPERIENCES.map((exp, idx) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Node Indicator */}
              <div className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-[2px] bg-surface border border-hairline group-hover:border-accent flex items-center justify-center transition-colors">
                <div className="w-1.5 h-1.5 rounded-[1px] bg-accent" />
              </div>

              {/* Card Container */}
              <div className="border border-hairline bg-surface p-5 sm:p-7 rounded-[2px] hover:border-accent/80 transition-colors space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-hairline">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                        {exp.role}
                      </h3>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded-[1px] bg-surface2 border border-hairline text-accent font-semibold">
                        {exp.badge}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-accent font-medium mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end font-mono text-xs text-soft">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-soft" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 pt-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-soft leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-accent shrink-0 mt-2" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Skill Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.skills.map((s) => (
                    <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded-[2px] bg-surface2 border border-hairline text-soft">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
