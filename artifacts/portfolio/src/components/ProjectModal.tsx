import React, { useEffect, useState, useRef, useCallback, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExplodedPcb = lazy(() => import("./widgets/ExplodedPcb"));
const PidPlayground = lazy(() => import("./PidPlayground"));

import {
  X,
  Github,
  Link,
  Check,
  ExternalLink,
  Terminal,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Images as GalleryIcon,
} from "lucide-react";
import type { Project, GalleryItem } from "@/data/projects";
import { copyToClipboard } from "@/lib/utils";
import { getAssetPath } from "@/lib/paths";
import { ProjectImage, BlueprintPlaceholder } from "./ProjectImage";
import { categoryStyles } from "./ProjectCard";
import { ArchitectureFlow } from "./ArchitectureFlow";

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];
const CANDIDATE_EXTENSIONS = [".webp", ".png", ".jpg", ".jpeg"];

function LightboxImage({
  src,
  alt,
  fit,
  category,
  expectedPath,
  onError,
}: {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  category: Project["category"];
  expectedPath: string;
  onError: () => void;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setAttemptIndex(0);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    const match = currentSrc.match(/\.(png|jpg|jpeg|webp)$/i);
    if (match) {
      const curExt = match[0].toLowerCase();
      const altExts = CANDIDATE_EXTENSIONS.filter((e) => e !== curExt);
      if (attemptIndex < altExts.length) {
        const nextExt = altExts[attemptIndex];
        setAttemptIndex((prev) => prev + 1);
        setCurrentSrc(currentSrc.replace(/\.(png|jpg|jpeg|webp)$/i, nextExt));
        return;
      }
    }
    setHasError(true);
    onError();
  };

  if (hasError) {
    return (
      <div className="w-[320px] sm:w-[500px] aspect-[16/10] rounded-[2px] overflow-hidden border border-rule">
        <BlueprintPlaceholder
          category={category}
          expectedPath={expectedPath}
          className="w-full h-full"
        />
      </div>
    );
  }

  // Never upscale farzit.jpg beyond native dimensions (760x597)
  const isFarzit = currentSrc.includes("farzit.jpg");

  return (
    <img
      src={currentSrc}
      alt={alt}
      decoding="async"
      onError={handleError}
      className={`max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-[2px] ${
        fit === "contain" ? "bg-panel-sunk p-2" : ""
      }`}
      style={{
        touchAction: "pinch-zoom",
        maxWidth: isFarzit ? "760px" : undefined,
        maxHeight: isFarzit ? "597px" : undefined,
      }}
    />
  );
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const carouselRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    setActiveSlideIndex(0);
    setLightboxIndex(null);
    setFailedImages({});
  }, [project?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          e.stopPropagation();
          setLightboxIndex(null);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, lightboxIndex]);

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

  useEffect(() => {
    if (lightboxIndex !== null) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();
    } else if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [lightboxIndex]);

  const handleCopy = async () => {
    if (!project) return;
    const textToCopy = project.githubUrl || window.location.href;
    await copyToClipboard(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageError = useCallback((file: string) => {
    setFailedImages((prev) => ({ ...prev, [file]: true }));
  }, []);

  if (!project) return null;

  const catStyle = categoryStyles[project.category] || {
    badge: "bg-signal/15 text-signal border-signal/30",
    accent: "bg-signal",
  };

  const galleryItems: GalleryItem[] = (project.gallery || []).filter(
    (item) => import.meta.env.DEV || !failedImages[item.file]
  );
  const hasGallery = galleryItems.length > 0;

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const width = carouselRef.current.clientWidth;
    if (width > 0) {
      const idx = Math.round(scrollLeft / width);
      setActiveSlideIndex(idx);
    }
  };

  const scrollToSlide = (idx: number) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTo({
      left: idx * carouselRef.current.clientWidth,
      behavior: "smooth",
    });
    setActiveSlideIndex(idx);
  };

  const prevLightboxImage = () => {
    if (lightboxIndex === null || galleryItems.length <= 1) return;
    setLightboxIndex((prev) => ((prev ?? 0) - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextLightboxImage = () => {
    if (lightboxIndex === null || galleryItems.length <= 1) return;
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % galleryItems.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextLightboxImage();
      } else {
        prevLightboxImage();
      }
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/75 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Dialog */}
        <div
          className="relative w-full max-w-2xl max-h-[100dvh] sm:max-h-[88vh] overflow-y-auto rounded-[2px] border border-rule bg-panel-raised z-10 text-ink overscroll-contain pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          {/* Top Accent Line */}
          <div className={`h-0.5 w-full ${catStyle.accent}`} />

          {/* Sticky Header */}
          <div className="sticky top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-rule bg-panel-raised">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded-[2px] border ${catStyle.badge}`}>
                  {project.category}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-ink-soft">
                  {project.repo}
                </span>
              </div>
              <motion.h2
                layoutId={`project-title-${project.id}`}
                className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-ink leading-tight"
              >
                {project.title}
              </motion.h2>

              {/* Static Metric Chips */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="px-2 py-0.5 bg-panel-sunk border border-rule rounded-[2px] font-mono text-xs flex items-center gap-1.5"
                    >
                      <span className="text-ink-soft">{m.label}:</span>
                      <span className="font-semibold text-ink">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="min-w-[44px] min-h-[44px] p-2 rounded-[2px] border border-rule bg-panel-sunk hover:bg-panel text-ink-soft hover:text-ink transition-colors shrink-0 flex items-center justify-center focus-visible:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-7 space-y-6">
            {/* Overview */}
            <div>
              <h3 className="font-heading font-bold text-base text-ink mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-signal rounded-[1px]" />
                <span>Project Overview</span>
              </h3>
              <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* VROOM Exploded PCB: Placed ABOVE the gallery as the signature 3D moment */}
            {project.id === "vroom" && (
              <div>
                <Suspense fallback={<div className="h-40 flex items-center justify-center font-mono text-xs text-ink-soft bg-panel-sunk border border-rule">Loading 3D layer stack...</div>}>
                  <ExplodedPcb />
                </Suspense>
              </div>
            )}

            {/* Gallery Section */}
            {hasGallery && (
              <div>
                <h3 className="font-heading font-bold text-base text-ink mb-3 flex items-center gap-2">
                  <GalleryIcon className="w-4 h-4 text-signal" />
                  <span>Project Gallery</span>
                  <span className="font-mono text-xs text-ink-soft">({galleryItems.length})</span>
                </h3>

                {/* Mobile View: Horizontal scroll-snap */}
                <div className="block sm:hidden">
                  <div
                    ref={carouselRef}
                    onScroll={handleCarouselScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 pb-2 touch-pan-x"
                  >
                    {galleryItems.map((item, idx) => {
                      const itemSrc = getAssetPath(`projects/${project.id}/${item.file}`);
                      const expectedPath = `public/projects/${project.id}/${item.file}`;

                      return (
                        <div
                          key={item.file}
                          className="snap-center shrink-0 w-full flex flex-col"
                        >
                          <div
                            onClick={() => setLightboxIndex(idx)}
                            className="relative aspect-[16/10] w-full rounded-[2px] border border-rule overflow-hidden bg-panel-sunk cursor-pointer active:scale-[0.99] transition-transform"
                            role="button"
                            tabIndex={0}
                            aria-label={`Open image: ${item.caption}`}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setLightboxIndex(idx);
                              }
                            }}
                          >
                            <ProjectImage
                              src={itemSrc}
                              alt={item.alt}
                              category={project.category}
                              fit={item.fit || "cover"}
                              focus={item.focus}
                              expectedPath={expectedPath}
                              onError={() => handleImageError(item.file)}
                            />
                          </div>
                          {item.caption && (
                            <p className="mt-2 text-[11px] font-mono text-ink-soft text-center line-clamp-2 px-1">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {galleryItems.length > 1 && (
                    <div className="flex justify-center items-center gap-1.5 mt-2.5">
                      {galleryItems.map((item, idx) => (
                        <button
                          key={item.file}
                          onClick={() => scrollToSlide(idx)}
                          className="min-w-[24px] min-h-[24px] flex items-center justify-center p-1"
                          aria-label={`Go to slide ${idx + 1}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-[1px] transition-colors ${
                              activeSlideIndex === idx ? "bg-signal" : "bg-rule"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop View: Clean 2-Column Grid */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-3.5">
                  {galleryItems.map((item, idx) => {
                    const itemSrc = getAssetPath(`projects/${project.id}/${item.file}`);
                    const expectedPath = `public/projects/${project.id}/${item.file}`;
                    const isFeatured = galleryItems.length >= 3 && idx === 0;

                    return (
                      <div
                        key={item.file}
                        onClick={() => setLightboxIndex(idx)}
                        className={`group relative rounded-[2px] border border-rule bg-panel-sunk overflow-hidden cursor-pointer hover:border-ink transition-colors ${
                          isFeatured ? "col-span-2 aspect-[21/9]" : "col-span-1 aspect-[16/10]"
                        }`}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open image: ${item.caption}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setLightboxIndex(idx);
                          }
                        }}
                      >
                        <ProjectImage
                          src={itemSrc}
                          alt={item.alt}
                          category={project.category}
                          fit={item.fit || "cover"}
                          focus={item.focus}
                          expectedPath={expectedPath}
                          onError={() => handleImageError(item.file)}
                          imgClassName="group-hover:scale-[1.01] transition-transform duration-200"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[11px] font-mono text-zinc-100 truncate">
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Architecture Block */}
            {project.architecture && (
              <div>
                <h3 className="font-heading font-bold text-base text-ink mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-signal" />
                  <span>System Architecture</span>
                </h3>
                <ArchitectureFlow architecture={project.architecture} />
              </div>
            )}

            {/* PID Interactive Simulation (Restyled) */}
            {project.id === "pid-control-dashboard" && (
              <Suspense fallback={<div className="h-32 flex items-center justify-center font-mono text-xs text-ink-soft bg-panel-sunk border border-rule">Loading PID simulation...</div>}>
                <PidPlayground />
              </Suspense>
            )}

            {/* Key Deliverables & Specifications */}
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
                    <Terminal className="w-3.5 h-3.5 text-signal" />
                    <span>Engineering Challenge</span>
                  </h4>
                  <p className="font-sans text-xs text-ink-soft leading-relaxed">{project.challenges}</p>
                </div>
              )}
              {project.learned && (
                <div className="p-4 rounded-[2px] bg-panel-sunk border border-rule">
                  <h4 className="font-heading font-bold text-sm text-ink mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-signal rounded-[1px]" />
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
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary no-custom-link text-xs sm:text-sm min-h-[44px] flex items-center gap-1.5"
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
              )}

              <button
                onClick={handleCopy}
                className="btn-secondary text-xs sm:text-sm min-h-[44px] flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-signal" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Link className="w-3.5 h-3.5" />
                    <span>{project.githubUrl ? "Copy Link" : "Share Project"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxItem.caption || "Image preview"}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col justify-between select-none animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-zinc-800 z-10 bg-black/50">
            <div className="font-mono text-xs sm:text-sm text-zinc-400">
              {lightboxIndex + 1} / {galleryItems.length}
            </div>

            <button
              ref={closeBtnRef}
              onClick={() => setLightboxIndex(null)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[2px] bg-zinc-800 hover:bg-zinc-700 text-white transition-colors border border-zinc-700 focus-visible:outline-none"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center */}
          <div
            className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
            style={{ touchAction: "pinch-zoom" }}
          >
            {galleryItems.length > 1 && (
              <button
                onClick={prevLightboxImage}
                className="absolute left-2 sm:left-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[2px] bg-black/70 hover:bg-zinc-800 text-white border border-zinc-700 transition-colors focus-visible:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div className="relative max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] flex items-center justify-center">
              <LightboxImage
                src={getAssetPath(`projects/${project.id}/${currentLightboxItem.file}`)}
                alt={currentLightboxItem.alt}
                fit={currentLightboxItem.fit}
                category={project.category}
                expectedPath={`public/projects/${project.id}/${currentLightboxItem.file}`}
                onError={() => handleImageError(currentLightboxItem.file)}
              />
            </div>

            {galleryItems.length > 1 && (
              <button
                onClick={nextLightboxImage}
                className="absolute right-2 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[2px] bg-black/70 hover:bg-zinc-800 text-white border border-zinc-700 transition-colors focus-visible:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Caption */}
          <div className="px-4 py-3 sm:py-4 bg-black/70 border-t border-zinc-800 text-center">
            <p className="font-mono text-xs sm:text-sm text-zinc-200 max-w-2xl mx-auto">
              {currentLightboxItem.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectModal;
