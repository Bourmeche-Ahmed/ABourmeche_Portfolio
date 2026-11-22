import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setCurrentTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const updateFromDOM = () => {
      const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
      setCurrentTheme(current);
    };

    updateFromDOM();

    // Observe data-theme changes on html
    const observer = new MutationObserver(updateFromDOM);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => {
        const next = toggleTheme();
        setCurrentTheme(next);
      }}
      type="button"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="w-9 h-9 rounded-md flex items-center justify-center border border-border bg-surface hover:bg-surface-hover text-text hover:text-accent transition-colors focus-visible:outline-none cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-highlight" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-accent" aria-hidden="true" />
      )}
      <span className="sr-only">{isDark ? "Enable light theme" : "Enable dark theme"}</span>
    </button>
  );
}
