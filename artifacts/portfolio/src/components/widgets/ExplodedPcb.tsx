import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";
import { Layers, Rotate3d, Info } from "lucide-react";

interface LayerSpec {
  name: string;
  code: string;
  desc: string;
  color: string;
  border: string;
  bg: string;
  zBase: number;
}

const LAYERS: LayerSpec[] = [
  {
    name: "Top Silkscreen",
    code: "F.SilkS",
    desc: "Ref designators (U1, U5, BZ1), polarity marks, pin 1 indicators",
    color: "text-zinc-200",
    border: "border-white/40",
    bg: "rgba(255, 255, 255, 0.08)",
    zBase: 60,
  },
  {
    name: "Front Copper",
    code: "F.Cu",
    desc: "Signal traces, 5V power bus, buck converter switch node, SMD pads",
    color: "text-amber-500",
    border: "border-amber-500/50",
    bg: "rgba(245, 158, 11, 0.12)",
    zBase: 20,
  },
  {
    name: "FR-4 Dielectric Core",
    code: "Substrate",
    desc: "1.6mm glass-reinforced epoxy substrate with plated through-hole vias",
    color: "text-emerald-500",
    border: "border-emerald-600/40",
    bg: "rgba(16, 185, 129, 0.15)",
    zBase: -20,
  },
  {
    name: "Back Copper & Ground",
    code: "B.Cu",
    desc: "Continuous solid GND ground plane pour, return paths, thermal vias",
    color: "text-sky-500",
    border: "border-sky-500/50",
    bg: "rgba(56, 189, 248, 0.12)",
    zBase: -60,
  },
];

