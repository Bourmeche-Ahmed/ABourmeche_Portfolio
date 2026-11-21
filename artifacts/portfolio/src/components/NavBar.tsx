import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { smoothScrollTo } from "@/lib/utils";
import { Menu, X, Linkedin, Github } from "lucide-react";

const navLinks = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "experience", label: "Experience" },
  { href: "projects", label: "Projects" },
  { href: "skills", label: "Skills" },
  { href: "contact", label: "Contact" },
];

export function NavBar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => document.getElementById(l.href));
      let current = "home";
      for (const section of sections) {
        if (section && section.getBoundingClientRect().top <= 140) {
          current = section.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    smoothScrollTo(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-panel/95 border-b border-rule transition-colors">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => handleNav("home")}
          className="font-heading font-bold text-xl tracking-tight text-ink hover:text-signal transition-colors flex items-center gap-2.5 focus-visible:outline-none group"
        >
          <div className="w-7 h-7 rounded-[3px] bg-panel-sunk border border-rule flex items-center justify-center p-0.5 group-hover:border-signal transition-colors">
            <svg viewBox="0 0 256 256" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="12" y="12" width="232" height="232" rx="16" fill="#121820" stroke="#f57c00" strokeWidth="6" />
              <path d="M 28 44 L 28 28 L 44 28" stroke="#f57c00" strokeWidth="6" fill="none" />
              <path d="M 228 44 L 228 28 L 212 28" stroke="#f57c00" strokeWidth="6" fill="none" />
              <path d="M 28 212 L 28 228 L 44 228" stroke="#f57c00" strokeWidth="6" fill="none" />
              <path d="M 228 212 L 228 228 L 212 228" stroke="#f57c00" strokeWidth="6" fill="none" />
              <circle cx="128" cy="128" r="64" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6 6" fill="none" />
              <text x="128" y="152" fontFamily="'IBM Plex Sans', sans-serif" fontSize="88" fontWeight="900" fill="#f57c00" textAnchor="middle">AB</text>
            </svg>
          </div>
          <span>AHMED BOURMECHE</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className={`font-heading text-lg tracking-wide transition-colors relative py-1 ${
                active === link.href
                  ? "text-ink font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-signal"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {link.label}
            </button>
          ))}
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
          <ThemeToggle />
          <button
            className="md:hidden p-1.5 text-ink-soft hover:text-ink transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

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
