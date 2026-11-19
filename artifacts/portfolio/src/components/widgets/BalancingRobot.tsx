import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";
import { Bot, RotateCcw, Activity } from "lucide-react";

export function BalancingRobot() {
  const [tilt, setTilt] = useState(0); // current angle in degrees
  const [isEquilibrium, setIsEquilibrium] = useState(true);
  const [pushCount, setPushCount] = useState(0);
  const controls = useAnimation();
  const wheelControls = useAnimation();
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.three_d.balancingRobot;

  const pushRobot = (direction: "left" | "right") => {
    if (!canAnimate) return;
    const targetAngle = direction === "left" ? -22 : 22;
    setTilt(targetAngle);
    setIsEquilibrium(false);
    setPushCount((c) => c + 1);

    // Spring physics simulating 100 Hz PID corrective balance loop
    controls.start({
      rotate: [targetAngle, -targetAngle * 0.6, targetAngle * 0.35, -targetAngle * 0.15, 0],
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.3, 0.6, 0.85, 1],
      },
    });

    // Wheels roll counter to restore center of mass
    wheelControls.start({
      rotate: [direction === "left" ? 180 : -180, direction === "left" ? -90 : 90, 0],
      transition: {
        duration: 1.4,
        ease: "easeOut",
      },
    });

    // Reset equilibrium flag after settling
    setTimeout(() => {
      setTilt(0);
      setIsEquilibrium(true);
    }, 1400);
  };

  return (
    <div className="border border-rule bg-panel-raised p-4 rounded-[2px] space-y-3.5 my-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-rule font-mono text-xs text-ink-soft">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-signal" />
          <span className="font-heading font-bold text-base text-ink">
            Two-Wheeled Inverted Pendulum Digital Twin
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-[1px] bg-signal/15 border border-signal/30 text-signal font-semibold">
            100 Hz PID Loop
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[11px]">
            <Activity className="w-3 h-3 text-telemetry" />
            <span>TILT θ:</span>
            <span
              className={`font-bold ${
                isEquilibrium ? "text-emerald-500" : "text-signal"
              }`}
            >
              {tilt > 0 ? `+${tilt}` : tilt}.00°
            </span>
          </span>
          <span className="text-[10px] text-ink-soft bg-panel-sunk px-1.5 py-0.5 rounded-[1px]">
            STATUS: {isEquilibrium ? "STABLE" : "CORRECTING"}
          </span>
        </div>
      </div>

      {/* Physics Sandbox Viewport */}
      <div
        className="relative h-56 sm:h-64 w-full bg-panel-sunk border border-rule rounded-[2px] overflow-hidden flex flex-col items-center justify-end pb-8 select-none"
        style={{ perspective: 800 }}
      >
        {/* Background coordinate grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--rule) 1px, transparent 1px), linear-gradient(to bottom, var(--rule) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Center datum reference line */}
        <div className="absolute inset-y-0 left-1/2 w-px border-l border-dashed border-ink-soft/30 pointer-events-none" />

        {/* Inverted Pendulum Robot Assembly */}
        <motion.div
          animate={controls}
          className="relative origin-bottom flex flex-col items-center cursor-pointer group"
          onClick={() => pushRobot(tilt >= 0 ? "left" : "right")}
          title="Click to push robot"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top Sensor Bar & IMU (MPU-6050) */}
          <div className="w-20 h-4 bg-panel-raised border border-telemetry/60 rounded-[1px] flex items-center justify-between px-1.5 text-[8px] font-mono text-telemetry shadow-xs">
            <span>IMU</span>
            <span className="w-1.5 h-1.5 bg-signal rounded-full animate-ping" />
            <span>6-DOF</span>
          </div>

          {/* Vertical Pendulum Chassis Frame */}
          <div className="w-14 h-28 bg-panel-raised/90 border-2 border-rule rounded-[2px] p-1.5 flex flex-col justify-between items-center my-0.5 group-hover:border-signal transition-colors shadow-xs relative">
            <span className="font-mono text-[8px] text-ink-soft/70">STM32F1</span>

            {/* Simulated STM32 MCU Chip */}
            <div className="w-7 h-7 bg-zinc-900 border border-zinc-700 rounded-[1px] flex items-center justify-center relative">
              <span className="text-[7px] font-mono text-zinc-400">MCU</span>
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-signal rounded-[0.5px]" />
            </div>

            <span className="font-mono text-[7px] text-signal font-semibold">
              100 Hz
            </span>
          </div>

          {/* Motor Axle Hub */}
          <div className="w-16 h-3 bg-zinc-800 border border-zinc-600 rounded-[1px] z-10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-signal" />
          </div>

          {/* Wheels (Left and Right Spoked Wheels) */}
          <div className="absolute -bottom-4 flex justify-between w-24 pointer-events-none">
            {/* Left Wheel */}
            <motion.div
              animate={wheelControls}
              className="w-8 h-8 rounded-full border-2 border-zinc-800 bg-zinc-900/90 relative flex items-center justify-center"
            >
              <div className="absolute w-full h-0.5 bg-zinc-600" />
              <div className="absolute h-full w-0.5 bg-zinc-600" />
              <div className="w-2 h-2 rounded-full bg-signal/80 z-10" />
            </motion.div>

            {/* Right Wheel */}
            <motion.div
              animate={wheelControls}
              className="w-8 h-8 rounded-full border-2 border-zinc-800 bg-zinc-900/90 relative flex items-center justify-center"
            >
              <div className="absolute w-full h-0.5 bg-zinc-600" />
              <div className="absolute h-full w-0.5 bg-zinc-600" />
              <div className="w-2 h-2 rounded-full bg-signal/80 z-10" />
            </motion.div>
          </div>
        </motion.div>

        {/* Floor Surface / Ground Plane */}
        <div className="w-full h-1 bg-rule border-t border-ink-soft/40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-signal/30 to-transparent" />
        </div>
      </div>

      {/* Control Buttons & Disturbance Triggers */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="text-xs font-sans text-ink-soft">
          <span>Click chassis or inject external disturbance torque:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => pushRobot("left")}
            className="px-3 py-1.5 text-xs font-mono border border-rule bg-panel-sunk hover:bg-panel text-ink hover:text-signal rounded-[2px] transition-colors flex items-center gap-1 active:scale-95"
            aria-label="Push robot left"
          >
            <span>← Push Left (-22°)</span>
          </button>

          <button
            onClick={() => pushRobot("right")}
            className="px-3 py-1.5 text-xs font-mono border border-rule bg-panel-sunk hover:bg-panel text-ink hover:text-signal rounded-[2px] transition-colors flex items-center gap-1 active:scale-95"
            aria-label="Push robot right"
          >
            <span>Push Right (+22°) →</span>
          </button>

          <button
            onClick={() => {
              controls.set({ rotate: 0 });
              wheelControls.set({ rotate: 0 });
              setTilt(0);
              setIsEquilibrium(true);
            }}
            className="p-1.5 text-xs font-mono border border-rule bg-panel-sunk hover:bg-panel text-ink-soft hover:text-ink rounded-[2px] transition-colors"
            title="Reset position"
            aria-label="Reset robot position"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Engineering caption note */}
      <div className="text-[11px] font-sans text-ink-soft bg-panel-sunk p-2 rounded-[2px] border border-rule leading-relaxed">
        <strong>100 Hz balance loop:</strong> Embedded C firmware on STM32 processes MPU-6050 complementary-filter tilt estimation and computes PID counter-torque to drive N20 DC gearmotors back underneath the center of gravity within ~1.2 s.
      </div>
    </div>
  );
}

export default BalancingRobot;
