import React, { useState, useEffect } from "react";
import { Terminal, RotateCcw } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";
import { projects } from "@/data/projects";

interface OutputLine {
  label: string;
  value: string;
  links?: { text: string; projectId: string }[];
}

const TERMINAL_DATA: OutputLine[] = [
  { label: "IDENTITY", value: "Ahmed Bourmeche" },
  { label: "ACADEMIC", value: "INSAT, University of Carthage (State Eng. Degree 2022–2027)" },
  { label: "TARGET", value: "Final-Year Internship (PFE) — Feb 2027 · Open to International Relocation" },
  { label: "FOCUS", value: "Embedded Firmware (Bare-metal C), Robotics, Fieldbuses (RS-485 / Modbus), HIL" },
  {
    label: "SELECTED",
    value: "",
    links: [
      { text: "[VROOM]", projectId: "vroom" },
      { text: "[FARZIT]", projectId: "farzit" },
      { text: "[HIL-Suspension]", projectId: "quarter-car-suspension-system" },
      { text: "[PID-Twin]", projectId: "pid-control-dashboard" },
    ],
  },
];

export function TerminalWhoami() {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [typedCommand, setTypedCommand] = useState("");
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.micro.terminalWhoami;

  const commandText = "whoami --spec";

  const runTyping = () => {
    if (!canAnimate) {
      setTypedCommand(commandText);
      setDisplayedLines(TERMINAL_DATA.length);
      return;
    }

    setTypedCommand("");
    setDisplayedLines(0);

    let charIdx = 0;
    const typeInterval = setInterval(() => {
      charIdx++;
      setTypedCommand(commandText.slice(0, charIdx));
      if (charIdx >= commandText.length) {
        clearInterval(typeInterval);

        // Stream output lines
        let lineIdx = 0;
        const lineInterval = setInterval(() => {
          lineIdx++;
          setDisplayedLines(lineIdx);
          if (lineIdx >= TERMINAL_DATA.length) {
            clearInterval(lineInterval);
          }
        }, 120);
      }
    }, 45);
  };

  useEffect(() => {
    runTyping();
  }, [canAnimate]);

  const handleProjectClick = (projectId: string) => {
    const target = projects.find((p) => p.id === projectId);
    if (target) {
      window.dispatchEvent(
        new CustomEvent("open-project-modal", { detail: target })
      );
    }
  };

  return (
    <div className="border border-rule bg-panel-raised rounded-[2px] overflow-hidden my-6 shadow-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-panel-sunk border-b border-rule font-mono text-xs text-ink-soft select-none">
        <div className="flex items-center gap-2">
          {/* Terminal control dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] text-ink-soft ml-1 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-signal" />
            <span>ahmed@insat-box:~</span>
          </span>
        </div>

        <button
          onClick={runTyping}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded-[1px] hover:bg-panel text-ink-soft hover:text-ink transition-colors text-[10px]"
          title="Replay terminal execution"
          aria-label="Replay terminal output"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>REPLAY</span>
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-4 bg-zinc-950 font-mono text-xs text-zinc-300 space-y-1.5 overflow-x-auto select-text leading-relaxed">
        {/* Command line prompt */}
        <div className="flex items-center gap-2 text-zinc-100">
          <span className="text-signal font-semibold">user@insat:~$</span>
          <span>{typedCommand}</span>
          {typedCommand.length < commandText.length && (
            <span className="w-1.5 h-3.5 bg-signal inline-block animate-pulse" />
          )}
        </div>

        {/* Output lines */}
        {TERMINAL_DATA.slice(0, displayedLines).map((line, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:gap-2 text-[11px]">
            <span className="text-zinc-500 w-24 shrink-0 font-semibold uppercase">
              {line.label}:
            </span>
            {line.links ? (
              <div className="flex flex-wrap gap-2 text-signal">
                {line.links.map((link) => (
                  <button
                    key={link.projectId}
                    onClick={() => handleProjectClick(link.projectId)}
                    className="hover:underline font-bold text-signal hover:text-amber-300 cursor-pointer"
                  >
                    {link.text}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-zinc-200">{line.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TerminalWhoami;
