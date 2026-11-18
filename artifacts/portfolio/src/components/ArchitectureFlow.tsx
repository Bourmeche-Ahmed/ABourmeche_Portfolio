import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { ArrowRight, ArrowLeftRight } from "lucide-react";

interface ArchitectureFlowProps {
  architecture: string;
}

export function ArchitectureFlow({ architecture }: ArchitectureFlowProps) {
  const reducedMotion = useReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.1 });

  // Split on various arrow representations: ' <-> ', ' <->', '<->', ' <-> ', ' -> ', ' ↔ ', ' → ', ' ⇄ '
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

  if (reducedMotion) {
    return (
      <div className="p-3.5 rounded-[2px] bg-panel-sunk border border-rule font-mono text-xs text-ink overflow-x-auto leading-relaxed">
        {architecture}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="p-3.5 rounded-[2px] bg-panel-sunk border border-rule overflow-x-auto"
    >
      <div className="flex items-center gap-1.5 min-w-max py-1">
        {blocks.map((block, i) => {
          if (block.isArrow) {
            const ArrowIcon = block.isBidirectional ? ArrowLeftRight : ArrowRight;
            return (
              <div
                key={i}
                className="relative px-1 text-ink-soft shrink-0 flex items-center justify-center"
              >
                <ArrowIcon className="w-3.5 h-3.5 text-rule" />
                {inView && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowIcon className="w-3.5 h-3.5 text-signal" />
                  </motion.div>
                )}
              </div>
            );
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.6, borderColor: "var(--rule)" }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      borderColor: ["var(--rule)", "var(--signal)", "var(--rule)"],
                    }
                  : {}
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
              className="px-2.5 py-1 rounded-[2px] bg-panel-raised border font-mono text-xs text-ink shadow-xs shrink-0 select-text"
            >
              {block.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
