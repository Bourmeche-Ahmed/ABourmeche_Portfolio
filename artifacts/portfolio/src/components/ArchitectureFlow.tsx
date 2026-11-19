import React from "react";
import { ArrowRight, ArrowLeftRight } from "lucide-react";

interface ArchitectureFlowProps {
  architecture: string;
}

export function ArchitectureFlow({ architecture }: ArchitectureFlowProps) {
  // Split on arrow representations
  const tokens = architecture.split(/(\s*<->\s*|\s*->\s*|\s*↔\s*|\s*→\s*|\s*;\s*)/g).filter(Boolean);

  const blocks: { text: string; isArrow: boolean; isBidirectional: boolean }[] = [];
  tokens.forEach((t) => {
    const trimmed = t.trim();
    if (trimmed === "<->" || trimmed === "↔" || trimmed === "⇄") {
      blocks.push({ text: "<->", isArrow: true, isBidirectional: true });
    } else if (trimmed === "->" || trimmed === "→") {
      blocks.push({ text: "->", isArrow: true, isBidirectional: false });
    } else if (trimmed === ";") {
      blocks.push({ text: ";", isArrow: true, isBidirectional: false });
    } else if (trimmed.length > 0) {
      blocks.push({ text: trimmed, isArrow: false, isBidirectional: false });
    }
  });

  return (
    <div className="p-3.5 rounded-[2px] bg-panel-sunk border border-rule overflow-x-auto">
      <div className="flex items-center gap-1.5 min-w-max py-1">
        {blocks.map((block, i) => {
          if (block.isArrow) {
            const ArrowIcon = block.isBidirectional ? ArrowLeftRight : ArrowRight;
            return (
              <div
                key={i}
                className="px-1 text-ink-soft shrink-0 flex items-center justify-center"
              >
                <ArrowIcon className="w-3.5 h-3.5 text-signal" />
              </div>
            );
          }

          return (
            <div
              key={i}
              className="px-2.5 py-1 rounded-[2px] bg-panel-raised border border-rule font-mono text-xs text-ink shrink-0"
            >
              {block.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArchitectureFlow;
