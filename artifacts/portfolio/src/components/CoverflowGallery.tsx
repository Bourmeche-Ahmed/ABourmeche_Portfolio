import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/lib/paths";
import { ProjectImage } from "./ProjectImage";
import type { GalleryItem, ProjectCategory } from "@/data/projects";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CoverflowGalleryProps {
  items: GalleryItem[];
  projectId: string;
  category: ProjectCategory;
  onSelectImage: (index: number) => void;
  onImageError: (file: string) => void;
}

export function CoverflowGallery({
  items,
  projectId,
  category,
  onSelectImage,
  onImageError,
}: CoverflowGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const reducedMotion = useReducedMotion();

  // Reset index on project change
  useEffect(() => {
    setCurrentIndex(0);
  }, [projectId]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectImage(currentIndex);
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full border border-rule bg-panel-sunk rounded-[2px] p-4 overflow-hidden select-none focus-visible:outline-none"
    >
      {/* Viewport with CSS 3D perspective */}
      <div
        className="relative h-56 sm:h-72 w-full flex items-center justify-center overflow-hidden"
        style={{ perspective: 1000 }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, idx) => {
            const offset = idx - currentIndex;
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // 3D Coverflow positioning
            const rotY = isCenter ? 0 : offset < 0 ? 35 : -35;
            const transX = offset * (window.innerWidth < 640 ? 120 : 180);
            const transZ = isCenter ? 0 : -Math.abs(offset) * 80;
            const scale = isCenter ? 1 : 0.85;
            const zIndex = 20 - Math.abs(offset);
            const opacity = isCenter ? 1 : 0.65;

            const itemSrc = getAssetPath(`projects/${projectId}/${item.file}`);
            const expectedPath = `public/projects/${projectId}/${item.file}`;

            return (
              <motion.div
                key={item.file}
                onClick={() => {
                  if (isCenter) {
                    onSelectImage(idx);
                  } else {
                    setCurrentIndex(idx);
                  }
                }}
                animate={{
                  x: transX,
                  rotateY: reducedMotion ? 0 : rotY,
                  scale: scale,
                  z: reducedMotion ? 0 : transZ,
                  opacity: opacity,
                }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute w-60 sm:w-80 aspect-[16/10] rounded-[2px] border border-rule bg-panel-raised shadow-md overflow-hidden cursor-pointer ${
                  isCenter ? "ring-1 ring-signal" : "hover:opacity-90"
                }`}
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <ProjectImage
                  src={itemSrc}
                  alt={item.alt}
                  category={category}
                  fit={item.fit || "cover"}
                  focus={item.focus}
                  expectedPath={expectedPath}
                  onError={() => onImageError(item.file)}
                  imgClassName="w-full h-full object-cover"
                />

                {/* Center item zoom hint badge */}
                {isCenter && (
                  <div className="absolute top-2 right-2 p-1.5 rounded-[2px] bg-black/60 text-white opacity-80 hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Previous & Next Navigation Buttons */}
        {items.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-[2px] bg-panel-raised/90 border border-rule text-ink-soft hover:text-ink hover:border-signal transition-colors focus-visible:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 rounded-[2px] bg-panel-raised/90 border border-rule text-ink-soft hover:text-ink hover:border-signal transition-colors focus-visible:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Slide Caption and Pagination bar */}
      <div className="mt-3 pt-2.5 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
        <p className="text-ink-soft text-center sm:text-left truncate max-w-md">
          {currentItem?.caption || currentItem?.alt}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-ink-soft">
            {currentIndex + 1} / {items.length}
          </span>

          <div className="flex gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-[1px] transition-colors ${
                  currentIndex === i ? "bg-signal" : "bg-rule hover:bg-ink-soft"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverflowGallery;
