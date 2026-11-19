import React, { useState } from "react";
import { store, SkillGroupId, useAppState } from "@/store";
import { Cpu, Radio, Gauge, Bot, Terminal, Wrench, CheckCircle } from "lucide-react";

interface SkillCategory {
  id: SkillGroupId;
  title: string;
  subsystemName: string;
  icon: React.ElementType;
  skills: string[];
  description: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "embedded",
    title: "Embedded Systems & Hardware",
    subsystemName: "MCU & PCB Module",
    icon: Cpu,
    skills: [
      "Bare-metal C / C++",
      "STM32 (STM32F1 / F4 HAL & Register Level)",
      "ESP32 & ESP32-S3 (ESP-IDF, FreeRTOS)",
      "KiCad PCB Design (2-Layer High-Speed / Power)",
      "Hardware Timers, PWM, Quadrature Encoders, DMA",
      "I2C, SPI, UART, RS-485",
    ],
    description: "Architecting deterministic firmware, bare-metal peripheral drivers, and custom PCBs for real-time vehicular and robotics hardware.",
  },
  {
    id: "protocols",
    title: "Industrial Protocols & IIoT",
    subsystemName: "Telemetry Antenna & Transceiver",
    icon: Radio,
    skills: [
      "RS-485 & Modbus RTU / TCP",
      "CAN 2.0B / CANopen (SN65HVD230)",
      "BACnet MS/TP & IP",
      "OCPP 1.6J / 2.0.1 (EV Charging)",
      "MQTT (Mosquitto), WebSocket Telemetry",
      "NB-IoT & LoRaWAN Field Gateways",
    ],
    description: "Connecting edge devices and energy meters into industrial supervisory architectures via resilient multi-drop fieldbuses.",
  },
  {
    id: "control",
    title: "Automation & Control Systems",
    subsystemName: "IMU Sensor & Drive Wheels",
    icon: Gauge,
    skills: [
      "Cascaded PID Speed & Position Loops",
      "Inverted Pendulum Self-Balancing Control",
      "Hardware-in-the-Loop (HIL) Simulation",
      "MATLAB & Simulink Digital Twins",
      "Euler Integration & State Space Modeling",
      "Active Suspension Damping (Quarter-Car)",
    ],
    description: "Developing closed-loop numerical solvers, digital twin simulations, and discrete controllers for physical dynamic systems.",
  },
  {
    id: "robotics",
    title: "Robotics & Artificial Intelligence",
    subsystemName: "Sensor Tower & ToF Laser Eye",
    icon: Bot,
    skills: [
      "Proximal Policy Optimization (PPO)",
      "Gymnasium & Stable-Baselines3",
      "Webots Physics Simulation",
      "Single ToF Obstacle Avoidance (VFH / VFH+)",
      "Potential Fields Navigation",
      "Quadrature Odometry & Dead Reckoning",
    ],
    description: "Training reinforcement learning policies and adapting classical collision-avoidance algorithms for mobile robots.",
  },
  {
    id: "software",
    title: "Software & DevOps",
    subsystemName: "Back Telemetry Screen & Compute",
    icon: Terminal,
    skills: [
      "Python (FastAPI, Flask, Django REST)",
      "TypeScript, React, Vite, Tailwind CSS",
      "Docker & Docker Compose (9 Microservices)",
      "TimescaleDB, PostgreSQL, Redis, Telegraf",
      "Git, CI/CD GitHub Actions, Linux SysAdmin",
      "High-Frequency Charting (WebSockets)",
    ],
    description: "Full-stack edge architectures: containerized ingestion pipelines, time-series storage, and high-performance engineering consoles.",
  },
  {
    id: "cad",
    title: "CAD & Rapid Fabrication",
    subsystemName: "Structural Chassis & Standoffs",
    icon: Wrench,
    skills: [
      "Onshape (Primary Cloud Parametric CAD)",
      "SolidWorks Modeling & Assemblies",
      "FDM 3D Printing & Slicing Optimization",
      "Mechanical Packaging for Eurobot Clones",
      "Rapid Prototyping & Laser Cutting",
      "DFM (Design for Manufacturing)",
    ],
    description: "Parametric mechanical CAD modeling, multi-tier chassis integration, and rapid fabrication of robust robotic hardware.",
  },
];

