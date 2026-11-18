import { useEffect, useRef } from "react";
import { motionConfig } from "@/config/motion";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(onSuccess: () => void) {
  const indexRef = useRef(0);

  useEffect(() => {
    if (!motionConfig.flags.oscilloscope) return;

    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      const expected = KONAMI_CODE[indexRef.current];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        indexRef.current++;
        if (indexRef.current === KONAMI_CODE.length) {
          indexRef.current = 0;
          onSuccess();
        }
      } else {
        indexRef.current = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onSuccess]);
}
