import { useState, useMemo, useEffect } from "react";
import { Search, X, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { projects, categories, type Project } from "@/data/projects";

const ALL = "All";
const PROJECTS_PER_PAGE = 6;

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Project | null>(null);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { [ALL]: projects.length };
    categories.forEach((cat) => {
      counts[cat] = projects.filter((p) => p.category === cat).length;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === ALL || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techBadges.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  // Reset pagination on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search]);

  // Pagination calculation
  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="projects" className="py-16 border-b border-rule">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Selected Engineering Projects"
          subtitle="Hardware-in-the-loop simulations, autonomous embedded robotics, IIoT platforms, and control dashboards."
        />

        {/* Filter Controls & Search */}
        <div className="space-y-4 mb-8">
          {/* Search bar & summary */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-soft pointer-events-none" />
              <input
                type="search"
                placeholder="Search by keyword, protocol, chip (e.g. STM32, Modbus)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-8 py-2 rounded-[2px] bg-panel-sunk border border-rule text-sm text-ink placeholder:text-ink-soft focus-visible:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-soft hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-ink-soft flex items-center gap-1.5 self-end sm:self-auto">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Showing {filtered.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + PROJECTS_PER_PAGE, filtered.length)} of {filtered.length} projects</span>
            </div>
          </div>

          {/* Category Filter Chips with counts */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <button
              onClick={() => setActiveCategory(ALL)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-sans transition-colors border flex items-center gap-1.5 ${
                activeCategory === ALL
                  ? "bg-ink text-panel border-ink font-semibold"
                  : "bg-panel-raised text-ink-soft border-rule hover:text-ink hover:border-ink-soft"
              }`}
            >
              <span>All</span>
              <span className={`text-[10px] font-mono px-1 py-0.2 rounded-[2px] ${
                activeCategory === ALL ? "bg-panel text-ink" : "bg-panel-sunk text-ink-soft"
              }`}>
                {categoryCounts[ALL]}
              </span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-sans transition-colors border flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? "bg-ink text-panel border-ink font-semibold"
                    : "bg-panel-raised text-ink-soft border-rule hover:text-ink hover:border-ink-soft"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono px-1 py-0.2 rounded-[2px] ${
                  activeCategory === cat ? "bg-panel text-ink" : "bg-panel-sunk text-ink-soft"
                }`}>
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filtered.length === 0 ? (
          <div className="border border-rule bg-panel-raised p-10 text-center rounded-[2px]">
            <p className="text-base text-ink font-semibold mb-1">No matching engineering projects found</p>
            <p className="text-xs text-ink-soft mb-4">Try clearing your search query or selecting a different category filter.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory(ALL);
              }}
              className="btn-secondary text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-10 pt-6 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-ink-soft">
              Page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 rounded-[2px] border border-rule bg-panel-raised text-ink-soft hover:text-ink hover:border-ink-soft disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 text-xs"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-[2px] border text-xs font-mono transition-colors ${
                    currentPage === pageNum
                      ? "bg-ink text-panel border-ink font-bold"
                      : "bg-panel-raised text-ink-soft border-rule hover:text-ink hover:border-ink-soft"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 rounded-[2px] border border-rule bg-panel-raised text-ink-soft hover:text-ink hover:border-ink-soft disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 text-xs"
                aria-label="Next page"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
