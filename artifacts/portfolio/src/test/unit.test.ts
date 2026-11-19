import { describe, it, expect } from "vitest";
import { projects } from "../data/projects";
import { PRESETS, getContrastRatio, PresetName } from "../theme/presets";
import { detectTier } from "../lib/tier";

describe("1. Project Data Integrity", () => {
  it("all projects have unique ids and valid order values when present", () => {
    const ids = new Set<string>();
    for (const p of projects) {
      expect(ids.has(p.id), `Duplicate project id: ${p.id}`).toBe(false);
      ids.add(p.id);
      if (p.order !== undefined) {
        expect(p.order).toBeGreaterThan(0);
      }
    }
  });

  it("all projects contain required editorial fields", () => {
    for (const p of projects) {
      expect(p.title.trim().length, `Project ${p.id} missing title`).toBeGreaterThan(0);
      expect(p.description.trim().length, `Project ${p.id} missing description`).toBeGreaterThan(10);
      expect(p.longDescription.trim().length, `Project ${p.id} missing longDescription`).toBeGreaterThan(20);
      expect(p.category, `Project ${p.id} missing category`).toBeDefined();
      expect(p.repo, `Project ${p.id} missing repo identifier`).toBeDefined();
      expect(p.techBadges.length, `Project ${p.id} missing techBadges`).toBeGreaterThan(0);
    }
  });
});

describe("2. Truth Number Snapshot", () => {
  it("verifies accurate technical numbers from resume and hardware reality", () => {
    const vroom = projects.find((p) => p.id === "vroom");
    expect(vroom).toBeDefined();
    expect(vroom?.longDescription).toContain("ESP32-S3");
    expect(vroom?.longDescription).toContain("TPS54360");
    expect(vroom?.longDescription).toContain("SN65HVD230");
    expect(vroom?.longDescription).toContain("74HCT244");

    const rl = projects.find((p) => p.id === "rl-navigation");
    expect(rl).toBeDefined();
    expect(rl?.metrics?.some((m) => m.label === "Success rate" && m.value === "81%")).toBe(true);
    expect(rl?.metrics?.some((m) => m.label === "Timeouts" && m.value === "0%")).toBe(true);

    const farzit = projects.find((p) => p.id === "farzit");
    expect(farzit).toBeDefined();
    expect(farzit?.techBadges).toContain("STM32");
    expect(farzit?.techBadges).toContain("ToF Sensor");
    expect(farzit?.techBadges).toContain("Cascaded PID");

    const suspension = projects.find((p) => p.id === "quarter-car-suspension-system");
    expect(suspension).toBeDefined();
    expect(suspension?.description).toContain("87%");
  });
});

describe("3. Quality Tier Detection", () => {
  it("detects tier properly and defaults sensibly", () => {
    const tier = detectTier();
    expect(["full", "lite", "static"]).toContain(tier);
  });
});

describe("4. Palette Contrast Verification (WCAG AA Compliance)", () => {
  const presets: PresetName[] = ["vermilion", "lime", "ultraviolet"];

  for (const p of presets) {
    describe(`Preset: ${p}`, () => {
      const preset = PRESETS[p];

      it("Dark mode meets WCAG AA contrast (>= 4.5:1)", () => {
        const tokens = preset.dark;
        const inkContrast = getContrastRatio(tokens.ink, tokens.bg);
        const softContrast = getContrastRatio(tokens.soft, tokens.bg);
        const accentTextContrast = getContrastRatio(tokens.accentText, tokens.bg);
        const accentInkContrast = getContrastRatio(tokens.accentInk, tokens.accent);

        expect(inkContrast, `${p} dark ink contrast`).toBeGreaterThanOrEqual(4.5);
        expect(softContrast, `${p} dark soft contrast`).toBeGreaterThanOrEqual(4.5);
        expect(accentTextContrast, `${p} dark accentText contrast`).toBeGreaterThanOrEqual(4.5);
        expect(accentInkContrast, `${p} dark accentInk on accent contrast`).toBeGreaterThanOrEqual(4.5);
      });

      it("Light mode meets WCAG AA contrast (>= 4.5:1)", () => {
        const tokens = preset.light;
        const inkContrast = getContrastRatio(tokens.ink, tokens.bg);
        const softContrast = getContrastRatio(tokens.soft, tokens.bg);
        const accentTextContrast = getContrastRatio(tokens.accentText, tokens.bg);
        const accentInkContrast = getContrastRatio(tokens.accentInk, tokens.accent);

        expect(inkContrast, `${p} light ink contrast`).toBeGreaterThanOrEqual(4.5);
        expect(softContrast, `${p} light soft contrast`).toBeGreaterThanOrEqual(4.5);
        expect(accentTextContrast, `${p} light accentText contrast`).toBeGreaterThanOrEqual(4.5);
        expect(accentInkContrast, `${p} light accentInk on accent contrast`).toBeGreaterThanOrEqual(4.5);
      });
    });
  }
});
