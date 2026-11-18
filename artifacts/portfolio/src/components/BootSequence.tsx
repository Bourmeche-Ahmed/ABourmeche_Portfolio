import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";

const BOOT_LOGS = [
  { time: "0.00s", tag: "SYS_CORE", text: "Initializing STM32F103 & dual-core ESP32-S3 firmware... OK" },
  { time: "0.24s", tag: "BUS_INIT", text: "Probing CAN 2.0B transceiver, RS-485 Modbus RTU & BACnet... OK" },
  { time: "0.52s", tag: "TELEMETRY", text: "Coupling TimescaleDB, MQTT broker & MATLAB digital twins... OK" },
  { time: "0.82s", tag: "INSTRUMENT", text: "Engineering console ready. Welcome to Ahmed Bourmeche's portfolio." },
];

export function BootSequence({ onComplete }: { onComplete?: () => void }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (!motionConfig.flags.boot || reducedMotion) return false;
    try {
      return sessionStorage.getItem("portfolio_boot_seen") !== "true";
    } catch {
      return false;
    }
  });

  const [activeLine, setActiveLine] = useState(0);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem("portfolio_boot_seen", "true");
    } catch {
      // Ignore storage errors in restricted contexts
    }
    setVisible(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!visible) return;

    // Advance lines at timed intervals (~260ms per line)
    const timers: (ReturnType<typeof setTimeout>)[] = [];
    BOOT_LOGS.forEach((_, idx) => {
      timers.push(
        setTimeout(() => {
          setActiveLine(idx);
        }, idx * 260)
      );
    });

    // Auto-dismiss at ~1.2s max
    const autoDismiss = setTimeout(() => {
      dismiss();
    }, 1250);

    // Keyboard dismiss on Escape, Space, or Enter
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        dismiss();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(autoDismiss);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-live="polite"
        className="fixed inset-0 z-50 flex items-center justify-center bg-panel font-mono text-xs select-none p-4"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        onClick={dismiss}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(128, 128, 128, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative w-full max-w-lg border border-rule bg-panel-raised p-5 rounded-[2px] shadow-sm">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-rule text-ink-soft text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-[1px] bg-signal animate-pulse" />
              <span className="font-semibold text-ink">BOOTLOADER // A_BOURMECHE_OS v2.4</span>
            </div>
            <span className="text-[10px] bg-panel-sunk px-1.5 py-0.5 rounded-[2px] border border-rule">
              PRESS ANY KEY TO SKIP [ESC]
            </span>
          </div>

          {/* Terminal log lines */}
          <div className="space-y-2 py-2 min-h-[110px]">
            {BOOT_LOGS.map((log, index) => {
              if (index > activeLine) return null;
              const isLatest = index === activeLine;
              return (
                <motion.div
                  key={log.tag}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-2.5 text-ink leading-relaxed"
                >
                  <span className="text-ink-soft select-none text-[10px] w-12 shrink-0">
                    [{log.time}]
                  </span>
                  <span className="text-signal font-semibold shrink-0">
                    {log.tag}:
                  </span>
                  <span className="font-mono text-ink-soft/90 flex-1">
                    {log.text}
                    {isLatest && (
                      <span className="inline-block w-1.5 h-3 bg-signal ml-1.5 align-middle animate-pulse" />
                    )}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Bar Footer */}
          <div className="pt-3 mt-3 border-t border-rule flex items-center justify-between text-[10px] text-ink-soft">
            <div className="flex items-center gap-2 flex-1 mr-4">
              <span className="text-[10px]">SYS_CLK</span>
              <div className="h-1 flex-1 bg-panel-sunk rounded-[1px] overflow-hidden">
                <motion.div
                  className="h-full bg-signal"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.1, ease: "linear" }}
                />
              </div>
            </div>
            <span className="font-semibold text-signal">READY</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
