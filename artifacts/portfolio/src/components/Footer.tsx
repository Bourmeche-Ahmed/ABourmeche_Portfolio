import React from "react";
import { useAppState } from "@/store";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";

export function Footer() {
  const tier = useAppState((s) => s.tier);
  const preset = useAppState((s) => s.preset);

  return (
    <footer className="border-t border-hairline bg-surface py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink">
              <span className="w-2 h-2 rounded-[1px] bg-accent" />
              <span>AHMED BOURMECHE // THE BUILD</span>
            </div>
            <p className="font-sans text-xs text-soft mt-1">
              Industrial Automation, Embedded Systems & Real-Time Industrial IoT.
            </p>
          </div>

          <button
            onClick={() => smoothScrollTo("hero")}
            className="btn-secondary text-xs inline-flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] text-soft">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>INSAT STATE DEGREE (2022–2027)</span>
            <span>·</span>
            <span>SYS_CRC: 0x7E3A9F1B</span>
            <span>·</span>
            <span>TIER: {tier.toUpperCase()}</span>
            <span>·</span>
            <span>PRESET: {preset.toUpperCase()}</span>
          </div>

          <div>
            <span>AUTONOMOUS PROGRESSIVE ENHANCEMENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
