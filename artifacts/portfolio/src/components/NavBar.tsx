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
          className="font-heading font-bold text-xl tracking-tight text-ink hover:text-signal transition-colors flex items-center gap-1.5 focus-visible:outline-none"
        >
          <span className="w-2 h-2 bg-signal inline-block rounded-[2px]" />
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
