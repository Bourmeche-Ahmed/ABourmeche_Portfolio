import { useState, useEffect } from "react";
import {
  Cpu,
  Bot,
  SlidersHorizontal,
  Gauge,
  Activity,
  Globe,
  Compass,
  Eye,
  FlaskConical,
  LucideIcon,
} from "lucide-react";
import type { ProjectCategory } from "@/data/projects";

const categoryIconMap: Record<ProjectCategory, LucideIcon> = {
  "Hardware / PCB Design": Cpu,
  "Robotics / AI": Bot,
  "Embedded Systems / Robotics": Cpu,
  "Control Systems / Simulation": SlidersHorizontal,
  "Real-time / Control": Gauge,
  "IIoT / Analytics": Activity,
  "Web Apps": Globe,
  "Browser Extension": Compass,
  "Computer Vision / HCI": Eye,
  "Experimental": FlaskConical,
};

const CANDIDATE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

export interface ProjectImageProps {
  src?: string;
  alt: string;
  category: ProjectCategory;
  fit?: "cover" | "contain";
  focus?: string; // CSS object-position, e.g. "center top"
  isCover?: boolean;
  expectedPath?: string;
  className?: string;
  imgClassName?: string;
  onError?: () => void;
  onLoad?: () => void;
}

export function BlueprintPlaceholder({
  category,
  expectedPath,
  className = "",
}: {
  category: ProjectCategory;
  expectedPath?: string;
  className?: string;
}) {
  const IconComponent = categoryIconMap[category] || Cpu;

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center bg-panel-sunk border-rule overflow-hidden select-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(128, 128, 128, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(128, 128, 128, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
      aria-hidden="true"
    >
      {/* Precision corner marks */}
      <span className="absolute top-1.5 left-2 font-mono text-[10px] text-ink-soft/40 pointer-events-none">+</span>
      <span className="absolute top-1.5 right-2 font-mono text-[10px] text-ink-soft/40 pointer-events-none">+</span>
      <span className="absolute bottom-1.5 left-2 font-mono text-[10px] text-ink-soft/40 pointer-events-none">+</span>
      <span className="absolute bottom-1.5 right-2 font-mono text-[10px] text-ink-soft/40 pointer-events-none">+</span>

      {/* Center technical badge */}
      <div className="flex flex-col items-center gap-1.5 z-10 px-4 text-center">
        <div className="w-8 h-8 rounded-[2px] bg-panel-raised/90 border border-rule flex items-center justify-center text-ink-soft shadow-xs">
          <IconComponent className="w-4 h-4" />
        </div>
        <span className="font-mono text-[10px] text-ink-soft tracking-wider uppercase font-medium line-clamp-1">
          {category}
        </span>
      </div>

      {/* DEV mode expected path indicator */}
      {import.meta.env.DEV && expectedPath && (
        <div className="absolute bottom-2 inset-x-2 flex justify-center pointer-events-none z-10">
          <span className="font-mono text-[9px] px-2 py-0.5 rounded-[2px] bg-panel-raised/95 border border-rule text-ink-soft shadow-xs backdrop-blur-xs truncate max-w-[95%]">
            {expectedPath}
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectImage({
  src,
  alt,
  category,
  fit = "cover",
  focus,
  isCover = false,
  expectedPath,
  className = "",
  imgClassName = "",
  onError,
  onLoad,
}: ProjectImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [hasError, setHasError] = useState(!src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setAttemptIndex(0);
    setHasError(!src);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc) {
      const match = currentSrc.match(/\.(png|jpg|jpeg|webp)$/i);
      if (match) {
        const curExt = match[0].toLowerCase();
        const altExts = CANDIDATE_EXTENSIONS.filter((e) => e !== curExt);
        if (attemptIndex < altExts.length) {
          const nextExt = altExts[attemptIndex];
          setAttemptIndex((prev) => prev + 1);
          const nextSrc = currentSrc.replace(/\.(png|jpg|jpeg|webp)$/i, nextExt);
          setCurrentSrc(nextSrc);
          return;
        }
      }
    }
    setHasError(true);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Missing gallery item in production: render nothing so no empty boxes appear
  if (!isCover && hasError && !import.meta.env.DEV) {
    return null;
  }

  // Cover image missing or dev-mode missing gallery item: render blueprint placeholder
  if (hasError || !currentSrc) {
    return (
      <BlueprintPlaceholder
        category={category}
        expectedPath={expectedPath}
        className={className}
      />
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        fit === "contain" ? "bg-panel-sunk flex items-center justify-center" : ""
      } ${className}`}
    >
      {/* Background blueprint placeholder while loading */}
      {!isLoaded && (
        <BlueprintPlaceholder
          category={category}
          expectedPath={expectedPath}
          className="absolute inset-0"
        />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        style={focus ? { objectPosition: focus } : undefined}
        className={`w-full h-full transition-opacity duration-300 ${
          fit === "contain" ? "object-contain p-2" : "object-cover"
        } ${isLoaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
