import React, { useState, useEffect, useRef, useMemo } from "react";
import { Gauge } from "lucide-react";
import { usePageVisible } from "@/hooks/usePageVisible";

function simulatePID(kp: number, ki: number, kd: number, steps: number): { points: number[]; overshoot: number; settlingTime: number } {
  const dt = 0.05;
  const setpoint = 1.0;
  let integral = 0;
  let prevError = 0;
  let output = 0;
  const points: number[] = [0];
  let maxOutput = 0;
  let settleIndex = -1;

  for (let i = 1; i < steps; i++) {
    const error = setpoint - output;
    integral += error * dt;
    const derivative = (error - prevError) / dt;
    const control = kp * error + ki * integral + kd * derivative;
    output += control * dt * 0.5;
    output = Math.max(-0.5, Math.min(2.5, output));
    prevError = error;
    points.push(output);

    if (output > maxOutput) {
      maxOutput = output;
    }
  }

  // Calculate overshoot percentage: (max - setpoint) / setpoint * 100
  const overshoot = Math.max(0, Math.round(((maxOutput - setpoint) / setpoint) * 100));

  // Calculate settling time within 2% band (0.98 to 1.02)
  for (let i = steps - 1; i >= 0; i--) {
    if (Math.abs(points[i] - setpoint) > 0.05) {
      settleIndex = i + 1;
      break;
    }
  }
  const settlingTime = settleIndex > 0 ? parseFloat((settleIndex * dt).toFixed(2)) : parseFloat((steps * dt).toFixed(2));

  return { points, overshoot, settlingTime };
}

