import React, { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";

interface Ping {
  id: number;
  x: number;
  y: number;
}

export function SonarPing() {
  const [pings, setPings] = useState<Ping[]>([]);
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.micro.sonarPing;

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!canAnimate) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Skip on interactive controls or form inputs
      if (
        target.closest(
          "input, textarea, button, a, select, [role='button'], [tabindex='0'], kbd"
        )
      ) {
        return;
      }

      // Skip if user is selecting text
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return;
      }

      const newPing: Ping = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setPings((prev) => [...prev.slice(-4), newPing]);

      setTimeout(() => {
        setPings((prev) => prev.filter((p) => p.id !== newPing.id));
      }, 550);
    },
    [canAnimate]
  );

  useEffect(() => {
    if (!canAnimate) return;
    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, [canAnimate, handleClick]);

  if (!canAnimate || pings.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999] overflow-hidden"
      aria-hidden="true"
    >
      {pings.map((ping) => (
        <span
          key={ping.id}
          className="absolute rounded-full border border-sky-400/80 animate-ping duration-500"
          style={{
            left: ping.x,
            top: ping.y,
            width: "36px",
            height: "36px",
            marginLeft: "-18px",
            marginTop: "-18px",
          }}
        />
      ))}
    </div>
  );
}

export default SonarPing;
