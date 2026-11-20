import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePageVisible } from "@/hooks/usePageVisible";

/**
 * EngineeringSignalVisual
 * A high-precision, low-CPU canvas waveform representing a closed-loop control signal /
 * step-response & harmonic telemetry curve. Pauses when off-screen or tab is hidden.
 * Under prefers-reduced-motion, renders a crisp static baseline vector.
 */
export function EngineeringSignalVisual({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = usePageVisible();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let isIntersecting = true;

    // Responsive canvas pixel scaling
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // IntersectionObserver to pause off-screen rendering
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const render = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Subtle background engineering grid (40px spacing)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      const gridSize = 36;
      for (let x = 0; x < w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Zero-reference centerline
      const centerY = h * 0.52;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();

      // If reduced motion, draw static calibrated curve
      if (reducedMotion) {
        ctx.strokeStyle = "#C6F432";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const t = x / w;
          // Step response with decaying oscillation: 1 - exp(-a*t)*cos(b*t)
          const damping = Math.exp(-3.2 * t);
          const oscillation = Math.cos(t * Math.PI * 6.5);
          const y = centerY - (1 - damping * oscillation) * (h * 0.32);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        return;
      }

      // Dynamic Cascaded Waveform (Closed-loop PID disturbance recovery)
      time += 0.016;

      // Primary Lime Control Signal
      ctx.strokeStyle = "#C6F432";
      ctx.lineWidth = 1.75;
      ctx.beginPath();

      const points: [number, number][] = [];
      const step = 4;
      for (let x = 0; x <= w; x += step) {
        const nx = x / w;
        // Superposition of fundamental control loop + harmonic frequencies
        const fundamental = Math.sin(nx * 5.2 - time * 1.4) * 0.5;
        const derivative = Math.sin(nx * 11.8 + time * 2.1) * 0.22;
        const transient = Math.cos(nx * 2.4 - time * 0.8) * 0.35;
        const envelope = Math.sin(nx * Math.PI); // Pin ends softly to margins

        const signal = (fundamental + derivative + transient) * envelope;
        const y = centerY + signal * (h * 0.38);
        points.push([x, y]);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Subtle Secondary Feedback Trace (Soft Cyan/Muted)
      ctx.strokeStyle = "rgba(139, 178, 232, 0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        const nx = x / w;
        const setpoint = Math.sin(nx * 4.8 - time * 1.1) * 0.42;
        const envelope = Math.sin(nx * Math.PI);
        const y = centerY + setpoint * envelope * (h * 0.38);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Leading Telemetry Dot
      if (points.length > 0) {
        const leadIdx = Math.floor((Math.sin(time * 0.6) * 0.5 + 0.5) * (points.length - 1));
        const [px, py] = points[leadIdx];
        ctx.fillStyle = "#C6F432";
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Telemetry label next to probe
        ctx.font = "9px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(198, 244, 50, 0.75)";
        ctx.fillText(`SIG: ${(1.0 + Math.sin(time)).toFixed(2)}V`, px + 8, py - 6);
      }

      if (isVisible && isIntersecting) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (isVisible && isIntersecting && !reducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    } else if (reducedMotion) {
      render();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [isVisible, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
