/**
 * Circuit Teal Theme Engine
 * Manages Dark / Light modes, system preferences, localStorage persistence,
 * dynamic meta theme-color, and URL preset fallback.
 */

export type Theme = "light" | "dark";

export const PALETTE = {
  ink: "#0B1A21",
  deepTeal: "#0F766E",
  mint: "#2DD4BF",
  amber: "#F5A524",
  mist: "#F3F7F7",
};

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    // localStorage might be unavailable or restricted
  }
  return null;
}

export function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;

  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Update meta theme-color dynamically
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement("meta");
    metaTheme.setAttribute("name", "theme-color");
    document.head.appendChild(metaTheme);
  }
  metaTheme.setAttribute("content", theme === "dark" ? PALETTE.ink : PALETTE.mist);
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
  applyTheme(theme);
}

export function toggleTheme(): Theme {
  const current = (document.documentElement.getAttribute("data-theme") as Theme) || getSystemTheme();
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function initTheme() {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  const searchParams = new URLSearchParams(window.location.search);

  // 1. Resolve URL presets (all resolve cleanly to Circuit Teal default)
  const presetParam = searchParams.get("preset");
  if (presetParam) {
    root.setAttribute("data-preset", presetParam);
  } else {
    root.setAttribute("data-preset", "circuit-teal");
  }

  // 2. Resolve URL tier param (?tier=static, etc.)
  const tierParam = searchParams.get("tier");
  if (tierParam) {
    root.setAttribute("data-tier", tierParam);
  }

  // 3. Determine theme from localStorage or system preference
  const stored = getStoredTheme();
  const initialTheme = stored || getSystemTheme();
  applyTheme(initialTheme);

  // 4. Listen to system preference changes if user hasn't chosen manually
  try {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  } catch {
    // ignore listener error on older browsers
  }
}
