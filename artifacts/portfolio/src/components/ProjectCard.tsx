import { useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const categoryColors: Record<string, string> = {
    "Real-time / Control": "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    "IIoT / Analytics": "text-blue-400 bg-blue-500/10 border-blue-500/20",
    "Web Apps": "text-violet-400 bg-violet-500/10 border-violet-500/20",
    "Browser Extension": "text-green-400 bg-green-500/10 border-green-500/20",
    "Embedded Systems / Robotics": "text-amber-400 bg-amber-500/10 border-amber-500/20",
    "Control Systems / Simulation": "text-teal-400 bg-teal-500/10 border-teal-500/20",
    "Computer Vision / HCI": "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
    "Experimental": "text-orange-400 bg-orange-500/10 border-orange-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      <motion.div
        onClick={onClick}
        className="relative group cursor-pointer rounded-2xl border bg-card/60 backdrop-blur-sm overflow-hidden h-full transition-all duration-300"
        animate={{
          borderColor: hovered ? "rgba(34,211,238,0.35)" : "rgba(255,255,255,0.08)",
          boxShadow: hovered
            ? "0 0 30px rgba(34,211,238,0.1), 0 8px 32px rgba(0,0,0,0.2)"
            : "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.04) 0%, transparent 60%)",
            }}
          />
        )}

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-base text-foreground leading-tight group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <span
              className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                categoryColors[project.category]
              }`}
            >
              {project.category}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
              {project.languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
              {project.languages.slice(0, 3).map((lang) => (
                <span key={lang.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: lang.color }}
                  />
                  {lang.name} {lang.percentage}%
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techBadges.slice(0, 4).map((badge) => (
              <span
                key={badge}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground font-medium"
              >
                {badge}
              </span>
            ))}
            {project.techBadges.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                +{project.techBadges.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-xs text-cyan-400 font-medium group-hover:underline">
              View Case Study →
            </span>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={WEBSITE_PROJECTS.includes(project.id) ? "Go to website" : "GitHub repo"}
            >
              {WEBSITE_PROJECTS.includes(project.id) ? (
                <ExternalLink className="w-3.5 h-3.5" />
              ) : (
                <Github className="w-3.5 h-3.5" />
              )}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
