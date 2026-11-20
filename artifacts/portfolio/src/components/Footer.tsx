import React from "react";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink">
              <span className="w-1.5 h-1.5 bg-accent" />
              <span>AHMED BOURMECHE</span>
              <span className="text-soft">·</span>
              <span className="text-soft font-normal">EMBEDDED SYSTEMS &amp; INDUSTRIAL IoT</span>
            </div>
            <p className="font-sans text-xs text-soft mt-1">
              INSAT National Institute of Applied Science and Technology · State Engineering Degree candidate.
            </p>
          </div>

          <button
            onClick={() => smoothScrollTo("hero")}
            className="p-2.5 border border-hairline bg-surface2 text-xs font-mono text-soft hover:text-accent hover:border-accent inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] text-soft">
          <div>
            <span>© {new Date().getFullYear()} AHMED BOURMECHE · AVAILABLE FOR PFE FEB 2027</span>
          </div>

          <div className="text-soft/60">
            <span>TUNIS, TUNISIA · WORLDWIDE MOBILITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
