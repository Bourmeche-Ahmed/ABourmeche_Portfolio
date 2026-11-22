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
    color: "bg-accent",
    badge: "border-border text-accent bg-accent-soft",
    skills: ["ESP32 / ESP-IDF", "Bare-metal C", "RS-485 / Modbus RTU", "BACnet", "OCPP 1.6J/2.0.1", "NB-IoT", "LoRa", "KiCad PCB Design", "STM32"],
  },
  {
    category: "Industrial Ingestion & Backend",
    color: "bg-highlight",
    badge: "border-border text-text-muted bg-surface-hover",
    skills: ["Python", "Django REST Framework", "Flask", "MQTT (Mosquitto)", "Telegraf", "TimescaleDB", "PostgreSQL", "Redis", "Docker Compose"],
  },
  {
    category: "Control Systems & Digital Twins",
    color: "bg-accent",
    badge: "border-border text-accent bg-accent-soft",
    skills: ["MATLAB", "Simulink", "Digital Twins", "Closed-loop PID Control", "Hardware-in-the-loop (HIL)", "Signal Processing"],
  },
  {
    category: "Real-Time Dashboards & Frontend",
    color: "bg-highlight",
    badge: "border-border text-text-muted bg-surface-hover",
    skills: ["React", "TypeScript", "Tailwind CSS", "High-frequency Telemetry Charts", "WebSockets", "Vite"],
  },
  {
    category: "CAD & Fabrication",
    color: "bg-accent",
    badge: "border-border text-text-muted bg-surface-hover",
    skills: ["Onshape (primary CAD tool)", "SolidWorks", "3D printing", "mechanical design for robots"],
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
  { name: "C (Embedded)", value: 40, color: "#2DD4BF" },
  { name: "Python", value: 30, color: "#0F766E" },
  { name: "TypeScript", value: 20, color: "#F5A524" },
  { name: "MATLAB/C++", value: 10, color: "#8FA9B3" },
];

export function SkillCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Radar Chart Panel */}
      <div className="lg:col-span-6 border border-border bg-surface p-6 rounded-lg shadow-card">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
          <div>
            <h3 className="font-heading font-bold text-lg text-text">
              Competency Radar Profile
            </h3>
            <p className="font-sans text-xs text-text-muted">Evaluated engineering proficiency across domains</p>
          </div>
          <span className="font-mono text-xs text-accent font-semibold bg-accent-soft px-2.5 py-0.5 rounded-md border border-border">
            RADAR 01
          </span>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: "var(--text)", fontSize: 11, fontFamily: "Inter, sans-serif" }}
              />
              <Radar
                dataKey="value"
                stroke="var(--accent)"
                fill="var(--accent)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Language / Protocol Matrix */}
      <div className="lg:col-span-6 space-y-6">
        {/* Core Stack Breakdown */}
        <div className="border border-border bg-surface p-6 rounded-lg shadow-card">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-lg text-text">
                Language & Core Tooling Distribution
              </h3>
              <p className="font-sans text-xs text-text-muted">Normalized weighting across active repositories</p>
            </div>
            <span className="font-mono text-xs text-text-muted">
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
                  tick={{ fill: "var(--text)", fontSize: 12, fontFamily: "Inter, sans-serif" }}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, "Share"]}
                  contentStyle={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif",
                    color: "var(--text)",
                    boxShadow: "var(--card-shadow)",
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {languageData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Specification Matrix */}
        <div className="border border-border bg-surface p-6 rounded-lg shadow-card">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
            <h3 className="font-heading font-bold text-lg text-text">
              Technical Domain Matrix
            </h3>
            <span className="font-mono text-xs text-text-muted">
              HARDWARE / FIRMWARE / CLOUD
            </span>
          </div>

          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.category} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-1.5 h-3 rounded-full ${group.color}`} />
                  <h4 className="font-heading font-bold text-sm text-text">
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
