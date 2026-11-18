import { useEffect, useState, useRef, useCallback } from "react";
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

const WEBSITE_PROJECTS = ["stepact-2026-marathon", "testcybernexus3", "ieeeweb"];

const CANDIDATE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

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
      <div className="w-[320px] sm:w-[500px] aspect-[16/10] rounded-[2px] overflow-hidden border border-zinc-700">
        <BlueprintPlaceholder
          category={category}
          expectedPath={expectedPath}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      decoding="async"
      onError={handleError}
      className={`max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-[2px] ${
        fit === "contain" ? "bg-panel-sunk p-2" : ""
      }`}
      style={{ touchAction: "pinch-zoom" }}
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

  // Touch tracking for swipe navigation in lightbox
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Reset state on project change
  useEffect(() => {
    setActiveSlideIndex(0);
    setLightboxIndex(null);
    setFailedImages({});
  }, [project?.id]);

  // Handle ESC key for modal and lightbox
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

  // Lock body scroll when modal or lightbox is active
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

  // Manage focus trap and restoration for lightbox
  useEffect(() => {
    if (lightboxIndex !== null) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();
    } else if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [lightboxIndex]);

  // Handle Tab key trapping inside lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !lightboxRef.current) return;

      const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
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

  // Filter gallery items: In production, missing files are excluded
  const galleryItems: GalleryItem[] = (project.gallery || []).filter(
    (item) => import.meta.env.DEV || !failedImages[item.file]
  );
  const hasGallery = galleryItems.length > 0;

  // Carousel scroll listener on mobile
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

  // Lightbox keyboard navigation
  const prevLightboxImage = () => {
    if (lightboxIndex === null || galleryItems.length <= 1) return;
    setLightboxIndex((prev) => ((prev ?? 0) - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextLightboxImage = () => {
    if (lightboxIndex === null || galleryItems.length <= 1) return;
    setLightboxIndex((prev) => ((prev ?? 0) + 1) % galleryItems.length);
  };

  // Lightbox touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold of 45px, prioritizing horizontal over vertical
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
        {/* Opaque dark backdrop */}
        <div
          className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Solid Modal Dialog */}
        <div
          className="relative w-full max-w-2xl max-h-[100dvh] sm:max-h-[88vh] overflow-y-auto rounded-[2px] border border-rule bg-panel-raised shadow-2xl z-10 text-ink overscroll-contain pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          style={{ backgroundColor: "var(--panel-raised)" }}
        >
          {/* Category Top Hairline */}
          <div className={`h-0.5 w-full ${catStyle.accent}`} />

          {/* Sticky Header */}
          <div
            className="sticky top-0 z-20 flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-rule bg-panel-raised"
            style={{ backgroundColor: "var(--panel-raised)" }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded-[2px] border ${catStyle.badge}`}>
                  {project.category}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-ink-soft">
                  {project.repo}
                </span>
              </div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-ink leading-tight">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="min-w-[44px] min-h-[44px] p-2 rounded-[2px] border border-rule bg-panel-sunk hover:bg-panel text-ink-soft hover:text-ink transition-colors shrink-0 flex items-center justify-center"
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

            {/* Gallery Section */}
            {hasGallery && (
              <div>
                <h3 className="font-heading font-bold text-base text-ink mb-3 flex items-center gap-2">
                  <GalleryIcon className="w-4 h-4 text-signal" />
                  <span>Project Gallery</span>
                  <span className="font-mono text-xs text-ink-soft">({galleryItems.length})</span>
                </h3>

                {/* Mobile View (<640px): Horizontal scroll-snap carousel */}
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

                  {/* Dot Indicators */}
                  {galleryItems.length > 1 && (
                    <div className="flex justify-center items-center gap-1.5 mt-2.5">
                      {galleryItems.map((item, idx) => (
                        <button
                          key={item.file}
                          onClick={() => scrollToSlide(idx)}
                          className={`min-w-[24px] min-h-[24px] flex items-center justify-center p-1`}
                          aria-label={`Go to slide ${idx + 1}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-[1px] transition-colors ${
                              activeSlideIndex === idx
                                ? "bg-signal"
                                : "bg-rule hover:bg-ink-soft"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop View (≥640px): 2-Column Grid */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-3.5">
                  {galleryItems.map((item, idx) => {
                    const itemSrc = getAssetPath(`projects/${project.id}/${item.file}`);
                    const expectedPath = `public/projects/${project.id}/${item.file}`;
                    const isFeatured = galleryItems.length >= 3 && idx === 0;

                    return (
                      <div
                        key={item.file}
                        onClick={() => setLightboxIndex(idx)}
                        className={`group relative rounded-[2px] border border-rule bg-panel-sunk overflow-hidden cursor-pointer hover:border-ink hover:shadow-xs transition-all ${
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
                          expectedPath={expectedPath}
                          onError={() => handleImageError(item.file)}
                          imgClassName="group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        {/* Hover Caption Overlay */}
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
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-zinc-800 z-10 bg-black/50">
            <div className="font-mono text-xs sm:text-sm text-zinc-400">
              {lightboxIndex + 1} / {galleryItems.length}
            </div>

            <button
              ref={closeBtnRef}
              onClick={() => setLightboxIndex(null)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[2px] bg-zinc-800/80 hover:bg-zinc-700 text-white transition-colors border border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center: Image Container with Pinch-Zoom support */}
          <div
            className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden"
            style={{ touchAction: "pinch-zoom" }}
          >
            {/* Prev Button */}
            {galleryItems.length > 1 && (
              <button
                onClick={prevLightboxImage}
                className="absolute left-2 sm:left-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[2px] bg-black/70 hover:bg-zinc-800 text-white border border-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Main Lightbox Image */}
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

            {/* Next Button */}
            {galleryItems.length > 1 && (
              <button
                onClick={nextLightboxImage}
                className="absolute right-2 sm:right-4 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[2px] bg-black/70 hover:bg-zinc-800 text-white border border-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Caption Bar */}
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
