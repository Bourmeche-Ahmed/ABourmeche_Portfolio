import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TECH_CHARS = "01X_[]/#$%&*=-+";

interface ScrambleTextProps {
  phrases: string[];
  intervalMs?: number;
  className?: string;
}

export function ScrambleText({
  phrases,
  intervalMs = 4500,
  className = "",
}: ScrambleTextProps) {
  const reducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(phrases[0] || "");
  const targetPhrase = phrases[currentIndex] || "";
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [phrases, intervalMs]);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(targetPhrase);
      return;
    }

    const duration = 500; // ms
    const startTime = performance.now();
    const length = targetPhrase.length;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (targetPhrase[i] === " " || targetPhrase[i] === "&" || targetPhrase[i] === ",") {
          result += targetPhrase[i];
        } else if (i < revealedCount) {
          result += targetPhrase[i];
        } else {
          result += TECH_CHARS[Math.floor(Math.random() * TECH_CHARS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [targetPhrase, reducedMotion]);

  return (
    <span
      className={className}
      aria-label={targetPhrase}
      role="text"
    >
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}