export function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState<SkillGroupId>("embedded");
  const hoveredGroup = useAppState((s) => s.hoveredSkillGroup);

  const selectedCategory =
    SKILL_CATEGORIES.find((c) => c.id === (hoveredGroup || activeGroup)) ||
    SKILL_CATEGORIES[0];

  const handleGroupSelect = (id: SkillGroupId) => {
    setActiveGroup(id);
    store.setState({ hoveredSkillGroup: id });
  };

  return (
    <section id="skills" className="py-20 border-b border-hairline relative">
      {/* Background oversized numeral 03 */}
      <div className="absolute right-4 top-10 text-[18vw] font-heading font-extrabold numeral-outlined opacity-15 select-none pointer-events-none">
        03
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent mb-1">
              <span>03 // RESUME COMPETENCIES</span>
              <span className="text-soft">·</span>
              <span>EXPLODED ROBOT HOTSPOTS</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-ink tracking-tight uppercase">
              Skills & Subsystem Breakdown
            </h2>
          </div>
          <p className="font-mono text-[11px] text-soft max-w-xs text-left md:text-right">
            In 3D mode, the robot explodes into its constituent modules. Select any subsystem hotspot to view verified competencies.
          </p>
        </div>

        {/* Hotspot Buttons Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleGroupSelect(cat.id)}
                onMouseEnter={() => store.setState({ hoveredSkillGroup: cat.id })}
                onMouseLeave={() => store.setState({ hoveredSkillGroup: null })}
                onFocus={() => handleGroupSelect(cat.id)}
                className={`p-3 rounded-[2px] border text-left transition-all min-h-[44px] flex flex-col justify-between focus-visible:outline-none ${
                  isSelected
                    ? "bg-accent text-accent-ink border-accent font-bold"
                    : "bg-surface border-hairline text-ink hover:border-accent hover:bg-surface2"
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-accent-ink" : "text-accent"}`} />
                  <span className={`font-mono text-[10px] ${isSelected ? "text-accent-ink/80" : "text-soft"}`}>
                    0{idx + 1}
                  </span>
                </div>
                <div>
                  <div className="font-heading text-sm sm:text-base leading-tight uppercase">
                    {cat.title.split("&")[0].trim()}
                  </div>
                  <div className={`font-mono text-[9px] truncate ${isSelected ? "text-accent-ink/80" : "text-soft"}`}>
                    {cat.subsystemName}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Skill Detail Card */}
        <div className="border border-hairline bg-surface p-6 sm:p-8 rounded-[2px] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-hairline">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[2px] bg-surface2 border border-hairline flex items-center justify-center text-accent">
                <selectedCategory.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl text-ink">
                  {selectedCategory.title}
                </h3>
                <span className="font-mono text-xs text-accent">
                  HOTSPOT: {selectedCategory.subsystemName}
                </span>
              </div>
            </div>
            <span className="font-mono text-xs text-soft">
              VERIFIED PRACTICAL CAPABILITY
            </span>
          </div>

          <p className="font-sans text-sm text-soft leading-relaxed max-w-3xl">
            {selectedCategory.description}
          </p>

          <div className="pt-2">
            <h4 className="font-mono text-xs text-ink font-semibold uppercase tracking-wider mb-3">
              Core Technologies & Methodologies:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {selectedCategory.skills.map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-2 rounded-[2px] bg-surface2 border border-hairline flex items-center gap-2 font-mono text-xs text-ink"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plain Semantic DOM List for Accessibility & SEO */}
        <div className="sr-only">
          <h3>Full Competency Inventory</h3>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <h4>{cat.title} ({cat.subsystemName})</h4>
              <p>{cat.description}</p>
              <ul>
                {cat.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
