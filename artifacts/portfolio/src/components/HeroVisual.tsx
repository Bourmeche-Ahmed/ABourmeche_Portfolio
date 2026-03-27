import { motion } from "framer-motion";

const float = {
  y: [0, -10, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

const blink = {
  scaleY: [1, 0.08, 1, 1, 1],
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 0.6, 1] },
};

const pulse = {
  opacity: [0.4, 1, 0.4],
  scale: [0.95, 1.05, 0.95],
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
};

const orbitA = {
  rotate: [0, 360],
  transition: { duration: 14, repeat: Infinity, ease: "linear" },
};

const orbitB = {
  rotate: [360, 0],
  transition: { duration: 9, repeat: Infinity, ease: "linear" },
};

const glowPulse = {
  opacity: [0.15, 0.35, 0.15],
  scale: [1, 1.12, 1],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

const BADGES = [
  { label: "React", color: "#61DAFB", angle: 0 },
  { label: "TypeScript", color: "#3178C6", angle: 72 },
  { label: "Python", color: "#3572A5", angle: 144 },
  { label: "Flask", color: "#10b981", angle: 216 },
  { label: "PostgreSQL", color: "#336791", angle: 288 },
];

function polarToXY(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center w-[340px] h-[420px] select-none"
    >
      {/* Outer ambient glow */}
      <motion.div
        animate={glowPulse}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(34,211,238,0.18) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Orbit ring A */}
      <motion.div
        animate={orbitA}
        className="absolute"
        style={{ width: 300, height: 300, transformOrigin: "150px 150px", top: "50%", left: "50%", marginTop: -150, marginLeft: -150 }}
      >
        {/* Ring itself */}
        <svg width="300" height="300" viewBox="0 0 300 300" className="absolute inset-0 opacity-20">
          <ellipse cx="150" cy="150" rx="138" ry="50" stroke="#22d3ee" strokeWidth="1" fill="none" strokeDasharray="4 6" />
        </svg>

        {/* Orbiting dots */}
        {[0, 120, 240].map((angle) => {
          const pos = polarToXY(angle, 138);
          return (
            <div
              key={angle}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/60"
              style={{ left: 150 + pos.x - 3, top: 150 + pos.y * 0.36 - 3 }}
            />
          );
        })}
      </motion.div>

      {/* Orbit ring B */}
      <motion.div
        animate={orbitB}
        className="absolute"
        style={{ width: 260, height: 260, transformOrigin: "130px 130px", top: "50%", left: "50%", marginTop: -130, marginLeft: -130 }}
      >
        <svg width="260" height="260" viewBox="0 0 260 260" className="absolute inset-0 opacity-10">
          <ellipse cx="130" cy="130" rx="120" ry="44" stroke="#60a5fa" strokeWidth="1" fill="none" strokeDasharray="2 8" />
        </svg>
        {[60, 180, 300].map((angle) => {
          const pos = polarToXY(angle, 120);
          return (
            <div
              key={angle}
              className="absolute w-1 h-1 rounded-full bg-blue-400/50"
              style={{ left: 130 + pos.x - 2, top: 130 + pos.y * 0.366 - 2 }}
            />
          );
        })}
      </motion.div>

      {/* Floating tech badges */}
      {BADGES.map((badge, i) => {
        const radius = 148;
        const pos = polarToXY(badge.angle, radius);
        return (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 + i * 0.15, duration: 0.5, ease: "backOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y * 0.55 + 20}px))`,
            }}
          >
            <motion.div
              animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold whitespace-nowrap"
              style={{
                background: `${badge.color}18`,
                border: `1px solid ${badge.color}40`,
                color: badge.color,
                boxShadow: `0 0 10px ${badge.color}20`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: badge.color }} />
              {badge.label}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Main robot — floating */}
      <motion.div animate={float} className="relative z-10">
        <svg width="180" height="240" viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* ── Glow behind head ── */}
          <ellipse cx="90" cy="78" rx="52" ry="44" fill="url(#headGlow)" opacity="0.5" />

          {/* ── Antenna ── */}
          <line x1="90" y1="26" x2="90" y2="42" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <motion.circle animate={pulse} cx="90" cy="20" r="5" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }} />

          {/* ── Head ── */}
          <rect x="52" y="42" width="76" height="64" rx="16" fill="url(#headGrad)" />
          {/* Head border */}
          <rect x="52" y="42" width="76" height="64" rx="16" stroke="rgba(34,211,238,0.4)" strokeWidth="1.5" fill="none" />
          {/* Inner head highlight */}
          <rect x="56" y="46" width="68" height="22" rx="10" fill="rgba(255,255,255,0.05)" />

          {/* ── Eyes ── */}
          <motion.g animate={blink} style={{ originX: "72px", originY: "72px" }}>
            {/* Left eye */}
            <rect x="64" y="64" width="18" height="14" rx="5" fill="url(#eyeGrad)" style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }} />
            <rect x="68" y="67" width="6" height="5" rx="2" fill="rgba(255,255,255,0.7)" />
          </motion.g>
          <motion.g animate={blink} style={{ originX: "98px", originY: "72px" }}>
            {/* Right eye */}
            <rect x="98" y="64" width="18" height="14" rx="5" fill="url(#eyeGrad)" style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }} />
            <rect x="102" y="67" width="6" height="5" rx="2" fill="rgba(255,255,255,0.7)" />
          </motion.g>

          {/* ── Mouth / speaker ── */}
          <rect x="72" y="87" width="36" height="10" rx="5" fill="rgba(0,0,0,0.3)" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={76 + i * 8} y={89} width="3" height="6" rx="1.5" fill="rgba(34,211,238,0.6)" />
          ))}

          {/* ── Neck ── */}
          <rect x="82" y="106" width="16" height="14" rx="4" fill="url(#bodyGrad)" />
          <rect x="82" y="106" width="16" height="14" rx="4" stroke="rgba(34,211,238,0.2)" strokeWidth="1" fill="none" />

          {/* ── Body ── */}
          <rect x="42" y="120" width="96" height="82" rx="16" fill="url(#bodyGrad)" />
          <rect x="42" y="120" width="96" height="82" rx="16" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" fill="none" />
          {/* Body top highlight */}
          <rect x="46" y="124" width="88" height="16" rx="8" fill="rgba(255,255,255,0.04)" />

          {/* ── Chest panel ── */}
          <rect x="62" y="134" width="56" height="42" rx="10" fill="rgba(0,0,0,0.25)" />
          <rect x="62" y="134" width="56" height="42" rx="10" stroke="rgba(34,211,238,0.2)" strokeWidth="1" fill="none" />

          {/* ── Chest details ── */}
          {/* Central orb */}
          <motion.circle animate={pulse} cx="90" cy="152" r="10" fill="url(#orbGrad)" style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />
          <circle cx="90" cy="152" r="5" fill="rgba(255,255,255,0.3)" />

          {/* Side indicators */}
          {[-20, 20].map((offset, i) => (
            <motion.rect
              key={i}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              x={90 + offset - 5}
              y={168}
              width="10"
              height="4"
              rx="2"
              fill={i === 0 ? "#22d3ee" : "#60a5fa"}
              opacity="0.7"
            />
          ))}

          {/* ── Left Arm ── */}
          <rect x="20" y="124" width="22" height="52" rx="10" fill="url(#bodyGrad)" />
          <rect x="20" y="124" width="22" height="52" rx="10" stroke="rgba(34,211,238,0.25)" strokeWidth="1.5" fill="none" />
          {/* Left hand */}
          <rect x="22" y="174" width="18" height="14" rx="7" fill="url(#bodyGrad)" />

          {/* ── Right Arm ── */}
          <rect x="138" y="124" width="22" height="52" rx="10" fill="url(#bodyGrad)" />
          <rect x="138" y="124" width="22" height="52" rx="10" stroke="rgba(34,211,238,0.25)" strokeWidth="1.5" fill="none" />
          {/* Right hand */}
          <rect x="140" y="174" width="18" height="14" rx="7" fill="url(#bodyGrad)" />

          {/* ── Legs ── */}
          <rect x="58" y="200" width="24" height="34" rx="10" fill="url(#bodyGrad)" />
          <rect x="58" y="200" width="24" height="34" rx="10" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5" fill="none" />
          <rect x="98" y="200" width="24" height="34" rx="10" fill="url(#bodyGrad)" />
          <rect x="98" y="200" width="24" height="34" rx="10" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5" fill="none" />

          {/* ── Feet ── */}
          <rect x="54" y="228" width="32" height="10" rx="5" fill="url(#headGrad)" />
          <rect x="94" y="228" width="32" height="10" rx="5" fill="url(#headGrad)" />

          {/* ── Gradients ── */}
          <defs>
            <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0f1f38" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#192d4a" />
              <stop offset="100%" stopColor="#0d1a2e" />
            </linearGradient>
            <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <radialGradient id="orbGrad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0e7490" />
            </radialGradient>
          </defs>
        </svg>

        {/* Shadow / ground reflection */}
        <div
          className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-24 h-3 rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.18) 0%, transparent 70%)", filter: "blur(4px)" }}
        />
      </motion.div>
    </motion.div>
  );
}
