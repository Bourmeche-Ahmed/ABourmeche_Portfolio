import { useState, useEffect } from "react";
import { smoothScrollTo } from "@/lib/utils";
import { ASSET_PATHS } from "@/lib/paths";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="pt-28 pb-16 border-b border-rule">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Availability line */}
          <div className="flex items-center gap-2.5 mb-6 text-sm text-ink-soft font-sans">
            <span
              className="w-2.5 h-2.5 bg-signal shrink-0 rounded-[2px]"
              aria-hidden="true"
            />
            <span>
              Available for a final-year internship (PFE) from February 2027 · open to relocation
            </span>
          </div>

          {/* Name */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink mb-3 leading-[1.05]">
            Ahmed Bourmeche
          </h1>

          {/* Role / Positioning */}
          <p className="font-sans text-lg sm:text-xl text-ink-soft leading-relaxed mb-8 max-w-2xl">
            Industrial Automation, Embedded Systems & Industrial IoT Engineer.
            Building field-configurable edge gateways, bare-metal firmware, Modbus/RS-485 networks, and real-time control stacks.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              onClick={() => smoothScrollTo("contact")}
              className="btn-primary"
            >
              Contact
            </button>
            <button
              onClick={() => smoothScrollTo("projects")}
              className="btn-secondary"
            >
              Projects
            </button>
            <a
              href={ASSET_PATHS.cv()}
              download="Ahmed_Bourmeche_RESUME.pdf"
              className="btn-secondary no-custom-link"
            >
              Download CV
            </a>
          </div>

          {/* Measured Stat Centerpiece */}
          <div className="border border-rule bg-panel-raised p-5 sm:p-6 rounded-[2px] mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm font-sans mb-3">
              <span className="text-ink font-medium">RS-485 polling cycle, per device</span>
              <span className="font-mono text-xs sm:text-sm">
                <span className="text-ink-soft mr-2">4.5 s</span>
                <span className="text-ink-soft mr-2 font-sans font-normal">→</span>
                <span className="text-signal font-semibold">350 ms</span>
                <span className="text-ink-soft ml-1.5">(13x)</span>
              </span>
            </div>

            <div className="w-full h-3 bg-panel-sunk border border-rule relative overflow-hidden rounded-[2px]">
              <div
                className="h-full bg-signal"
                style={{
                  width: isReducedMotion ? "7.8%" : mounted ? "7.8%" : "100%",
                  transition: isReducedMotion ? "none" : "width 900ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-ink-soft mt-2">
              <span>Unoptimized polling baseline (4.5 s)</span>
              <span>Dynamic register pruning (350 ms)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
