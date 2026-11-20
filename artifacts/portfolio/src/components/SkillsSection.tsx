import React from "react";
import { motion } from "framer-motion";

interface SkillBlock {
  id: string;
  title: string;
  lead: string;
  skills: string[];
}

const SKILL_BLOCKS: SkillBlock[] = [
  {
    id: "robotics-control",
    title: "01 // ROBOTICS & CONTROL",
    lead: "Closed-loop feedback & dynamics modeling",
    skills: [
      "Cascaded PID Speed & Position",
      "Inverted Pendulum Balancing",
      "PPO Reinforcement Learning",
      "Gymnasium",
      "Webots Physics Simulation",
      "State-Space Modeling",
      "Euler Integration",
      "Quadrature Odometry",
      "Vector Field Histogram (VFH+)",
    ],
  },
  {
    id: "embedded-systems",
    title: "02 // EMBEDDED SYSTEMS",
    lead: "Deterministic real-time firmware & microcontrollers",
    skills: [
      "Bare-metal C / C++",
      "STM32 (F1 / F4 HAL & Register Level)",
      "ESP32 & ESP32-S3 (ESP-IDF)",
      "FreeRTOS Preemptive Tasks",
      "Hardware Timers & PWM Generation",
      "DMA Buffer Transfers",
      "UART / I2C / SPI",
      "Arduino Hardware Architecture",
    ],
  },
  {
    id: "industrial-iiot",
    title: "03 // INDUSTRIAL AUTOMATION & IIoT",
    lead: "Fieldbus telemetry & supervisory architectures",
    skills: [
      "RS-485 Serial Standards",
      "Modbus RTU / Modbus TCP",
      "CAN 2.0B & CANopen (SN65HVD230)",
      "BACnet MS/TP & IP",
      "OCPP 1.6J / 2.0.1 (EV Charging)",
      "MQTT (Mosquitto Broker)",
      "Edge Gateway Ingestion",
      "Contiguous Register Batching",
    ],
  },
  {
    id: "software-dev",
    title: "04 // SOFTWARE & DEVELOPMENT",
    lead: "Edge microservices, time-series storage & tooling",
    skills: [
      "Python (FastAPI, Django REST, Flask)",
      "TypeScript & Modern React",
      "Docker & Docker Compose (9 Microservices)",
      "TimescaleDB & PostgreSQL",
      "Redis Caching",
      "Telegraf Collector",
      "Git & GitHub Actions CI/CD",
      "Linux SysAdmin & Shell",
    ],
  },
  {
    id: "electronics-hardware",
    title: "05 // ELECTRONICS & HARDWARE",
    lead: "Board layout, power conversion & mechanical packaging",
    skills: [
      "KiCad 2-Layer PCB Layout",
      "Switching Buck Converters (TPS54360)",
      "Automotive TVS Clamping (ISO 7637)",
      "Level Shifting Logic (74HCT244)",
      "Onshape Cloud Parametric CAD",
      "SolidWorks Modeling & Assemblies",
      "FDM 3D Printing & Slicing",
      "Rapid Eurobot Prototyping",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 border-b border-hairline relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-4 mb-16 font-mono text-xs text-soft">
          <div className="flex items-center gap-2">
            <span className="text-accent font-semibold">04 // COMPETENCIES</span>
            <span>·</span>
            <span>TECHNICAL DOMAINS &amp; TOOLING</span>
          </div>
          <div className="text-soft sm:text-right">
            5 DOMAINS · STRICT CO-DESIGN
          </div>
        </div>

        {/* 12-Column Asymmetric Grid: Top Row (3 Blocks, 4 cols each) + Bottom Row (2 Blocks, 6 cols each) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Top 3 Blocks (4 columns each on desktop) */}
          {SKILL_BLOCKS.slice(0, 3).map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 p-6 md:p-8 border border-hairline bg-surface flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-mono text-xs text-accent font-semibold tracking-wider">
                  {block.title}
                </h3>
                <p className="font-heading font-black text-2xl text-ink uppercase tracking-tight">
                  {block.lead}
                </p>
              </div>

              {/* Flowing Inline Typography (NO bullets, NO pills) */}
              <div className="pt-4 border-t border-hairline font-sans text-sm text-soft leading-relaxed">
                {block.skills.map((skill, sIdx) => (
                  <React.Fragment key={skill}>
                    <span className="text-ink/90 hover:text-accent transition-colors">
                      {skill}
                    </span>
                    {sIdx < block.skills.length - 1 && (
                      <span className="text-soft/40 mx-2 select-none">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Bottom 2 Blocks (6 columns each on desktop) */}
          {SKILL_BLOCKS.slice(3, 5).map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.42, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 p-6 md:p-8 border border-hairline bg-surface flex flex-col justify-between space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-mono text-xs text-accent font-semibold tracking-wider">
                  {block.title}
                </h3>
                <p className="font-heading font-black text-2xl text-ink uppercase tracking-tight">
                  {block.lead}
                </p>
              </div>

              {/* Flowing Inline Typography (NO bullets, NO pills) */}
              <div className="pt-4 border-t border-hairline font-sans text-sm text-soft leading-relaxed">
                {block.skills.map((skill, sIdx) => (
                  <React.Fragment key={skill}>
                    <span className="text-ink/90 hover:text-accent transition-colors">
                      {skill}
                    </span>
                    {sIdx < block.skills.length - 1 && (
                      <span className="text-soft/40 mx-2 select-none">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
