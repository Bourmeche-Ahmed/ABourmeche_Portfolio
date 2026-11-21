import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { ProjectImage } from "./ProjectImage";

interface SelectedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export function SelectedProjects({ onSelectProject }: SelectedProjectsProps) {
  // Flagship 5 projects for Bento Grid
  const featuredIds = [
    "vroom",
    "rl-navigation",
    "iiot-predictive-maintenance",
    "self-balancing-robot",
    "quarter-car-suspension-system",
  ];

  const featuredProjects = featuredIds
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean) as Project[];

  // Remaining projects for the secondary index grid
  const secondaryProjects = projects.filter((p) => !featuredIds.includes(p.id));

  const handleOpen = (project: Project) => {
    // Update hash for shareable URL
    window.location.hash = project.id;
    onSelectProject(project);
  };

  return (
    <section id="projects" className="py-24 border-b border-hairline relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-4 mb-16 font-mono text-xs text-soft">
          <div className="flex items-center gap-2">
            <span className="text-accent font-semibold">02 // WORKS</span>
            <span>·</span>
            <span>SELECTED ENGINEERING PROJECTS</span>
          </div>
          <div className="text-soft sm:text-right">
            5 FEATURED BENTO · 9 ARCHIVE INDEX
          </div>
        </div>

        {/* --- 12-COLUMN ASYMMETRIC BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          {/* Bento Item 1: VROOM (7 Columns) */}
          {featuredProjects[0] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpen(featuredProjects[0])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(featuredProjects[0]);
                }
              }}
              tabIndex={0}
              role="button"
              className="md:col-span-7 group border border-hairline bg-surface flex flex-col justify-between overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface2 border-b border-hairline">
                <ProjectImage
                  project={featuredProjects[0]}
                  slot="cover"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 right-3 font-mono text-xs bg-bg/90 border border-hairline px-2.5 py-1 text-soft group-hover:text-accent group-hover:border-accent transition-colors flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-soft">
                  <span className="text-accent font-semibold">01 // AUTOMOTIVE HARDWARE</span>
                  <span>KICAD / ESP32-S3</span>
                </div>

                <h3 className="font-heading font-black text-2xl md:text-3xl text-ink uppercase tracking-tight group-hover:text-accent transition-colors">
                  {featuredProjects[0].title}
                </h3>

                <p className="font-sans text-sm md:text-base text-soft leading-relaxed line-clamp-2">
                  {featuredProjects[0].description}
                </p>

                <div className="pt-2 font-mono text-xs text-soft/80 flex flex-wrap gap-x-3 gap-y-1">
                  <span>KiCad</span>
                  <span>/</span>
                  <span>CAN Bus</span>
                  <span>/</span>
                  <span>ISO 7637 TVS</span>
                  <span>/</span>
                  <span>TPS54360 Buck</span>
                  <span>/</span>
                  <span>HUB75 Matrix</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bento Item 2: RL Navigation (5 Columns) */}
          {featuredProjects[1] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.42, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpen(featuredProjects[1])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(featuredProjects[1]);
                }
              }}
              tabIndex={0}
              role="button"
              className="md:col-span-5 group border border-hairline bg-surface flex flex-col justify-between overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface2 border-b border-hairline">
                <ProjectImage
                  project={featuredProjects[1]}
                  slot="cover"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 right-3 font-mono text-xs bg-bg/90 border border-hairline px-2.5 py-1 text-soft group-hover:text-accent group-hover:border-accent transition-colors flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-soft">
                  <span className="text-accent font-semibold">02 // ROBOTICS &amp; RL</span>
                  <span>81% SUCCESS RATE</span>
                </div>

                <h3 className="font-heading font-black text-2xl md:text-3xl text-ink uppercase tracking-tight group-hover:text-accent transition-colors">
                  {featuredProjects[1].title}
                </h3>

                <p className="font-sans text-sm md:text-base text-soft leading-relaxed line-clamp-2">
                  {featuredProjects[1].description}
                </p>

                <div className="pt-2 font-mono text-xs text-soft/80 flex flex-wrap gap-x-3 gap-y-1">
                  <span>PPO Algorithm</span>
                  <span>/</span>
                  <span>Gymnasium</span>
                  <span>/</span>
                  <span>Webots</span>
                  <span>/</span>
                  <span>ToF LiDAR</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bento Item 3: IIoT Predictive Maintenance (12 Columns Full Width) */}
          {featuredProjects[2] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpen(featuredProjects[2])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(featuredProjects[2]);
                }
              }}
              tabIndex={0}
              role="button"
              className="md:col-span-12 group border border-hairline bg-surface grid grid-cols-1 lg:grid-cols-12 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-surface2 border-b lg:border-b-0 lg:border-r border-hairline">
                <ProjectImage
                  project={featuredProjects[2]}
                  slot="cover"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-soft">
                    <span className="text-accent font-semibold">03 // INDUSTRIAL TELEMETRY</span>
                    <span>13× SPEEDUP (4.5s → 350ms)</span>
                  </div>

                  <h3 className="font-heading font-black text-2xl md:text-4xl text-ink uppercase tracking-tight group-hover:text-accent transition-colors">
                    {featuredProjects[2].title}
                  </h3>

                  <p className="font-sans text-sm md:text-base text-soft leading-relaxed">
                    {featuredProjects[2].description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-hairline">
                  <div className="font-mono text-xs text-soft flex flex-wrap gap-x-3 gap-y-1">
                    <span>Modbus RTU / TCP</span>
                    <span>/</span>
                    <span>RS-485 Batching</span>
                    <span>/</span>
                    <span>9 Docker Services</span>
                    <span>/</span>
                    <span>TimescaleDB</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 font-mono text-xs text-accent uppercase font-medium">
                    <span>Explore Technical Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bento Item 4: Self-Balancing Robot (6 Columns) */}
          {featuredProjects[3] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpen(featuredProjects[3])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(featuredProjects[3]);
                }
              }}
              tabIndex={0}
              role="button"
              className="md:col-span-6 group border border-hairline bg-surface flex flex-col justify-between overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface2 border-b border-hairline">
                <ProjectImage
                  project={featuredProjects[3]}
                  slot="cover"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 right-3 font-mono text-xs bg-bg/90 border border-hairline px-2.5 py-1 text-soft group-hover:text-accent group-hover:border-accent transition-colors flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-soft">
                  <span className="text-accent font-semibold">04 // EMBEDDED CONTROL</span>
                  <span>100 Hz COMPLEMENTARY</span>
                </div>

                <h3 className="font-heading font-black text-2xl md:text-3xl text-ink uppercase tracking-tight group-hover:text-accent transition-colors">
                  {featuredProjects[3].title}
                </h3>

                <p className="font-sans text-sm md:text-base text-soft leading-relaxed line-clamp-2">
                  {featuredProjects[3].description}
                </p>

                <div className="pt-2 font-mono text-xs text-soft/80 flex flex-wrap gap-x-3 gap-y-1">
                  <span>STM32</span>
                  <span>/</span>
                  <span>FreeRTOS</span>
                  <span>/</span>
                  <span>Cascaded PID</span>
                  <span>/</span>
                  <span>MPU-6050</span>
                  <span>/</span>
                  <span>Encoders</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Bento Item 5: Quarter-Car Active Suspension (6 Columns) */}
          {featuredProjects[4] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.42, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpen(featuredProjects[4])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpen(featuredProjects[4]);
                }
              }}
              tabIndex={0}
              role="button"
              className="md:col-span-6 group border border-hairline bg-surface flex flex-col justify-between overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface2 border-b border-hairline">
                <ProjectImage
                  project={featuredProjects[4]}
                  slot="cover"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 right-3 font-mono text-xs bg-bg/90 border border-hairline px-2.5 py-1 text-soft group-hover:text-accent group-hover:border-accent transition-colors flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-soft">
                  <span className="text-accent font-semibold">05 // SIMULATION &amp; DYNAMICS</span>
                  <span>~87% ATTENUATION</span>
                </div>

                <h3 className="font-heading font-black text-2xl md:text-3xl text-ink uppercase tracking-tight group-hover:text-accent transition-colors">
                  {featuredProjects[4].title}
                </h3>

                <p className="font-sans text-sm md:text-base text-soft leading-relaxed line-clamp-2">
                  {featuredProjects[4].description}
                </p>

                <div className="pt-2 font-mono text-xs text-soft/80 flex flex-wrap gap-x-3 gap-y-1">
                  <span>MATLAB</span>
                  <span>/</span>
                  <span>Simulink</span>
                  <span>/</span>
                  <span>HIL Simulation</span>
                  <span>/</span>
                  <span>State Space</span>
                  <span>/</span>
                  <span>Active Damping</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* --- SECONDARY PROJECT ARCHIVE INDEX (3 Columns Asymmetric) --- */}
        <div className="pt-12 border-t border-hairline space-y-6">
          <div className="flex items-center justify-between font-mono text-xs text-soft pb-2">
            <span className="text-ink font-semibold uppercase">Project Archive &amp; Systems Index</span>
            <span>{secondaryProjects.length} ADDITIONAL SYSTEMS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondaryProjects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => handleOpen(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpen(p);
                  }
                }}
                tabIndex={0}
                role="button"
                className="p-5 border border-hairline bg-surface/40 hover:bg-surface hover:border-hairline-strong transition-all flex flex-col justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-soft">
                    <span className="text-soft/60">{(idx + 6).toString().padStart(2, "0")}</span>
                    <span className="text-accent group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>View</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-ink uppercase tracking-tight group-hover:text-accent transition-colors leading-tight">
                    {p.title}
                  </h4>

                  <p className="font-sans text-xs text-soft line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="font-mono text-[10px] text-soft/80 border-t border-hairline pt-3 flex items-center justify-between">
                  <span>{p.category}</span>
                  <span className="text-soft/50">{p.techBadges.slice(0, 2).join(" · ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
