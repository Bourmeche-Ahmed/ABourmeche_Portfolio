import { motion } from "framer-motion";
import { useState, useRef } from "react";

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

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function InteractiveParticleNetwork() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 160 - 80,
      y: Math.random() * 160 - 80,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  return (
    <div
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="relative w-80 h-96 select-none cursor-none"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.05) 0%, transparent 70%)",
      }}
    >
      {/* SVG for lines and nodes */}
      <svg
        width="320"
        height="384"
        viewBox="-160 -192 320 384"
        className="absolute inset-0 pointer-events-none"
        style={{ filter: "drop-shadow(0 0 20px rgba(34,211,238,0.15))" }}
      >
        {/* Center hub */}
        <motion.circle
          animate={pulse}
          cx="0"
          cy="0"
          r="12"
          fill="url(#centralGrad)"
          style={{ filter: "drop-shadow(0 0 12px #22d3ee)" }}
        />
        <circle cx="0" cy="0" r="8" fill="rgba(255,255,255,0.4)" />

        {/* Orbital rings */}
        <circle cx="0" cy="0" r="60" stroke="rgba(34,211,238,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
        <circle cx="0" cy="0" r="100" stroke="rgba(96,165,250,0.08)" strokeWidth="1" fill="none" strokeDasharray="2 8" />

        {/* Connecting lines from center to particles */}
        {particles.map((p, i) => (
          <line
            key={`line-${i}`}
            x1="0"
            y1="0"
            x2={p.x}
            y2={p.y}
            stroke={i % 2 === 0 ? "rgba(34,211,238,0.15)" : "rgba(96,165,250,0.1)"}
            strokeWidth="0.5"
          />
        ))}

        {/* Particle nodes */}
        {particles.map((p, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={p.x}
            cy={p.y}
            r={Math.random() * 3 + 1.5}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
            fill={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#60a5fa" : "#10b981"}
            style={{ filter: `drop-shadow(0 0 ${2 + Math.random() * 4}px ${i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#60a5fa" : "#10b981"}80)` }}
          />
        ))}

        {/* Mouse follower cursor */}
        {Math.hypot(mousePos.x, mousePos.y) < 150 && (
          <>
            <motion.circle
              animate={{
                x: mousePos.x,
                y: mousePos.y,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              cx={mousePos.x}
              cy={mousePos.y}
              r="4"
              fill="none"
              stroke="rgba(34,211,238,0.6)"
              strokeWidth="1.5"
            />
            <motion.circle
              animate={{
                x: mousePos.x,
                y: mousePos.y,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 40 }}
              cx={mousePos.x}
              cy={mousePos.y}
              r="2"
              fill="rgba(34,211,238,0.8)"
            />
          </>
        )}

        {/* Central glow gradient */}
        <defs>
          <radialGradient id="centralGrad" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#0e7490" />
          </radialGradient>
        </defs>
      </svg>

      {/* Orbital tech badges */}
      {BADGES.map((badge, i) => {
        const radius = 110;
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
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y * 0.6}px))`,
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
    </div>
  );
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

      {/* Interactive Neural Network / Particle System */}
      <motion.div 
        animate={float} 
        className="relative z-10"
        style={{ perspective: "1000px" }}
      >
        <InteractiveParticleNetwork />
      </motion.div>
    </motion.div>
  );
}
