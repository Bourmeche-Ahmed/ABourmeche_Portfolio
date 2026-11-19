import { useState, useEffect, useCallback } from "react";
import { BootSequence } from "@/components/BootSequence";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { AtAGlanceStrip } from "@/components/AtAGlanceStrip";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ToastProvider, useToastNotification } from "@/components/Toast";
import { CommandPalette } from "@/components/CommandPalette";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Command } from "lucide-react";
import type { Project } from "@/data/projects";

function AppContent() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isOscilloscope, setIsOscilloscope] = useState(false);
  const { showToast } = useToastNotification();

  // Konami code easter egg listener
  useKonamiCode(() => {
    setIsOscilloscope((prev) => {
      const next = !prev;
      showToast(
        next
          ? "Oscilloscope mode activated (CRT Phosphor) [Konami]"
          : "Oscilloscope mode deactivated",
        "info"
      );
      return next;
    });
  });

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectProject = useCallback((project: Project) => {
    window.dispatchEvent(
      new CustomEvent("open-project-modal", { detail: project })
    );
  }, []);

  const handleToggleTheme = useCallback(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const handleToggleOscilloscope = useCallback(() => {
    setIsOscilloscope((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased relative">
      <BootSequence />
      <NavBar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />
      <main>
        <HeroSection isOscilloscope={isOscilloscope} />
        <AtAGlanceStrip />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={handleSelectProject}
        onToggleTheme={handleToggleTheme}
        onToggleOscilloscope={handleToggleOscilloscope}
      />

      {/* Floating Mobile Command Palette Button */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="fixed bottom-5 right-5 z-40 sm:hidden flex items-center gap-1.5 px-3 py-2 bg-panel-raised border border-rule text-signal rounded-[2px] shadow-sm font-mono text-xs active:scale-95 transition-all"
        aria-label="Open command search"
      >
        <Command className="w-3.5 h-3.5" />
        <span className="font-semibold text-ink text-[11px]">⌘K</span>
      </button>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
