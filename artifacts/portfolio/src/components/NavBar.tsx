import { useState } from "react";
import { smoothScrollTo } from "@/lib/utils";
import { PresetSwitcher } from "./PresetSwitcher";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { Menu, X, Github, Linkedin, Download } from "lucide-react";

const NAV_ITEMS = [
  { href: "hero", label: "HERO" },
  { href: "projects", label: "PROJECTS" },
  { href: "skills", label: "SKILLS" },
  { href: "about", label: "ABOUT" },
  { href: "experience", label: "TIMELINE" },
  { href: "contact", label: "CONTACT" },
];

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    smoothScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-hairline transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Monogram */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
        >
          <div className="w-7 h-7 rounded-[2px] bg-surface2 border border-hairline flex items-center justify-center font-mono font-bold text-xs text-accent group-hover:border-accent transition-colors">
            AB
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base sm:text-lg tracking-wider text-ink leading-none">
              AHMED BOURMECHE
            </span>
            <span className="font-mono text-[9px] text-soft tracking-widest hidden sm:inline">
              THE BUILD // ROBOTICS & IIoT
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-soft">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="hover:text-accent transition-colors py-1 focus-visible:outline-none tracking-wider"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Tools & Presets */}
        <div className="flex items-center gap-2">
          {/* Socials & Resume (Desktop) */}
          <div className="hidden sm:flex items-center gap-1.5 border-r border-hairline pr-2 mr-1">
            <a
              href="https://github.com/Bourmeche-Ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-soft hover:text-accent transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center rounded-[2px]"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-bourmeche/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-soft hover:text-accent transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center rounded-[2px]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={ASSET_PATHS.cv()}
              download="Ahmed_Bourmeche_RESUME.pdf"
              onClick={triggerResumeDownload}
              className="p-1.5 text-soft hover:text-accent transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center rounded-[2px]"
              aria-label="Download Resume"
              title="Download Resume PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>

          <PresetSwitcher />

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden p-2 text-soft hover:text-ink min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[2px] border border-hairline bg-surface"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bg border-b border-hairline px-4 py-4 space-y-3 font-mono text-sm animate-in fade-in duration-150">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left px-3 py-2 rounded-[2px] bg-surface2 text-ink hover:text-accent transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-soft">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-hairline flex items-center justify-between">
            <span className="text-xs text-soft">Download CV / Resume</span>
            <a
              href={ASSET_PATHS.cv()}
              download="Ahmed_Bourmeche_RESUME.pdf"
              onClick={triggerResumeDownload}
              className="btn-secondary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-accent" />
              <span>Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
