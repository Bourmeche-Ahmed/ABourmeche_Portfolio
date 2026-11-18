import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ThemeToggleProps {
  onThemeChanged?: (isDark: boolean) => void;
}

export function ThemeToggle({ onThemeChanged }: ThemeToggleProps) {
  const reducedMotion = useReducedMotion();
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    onThemeChanged?.(dark);
  }, [dark, onThemeChanged]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Check if View Transitions API is supported and motion is not reduced
    const doc = document as unknown as {
      startViewTransition?: (updateCallback: () => void) => {
        ready: Promise<void>;
      };
    };

    if (!doc.startViewTransition || reducedMotion) {
      setDark((d) => !d);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setDark((d) => !d);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 380,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="w-8 h-8 rounded-[2px] flex items-center justify-center border border-rule bg-panel-sunk hover:bg-panel transition-all active:scale-95 text-ink-soft hover:text-ink focus-visible:outline-none"
    >
      {dark ? <Sun className="w-3.5 h-3.5 text-signal" /> : <Moon className="w-3.5 h-3.5 text-ink" />}
    </button>
  );
}
