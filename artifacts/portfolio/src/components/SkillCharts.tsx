import { motion } from "framer-motion";
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
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "UI Animation"],
    color: "#22d3ee",
    icon: "⚡",
  },
  {
    category: "Backend",
    skills: ["Python", "Flask", "REST APIs", "Node.js"],
    color: "#3b82f6",
    icon: "🔧",
  },
  {
    category: "IIoT / Real-time",
    skills: ["Dashboards", "Signal Viz", "Monitoring", "WebSockets"],
    color: "#8b5cf6",
    icon: "📡",
  },
  {
    category: "Tooling",
    skills: ["Git", "Docker", "Bash/Shell", "Vite", "Testing"],
    color: "#10b981",
    icon: "🛠",
  },
];

const radarData = [
  { skill: "Frontend", value: 90 },
  { skill: "Python/Flask", value: 82 },
  { skill: "IIoT/Real-time", value: 78 },
  { skill: "UI/UX Design", value: 75 },
  { skill: "DevOps", value: 60 },
  { skill: "Data Analysis", value: 70 },
];

const languageData = [
  { name: "TypeScript", value: 42, color: "#3178C6" },
  { name: "Python", value: 28, color: "#3572A5" },
  { name: "JavaScript", value: 19, color: "#F1E05A" },
  { name: "HTML/SCSS", value: 7, color: "#E44D26" },
  { name: "CSS", value: 3, color: "#563D7C" },
  { name: "Other", value: 1, color: "#6e7681" },
];

function SkillBar({ skill, index }: { skill: (typeof skillGroups)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="rounded-xl border border-white/10 bg-white/5 dark:bg-white/3 p-4 hover:border-cyan-500/30 transition-colors"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{skill.icon}</span>
        <span className="font-semibold text-sm" style={{ color: skill.color }}>
          {skill.category}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skill.skills.map((s) => (
          <span
            key={s}
            className="text-xs px-2 py-0.5 rounded-full border"
            style={{
              borderColor: `${skill.color}30`,
              backgroundColor: `${skill.color}10`,
              color: skill.color,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
          Skill Coverage
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(99,179,237,0.15)" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Radar
              dataKey="value"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
          Language Composition
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={languageData} layout="vertical" margin={{ left: 0, right: 16 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip
              formatter={(v) => [`${v}%`, "Share"]}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {languageData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {skillGroups.map((skill, i) => (
            <SkillBar key={skill.category} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
