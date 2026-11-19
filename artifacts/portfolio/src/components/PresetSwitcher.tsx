import React from "react";
import { useAppState, store, Preset, Tier } from "@/store";
import { applyPreset, PRESETS, PresetName } from "@/theme/presets";
import { Sun, Moon, Sliders, Palette } from "lucide-react";

export function PresetSwitcher() {
  const currentPreset = useAppState((s) => s.preset);
  const isDark = useAppState((s) => s.isDark);
  const tier = useAppState((s) => s.tier);

  const handlePresetChange = (name: PresetName) => {
    store.setState({ preset: name });
    applyPreset(name, isDark);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("preset", name);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Ignore
    }
  };

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    store.setState({ isDark: nextDark });
    applyPreset(currentPreset, nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const handleTierChange = (t: Tier) => {
    store.setState({ tier: t });
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("tier", t);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Ignore
    }
  };

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs select-none">
      {/* Theme Toggle */}
      <button
        onClick={handleToggleTheme}
        className="p-1.5 rounded-[2px] border border-hairline bg-surface hover:border-accent text-soft hover:text-ink transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="w-3.5 h-3.5 text-accent" /> : <Moon className="w-3.5 h-3.5 text-accent" />}
      </button>

      {/* Preset Pickers */}
      <div className="flex items-center border border-hairline rounded-[2px] overflow-hidden bg-surface">
        {(Object.keys(PRESETS) as PresetName[]).map((p) => {
          const isActive = currentPreset === p;
          return (
            <button
              key={p}
              onClick={() => handlePresetChange(p)}
              className={`px-2 py-1 text-[10px] tracking-wider uppercase transition-colors min-h-[36px] flex items-center ${
                isActive
                  ? "bg-accent text-accent-ink font-bold"
                  : "text-soft hover:text-ink hover:bg-surface2"
              }`}
              title={`Switch to ${p} preset`}
              aria-pressed={isActive}
            >
              {p.slice(0, 3)}
            </button>
          );
        })}
      </div>

      {/* Tier Switcher (compact) */}
      <div className="hidden sm:flex items-center border border-hairline rounded-[2px] overflow-hidden bg-surface">
        {(["full", "lite", "static"] as Tier[]).map((t) => {
          const isActive = tier === t;
          return (
            <button
              key={t}
              onClick={() => handleTierChange(t)}
              className={`px-2 py-1 text-[10px] uppercase transition-colors min-h-[36px] flex items-center ${
                isActive
                  ? "bg-surface2 text-accent font-bold border-b-2 border-accent"
                  : "text-soft hover:text-ink"
              }`}
              title={`Set quality tier to ${t}`}
              aria-pressed={isActive}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PresetSwitcher;
