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

const skillGroups = [
  {
    category: "Embedded Systems & Hardware",
    color: "bg-orange-500",
    badge: "border-orange-500/30 text-orange-600 dark:text-orange-400",
    skills: ["ESP32 / ESP-IDF", "Bare-metal C", "RS-485 / Modbus RTU", "BACnet", "OCPP 1.6J/2.0.1", "NB-IoT", "LoRa", "KiCad PCB Design", "STM32"],
  },
  {
    category: "Industrial Ingestion & Backend",
    color: "bg-sky-500",
    badge: "border-sky-500/30 text-sky-600 dark:text-sky-400",
    skills: ["Python", "Django REST Framework", "Flask", "MQTT (Mosquitto)", "Telegraf", "TimescaleDB", "PostgreSQL", "Redis", "Docker Compose"],
  },
  {
    category: "Control Systems & Digital Twins",
    color: "bg-teal-500",
    badge: "border-teal-500/30 text-teal-600 dark:text-teal-400",
    skills: ["MATLAB", "Simulink", "Digital Twins", "Closed-loop PID Control", "Hardware-in-the-loop (HIL)", "Signal Processing"],
  },
  {
    category: "Real-Time Dashboards & Frontend",
    color: "bg-indigo-500",
    badge: "border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
    skills: ["React", "TypeScript", "Tailwind CSS", "High-frequency Telemetry Charts", "WebSockets", "Vite"],
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
  { name: "C (Embedded)", value: 40, color: "#ea580c" },
  { name: "Python", value: 30, color: "#0284c7" },
  { name: "TypeScript", value: 20, color: "#3b82f6" },
  { name: "MATLAB/C++", value: 10, color: "#7c3aed" },
];

export function SkillCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Radar Chart Panel */}
      <div className="lg:col-span-6 border border-rule bg-panel-raised p-6 rounded-[2px]">
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
                <Bar dataKey="value" radius={[0, 2, 2, 0]}>
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
            <h3 className="font-heading font-bold text-lg text-ink">
              Technical Domain Matrix
            </h3>
            <span className="font-mono text-xs text-ink-soft">
              HARDWARE / FIRMWARE / CLOUD
            </span>
          </div>

          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.category} className="pb-3 border-b border-rule last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-1.5 h-3 rounded-[1px] ${group.color}`} />
                  <h4 className="font-heading font-bold text-sm text-ink">
                    {group.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-3.5">
                  {group.skills.map((s) => (
                    <span key={s} className="tech-chip text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
