import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      className="relative w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
    >
      <motion.span
        key={dark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {dark ? (
          <Sun className="w-4 h-4 text-cyan-400" />
        ) : (
          <Moon className="w-4 h-4 text-cyan-600" />
        )}
      </motion.span>
    </motion.button>
  );
}
