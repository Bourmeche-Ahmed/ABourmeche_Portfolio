import * as THREE from "three";

export interface RobotColorPalette {
  body: THREE.Color;
  accent: THREE.Color;
  accentText: THREE.Color;
  accentInk: THREE.Color;
  ink: THREE.Color;
  soft: THREE.Color;
  surface: THREE.Color;
  copper: THREE.Color;
  pcb: THREE.Color;
}

export function createRobotColors(): RobotColorPalette {
  return {
    body: new THREE.Color("#EAE7E1"),
    accent: new THREE.Color("#FF5A2B"),
    accentText: new THREE.Color("#FF5A2B"),
    accentInk: new THREE.Color("#0A0A0C"),
    ink: new THREE.Color("#F3F1EC"),
    soft: new THREE.Color("#A3A1AB"),
    surface: new THREE.Color("#1B1B20"),
    copper: new THREE.Color("#D6955B"),
    pcb: new THREE.Color("#13362C"),
  };
}

export function updateColorsFromCss(target: RobotColorPalette, lerpSpeed = 0.08) {
  if (typeof window === "undefined") return;
  const computed = getComputedStyle(document.documentElement);

  const getCssHex = (varName: string, fallback: string): string => {
    const val = computed.getPropertyValue(varName).trim();
    return val && val.startsWith("#") ? val : fallback;
  };

  const accentHex = getCssHex("--accent", "#FF5A2B");
  const inkHex = getCssHex("--ink", "#F3F1EC");
  const softHex = getCssHex("--soft", "#A3A1AB");
  const surfaceHex = getCssHex("--surface", "#1B1B20");
  const isDark = document.documentElement.classList.contains("dark");

  const targetBodyHex = isDark ? "#282830" : "#F4F1EA";

  target.accent.lerp(new THREE.Color(accentHex), lerpSpeed);
  target.body.lerp(new THREE.Color(targetBodyHex), lerpSpeed);
  target.ink.lerp(new THREE.Color(inkHex), lerpSpeed);
  target.soft.lerp(new THREE.Color(softHex), lerpSpeed);
  target.surface.lerp(new THREE.Color(surfaceHex), lerpSpeed);
  target.copper.lerp(new THREE.Color("#D6955B"), lerpSpeed);
}
