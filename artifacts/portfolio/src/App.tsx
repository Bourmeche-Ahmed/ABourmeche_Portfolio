import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SelectedProjects } from "@/components/SelectedProjects";
import { JourneySection } from "@/components/JourneySection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { NotFoundPage } from "@/components/NotFoundPage";
import { ProjectModal } from "@/components/ProjectModal";
import { Switch, Route } from "wouter";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { projects, Project } from "@/data/projects";
import { store } from "@/store";
import { applyPreset } from "@/theme/presets";

const SECTION_IDS = ["hero", "about", "projects", "journey", "skills", "contact"];

function AppContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  useLenisScroll();

  // Initialize theme tokens and parse URL query presets on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryPreset = params.get("preset") as "vermilion" | "lime" | "ultraviolet" | null;
    const validPreset =
      queryPreset === "vermilion" || queryPreset === "lime" || queryPreset === "ultraviolet"
        ? queryPreset
        : "lime";

    store.setState({
      preset: validPreset,
      isDark: true,
      tier: "lite",
    });

    applyPreset(validPreset, true);
  }, []);

  // Hash-based modal routing (e.g. #vroom, #rl-navigation)
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && !SECTION_IDS.includes(hash)) {
        const found = projects.find((p) => p.id === hash);
        if (found) {
          setSelectedProject(found);
        }
      }
    };

    handleHashSync();
    window.addEventListener("hashchange", handleHashSync);
    return () => window.removeEventListener("hashchange", handleHashSync);
  }, []);

  const handleCloseModal = () => {
    setSelectedProject(null);
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash && !SECTION_IDS.includes(currentHash)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink antialiased relative selection:bg-accent selection:text-accent-ink">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-ink font-mono text-xs"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <NavBar />

      {/* Main Content Sections (Single-Page Story) */}
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SelectedProjects onSelectProject={(p) => setSelectedProject(p)} />
        <JourneySection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
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
