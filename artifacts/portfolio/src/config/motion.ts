/**
 * Central motion tokens and feature flags for the engineering portfolio.
 * Provides fine-grained control over animations and performance.
 */

export interface MotionConfig {
  intensity: "full" | "reduced";
  flags: {
    boot: boolean;
    heroCanvas: boolean;
    cursorFx: boolean;
    tilt: boolean;
    commandPalette: boolean;
    widgets: boolean;
    oscilloscope: boolean;
  };
  easings: {
    /** Primary measurement easing: fast start, precise settle */
    standard: [number, number, number, number];
    /** Signal flow easing: constant velocity with snappy brake */
    signal: [number, number, number, number];
    /** Decelerate curve for entrances */
    entrance: [number, number, number, number];
  };
  durations: {
    instant: number;
    fast: number;
    normal: number;
    slow: number;
  };
  stagger: {
    tight: number;
    normal: number;
  };
}

export const motionConfig: MotionConfig = {
  // Global intensity switch: "full" enables rich dynamics; "reduced" dials back all motion
  intensity: "full",

  // Individual feature flags to toggle specific features on or off
  flags: {
    boot: true,
    heroCanvas: true,
    cursorFx: true,
    tilt: true,
    commandPalette: true,
    widgets: true,
    oscilloscope: true,
  },

  // Easing curves: cubic-bezier(0.22, 1, 0.36, 1) per design spec
  easings: {
    standard: [0.22, 1, 0.36, 1],
    signal: [0.16, 1, 0.3, 1],
    entrance: [0, 0, 0.2, 1],
  },

  // Durations in seconds (200ms - 600ms per spec)
  durations: {
    instant: 0,
    fast: 0.2,
    normal: 0.35,
    slow: 0.55,
  },

  // Stagger intervals in seconds (40ms - 80ms per spec)
  stagger: {
    tight: 0.04,
    normal: 0.06,
  },
};
