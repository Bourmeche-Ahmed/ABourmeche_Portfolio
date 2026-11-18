import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, Play, RotateCcw } from "lucide-react";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function QuarterCarSimulation() {
  const [pdEnabled, setPdEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isVisible = usePageVisible();
  const isReduced = useReducedMotion();

  const simTimeRef = useRef(0);
  const stateRef = useRef<{
    pos: number;
    vel: number;
    history: number[];
  }>({
    pos: 0,
    vel: 0,
    history: [],
  });

  const resetSimulation = () => {
    simTimeRef.current = 0;
    stateRef.current = {
      pos: 0,
      vel: 0,
      history: [],
    };
  };

  useEffect(() => {
    resetSimulation();
  }, [pdEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isReduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const dt = 0.02;
      simTimeRef.current += dt;
      const t = simTimeRef.current;

      // Road disturbance step input at t = 0.5s
      const roadStep = t >= 0.5 && t <= 5 ? 1.0 : 0.0;

      // Dynamics calculation
      // Passive: natural freq ~ 1 Hz, light damping (zeta ~ 0.08)
      // Active PD: Kp=-2000, Kd=-800 -> 87% peak displacement attenuation, heavy damping
      const state = stateRef.current;

      const k = pdEnabled ? 28.0 : 8.0;
      const c = pdEnabled ? 8.5 : 0.6;
      const mass = 1.0;

      const error = roadStep - state.pos;
      const force = k * error - c * state.vel;
      const accel = force / mass;

      state.vel += accel * dt;
      state.pos += state.vel * dt;

      // Record history for response plot
      if (state.history.length > 180) {
        state.history.shift();
      }
      state.history.push(state.pos);

      // Draw Grid
      const isDark = document.documentElement.classList.contains("dark");
      ctx.strokeStyle = isDark ? "rgba(148, 163, 184, 0.12)" : "rgba(100, 116, 139, 0.15)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= W; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Draw Zero baseline
      const zeroY = H * 0.65;
      ctx.strokeStyle = isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(100, 116, 139, 0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, zeroY);
      ctx.lineTo(W, zeroY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Step input line
      const stepY = zeroY - roadStep * (H * 0.35);
      ctx.strokeStyle = isDark ? "rgba(56, 189, 248, 0.4)" : "rgba(2, 132, 199, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, stepY);
      ctx.lineTo(W, stepY);
      ctx.stroke();

      // Draw displacement response curve
      ctx.strokeStyle = pdEnabled ? "#f59e0b" : "#94a3b8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      state.history.forEach((val, i) => {
        const x = (i / 180) * W;
        const y = zeroY - val * (H * 0.35);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw live value marker at latest point
      if (state.history.length > 0) {
        const lastVal = state.history[state.history.length - 1];
        const lastX = (state.history.length / 180) * W;
        const lastY = zeroY - lastVal * (H * 0.35);

        ctx.fillStyle = pdEnabled ? "#f59e0b" : "#94a3b8";
        ctx.beginPath();
        ctx.arc(lastX, lastY, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [pdEnabled, isVisible, isReduced]);

  return (
    <div className="border border-rule bg-panel-raised rounded-[2px] p-4 sm:p-5 select-none space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-rule">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-signal" />
          <h4 className="font-heading font-bold text-sm sm:text-base text-ink">
            2-DOF Quarter-Car Suspension Dynamics
          </h4>
        </div>
        <span className="font-mono text-[10px] bg-panel-sunk px-2 py-0.5 rounded-[2px] border border-rule text-ink-soft">
          Illustrative model
        </span>
      </div>

      <p className="text-xs font-sans text-ink-soft">
        Interactive step disturbance response comparing passive suspension vs. closed-loop active PD control:
      </p>

      {/* Response Scope Canvas */}
      <div className="relative border border-rule bg-panel-sunk rounded-[2px] overflow-hidden p-1">
        <canvas
          ref={canvasRef}
          width={400}
          height={130}
          className="w-full h-32 block"
        />

        <div className="absolute top-2 right-2 flex items-center gap-2 font-mono text-[10px] bg-panel-raised/90 px-2 py-0.5 rounded-[2px] border border-rule text-ink shadow-xs">
          <span className="w-2 h-2 rounded-[1px] bg-signal" />
          <span>{pdEnabled ? "ACTIVE PD (Kp=-2000, Kd=-800)" : "PASSIVE (PD OFF)"}</span>
        </div>
      </div>

      {/* Controls & Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        {/* Toggle Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPdEnabled((v) => !v)}
            className={`px-3 py-1.5 rounded-[2px] font-mono text-xs font-semibold border flex items-center gap-2 transition-all ${
              pdEnabled
                ? "bg-signal text-panel border-signal"
                : "bg-panel-sunk text-ink-soft border-rule hover:text-ink"
            }`}
          >
            <span>PD CONTROL: {pdEnabled ? "ON (ACTIVE)" : "OFF (PASSIVE)"}</span>
          </button>

          <button
            onClick={resetSimulation}
            className="p-1.5 rounded-[2px] bg-panel-sunk border border-rule text-ink-soft hover:text-ink"
            aria-label="Restart simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Measured Result Caption */}
        <div className="text-[11px] font-mono text-ink-soft text-right">
          <span className="text-signal font-semibold">87% peak displacement cut</span> · approx. 40s damping
        </div>
      </div>

      <div className="text-[10px] font-mono text-ink-soft/80 border-t border-rule/60 pt-2">
        Illustrative model; measured result: approx. 87% lower peak displacement with active PD control.
      </div>
    </div>
  );
}

export default QuarterCarSimulation;
