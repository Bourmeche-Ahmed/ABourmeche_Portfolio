import { useState, useEffect } from "react";

export function TelemetryHud() {
  const [tunisTime, setTunisTime] = useState("");
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("HOME");

  useEffect(() => {
    // 1. Live Africa/Tunis Time clock
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Tunis",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTunisTime(formatter.format(new Date()));
      } catch {
        const now = new Date();
        setTunisTime(now.toTimeString().split(" ")[0]);
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // 2. Scroll percentage & active section tracker
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalHeight > 0 ? Math.min(Math.round((scrollY / totalHeight) * 100), 100) : 0;
      setScrollPercent(pct);

      // Section detection
      const sections = ["contact", "experience", "skills", "projects", "about", "home"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id.toUpperCase());
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-panel-raised/90 border border-rule rounded-[2px] font-mono text-[10px] text-ink-soft select-none pointer-events-none z-10 shadow-xs"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-[1px] bg-signal animate-pulse" />
        <span className="text-ink font-semibold tracking-wider">HUD_01</span>
      </div>

      <span className="text-rule">|</span>

      <div className="flex items-center gap-1">
        <span className="text-ink-soft">TUNIS:</span>
        <span className="text-ink font-medium tabular-nums">{tunisTime || "12:00:00"}</span>
        <span className="text-[9px] text-ink-soft/70">[UTC+1]</span>
      </div>

      <span className="text-rule">|</span>

      <div className="flex items-center gap-1">
        <span className="text-ink-soft">SCROLL:</span>
        <span className="text-ink font-medium tabular-nums">{scrollPercent}%</span>
      </div>

      <span className="text-rule">|</span>

      <div className="flex items-center gap-1">
        <span className="text-ink-soft">SEC:</span>
        <span className="text-signal font-semibold">// {activeSection}</span>
      </div>
    </div>
  );
}
