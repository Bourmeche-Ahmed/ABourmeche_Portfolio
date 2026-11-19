import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { store, SubsystemId } from "@/store";
import { ProjectImage } from "./ProjectImage";
import { getAssetPath } from "@/lib/paths";
import { ArrowUpRight, Github, ExternalLink, Filter } from "lucide-react";
import { usePointerFine } from "@/hooks/usePointerFine";

export const PROJECT_SUBSYSTEM_MAP: Record<string, SubsystemId> = {
  vroom: "pcb",
  "rl-navigation": "tower",
  farzit: "chassis",
  "self-balancing-robot": "pendulum",
  "pid-control-dashboard": "wheels",
  "iiot-predictive-maintenance": "antenna",
  "quarter-car-suspension-system": "wheels",
  "hand-gesture-controlled-maze-game": "tower",
  "line-follower-robot": "ir",
};

const CATEGORIES = [
  "All",
  "Hardware / PCB Design",
  "Robotics / AI",
  "Embedded Systems / Robotics",
  "Control Systems / Simulation",
  "Real-time / Control",
  "IIoT / Analytics",
];

export function ProjectsContactSheet({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const isPointerFine = usePointerFine();
  const tableRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  const handleMouseEnter = (p: Project, e: React.MouseEvent) => {
    setHoveredProject(p);
    const sub = PROJECT_SUBSYSTEM_MAP[p.id] || null;
    store.setState({ activeSubsystem: sub });
    updatePointer(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updatePointer(e);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
    store.setState({ activeSubsystem: null });
  };

  const handleFocus = (p: Project) => {
    const sub = PROJECT_SUBSYSTEM_MAP[p.id] || null;
    store.setState({ activeSubsystem: sub });
  };

  const updatePointer = useCallback((e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const rx = (y / window.innerHeight - 0.5) * -12;
    const ry = (x / window.innerWidth - 0.5) * 12;
    setPointerPos({ x, y, rx, ry });
  }, []);

  return (
    <section id="projects" className="py-20 border-b border-hairline relative" onMouseMove={handleMouseMove}>
      {/* Background oversized outlined numeral 02 */}
      <div className="absolute right-4 top-10 text-[18vw] font-heading font-extrabold numeral-outlined opacity-15 select-none pointer-events-none">
        02
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent mb-1">
              <span>02 // SUBSYSTEM CATALOG</span>
              <span className="text-soft">·</span>
              <span className="text-soft">ILLUSTRATIVE MAPPING</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-ink tracking-tight uppercase">
              Projects & Engineering Artifacts
            </h2>
          </div>

          {/* Subsystem guidance notice */}
          <div className="font-mono text-[11px] text-soft max-w-xs text-left md:text-right">
            Hovering a project rotates the 3D model and highlights the matching hardware subsystem.
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-soft mr-1 shrink-0" />
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-mono rounded-[2px] transition-colors whitespace-nowrap min-h-[36px] flex items-center ${
                  isActive
                    ? "bg-accent text-accent-ink font-bold"
                    : "bg-surface border border-hairline text-soft hover:text-ink hover:border-accent"
                }`}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Contact Sheet Rows */}
        <div ref={tableRef} className="border-t border-hairline divide-y divide-hairline">
          {filteredProjects.map((project, index) => {
            const num = (index + 1).toString().padStart(2, "0");
            const sub = PROJECT_SUBSYSTEM_MAP[project.id];
            const coverFile = project.cover || project.gallery?.[0]?.file;
            const coverSrc = coverFile ? getAssetPath(`projects/${project.id}/${coverFile}`) : undefined;
            const expectedCoverPath = coverFile ? `public/projects/${project.id}/${coverFile}` : undefined;

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                onMouseEnter={(e) => handleMouseEnter(project, e)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleFocus(project)}
                onBlur={handleMouseLeave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                className="group relative py-4 sm:py-5 px-2 sm:px-4 bg-transparent hover:bg-surface2/50 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 focus-visible:outline-none"
              >
                {/* Left: Index + Title + Subsystem Tag */}
                <div className="flex items-start md:items-center gap-4 min-w-0 flex-1">
                  <span className="font-mono text-sm text-soft group-hover:text-accent font-semibold pt-0.5 md:pt-0">
                    {num}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors leading-tight">
                        {project.title}
                      </h3>
                      {sub && (
                        <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded-[1px] bg-surface border border-hairline text-accent">
                          SUBSYS: {sub}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-soft line-clamp-1 mt-0.5">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Mobile Thumbnail expansion (Touch devices) */}
                <div className="md:hidden aspect-[16/9] w-full rounded-[2px] overflow-hidden border border-hairline bg-surface mt-1">
                  <ProjectImage
                    src={coverSrc}
                    alt={project.title}
                    category={project.category}
                    fit="cover"
                    expectedPath={expectedCoverPath}
                  />
                </div>

                {/* Right: Badges & Action Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                  <div className="hidden sm:flex flex-wrap gap-1 max-w-xs justify-end">
                    {project.techBadges.slice(0, 3).map((b) => (
                      <span key={b} className="font-mono text-[10px] px-1.5 py-0.5 bg-surface border border-hairline rounded-[2px] text-soft">
                        {b}
                      </span>
                    ))}
                  </div>

                  <span className="font-mono text-xs text-soft group-hover:text-accent flex items-center gap-1 font-semibold">
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Pointer-Following Preview on Desktop */}
      {isPointerFine && hoveredProject && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-150"
          style={{
            left: `${pointerPos.x + 24}px`,
            top: `${pointerPos.y - 120}px`,
            perspective: 800,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              transform: `rotateX(${pointerPos.rx}deg) rotateY(${pointerPos.ry}deg)`,
              transformStyle: "preserve-3d",
            }}
            className="w-72 rounded-[2px] border border-hairline bg-surface p-2 shadow-2xl space-y-2 backdrop-blur-md"
          >
            <div className="aspect-[16/10] w-full rounded-[1px] overflow-hidden border border-hairline bg-surface2 relative">
              <ProjectImage
                src={hoveredProject.cover ? getAssetPath(`projects/${hoveredProject.id}/${hoveredProject.cover}`) : undefined}
                alt={hoveredProject.title}
                category={hoveredProject.category}
                fit="cover"
                expectedPath={hoveredProject.cover ? `public/projects/${hoveredProject.id}/${hoveredProject.cover}` : undefined}
              />
            </div>
            <div className="px-1 pb-1">
              <p className="font-heading font-bold text-sm text-ink truncate">
                {hoveredProject.title}
              </p>
              <p className="font-mono text-[10px] text-accent">
                {hoveredProject.category}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default ProjectsContactSheet;
