import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { smoothScrollTo } from "@/lib/utils";
import { Menu, X, Linkedin, Github } from "lucide-react";

const navLinks = [
  { href: "home", label: "Home" },
  { href: "glance", label: "At a glance" },
  { href: "projects", label: "Projects" },
  { href: "skills", label: "Skills" },
  { href: "about", label: "About" },
  { href: "experience", label: "Experience" },
  { href: "contact", label: "Contact" },
];

interface NavBarProps {
  onThemeChanged?: (isDark: boolean) => void;
}

export function NavBar({ onThemeChanged }: NavBarProps) {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Active section
      const sections = navLinks.map((l) => document.getElementById(l.href));
      let current = "home";
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= 140) {
          current = section.id;
        }
      }
      setActive(current);

      // 2. Scroll progress
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrollY / total) * 100 : 0;
      setScrollProgress(Math.min(pct, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    smoothScrollTo(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-panel/95 border-b border-rule backdrop-blur-sm transition-colors">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => handleNav("home")}
          className="font-heading font-bold text-xl tracking-tight text-ink hover:text-signal transition-colors flex items-center gap-2.5 focus-visible:outline-none group"
        >
          <div className="w-7 h-7 rounded-[2px] bg-panel-sunk border border-rule flex items-center justify-center p-0.5 group-hover:border-signal transition-colors">
            <svg viewBox="0 0 256 256" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="12" y="12" width="232" height="232" rx="4" className="fill-panel-sunk stroke-hardware" strokeWidth="10" />
              <path d="M 28 48 L 28 28 L 48 28" className="stroke-signal" strokeWidth="8" fill="none" />
              <path d="M 228 48 L 228 28 L 208 28" className="stroke-signal" strokeWidth="8" fill="none" />
              <path d="M 28 208 L 28 228 L 48 228" className="stroke-signal" strokeWidth="8" fill="none" />
              <path d="M 228 208 L 228 228 L 208 228" className="stroke-signal" strokeWidth="8" fill="none" />
              <circle cx="128" cy="128" r="64" className="stroke-signal" strokeWidth="4" strokeDasharray="6 6" fill="none" />
              <text x="128" y="152" fontFamily="'IBM Plex Sans', sans-serif" fontSize="88" fontWeight="900" className="fill-hardware" textAnchor="middle">AB</text>
            </svg>
          </div>
          <span>AHMED BOURMECHE</span>
        </button>

        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`font-heading text-base tracking-wide transition-colors relative py-1 focus-visible:outline-none ${
                  isActive ? "text-ink font-bold" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-signal" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Bourmeche-Ahmed"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-ink-soft hover:text-ink transition-colors no-custom-link"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-bourmeche/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-ink-soft hover:text-ink transition-colors no-custom-link"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <ThemeToggle onThemeChanged={onThemeChanged} />
          <button
            className="md:hidden p-1.5 text-ink-soft hover:text-ink transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Plain 2px scroll progress bar under navbar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-signal transition-all duration-75 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-rule bg-panel px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`w-full text-left px-3 py-2 font-heading text-lg transition-colors ${
                active === link.href
                  ? "text-ink font-bold bg-panel-sunk border-l-2 border-signal"
                  : "text-ink-soft hover:text-ink hover:bg-panel-sunk"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
