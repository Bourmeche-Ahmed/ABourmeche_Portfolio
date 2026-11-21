import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function simulatePID(kp: number, ki: number, kd: number, steps: number): number[] {
  const dt = 0.05;
  const setpoint = 1.0;
  let integral = 0;
  let prevError = 0;
  let output = 0;
  const result: number[] = [0];

  for (let i = 1; i < steps; i++) {
    const error = setpoint - output;
    integral += error * dt;
    const derivative = (error - prevError) / dt;
    const control = kp * error + ki * integral + kd * derivative;
    output += control * dt * 0.5;
    output = Math.max(-0.5, Math.min(2.5, output));
    prevError = error;
    result.push(output);
  }
  return result;
}

export function PidPlayground() {
  const [kp, setKp] = useState(2.0);
  const [ki, setKi] = useState(0.5);
  const [kd, setKd] = useState(0.3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);

  const points = simulatePID(kp, ki, kd, 120);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    frameRef.current = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const gridColor = "rgba(81, 96, 121, 0.18)";
      const axisColor = "rgba(81, 96, 121, 0.4)";
      const setpointColor = "rgba(197, 198, 198, 0.45)";
      const curveColor = "#F1895C";
      const glowColor = "rgba(241, 137, 92, 0.35)";

      for (let x = 0; x <= W; x += 20) {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y <= H; y += 15) {
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.75);
      ctx.lineTo(W, H * 0.75);
      ctx.stroke();

      const setY = H * 0.75 - H * 0.6;
      ctx.strokeStyle = setpointColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, setY);
      ctx.lineTo(W, setY);
      ctx.stroke();
      ctx.setLineDash([]);

      const totalFrames = frameRef.current;
      const visiblePoints = Math.min(totalFrames, points.length);

      if (visiblePoints < 2) {
        frameRef.current++;
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 8;
      ctx.strokeStyle = curveColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < visiblePoints; i++) {
        const x = (i / (points.length - 1)) * W;
        const y = H * 0.75 - points[i] * H * 0.6;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (totalFrames < points.length + 10) {
        frameRef.current++;
        animRef.current = requestAnimationFrame(draw);
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [kp, ki, kd, points]);

  const SliderControl = ({
    label,
    value,
    onChange,
    min,
    max,
    step,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    step: number;
  }) => (
    <div className="flex items-center gap-3">
      <span className="w-6 text-xs font-mono text-orange font-bold">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 h-1.5 rounded-full accent-orange cursor-pointer"
        aria-label={`${label} parameter`}
      />
      <span className="w-10 text-right text-xs font-mono text-gray">
        {value.toFixed(1)}
      </span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative rounded-2xl border border-slate/30 bg-navy/60 backdrop-blur-md p-5 w-full max-w-sm shadow-xl shadow-navy/20"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent rounded-t-2xl" />

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-orange tracking-wider uppercase">
            PID Response Playground
          </p>
          <p className="text-[10px] text-gray mt-0.5">
            Closed-loop simulation · MATLAB/Simulink digital twin
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
          <span className="text-[10px] text-orange font-mono">LIVE</span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={280}
        height={100}
        className="w-full h-24 rounded-lg mb-4 bg-navy/40"
      />

      <div className="space-y-2.5">
        <SliderControl label="Kp" value={kp} onChange={setKp} min={0} max={10} step={0.1} />
        <SliderControl label="Ki" value={ki} onChange={setKi} min={0} max={5} step={0.1} />
        <SliderControl label="Kd" value={kd} onChange={setKd} min={0} max={3} step={0.1} />
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate/20">
        {["MATLAB/Simulink", "Control Systems", "Real-time UI"].map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full bg-slate/20 text-orange border border-slate/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
