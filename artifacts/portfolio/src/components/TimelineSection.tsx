import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const timelineItems = [
  {
    period: "2024 — Present",
    title: "Real-time Control Dashboard Development",
    description:
      "Built a full-stack PID control system with React, Flask, and MATLAB Simulink digital twin — enabling live parameter tuning and signal visualization for engineering applications.",
    tags: ["React", "Flask", "MATLAB", "WebSocket"],
    dot: "bg-cyan-400",
  },
  {
    period: "2024",
    title: "IIoT Predictive Maintenance Platform",
    description:
      "Designed and developed an industrial IoT analytics dashboard aggregating sensor telemetry, ML predictions, and anomaly alerts for equipment health monitoring.",
    tags: ["JavaScript", "Python", "ML", "IIoT"],
    dot: "bg-blue-400",
  },
  {
    period: "2024",
    title: "Browser Extension: AI Writing Coach",
    description:
      "Developed a privacy-friendly Chrome extension providing real-time AI writing assistance within LinkedIn, using Manifest V3 and content script injection patterns.",
    tags: ["Chrome Extension", "JavaScript", "AI", "MV3"],
    dot: "bg-violet-400",
  },
  {
    period: "2023 — 2024",
    title: "Football Data Platform — ElTachkila",
    description:
      "Built a TypeScript + Python football intelligence platform with real-time match tracking, player analytics, and comparative team statistics.",
    tags: ["TypeScript", "Python", "REST API", "Data Viz"],
    dot: "bg-green-400",
  },
  {
    period: "2023",
    title: "IEEE Student Branch Website",
    description:
      "Designed and built a fully responsive organizational website with SCSS component architecture and PHP backend — managing events, members, and publications.",
    tags: ["HTML", "SCSS", "PHP", "Responsive"],
    dot: "bg-orange-400",
  },
  {
    period: "2023",
    title: "UI & Interaction Research",
    description:
      "Ongoing experimentation with advanced UI patterns, TypeScript generics for components, animation systems, and browser-native API capabilities through prototyping projects.",
    tags: ["TypeScript", "Experiments", "Animation", "Browser APIs"],
    dot: "bg-pink-400",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <SectionHeader
        tag="Timeline"
        title="Selected Work & Projects"
        subtitle="A chronological view of key milestones and project deliveries."
      />

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent -translate-x-px" />

        <div className="space-y-10">
          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative flex gap-6 md:gap-0 ${
                i % 2 === 0
                  ? "md:flex-row-reverse md:text-right"
                  : "md:flex-row"
              }`}
            >
              <div className="md:flex-1 md:px-8">
                <div className="rounded-xl border border-white/8 bg-card/60 backdrop-blur-sm p-5 hover:border-cyan-500/25 transition-colors group">
                  <p className="text-xs font-mono text-cyan-400 mb-1">{item.period}</p>
                  <h3 className="font-bold text-sm text-foreground mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className={`flex flex-wrap gap-1.5 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative flex items-start pt-5 md:pt-0 md:flex-none md:flex md:items-center md:justify-center md:w-8">
                <div
                  className={`w-3 h-3 rounded-full border-2 border-background shadow-lg z-10 ${item.dot}`}
                />
              </div>

              <div className="hidden md:block md:flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
