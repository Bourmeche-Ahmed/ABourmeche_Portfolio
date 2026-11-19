/**
 * Minimal motion configuration: easings, durations, spring presets, and reducedMotion helper.
 */

export const easings = {
  standard: [0.22, 1, 0.36, 1] as const,
};

export const durations = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
};

export const springPresets = {
  snappy: { stiffness: 200, damping: 20 },
  gentle: { stiffness: 120, damping: 14 },
};

export function getReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
