import { useEffect, useState } from "react";
import { X, Github, Link, Check, ExternalLink, Terminal, Layers, CheckCircle2 } from "lucide-react";
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Opaque dark backdrop */}
      <div
        className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Solid Modal Dialog */}
      <div
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[2px] border border-rule bg-panel-raised shadow-2xl z-10 text-ink"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        style={{ backgroundColor: "var(--panel-raised)" }}
      >
        {/* Sticky Header */}
        <div
          className="sticky top-0 z-20 flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-rule bg-panel-raised"
          style={{ backgroundColor: "var(--panel-raised)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-mono font-semibold text-signal bg-signal/15 border border-signal/30 px-2 py-0.5 rounded-[2px]">
                {project.category}
              </span>
              <span className="text-xs font-mono text-ink-soft">
                {project.repo}
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-ink leading-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-[2px] border border-rule bg-panel-sunk hover:bg-panel text-ink-soft hover:text-ink transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="font-heading font-bold text-base text-ink mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-signal rounded-[1px]" />
              <span>Project Overview</span>
            </h3>
            <p className="font-sans text-sm text-ink-soft leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture Block */}
          {project.architecture && (
            <div>
              <h3 className="font-heading font-bold text-base text-ink mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-telemetry" />
                <span>System Architecture</span>
              </h3>
              <div className="p-3.5 rounded-[2px] bg-panel-sunk border border-rule font-mono text-xs text-ink overflow-x-auto leading-relaxed">
                {project.architecture}
              </div>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="font-heading font-bold text-base text-ink mb-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-signal" />
                <span>Key Deliverables & Specifications</span>
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start text-xs sm:text-sm text-ink font-sans leading-relaxed">
                    <span className="w-3 h-px bg-rule shrink-0 mt-[10px] mr-2.5" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Engineering Challenges & Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.challenges && (
              <div className="p-4 rounded-[2px] bg-panel-sunk border border-rule">
                <h4 className="font-heading font-bold text-sm text-ink mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-hardware" />
                  <span>Engineering Challenge</span>
                </h4>
                <p className="font-sans text-xs text-ink-soft leading-relaxed">{project.challenges}</p>
              </div>
            )}
            {project.learned && (
              <div className="p-4 rounded-[2px] bg-panel-sunk border border-rule">
                <h4 className="font-heading font-bold text-sm text-ink mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-telemetry rounded-[1px]" />
                  <span>Insights & Results</span>
                </h4>
                <p className="font-sans text-xs text-ink-soft leading-relaxed">{project.learned}</p>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-heading font-bold text-base text-ink mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techBadges.map((badge) => (
                <span key={badge} className="tech-chip text-xs">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-rule">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary no-custom-link text-xs sm:text-sm"
            >
              {WEBSITE_PROJECTS.includes(project.id) ? (
                <>
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Visit Website</span>
                </>
              ) : (
                <>
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </>
              )}
            </a>

            <button
              onClick={handleCopy}
              className="btn-secondary text-xs sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-signal" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Link className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
