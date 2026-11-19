import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { NavBar } from "@/components/NavBar";
import { SectionRail } from "@/components/SectionRail";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsContactSheet } from "@/components/ProjectsContactSheet";
import { SkillsSection } from "@/components/SkillsSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { NotFoundPage } from "@/components/NotFoundPage";
import { ProjectModal } from "@/components/ProjectModal";
import { Switch, Route } from "wouter";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { detectTier } from "@/lib/tier";
import { store, useAppState } from "@/store";
import { applyPreset, PresetName } from "@/theme/presets";
import type { Project } from "@/data/projects";

// Lazy-load 3D Robot canvas for P2/P3/P4
const RobotCanvas = lazy(() => import("@/components/three/RobotCanvas"));

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  useLenisScroll();

  const tier = useAppState((s) => s.tier);
  const debug = useAppState((s) => s.debug);

  // Initialize tier, preset, theme, and query flags on mount
  useEffect(() => {
    // 1. Detect tier
    const detectedTier = detectTier();

    // 2. Detect preset & theme from URL or storage
    const params = new URLSearchParams(window.location.search);
    const queryPreset = params.get("preset") as PresetName | null;
    const validPreset: PresetName =
      queryPreset === "vermilion" || queryPreset === "lime" || queryPreset === "ultraviolet"
        ? queryPreset
        : "vermilion";

    const hasDebug = params.get("debug") !== null;

    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = storedTheme ? storedTheme === "dark" : prefersDark;

    store.setState({
      tier: detectedTier,
      preset: validPreset,
      isDark,
      debug: hasDebug,
    });

    applyPreset(validPreset, isDark);
  }, []);

  // Listen for open-project-modal events dispatched from cards/strips
  useEffect(() => {
    const handleOpenModal = (e: CustomEvent<Project>) => {
      setSelectedProject(e.detail);
    };
    window.addEventListener("open-project-modal" as any, handleOpenModal);
    return () => window.removeEventListener("open-project-modal" as any, handleOpenModal);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-ink antialiased relative selection:bg-accent selection:text-accent-ink">
      {/* Accessible Skip Link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-ink font-mono text-xs rounded-[2px]"
      >
        Skip to main content
      </a>

      {/* 3D WebGL Background Canvas (Progressive Enhancement) */}
      {tier !== "static" && (
        <Suspense fallback={null}>
          <RobotCanvas />
        </Suspense>
      )}

      {/* Left Desktop Rail */}
      <SectionRail />

      {/* Top Navbar */}
      <NavBar />

      {/* Main Content Sections (DOM as Source of Truth) */}
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <ProjectsContactSheet onSelectProject={(p) => setSelectedProject(p)} />
        <SkillsSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal with Gallery & Lightbox */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Dev Debug Overlay (?debug) */}
      {debug && (
        <div className="fixed bottom-4 left-4 z-50 p-2.5 bg-surface/90 border border-hairline font-mono text-[10px] text-ink backdrop-blur-md rounded-[2px] shadow-lg pointer-events-none">
          <div className="text-accent font-bold">DEV // DEBUG OVERLAY</div>
          <div>TIER: {tier}</div>
          <div>SCROLL: {(store.getState().scroll * 100).toFixed(1)}%</div>
          <div>SUBSYSTEM: {store.getState().activeSubsystem || "none"}</div>
          <div>SKILL_GROUP: {store.getState().hoveredSkillGroup || "none"}</div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/404" component={NotFoundPage} />
      <Route path="/" component={AppContent} />
      <Route path="/ABourmeche_Portfolio" component={AppContent} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default App;
