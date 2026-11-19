import { useState, useEffect } from "react";
import { getReducedMotion } from "@/config/motion";

/**
 * Hook to detect if motion should be reduced based on prefers-reduced-motion media query.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => getReducedMotion());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    setPrefersReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