export function PidPlayground({ className = "" }: { className?: string }) {
  const [kp, setKp] = useState(2.5);
  const [ki, setKi] = useState(0.6);
  const [kd, setKd] = useState(0.8);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisible = usePageVisible();

  const { points, overshoot, settlingTime } = useMemo(
    () => simulatePID(kp, ki, kd, 140),
    [kp, ki, kd]
  );

  const applyPreset = (preset: "under" | "tuned" | "over") => {
    if (preset === "under") {
      setKp(5.2);
      setKi(1.4);
      setKd(0.15);
    } else if (preset === "tuned") {
      setKp(2.5);
      setKi(0.6);
      setKd(0.8);
    } else {
      setKp(0.9);
      setKi(0.15);
      setKd(1.6);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const isDark = document.documentElement.classList.contains("dark");
    const gridColor = isDark ? "rgba(143, 184, 179, 0.12)" : "rgba(63, 107, 102, 0.12)";
    const axisColor = isDark ? "rgba(143, 184, 179, 0.25)" : "rgba(63, 107, 102, 0.25)";
    const setpointColor = isDark ? "rgba(95, 179, 171, 0.6)" : "rgba(34, 109, 104, 0.6)";
    const curveColor = isDark ? "#5FB3AB" : "#226D68"; // --signal teal

    // Grid lines
    for (let x = 0; x <= W; x += 30) {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += 20) {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Zero line
    const zeroY = H * 0.8;
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, zeroY);
    ctx.lineTo(W, zeroY);
    ctx.stroke();

    // Setpoint dashed line (setpoint = 1.0)
    const setY = zeroY - 1.0 * (H * 0.5);
    ctx.strokeStyle = setpointColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, setY);
    ctx.lineTo(W, setY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2% Error envelope band
    const bandTop = setY - 0.02 * (H * 0.5);
    const bandBottom = setY + 0.02 * (H * 0.5);
    ctx.fillStyle = isDark ? "rgba(95, 179, 171, 0.08)" : "rgba(34, 109, 104, 0.08)";
    ctx.fillRect(0, bandTop, W, bandBottom - bandTop);

    // Response curve
    ctx.strokeStyle = curveColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((val, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = zeroY - val * (H * 0.5);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Overshoot marker
    if (overshoot > 0) {
      const maxVal = 1 + overshoot / 100;
      const maxY = zeroY - maxVal * (H * 0.5);
      const maxIndex = points.indexOf(Math.max(...points));
      const maxX = (maxIndex / (points.length - 1)) * W;

      ctx.fillStyle = "#D6955B"; // hardware warm copper
      ctx.beginPath();
      ctx.arc(maxX, maxY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [points, overshoot, isVisible]);

  return (
    <div className={`border border-rule bg-panel-raised rounded-[2px] p-4 sm:p-5 select-none space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-rule">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-signal" />
          <h4 className="font-heading font-bold text-sm sm:text-base text-ink">
            Interactive Closed-Loop PID Simulation
          </h4>
        </div>
        <span className="font-mono text-[10px] bg-panel-sunk px-2 py-0.5 rounded-[2px] border border-rule text-ink-soft">
          Simulation
        </span>
      </div>

      {/* Scope Canvas */}
      <div className="relative border border-rule bg-panel-sunk rounded-[2px] overflow-hidden p-1">
        <canvas
          ref={canvasRef}
          width={400}
          height={140}
          className="w-full h-36 block"
        />

        {/* Dynamic Measurement Badges */}
        <div className="absolute top-2 right-2 flex items-center gap-2 font-mono text-[10px]">
          <span className="bg-panel-raised/90 border border-rule px-2 py-0.5 rounded-[2px] text-ink">
            OVERSHOOT (Mp): <span className="text-signal font-bold">{overshoot}%</span>
          </span>
          <span className="bg-panel-raised/90 border border-rule px-2 py-0.5 rounded-[2px] text-ink">
            SETTLING (Ts): <span className="text-hardware font-bold">{settlingTime}s</span>
          </span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-mono text-ink-soft mr-1">PRESETS:</span>
        <button
          onClick={() => applyPreset("tuned")}
          className="px-2.5 py-1 text-[11px] font-mono rounded-[2px] bg-panel-sunk border border-rule hover:border-signal text-ink transition-colors"
        >
          Critically Damped (Tuned)
        </button>
        <button
          onClick={() => applyPreset("under")}
          className="px-2.5 py-1 text-[11px] font-mono rounded-[2px] bg-panel-sunk border border-rule hover:border-hardware text-ink transition-colors"
        >
          Under-Damped (Oscillatory)
        </button>
        <button
          onClick={() => applyPreset("over")}
          className="px-2.5 py-1 text-[11px] font-mono rounded-[2px] bg-panel-sunk border border-rule hover:border-ink-soft text-ink transition-colors"
        >
          Over-Damped (Sluggish)
        </button>
      </div>

      {/* Slider Controls */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center gap-3">
          <span className="w-8 text-xs font-mono font-bold text-signal">Kp</span>
          <input
            type="range"
            min={0}
            max={8}
            step={0.1}
            value={kp}
            onChange={(e) => setKp(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-panel-sunk rounded-[1px] accent-signal cursor-pointer"
            aria-label="Kp gain parameter"
          />
          <span className="w-10 text-right text-xs font-mono text-ink font-semibold tabular-nums">
            {kp.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-8 text-xs font-mono font-bold text-hardware">Ki</span>
          <input
            type="range"
            min={0}
            max={4}
            step={0.1}
            value={ki}
            onChange={(e) => setKi(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-panel-sunk rounded-[1px] accent-hardware cursor-pointer"
            aria-label="Ki gain parameter"
          />
          <span className="w-10 text-right text-xs font-mono text-ink font-semibold tabular-nums">
            {ki.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-8 text-xs font-mono font-bold text-ink-soft">Kd</span>
          <input
            type="range"
            min={0}
            max={3}
            step={0.05}
            value={kd}
            onChange={(e) => setKd(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-panel-sunk rounded-[1px] accent-ink-soft cursor-pointer"
            aria-label="Kd gain parameter"
          />
          <span className="w-10 text-right text-xs font-mono text-ink font-semibold tabular-nums">
            {kd.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PidPlayground;
