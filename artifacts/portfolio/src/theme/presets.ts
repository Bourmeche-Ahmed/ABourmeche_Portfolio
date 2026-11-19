export type PresetName = "vermilion" | "lime" | "ultraviolet";

export interface ColorTokens {
  bg: string;
  surface: string;
  surface2: string;
  hairline: string;
  ink: string;
  soft: string;
  accent: string;
  accentText: string;
  accentInk: string;
  cold: string;
}

export interface PresetDef {
  name: PresetName;
  label: string;
  dark: ColorTokens;
  light: ColorTokens;
}

export const PRESETS: Record<PresetName, PresetDef> = {
  vermilion: {
    name: "vermilion",
    label: "Vermilion (Default)",
    dark: {
      bg: "#0A0A0C",
      surface: "#131316",
      surface2: "#1B1B20",
      hairline: "#2A2A31",
      ink: "#F3F1EC",
      soft: "#A3A1AB",
      accent: "#FF5A2B",
      accentText: "#FF5A2B",
      accentInk: "#0A0A0C",
      cold: "#CFE8FF",
    },
    light: {
      bg: "#F4F1EA",
      surface: "#FFFFFF",
      surface2: "#ECE8DF",
      hairline: "#DAD5CA",
      ink: "#111114",
      soft: "#5B5A62",
      accent: "#B53006",
      accentText: "#B53006",
      accentInk: "#FFFFFF",
      cold: "#1B3B6F",
    },
  },
  lime: {
    name: "lime",
    label: "Electric Lime",
    dark: {
      bg: "#0A0B0A",
      surface: "#121412",
      surface2: "#191C19",
      hairline: "#262A25",
      ink: "#EEF1EA",
      soft: "#9DA597",
      accent: "#C6F432",
      accentText: "#C6F432",
      accentInk: "#0A0B0A",
      cold: "#BCE5FF",
    },
    light: {
      bg: "#F3F5EE",
      surface: "#FFFFFF",
      surface2: "#E8ECE0",
      hairline: "#D0D8C5",
      ink: "#10140D",
      soft: "#565F4F",
      accent: "#386400",
      accentText: "#386400",
      accentInk: "#FFFFFF",
      cold: "#0C3F69",
    },
  },
  ultraviolet: {
    name: "ultraviolet",
    label: "Ultraviolet",
    dark: {
      bg: "#0B0A14",
      surface: "#131222",
      surface2: "#1A182D",
      hairline: "#25233A",
      ink: "#F1F0FA",
      soft: "#A9A6C2",
      accent: "#8B7CFF",
      accentText: "#8B7CFF",
      accentInk: "#0B0A14",
      cold: "#DFE5FF",
    },
    light: {
      bg: "#F2F1F8",
      surface: "#FFFFFF",
      surface2: "#E7E5F2",
      hairline: "#CECAE0",
      ink: "#12111E",
      soft: "#59566D",
      accent: "#4B37D6",
      accentText: "#4B37D6",
      accentInk: "#FFFFFF",
      cold: "#1C246E",
    },
  },
};

/**
 * Convert hex (#RRGGBB) to relative luminance according to WCAG 2.1
 */
export function getRelativeLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return (
    0.2126 * toLinear(r) +
    0.7152 * toLinear(g) +
    0.0722 * toLinear(b)
  );
}

/**
 * Calculate WCAG contrast ratio between two hex colors
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Apply preset CSS variables to document root
 */
export function applyPreset(presetName: PresetName, isDark: boolean) {
  const preset = PRESETS[presetName] || PRESETS.vermilion;
  const tokens = isDark ? preset.dark : preset.light;
  const root = document.documentElement;

  root.setAttribute("data-preset", presetName);
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  root.style.setProperty("--bg", tokens.bg);
  root.style.setProperty("--surface", tokens.surface);
  root.style.setProperty("--surface2", tokens.surface2);
  root.style.setProperty("--hairline", tokens.hairline);
  root.style.setProperty("--ink", tokens.ink);
  root.style.setProperty("--soft", tokens.soft);
  root.style.setProperty("--accent", tokens.accent);
  root.style.setProperty("--accent-text", tokens.accentText);
  root.style.setProperty("--accent-ink", tokens.accentInk);
  root.style.setProperty("--cold", tokens.cold);

  // Backward compatibility tokens for existing widgets (PID, VROOM, ProjectCard)
  root.style.setProperty("--panel", tokens.bg);
  root.style.setProperty("--panel-raised", tokens.surface);
  root.style.setProperty("--panel-sunk", tokens.surface2);
  root.style.setProperty("--rule", tokens.hairline);
  root.style.setProperty("--signal", tokens.accent);
  root.style.setProperty("--telemetry", tokens.accentText);
  root.style.setProperty("--hardware", tokens.accent);
  root.style.setProperty("--hardware-text", tokens.accentText);
  root.style.setProperty("--highlight", tokens.accent);
}
