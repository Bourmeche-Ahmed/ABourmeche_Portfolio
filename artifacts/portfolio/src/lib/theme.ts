/**
 * Single source of truth for the portfolio's color palette & preset resolver.
 * Ensures URL params like ?preset=ultraviolet and ?tier=static resolve cleanly to the new palette.
 */

export const PALETTE = {
  navy: "#2E3244",
  slate: "#516079",
  gray: "#C5C6C6",
  white: "#FFFFFF",
  orange: "#F1895C",
};

export function initTheme() {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  const searchParams = new URLSearchParams(window.location.search);

  // Read preset param if provided (?preset=ultraviolet, etc.)
  const presetParam = searchParams.get("preset");
  if (presetParam) {
    root.setAttribute("data-preset", presetParam);
  } else {
    root.setAttribute("data-preset", "default");
  }

  // Read tier param if provided (?tier=static, etc.)
  const tierParam = searchParams.get("tier");
  if (tierParam) {
    root.setAttribute("data-tier", tierParam);
  }

  // Apply dark mode by default for the navy aesthetic
  root.classList.add("dark");

  // Ensure theme-color meta tag exists and matches #2E3244
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement("meta");
    metaTheme.setAttribute("name", "theme-color");
    document.head.appendChild(metaTheme);
  }
  metaTheme.setAttribute("content", PALETTE.navy);
}
