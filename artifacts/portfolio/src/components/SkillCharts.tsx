import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/data/projects";

const skillGroups = [
  {
    category: "Embedded Systems & Hardware",
    color: "bg-hardware",
    badge: "border-hardware/30 text-hardware-text",
    skills: ["ESP32 / ESP-IDF", "Bare-metal C", "RS-485 / Modbus RTU", "BACnet", "OCPP 1.6J/2.0.1", "NB-IoT", "LoRa", "KiCad PCB Design", "STM32"],
    projectIds: ["vroom", "farzit", "self-balancing-robot"],
  },
  {
    category: "Industrial Ingestion & Backend",
    color: "bg-signal",
    badge: "border-signal/30 text-signal",
    skills: ["Python", "Django REST Framework", "Flask", "MQTT (Mosquitto)", "Telegraf", "TimescaleDB", "PostgreSQL", "Redis", "Docker Compose"],
    projectIds: ["iiot-predictive-maintenance"],
  },
  {
    category: "Control Systems & Digital Twins",
    color: "bg-signal",
    badge: "border-signal/30 text-signal",
    skills: ["MATLAB", "Simulink", "Digital Twins", "Closed-loop PID Control", "Hardware-in-the-loop (HIL)", "Signal Processing"],
    projectIds: ["pid-control-dashboard", "quarter-car-suspension-system"],
  },
  {
    category: "Real-Time Dashboards & Frontend",
    color: "bg-signal",
    badge: "border-signal/30 text-signal",
    skills: ["React", "TypeScript", "Tailwind CSS", "High-frequency Telemetry Charts", "WebSockets", "Vite"],
    projectIds: ["pid-control-dashboard", "iiot-predictive-maintenance"],
  },
  {
    category: "CAD & Fabrication",
    color: "bg-hardware",
    badge: "border-hardware/30 text-hardware-text",
    skills: ["Onshape (primary CAD tool)", "SolidWorks", "3D printing", "mechanical design for robots"],
    projectIds: ["farzit", "self-balancing-robot", "line-follower-robot"],
  },
];

const radarData = [
  { skill: "Embedded / Firmware", value: 95 },
  { skill: "Industrial Protocols", value: 92 },
  { skill: "Edge Gateways / IoT", value: 90 },
  { skill: "Backend / Ingestion", value: 85 },
  { skill: "Control / Simulation", value: 82 },
  { skill: "Web Dashboards", value: 88 },
];

const languageData = [
  { name: "C (Embedded)", value: 40, color: "#D6955B" },
  { name: "Python", value: 30, color: "#226D68" },
  { name: "TypeScript", value: 20, color: "#18534F" },
  { name: "MATLAB/C++", value: 10, color: "#3F6B66" },
];

export function SkillCharts() {
  const [radarRef, radarInView] = useInViewOnce<HTMLDivElement>({ threshold: 0.1 });
  const [activeGroup, setActiveGroup] = useState<string | null>("Embedded Systems & Hardware");
  const reducedMotion = useReducedMotion();

  const handleOpenProject = (projectId: string) => {
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      window.dispatchEvent(new CustomEvent("open-project-modal", { detail: proj }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Radar Chart Panel */}
      <div ref={radarRef} className="lg:col-span-6 border border-rule bg-panel-raised p-6 rounded-[2px]">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-rule">
          <div>
            <h3 className="font-heading font-bold text-lg text-ink">
              Competency Radar Profile
            </h3>
            <p className="font-sans text-xs text-ink-soft">Evaluated engineering proficiency across domains</p>
          </div>
          <span className="font-mono text-xs text-signal font-semibold bg-signal/10 px-2 py-0.5 rounded-[2px] border border-signal/30">
            RADAR 01
          </span>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--rule)" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "var(--ink)", fontSize: 11, fontFamily: "IBM Plex Sans" }}
              />
              <Radar
                dataKey="value"
                stroke="var(--signal)"
                fill="var(--signal)"
                fillOpacity={0.25}
                strokeWidth={2}
                isAnimationActive={!reducedMotion && radarInView}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Language / Protocol Matrix */}
      <div className="lg:col-span-6 space-y-6">
        {/* Core Stack Breakdown */}
        <div className="border border-rule bg-panel-raised p-6 rounded-[2px]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rule">
            <div>
              <h3 className="font-heading font-bold text-lg text-ink">
                Language & Core Tooling Distribution
              </h3>
              <p className="font-sans text-xs text-ink-soft">Normalized weighting across active repositories</p>
            </div>
            <span className="font-mono text-xs text-ink-soft">
              % SHARE
            </span>
          </div>

          <div className="w-full h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={languageData} layout="vertical" margin={{ left: 0, right: 16 }}>
                <XAxis type="number" hide domain={[0, 45]} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fill: "var(--ink)", fontSize: 12, fontFamily: "IBM Plex Sans" }}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, "Share"]}
                  contentStyle={{
                    background: "var(--panel-raised)",
                    border: "1px solid var(--rule)",
                    borderRadius: "2px",
                    fontSize: "12px",
                    fontFamily: "IBM Plex Sans",
                    color: "var(--ink)",
                  }}
                />
                <Bar dataKey="value" radius={[0, 2, 2, 0]} isAnimationActive={!reducedMotion}>
                  {languageData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Specification Matrix */}
        <div className="border border-rule bg-panel-raised p-6 rounded-[2px]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-rule">
            <div>
              <h3 className="font-heading font-bold text-lg text-ink">
                Technical Domain Matrix
              </h3>
              <p className="font-sans text-[11px] text-ink-soft">
                Tap any category to view applied projects
              </p>
            </div>
            <span className="font-mono text-xs text-ink-soft">
              HARDWARE / FIRMWARE / CAD
            </span>
          </div>

          <div className="space-y-4">
            {skillGroups.map((group) => {
              const isSelected = activeGroup === group.category;
              return (
                <div
                  key={group.category}
                  onClick={() => setActiveGroup((cur) => (cur === group.category ? null : group.category))}
                  className={`p-3 rounded-[2px] border transition-all cursor-pointer ${
                    isSelected ? "border-ink-soft bg-panel-sunk" : "border-rule bg-panel hover:border-ink-soft/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-3 rounded-[1px] ${group.color}`} />
                      <h4 className="font-heading font-bold text-sm text-ink">
                        {group.category}
                      </h4>
                    </div>
                    {isSelected && (
                      <span className="font-mono text-[10px] text-signal font-semibold">
                        APPLIED IN:
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pl-3.5 mb-2">
                    {group.skills.map((s) => (
                      <span key={s} className="tech-chip text-xs">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Linked Projects Chips */}
                  {isSelected && group.projectIds && group.projectIds.length > 0 && (
                    <div className="pt-2 pl-3.5 border-t border-rule flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-ink-soft">Projects:</span>
                      {group.projectIds.map((pid) => {
                        const proj = projects.find((p) => p.id === pid);
                        if (!proj) return null;
                        return (
                          <button
                            key={pid}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenProject(pid);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] bg-panel-raised border border-rule hover:border-signal text-[11px] font-sans font-medium text-ink hover:text-signal transition-colors"
                          >
                            <span>{proj.title.split("–")[0].trim()}</span>
                            <ArrowUpRight className="w-3 h-3 text-signal" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
