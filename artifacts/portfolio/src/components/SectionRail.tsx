import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/utils";
import { useAppState } from "@/store";

const SECTIONS = [
  { id: "hero", num: "01", label: "HERO" },
  { id: "projects", num: "02", label: "PROJECTS" },
  { id: "skills", num: "03", label: "SKILLS" },
  { id: "about", num: "04", label: "ABOUT" },
  { id: "experience", num: "05", label: "TIMELINE" },
  { id: "contact", num: "06", label: "CONTACT" },
];

export function SectionRail() {
  const [activeSection, setActiveSection] = useState("hero");
  const scroll = useAppState((s) => s.scroll);
  const tier = useAppState((s) => s.tier);
  const preset = useAppState((s) => s.preset);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-5 select-none pointer-events-auto"
      aria-label="Section navigation rail"
    >
      {/* Top tiny metadata */}
      <div className="font-mono text-[9px] text-soft tracking-widest uppercase flex flex-col gap-0.5">
        <span className="text-ink font-semibold">THE BUILD // 3D</span>
        <span>TIER: {tier}</span>
        <span>PRESET: {preset}</span>
      </div>

      {/* Vertical Track Line */}
      <div className="relative w-[1px] h-48 bg-hairline">
        <div
          className="absolute top-0 left-0 w-full bg-accent transition-all duration-150 origin-top"
          style={{ height: `${Math.min(100, Math.max(0, scroll * 100))}%` }}
        />
      </div>

      {/* Section Jump Links */}
      <nav className="flex flex-col gap-3 font-mono text-xs">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => smoothScrollTo(sec.id)}
              className={`flex items-center gap-2 group text-left transition-colors focus-visible:outline-none ${
                isActive ? "text-accent font-semibold" : "text-soft hover:text-ink"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className={`text-[10px] ${isActive ? "text-accent" : "text-soft"}`}>
                {sec.num}
              </span>
              <span className="text-[11px] tracking-wider transition-transform duration-200 group-hover:translate-x-1">
                {sec.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default SectionRail;
