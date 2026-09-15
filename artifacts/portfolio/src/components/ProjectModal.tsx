import { useEffect, useState } from "react";
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

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2px] border border-rule bg-panel-raised z-10"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-rule bg-panel-raised">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono text-ink-soft bg-panel-sunk border border-rule px-2 py-0.5 rounded-[2px]">
                {project.category}
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl text-ink leading-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-[2px] border border-rule bg-panel-sunk hover:bg-panel text-ink-soft hover:text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="font-heading font-bold text-base text-ink mb-2">Overview</h3>
            <p className="font-sans text-sm text-ink-soft leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Block */}
          <div>
            <h3 className="font-heading font-bold text-base text-ink mb-2">System Architecture</h3>
            <div className="p-3 rounded-[2px] bg-panel-sunk border border-rule font-mono text-xs text-ink overflow-x-auto">
              {project.architecture}
            </div>
          </div>

          {/* Highlights with hairline ticks */}
          <div>
            <h3 className="font-heading font-bold text-base text-ink mb-2">Key Highlights</h3>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start text-xs sm:text-sm text-ink-soft leading-relaxed font-sans">
                  <span className="w-3 h-px bg-rule shrink-0 mt-[9px] mr-2.5" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs & Challenges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-[2px] bg-panel-sunk border border-rule">
              <h4 className="font-heading font-bold text-sm text-ink mb-1.5">Engineering Challenge</h4>
              <p className="font-sans text-xs text-ink-soft leading-relaxed">{project.challenges}</p>
            </div>
            <div className="p-4 rounded-[2px] bg-panel-sunk border border-rule">
              <h4 className="font-heading font-bold text-sm text-ink mb-1.5">Key Insights & Learnings</h4>
              <p className="font-sans text-xs text-ink-soft leading-relaxed">{project.learned}</p>
            </div>
          </div>

          {/* Languages & Tech Badges */}
          <div>
            <h3 className="font-heading font-bold text-base text-ink mb-2">Technology Stack</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techBadges.map((badge) => (
                <span key={badge} className="tech-chip text-xs">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-rule">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary no-custom-link"
            >
              {WEBSITE_PROJECTS.includes(project.id) ? (
                <>
                  <ExternalLink className="w-3.5 h-3.5" />
                  Visit Website
                </>
              ) : (
                <>
                  <Github className="w-3.5 h-3.5" />
                  View Repository
                </>
              )}
            </a>
            <button
              onClick={handleCopy}
              className="btn-secondary"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-signal" />
                  Link Copied
                </>
              ) : (
                <>
                  <Link className="w-3.5 h-3.5" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
