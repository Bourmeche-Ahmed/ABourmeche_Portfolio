import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Link, Check, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { copyToClipboard } from "@/lib/utils";

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const handleCopy = async () => {
    if (!project) return;
    await copyToClipboard(project.githubUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    "Real-time / Control": "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    "IIoT / Analytics": "text-blue-400 border-blue-500/30 bg-blue-500/10",
    "Web Apps": "text-violet-400 border-violet-500/30 bg-violet-500/10",
    "Browser Extension": "text-green-400 border-green-500/30 bg-green-500/10",
    "Experimental": "text-orange-400 border-orange-500/30 bg-orange-500/10",
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-background shadow-2xl pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rounded-t-2xl" />

              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4 border-b border-white/8 bg-background/95 backdrop-blur-md rounded-t-2xl">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        categoryColors[project.category]
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{project.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="shrink-0 p-2 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-7">
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Overview
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                        <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Architecture
                  </h3>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15 font-mono text-xs text-cyan-300 flex-wrap">
                    {project.architecture.split("↔").map((part, i, arr) => (
                      <span key={i} className="flex items-center gap-2">
                        <span className="bg-cyan-500/15 rounded-lg px-2 py-1 text-cyan-300">
                          {part.trim()}
                        </span>
                        {i < arr.length - 1 && (
                          <span className="text-cyan-600">↔</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Challenges
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      What I Learned
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.learned}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {project.keyFeatures.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="shrink-0 w-4 h-4 rounded-md bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-[10px] mt-0.5">
                          ✓
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techBadges.map((badge) => (
                      <span
                        key={badge}
                        className="text-xs px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-foreground/80"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {WEBSITE_PROJECTS.includes(project.id) ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:brightness-110 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Go to Website
                    </a>
                  ) : (
                    <>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:brightness-110 transition-all"
                      >
                        <Github className="w-4 h-4" />
                        GitHub Repo
                      </a>
                      <button
                        onClick={handleCopy}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-cyan-500/30 text-cyan-400 font-semibold text-sm hover:bg-cyan-500/10 transition-all"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" /> Copied!
                          </>
                        ) : (
                          <>
                            <Link className="w-4 h-4" /> Copy Repo Link
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
