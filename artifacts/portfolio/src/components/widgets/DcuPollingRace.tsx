import { useState, useEffect } from "react";
import { Play, RotateCcw, Activity, Gauge, CheckCircle2 } from "lucide-react";

export function DcuPollingRace() {
  const [isRunning, setIsRunning] = useState(false);
  const [progressBefore, setProgressBefore] = useState(0);
  const [progressAfter, setProgressAfter] = useState(0);

  const startRace = () => {
    setProgressBefore(0);
    setProgressAfter(0);
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    const startTime = performance.now();
    const durationBefore = 4500; // 4.5s
    const durationAfter = 350;   // 350ms

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;

      const pctAfter = Math.min((elapsed / durationAfter) * 100, 100);
      const pctBefore = Math.min((elapsed / durationBefore) * 100, 100);

      setProgressAfter(pctAfter);
      setProgressBefore(pctBefore);

      if (pctBefore < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        setIsRunning(false);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);

  return (
    <div className="border border-rule bg-panel-raised rounded-[2px] p-4 sm:p-5 select-none space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-rule">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-signal" />
          <h4 className="font-heading font-bold text-sm sm:text-base text-ink">
            DCU Edge Gateway Polling Benchmark
          </h4>
        </div>
        <span className="font-mono text-[10px] bg-panel-sunk px-2 py-0.5 rounded-[2px] border border-rule text-ink-soft">
          Illustrative model
        </span>
      </div>

      <p className="text-xs font-sans text-ink-soft">
        Comparing Modbus RTU register polling cycle latency across 9 containerized Docker services:
      </p>

      {/* Side-by-Side Bus Timeline */}
      <div className="space-y-3">
        {/* Optimized (After) */}
        <div className="p-3 bg-panel-sunk border border-rule rounded-[2px] space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-ink font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[1px] bg-signal" />
              Pruned Register Map (Optimized)
            </span>
            <span className="text-signal font-bold tabular-nums">350 ms</span>
          </div>
          <div className="h-2 w-full bg-panel rounded-[1px] overflow-hidden">
            <div
              className="h-full bg-signal transition-all duration-75"
              style={{ width: `${progressAfter}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-ink-soft">
            <span>Cycle time: 350 ms</span>
            {progressAfter >= 100 && (
              <span className="text-signal font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 13x SPEEDUP ACHIEVED
              </span>
            )}
          </div>
        </div>

        {/* Legacy (Before) */}
        <div className="p-3 bg-panel-sunk border border-rule rounded-[2px] space-y-1.5 opacity-80">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-ink-soft flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-[1px] bg-ink-soft" />
              Full Register Map (Unoptimized)
            </span>
            <span className="text-ink-soft tabular-nums">4,500 ms (4.5 s)</span>
          </div>
          <div className="h-2 w-full bg-panel rounded-[1px] overflow-hidden">
            <div
              className="h-full bg-ink-soft transition-all duration-75"
              style={{ width: `${progressBefore}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-ink-soft">
            <span>Cycle time: 4.5 seconds per device</span>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <button
          onClick={startRace}
          className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
        >
          {isRunning ? (
            <>
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Run Polling Race</span>
            </>
          )}
        </button>

        <span className="font-mono text-[11px] text-ink-soft">
          Architecture: 9 Docker services · Modbus RTU / RS-485
        </span>
      </div>
    </div>
  );
}

export default DcuPollingRace;
