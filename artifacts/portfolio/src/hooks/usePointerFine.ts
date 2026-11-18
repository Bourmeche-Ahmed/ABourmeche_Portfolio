import { useState, useEffect } from "react";

/**
 * Hook to detect whether the user has a fine pointing device capable of hovering
 * (e.g. desktop mouse or precision trackpad), as opposed to a touch screen.
 */
export function usePointerFine(): boolean {
  const [isPointerFine, setIsPointerFine] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };

    setIsPointerFine(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isPointerFine;
}