export function ExplodedPcb() {
  const [explosion, setExplosion] = useState(0.85); // 0 (flat) to 1 (fully exploded)
  const [rotY, setRotY] = useState(-18);
  const [rotX, setRotX] = useState(15);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentRotY = useRef(-18);
  const currentRotX = useRef(15);

  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.three_d.explodedPcb;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canAnimate) return;
    setIsDragging(true);
    startX.current = e.clientX;
    startY.current = e.clientY;
    currentRotY.current = rotY;
    currentRotX.current = rotX;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !canAnimate) return;
      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;
      const nextY = Math.max(-45, Math.min(45, currentRotY.current + dx * 0.4));
      const nextX = Math.max(-10, Math.min(35, currentRotX.current - dy * 0.3));
      setRotY(nextY);
      setRotX(nextX);
    },
    [isDragging, canAnimate]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="border border-rule bg-panel-raised p-4 rounded-[2px] space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-rule">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-signal" />
          <h4 className="font-heading font-bold text-base text-ink">
            3D PCB Layer Stack Decomposition
          </h4>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[1px] bg-panel-sunk border border-rule text-ink-soft">
            2-Layer FR-4
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-ink-soft">
          <Rotate3d className="w-3.5 h-3.5 text-signal" />
          <span className="hidden sm:inline">Drag to rotate 3D view</span>
        </div>
      </div>

      {/* 3D Viewport */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative h-64 sm:h-72 w-full bg-panel-sunk border border-rule rounded-[2px] overflow-hidden flex items-center justify-center select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: 1000 }}
      >
        {/* Background measurement grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--ink-soft) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* 3D Stack container */}
        <motion.div
          animate={{
            rotateX: canAnimate ? rotX : 10,
            rotateY: canAnimate ? rotY : -15,
          }}
          transition={{ duration: isDragging ? 0 : 0.25 }}
          className="relative w-56 sm:w-64 h-36 sm:h-40"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {LAYERS.map((layer) => {
            const zOffset = layer.zBase * explosion;
            const isHovered = activeLayer === layer.code;

            return (
              <div
                key={layer.code}
                onMouseEnter={() => setActiveLayer(layer.code)}
                onMouseLeave={() => setActiveLayer(null)}
                className={`absolute inset-0 rounded-[2px] border transition-colors duration-200 p-2.5 flex flex-col justify-between ${
                  layer.border
                } ${isHovered ? "ring-1 ring-signal" : ""}`}
                style={{
                  transform: `translateZ(${zOffset}px)`,
                  backgroundColor: layer.bg,
                  backdropFilter: "blur(1px)",
                  WebkitBackfaceVisibility: "visible",
                }}
              >
                {/* Layer header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[1px] bg-panel-raised/90 border border-rule ${layer.color}`}
                  >
                    {layer.code}
                  </span>
                  <span className="font-mono text-[9px] text-ink-soft bg-panel-raised/70 px-1 rounded-[1px]">
                    Z: {Math.round(zOffset)}mm
                  </span>
                </div>

                {/* Layer schematic traces / simulated layout */}
                <div className="flex-1 my-1 relative overflow-hidden opacity-40">
                  {layer.code === "F.SilkS" && (
                    <div className="font-mono text-[8px] text-zinc-300 space-y-1">
                      <div className="border border-dashed border-zinc-400 w-12 h-6 flex items-center justify-center">
                        ESP32-S3
                      </div>
                      <div className="flex gap-2">
                        <span>[U1 TPS54360]</span>
                        <span>[BZ1]</span>
                      </div>
                    </div>
                  )}
                  {layer.code === "F.Cu" && (
                    <svg className="w-full h-full stroke-amber-500 fill-none stroke-[1.5]">
                      <path d="M 10 10 H 70 V 30 H 120 V 50 H 180" />
                      <circle cx="70" cy="30" r="3" fill="#f59e0b" />
                      <path d="M 20 40 H 80 V 70 H 140" />
                    </svg>
                  )}
                  {layer.code === "Substrate" && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-mono text-[9px] text-emerald-600/60 uppercase tracking-widest">
                        FR-4 Core (1.6mm)
                      </span>
                    </div>
                  )}
                  {layer.code === "B.Cu" && (
                    <div className="w-full h-full opacity-60 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:8px_8px]" />
                  )}
                </div>

                {/* Layer footer */}
                <div className="font-sans text-[10px] text-ink font-medium truncate">
                  {layer.name}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Explode Slider & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3 flex-1">
          <span className="font-mono text-xs text-ink-soft shrink-0">
            Stack Spacing:
          </span>
          <input
            type="range"
            min="0"
            max="1.5"
            step="0.05"
            value={explosion}
            onChange={(e) => setExplosion(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-panel-sunk rounded-[1px] appearance-none cursor-pointer accent-signal border border-rule"
            aria-label="Layer explosion spacing slider"
          />
          <span className="font-mono text-xs text-signal font-semibold w-10 text-right">
            {Math.round(explosion * 100)}%
          </span>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => setExplosion(0)}
            className="px-2 py-1 text-[11px] font-mono border border-rule bg-panel-sunk hover:bg-panel text-ink-soft hover:text-ink rounded-[2px]"
          >
            Flat
          </button>
          <button
            onClick={() => setExplosion(1)}
            className="px-2 py-1 text-[11px] font-mono border border-rule bg-panel-sunk hover:bg-panel text-ink-soft hover:text-ink rounded-[2px]"
          >
            Explode
          </button>
          <button
            onClick={() => {
              setRotX(15);
              setRotY(-18);
              setExplosion(0.85);
            }}
            className="px-2 py-1 text-[11px] font-mono border border-rule bg-panel-sunk hover:bg-panel text-ink-soft hover:text-ink rounded-[2px]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Caption note */}
      <div className="flex items-start gap-1.5 text-[11px] font-sans text-ink-soft bg-panel-sunk p-2 rounded-[2px] border border-rule">
        <Info className="w-3.5 h-3.5 text-signal shrink-0 mt-0.5" />
        <span>
          <strong>Illustrative layer stack:</strong> 2-layer FR-4 board (~77 × 67 mm) designed in KiCad for VROOM automotive OBD-II companion. Top copper carries switching buck converter paths and level-shifter outputs; bottom copper provides continuous return paths.
        </span>
      </div>
    </div>
  );
}

export default ExplodedPcb;
