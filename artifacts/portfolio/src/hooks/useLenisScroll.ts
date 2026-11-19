import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { store } from "@/store";

let globalLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return globalLenis;
}

export function scrollToTarget(target: string | HTMLElement | number) {
  if (globalLenis) {
    globalLenis.scrollTo(target, { offset: -60, duration: 1.2 });
  } else if (typeof target === "string") {
    const el = document.getElementById(target.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

export function useLenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const handleScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? window.scrollY / total : 0;
        store.setState({ scroll: Math.min(1, Math.max(0, progress)) });
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    lenis.on("scroll", (e: any) => {
      const progress = e.progress ?? (e.scroll / (e.limit || 1));
      store.setState({ scroll: Math.min(1, Math.max(0, progress)) });
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      globalLenis = null;
    };
  }, []);

  return { scrollTo: scrollToTarget };
}
