import { useState, useEffect } from "react";
import { motionConfig } from "@/config/motion";

/**
 * Hook to detect if motion should be reduced based on user OS preferences
 * or central motion configuration.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (motionConfig.intensity === "reduced") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (motionConfig.intensity === "reduced") {
      setPrefersReduced(true);
      return;
    }

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches || motionConfig.intensity === "reduced");
    };

    setPrefersReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
