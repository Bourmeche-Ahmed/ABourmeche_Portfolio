import { useCallback } from "react";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { AtAGlanceStrip } from "@/components/AtAGlanceStrip";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { NotFoundPage } from "@/components/NotFoundPage";
import { Switch, Route } from "wouter";

function AppContent() {
  const handleToggleTheme = useCallback((isDark: boolean) => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <div className="min-h-screen bg-panel text-ink antialiased relative">
      <NavBar onThemeChanged={handleToggleTheme} />
      <main>
        <HeroSection />
        <AtAGlanceStrip />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
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
