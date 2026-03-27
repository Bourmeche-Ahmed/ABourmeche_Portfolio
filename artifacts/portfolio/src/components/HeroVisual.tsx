import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

type Token = { t: string; c: string };
type Line = Token[];

const CODE: Line[] = [
  [{ t: "import", c: "#c586c0" }, { t: " { useState, useEffect }", c: "#9cdcfe" }, { t: " from ", c: "#d4d4d4" }, { t: '"react"', c: "#ce9178" }],
  [{ t: "import", c: "#c586c0" }, { t: " type ", c: "#569cd6" }, { t: "{ Metric }", c: "#4ec9b0" }, { t: " from ", c: "#d4d4d4" }, { t: '"@/types"', c: "#ce9178" }],
  [],
  [{ t: "const", c: "#569cd6" }, { t: " Dashboard", c: "#4ec9b0" }, { t: " = () => {", c: "#d4d4d4" }],
  [{ t: "  const", c: "#569cd6" }, { t: " [data, setData] = ", c: "#9cdcfe" }, { t: "useState", c: "#dcdcaa" }, { t: "<", c: "#d4d4d4" }, { t: "Metric", c: "#4ec9b0" }, { t: "[]>([])", c: "#d4d4d4" }],
  [],
  [{ t: "  useEffect", c: "#dcdcaa" }, { t: "(() => {", c: "#d4d4d4" }],
  [{ t: "    api", c: "#9cdcfe" }, { t: ".getMetrics()", c: "#d4d4d4" }],
  [{ t: "      .then", c: "#d4d4d4" }, { t: "(setData)", c: "#9cdcfe" }],
  [{ t: "  }, [])", c: "#d4d4d4" }],
  [],
  [{ t: "  return", c: "#c586c0" }, { t: " (", c: "#d4d4d4" }],
  [{ t: "    <", c: "#808080" }, { t: "RealtimeChart", c: "#4ec9b0" }],
  [{ t: "      data", c: "#9cdcfe" }, { t: "={data}", c: "#d4d4d4" }],
  [{ t: "      type", c: "#9cdcfe" }, { t: '="stream"', c: "#ce9178" }, { t: " />", c: "#808080" }],
  [{ t: "  )", c: "#d4d4d4" }],
  [{ t: "}", c: "#d4d4d4" }],
];

const BADGES = [
  { label: "React 18", color: "#61DAFB", dot: "#22d3ee" },
  { label: "TypeScript", color: "#3178C6", dot: "#60a5fa" },
  { label: "Python / Flask", color: "#3572A5", dot: "#818cf8" },
  { label: "PostgreSQL", color: "#336791", dot: "#34d399" },
  { label: "WebSocket", color: "#8b5cf6", dot: "#a78bfa" },
  { label: "REST APIs", color: "#10b981", dot: "#6ee7b7" },
];

function CodeLine({ tokens, lineNum, visible }: { tokens: Line; lineNum: number; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex items-center gap-0 font-mono text-[11px] leading-5 whitespace-pre"
    >
      <span className="select-none w-6 text-right mr-4 text-[10px]" style={{ color: "rgba(255,255,255,0.18)" }}>
        {lineNum}
      </span>
      {tokens.length === 0 ? (
        <span>&nbsp;</span>
      ) : (
        tokens.map((tok, i) => (
          <span key={i} style={{ color: tok.c }}>{tok.t}</span>
        ))
      )}
    </motion.div>
  );
}

function Cursor({ visible }: { visible: boolean }) {
  return visible ? (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.9, repeat: Infinity }}
      className="inline-block w-[2px] h-[13px] rounded-sm ml-0.5 align-middle"
      style={{ background: "#22d3ee" }}
    />
  ) : null;
}

export function HeroVisual() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (visibleLines < CODE.length) {
      const delay = CODE[visibleLines].length === 0 ? 60 : 110 + Math.random() * 60;
      const t = setTimeout(() => setVisibleLines((v) => v + 1), delay);
      return () => clearTimeout(t);
    } else {
      setTyping(false);
      const restart = setTimeout(() => {
        setVisibleLines(0);
        setTyping(true);
      }, 4500);
      return () => clearTimeout(restart);
    }
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[400px] select-none"
    >
      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #0f1117 0%, #111827 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 px-3 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.05)" }}>
            <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>Dashboard.tsx</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ color: "#3178C6", background: "rgba(49,120,198,0.15)" }}>TS</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ color: "#61DAFB", background: "rgba(97,218,251,0.1)" }}>TSX</span>
          </div>
        </div>

        {/* Code area */}
        <div className="px-4 py-4 space-y-0.5 min-h-[220px]">
          {CODE.map((line, i) => (
            <div key={i} className="relative">
              <CodeLine tokens={line} lineNum={i + 1} visible={i < visibleLines} />
              {i === visibleLines - 1 && typing && <span className="absolute" style={{ bottom: 3.5, left: i === visibleLines - 1 ? `${6 + 24 + 4 + (line.reduce((acc, t) => acc + t.t.length, 0)) * 6.5}px` : 0 }}><Cursor visible /></span>}
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div
          className="px-4 py-2 flex items-center justify-between border-t border-white/[0.05]"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>UTF-8</span>
            <span className="text-[9px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>Ln {Math.min(visibleLines, CODE.length)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-400"
            />
            <span className="text-[9px] font-mono text-green-400">0 errors</span>
          </div>
        </div>
      </div>

      {/* Floating tech badges */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.12, duration: 0.4 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ delay: i * 0.4, duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
              style={{
                background: `${badge.color}15`,
                border: `1px solid ${badge.color}30`,
                color: badge.color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: badge.dot }} />
              {badge.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
