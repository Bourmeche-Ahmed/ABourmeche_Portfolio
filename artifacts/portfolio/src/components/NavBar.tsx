import { useState, useEffect } from "react";
import { smoothScrollTo } from "@/lib/utils";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { Menu, X, Github, Linkedin, Download } from "lucide-react";

const NAV_ITEMS = [
  { href: "about", label: "ABOUT" },
  { href: "projects", label: "PROJECTS" },
  { href: "journey", label: "JOURNEY" },
  { href: "skills", label: "SKILLS" },
  { href: "contact", label: "CONTACT" },
];

export function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "journey", "skills", "contact"];
      const scrollY = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    smoothScrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-md border-b border-hairline transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Monogram / Brand */}
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-3 text-left group focus-visible:outline-none"
          aria-label="Ahmed Bourmeche - Back to top"
        >
          <div className="w-7 h-7 bg-surface border border-hairline flex items-center justify-center font-mono font-bold text-xs text-accent group-hover:border-accent transition-colors">
            AB
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="font-heading font-black text-sm text-ink tracking-wider group-hover:text-accent transition-colors">
              AHMED BOURMECHE
            </span>
            <span className="hidden sm:inline text-soft/50">·</span>
            <span className="hidden sm:inline text-accent text-[11px] font-semibold tracking-wide">
              PFE FEB 2027
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-soft">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`transition-colors py-1 focus-visible:outline-none tracking-wider ${
                  isActive ? "text-accent font-semibold" : "hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Socials & Resume PDF */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="https://github.com/Bourmeche-Ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-soft hover:text-accent transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-bourmeche/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-soft hover:text-accent transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={ASSET_PATHS.cv()}
              download="Ahmed_Bourmeche_RESUME.pdf"
              onClick={triggerResumeDownload}
              className="px-2.5 py-1 text-soft hover:text-accent border border-hairline hover:border-accent text-xs font-mono transition-colors flex items-center gap-1.5"
              aria-label="Download CV"
            >
              <Download className="w-3.5 h-3.5 text-accent" />
              <span>CV</span>
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden p-2 text-soft hover:text-ink min-w-[40px] min-h-[40px] flex items-center justify-center border border-hairline bg-surface"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-hairline bg-bg p-6 space-y-4 font-mono text-sm">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left py-2 text-soft hover:text-accent transition-colors"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-hairline flex items-center gap-4">
            <a
              href="https://github.com/Bourmeche-Ahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft hover:text-accent flex items-center gap-1.5 text-xs"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-bourmeche/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft hover:text-accent flex items-center gap-1.5 text-xs"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={ASSET_PATHS.cv()}
              download="Ahmed_Bourmeche_RESUME.pdf"
              className="text-accent flex items-center gap-1.5 text-xs font-semibold"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
