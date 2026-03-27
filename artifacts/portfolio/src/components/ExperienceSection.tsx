import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Briefcase, Building2, ExternalLink } from "lucide-react";

const experiences = [
  {
    type: "work",
    role: "Co-founder & CTO",
    company: "CyberNexus",
    companyUrl: "https://cybernexus.tn",
    period: "2024 — Present",
    location: "Tunisia",
    description:
      "Co-founded CyberNexus, a technology company building digital products at the intersection of sports data and web engineering. As CTO, I lead all technical strategy, architecture decisions, and product development.",
    highlights: [
      "Define and own the full technical stack and architecture across all products",
      "Build and manage the engineering team culture, workflows, and delivery processes",
      "Drive company's technical vision: real-time data, interactive dashboards, and scalable APIs",
    ],
    tags: ["TypeScript", "Python", "React", "System Architecture", "Leadership", "Product"],
    accent: "from-cyan-500 to-blue-500",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    badge: "Current",
    badgeColor: "text-green-400 bg-green-500/10 border-green-500/25",
  },
  {
    type: "internship",
    role: "Embedded Systems & IoT Engineering Intern",
    company: "LAB619",
    companyUrl: null,
    period: "July 2025 — September 2025",
    location: "Tunisia · 2 months",
    description:
      "Summer internship within LAB619's R&D department, working on the conception and realization of an industrial IoT node for environmental anomaly detection and industrial supervision.",
    highlights: [
      "Designed the complete hardware circuit integrating ESP32-S3 with multi-sensor array (microphone, gyroscope/accelerometer, temperature/humidity/pressure, gas sensor)",
      "Integrated industrial communication modules: RS485, RS232, LoRa, and NB-IoT (SIM7022) for long-range telemetry",
      "Developed bare-metal firmware in C under ESP-IDF for sensor acquisition, protocol handling, and anomaly detection algorithms",
      "Performed PCB routing with RF constraints, power isolation design, and energy optimization",
      "Validated the prototype end-to-end: functional tests, power consumption benchmarks, and industrial interface validation",
    ],
    tags: [
      "ESP32-S3",
      "ESP-IDF",
      "C / Bare-metal",
      "NB-IoT",
      "RS485",
      "LoRa",
      "KiCad",
      "PCB Design",
      "Industrial IoT",
    ],
    accent: "from-blue-500 to-violet-500",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    badge: "Internship",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  },
];

export function ExperienceSection() {
  return (
    <section id="timeline" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <SectionHeader
        tag="Experience"
        title="Professional Experience"
        subtitle="Hands-on work building real products — from embedded hardware to software leadership."
      />

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.55 }}
            className="relative rounded-2xl border border-white/8 bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-cyan-500/25 transition-all duration-300"
          >
            <div
              className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent`}
            />
            <div
              className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${exp.accent} opacity-60`}
            />

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                <div className={`shrink-0 w-11 h-11 rounded-xl ${exp.iconBg} flex items-center justify-center`}>
                  {exp.type === "work" ? (
                    <Building2 className={`w-5 h-5 ${exp.iconColor}`} />
                  ) : (
                    <Briefcase className={`w-5 h-5 ${exp.iconColor}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-foreground">{exp.role}</h3>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${exp.badgeColor}`}
                    >
                      {exp.badge}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:underline"
                      >
                        {exp.company}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-cyan-400">{exp.company}</span>
                    )}
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className="text-xs text-muted-foreground">{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {exp.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Key Contributions
                </h4>
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-muted-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
