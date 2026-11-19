import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { usePointerFine } from "@/hooks/usePointerFine";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getAssetPath } from "@/lib/paths";
import { Layers, Rotate3d, Info } from "lucide-react";

interface LayerSpec {
  name: string;
  code: string;
  desc: string;
  zBase: number;
}

const LAYERS: LayerSpec[] = [
  {
    name: "Top Solder Mask & Silkscreen",
    code: "F.SilkS",
    desc: "Component outlines, polarity marks, pin 1 dots",
    zBase: 50,
  },
  {
    name: "Top Copper (F.Cu)",
    code: "F.Cu",
    desc: "ESP32-S3, TPS54360 buck, SN65HVD230 CAN, 74HCT244, MPU-6050, USB-C",
    zBase: 18,
  },
  {
    name: "FR-4 Dielectric Core",
    code: "FR-4",
    desc: "1.6mm glass-reinforced epoxy substrate with plated through-holes",
    zBase: -18,
  },
  {
    name: "Bottom Copper (B.Cu)",
    code: "B.Cu",
    desc: "Continuous solid GND ground return plane and thermal dissipation",
    zBase: -50,
  },
];

export function ExplodedPcb() {
  const [isExploded, setIsExploded] = useState(true);
  const [rotY, setRotY] = useState(-15);
  const [rotX, setRotX] = useState(12);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentRotY = useRef(-15);
  const currentRotX = useRef(12);

  const isPointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    setIsDragging(true);
    startX.current = e.clientX;
    startY.current = e.clientY;
    currentRotY.current = rotY;
    currentRotX.current = rotX;
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || reducedMotion) return;
      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;
      const nextY = Math.max(-35, Math.min(35, currentRotY.current + dx * 0.35));
      const nextX = Math.max(-5, Math.min(25, currentRotX.current - dy * 0.25));
      setRotY(nextY);
      setRotX(nextX);
    },
    [isDragging, reducedMotion]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
    // Spring back gently
    setRotY(-15);
    setRotX(12);
  };

  // If user prefers reduced motion, show real PCB photo directly
  if (reducedMotion) {
    return (
      <div className="border border-rule bg-panel-raised p-4 rounded-[2px] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-rule">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-signal" />
            <h4 className="font-heading font-bold text-base text-ink">
              VROOM 2-Layer PCB Structure
            </h4>
          </div>
          <span className="font-mono text-xs text-ink-soft">~77 × 67 mm</span>
        </div>
        <div className="aspect-[16/10] w-full rounded-[2px] overflow-hidden border border-rule bg-panel-sunk">
          <img
            src={getAssetPath("projects/vroom/vroom1.jpg")}
            alt="VROOM PCB 2-layer board"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-sans text-xs text-ink-soft">
          Illustrative layer stack: 2-layer FR-4 automotive companion board with ESP32-S3, TPS54360 buck converter, and SN65HVD230 CAN transceiver.
        </p>
      </div>
    );
  }

  const explosionMultiplier = isExploded ? 1 : 0.05;

  return (
    <div className="border border-rule bg-panel-raised p-4 rounded-[2px] space-y-3.5 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-rule font-mono text-xs text-ink-soft">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-signal" />
          <h4 className="font-heading font-bold text-base text-ink">
            VROOM 2-Layer PCB Stack
          </h4>
          <span className="text-[10px] px-1.5 py-0.5 rounded-[1px] bg-panel-sunk border border-rule text-ink-soft">
            FR-4 Core
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExploded((prev) => !prev)}
            className="btn-secondary text-xs py-1 px-2.5 h-auto"
          >
            {isExploded ? "Collapse Stack" : "Explode Stack"}
          </button>
        </div>
      </div>

      {/* 3D Viewport */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative h-60 sm:h-64 w-full bg-panel-sunk border border-rule rounded-[2px] overflow-hidden flex items-center justify-center ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: 1000 }}
      >
        <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[10px] text-ink-soft pointer-events-none">
          <Rotate3d className="w-3 h-3 text-signal" />
          <span>Drag to inspect</span>
        </div>

        <motion.div
          animate={{
            rotateX: rotX,
            rotateY: rotY,
          }}
          transition={{
            type: "spring",
            stiffness: isDragging ? 400 : 200,
            damping: 20,
          }}
          className="relative w-56 sm:w-64 h-36"
          style={{ transformStyle: "preserve-3d" }}
        >
          {LAYERS.map((layer) => {
            const z = layer.zBase * explosionMultiplier;

            return (
              <motion.div
                key={layer.code}
                animate={{ z }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="absolute inset-0 rounded-[2px] border border-rule/70 p-2.5 flex flex-col justify-between"
                style={{
                  transformStyle: "preserve-3d",
                  backgroundColor: "var(--panel-raised)",
                  WebkitBackfaceVisibility: "visible",
                  filter: "drop-shadow(0 4px 8px rgb(11 35 33 / .1))",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between font-mono text-[9px]">
                  <span className="font-bold text-signal px-1 py-0.2 rounded-[1px] bg-panel-sunk border border-rule">
                    {layer.code}
                  </span>
                  <span className="text-ink-soft">{layer.name}</span>
                </div>

                {/* Layer Content */}
                <div className="flex-1 my-1 relative overflow-hidden flex items-center justify-center">
                  {layer.code === "F.SilkS" && (
                    <div className="font-mono text-[8px] text-ink-soft/80 flex flex-wrap gap-1.5 justify-center">
                      <span>[VROOM]</span>
                      <span>[J1 OBD]</span>
                      <span>[BZ1]</span>
                      <span>REV 1.2</span>
                    </div>
                  )}

                  {layer.code === "F.Cu" && (
                    <div className="font-mono text-[8px] grid grid-cols-3 gap-1 w-full text-center">
                      <span className="border border-rule px-1 py-0.5 rounded-[1px] bg-panel-sunk text-ink font-semibold">
                        ESP32-S3
                      </span>
                      <span className="border border-rule px-1 py-0.5 rounded-[1px] bg-panel-sunk text-ink">
                        TPS54360
                      </span>
                      <span className="border border-rule px-1 py-0.5 rounded-[1px] bg-panel-sunk text-ink">
                        SN65HVD230
                      </span>
                      <span className="border border-rule px-1 py-0.5 rounded-[1px] bg-panel-sunk text-ink">
                        74HCT244
                      </span>
                      <span className="border border-rule px-1 py-0.5 rounded-[1px] bg-panel-sunk text-ink">
                        MPU-6050
                      </span>
                      <span className="border border-rule px-1 py-0.5 rounded-[1px] bg-panel-sunk text-ink">
                        USB-C
                      </span>
                    </div>
                  )}

                  {layer.code === "FR-4" && (
                    <div className="font-mono text-[9px] text-ink-soft uppercase tracking-wider">
                      FR-4 Dielectric Substrate (1.6 mm)
                    </div>
                  )}

                  {layer.code === "B.Cu" && (
                    <div className="font-mono text-[8px] text-ink-soft text-center">
                      Solid Copper Ground Plane Pour (Continuous Return Path)
                    </div>
                  )}
                </div>

                {/* Footer description */}
                <div className="font-sans text-[10px] text-ink-soft truncate">
                  {layer.desc}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Caption */}
      <div className="flex items-start gap-1.5 text-xs font-sans text-ink-soft bg-panel-sunk p-2.5 rounded-[2px] border border-rule">
        <Info className="w-3.5 h-3.5 text-signal shrink-0 mt-0.5" />
        <span>
          <strong>Illustrative layer stack:</strong> VROOM is an authentic 2-layer PCB (~77 × 67 mm) designed in KiCad. The top layer routes switching power, logic, and component pads; the bottom layer forms an uninterrupted solid ground plane.
        </span>
      </div>
    </div>
  );
}

export default ExplodedPcb;
