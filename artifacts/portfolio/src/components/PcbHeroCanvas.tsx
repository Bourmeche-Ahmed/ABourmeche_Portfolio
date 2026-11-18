import { useEffect, useRef, useCallback } from "react";
import { usePageVisible } from "@/hooks/usePageVisible";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";

interface TracePoint {
  x: number;
  y: number;
}

interface TraceSegment {
  points: TracePoint[];
  length: number;
  isTelemetry: boolean;
}

interface Pulse {
  traceIndex: number;
  progress: number; // 0 to 1
  speed: number;
  length: number;
  color: string;
}

interface TouchRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface ViaPad {
  x: number;
  y: number;
  radius: number;
  isSquare?: boolean;
}

export function PcbHeroCanvas({
  isOscilloscope = false,
  className = "",
}: {
  isOscilloscope?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = usePageVisible();
  const isReduced = useReducedMotion();

  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });
  const touchRipplesRef = useRef<TouchRipple[]>([]);
  const inViewRef = useRef(true);

  const initCircuit = useCallback((width: number, height: number, isMobile: boolean) => {
    const traces: TraceSegment[] = [];
    const pads: ViaPad[] = [];

    // Density config based on mobile
    const cols = isMobile ? 6 : 14;
    const rows = isMobile ? 8 : 12;
    const colStep = width / cols;
    const rowStep = height / rows;

    // Generate PCB vias & SMD pads at grid intersections
    for (let c = 1; c < cols; c++) {
      for (let r = 1; r < rows; r++) {
        if ((c + r) % 3 === 0) {
          pads.push({
            x: c * colStep + (Math.sin(r * 4) * colStep * 0.2),
            y: r * rowStep + (Math.cos(c * 3) * rowStep * 0.15),
            radius: (c + r) % 6 === 0 ? 3.5 : 2,
            isSquare: (c * r) % 5 === 0,
          });
        }
      }
    }

    // Generate precision 45-degree and orthogonal traces connecting via pairs
    const maxTraces = isMobile ? 12 : 28;
    for (let i = 0; i < maxTraces; i++) {
      const startX = (i % cols) * colStep + (colStep * 0.5);
      const startY = Math.floor(i / cols) * rowStep * 1.5 + (rowStep * 0.5);

      const dx = (i % 2 === 0 ? 1 : -1) * (colStep * (1 + (i % 3)));
      const dy = rowStep * (1 + ((i * 2) % 3));

      // Precision PCB route: straight -> 45 bend -> straight
      const midX = startX + dx * 0.6;
      const midY = startY + Math.abs(dx * 0.4);
      const endX = startX + dx;
      const endY = startY + dy;

      const points: TracePoint[] = [
        { x: startX, y: startY },
        { x: midX, y: startY },
        { x: midX + (endX - midX) * 0.5, y: midY },
        { x: endX, y: endY },
      ];

      // Calculate approximate length
      let length = 0;
      for (let p = 0; p < points.length - 1; p++) {
        const segDx = points[p + 1].x - points[p].x;
        const segDy = points[p + 1].y - points[p].y;
        length += Math.hypot(segDx, segDy);
      }

      traces.push({
        points,
        length: Math.max(length, 10),
        isTelemetry: i % 3 === 0,
      });
    }

    // Generate initial pulses
    const pulseCount = isMobile ? 6 : 16;
    const pulses: Pulse[] = [];
    for (let p = 0; p < pulseCount; p++) {
      pulses.push({
        traceIndex: p % traces.length,
        progress: (p / pulseCount) + Math.random() * 0.1,
        speed: 0.003 + Math.random() * 0.004,
        length: 0.15 + Math.random() * 0.15,
        color: p % 3 === 0 ? "#0284c7" : "#f59e0b",
      });
    }

    return { traces, pads, pulses };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isReduced || !motionConfig.flags.heroCanvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Viewport intersection observer to pause offscreen
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    observer.observe(container);

    let animationFrameId: number;
    let lastTime = 0;
    const isMobile = window.innerWidth < 768;
    const targetFps = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFps;

    let width = 0;
    let height = 0;
    let dpr = 1;

    let circuitData = initCircuit(100, 100, isMobile);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      circuitData = initCircuit(width, height, isMobile);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse handlers for desktop trace energizing
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    // Touch tap ripple handler
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        touchRipplesRef.current.push({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
          radius: 0,
          maxRadius: 160,
          alpha: 1,
        });
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchstart", onTouchStart, { passive: true });

    // Render loop
    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      // Skip render if tab not visible or canvas offscreen
      if (!isVisible || !inViewRef.current) return;

      const elapsed = time - lastTime;
      if (elapsed < frameInterval) return;
      lastTime = time - (elapsed % frameInterval);

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      const baseTraceColor = isOscilloscope
        ? "rgba(34, 197, 94, 0.22)"
        : isDark
        ? "rgba(148, 163, 184, 0.12)"
        : "rgba(100, 116, 139, 0.15)";
      const padColor = isOscilloscope
        ? "#22c55e"
        : isDark
        ? "rgba(148, 163, 184, 0.3)"
        : "rgba(100, 116, 139, 0.35)";

      const mouse = mousePosRef.current;

      // 1. Draw static traces & check proximity energizing
      circuitData.traces.forEach((trace) => {
        ctx.beginPath();
        ctx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let i = 1; i < trace.points.length; i++) {
          ctx.lineTo(trace.points[i].x, trace.points[i].y);
        }

        // Distance from pointer to midpoint of first segment
        let energized = false;
        if (mouse.active) {
          const midX = (trace.points[0].x + trace.points[trace.points.length - 1].x) / 2;
          const midY = (trace.points[0].y + trace.points[trace.points.length - 1].y) / 2;
          const dist = Math.hypot(mouse.x - midX, mouse.y - midY);
          if (dist < 130) {
            energized = true;
          }
        }

        if (energized) {
          ctx.strokeStyle = isOscilloscope
            ? "rgba(74, 222, 128, 0.7)"
            : trace.isTelemetry
            ? "rgba(56, 189, 248, 0.6)"
            : "rgba(245, 158, 11, 0.6)";
          ctx.lineWidth = 1.6;
        } else {
          ctx.strokeStyle = baseTraceColor;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      });

      // 2. Draw via pads & test points
      circuitData.pads.forEach((pad) => {
        ctx.fillStyle = padColor;
        if (pad.isSquare) {
          ctx.fillRect(pad.x - pad.radius, pad.y - pad.radius, pad.radius * 2, pad.radius * 2);
        } else {
          ctx.beginPath();
          ctx.arc(pad.x, pad.y, pad.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Draw active pulses travelling along traces
      circuitData.pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
          pulse.traceIndex = Math.floor(Math.random() * circuitData.traces.length);
        }

        const trace = circuitData.traces[pulse.traceIndex];
        if (!trace || trace.points.length < 2) return;

        // Sample position along polyline
        const totalLen = trace.length;
        const targetDist = pulse.progress * totalLen;

        let accumulated = 0;
        let pX = trace.points[0].x;
        let pY = trace.points[0].y;

        for (let i = 0; i < trace.points.length - 1; i++) {
          const p1 = trace.points[i];
          const p2 = trace.points[i + 1];
          const segLen = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          if (accumulated + segLen >= targetDist) {
            const ratio = (targetDist - accumulated) / segLen;
            pX = p1.x + (p2.x - p1.x) * ratio;
            pY = p1.y + (p2.y - p1.y) * ratio;
            break;
          }
          accumulated += segLen;
        }

        // Draw pulse particle
        const pulseColor = isOscilloscope ? "#4ade80" : pulse.color;
        ctx.fillStyle = pulseColor;
        ctx.beginPath();
        ctx.arc(pX, pY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw touch ripples
      touchRipplesRef.current = touchRipplesRef.current.filter((ripple) => {
        ripple.radius += 3.5;
        ripple.alpha = 1 - ripple.radius / ripple.maxRadius;

        if (ripple.alpha > 0) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isOscilloscope
            ? `rgba(74, 222, 128, ${ripple.alpha * 0.7})`
            : `rgba(245, 158, 11, ${ripple.alpha * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          return true;
        }
        return false;
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
    };
  }, [isVisible, isReduced, isOscilloscope, initCircuit]);

  if (isReduced || !motionConfig.flags.heroCanvas) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
