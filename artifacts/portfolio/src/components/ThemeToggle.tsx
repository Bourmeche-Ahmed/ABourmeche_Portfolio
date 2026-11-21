import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
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
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      className="w-8 h-8 rounded-[2px] flex items-center justify-center border border-rule bg-panel-sunk hover:bg-panel transition-colors text-ink-soft hover:text-ink focus-visible:outline-none"
    >
      {dark ? <Sun className="w-3.5 h-3.5 text-signal" /> : <Moon className="w-3.5 h-3.5 text-ink" />}
    </button>
  );
}
