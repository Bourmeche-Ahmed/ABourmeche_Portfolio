import { useState, useEffect, useRef } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpMetricProps {
  label: string;
  value: string;
  className?: string;
}

export function CountUpMetric({ label, value, className = "" }: CountUpMetricProps) {
  const [ref, inView] = useInViewOnce<HTMLSpanElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const animationRan = useRef(false);

  useEffect(() => {
    if (!inView || reducedMotion || animationRan.current) return;

    // Match leading or central number: e.g. "81", "100", "0", "87"
    const match = value.match(/(\d+)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    animationRan.current = true;
    const targetNum = parseInt(match[1], 10);
    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + match[1].length);

    const startTime = performance.now();
    const duration = 750; // ms

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * targetNum);

      setDisplayValue(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value, reducedMotion]);

  return (
    <span
      ref={ref}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-panel-sunk border border-rule text-[10px] font-mono select-none ${className}`}
    >
      <span className="text-ink-soft">{label}:</span>
      <span className="text-ink font-semibold tabular-nums">{displayValue}</span>
    </span>
  );
}
