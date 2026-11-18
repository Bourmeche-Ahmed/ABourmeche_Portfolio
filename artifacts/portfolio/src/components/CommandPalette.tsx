import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  Navigation,
  FileDown,
  Copy,
  Moon,
  Activity,
  Cpu,
  Layers,
  ArrowRight,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { smoothScrollTo } from "@/lib/utils";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { useToastNotification } from "./Toast";

interface CommandItem {
  id: string;
  category: "Sections" | "Projects" | "Skills" | "Actions";
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onToggleTheme: () => void;
  onToggleOscilloscope?: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onToggleTheme,
  onToggleOscilloscope,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const { showToast } = useToastNotification();

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("ahmed.bourmeche@insat.ucar.tn");
      showToast("Email address copied to clipboard: ahmed.bourmeche@insat.ucar.tn", "success");
    } catch {
      showToast("Email: ahmed.bourmeche@insat.ucar.tn", "info");
    }
  }, [showToast]);

  // Construct comprehensive command items list
  const allItems = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [];

    // 1. Navigation Sections
    const sections = [
      { id: "home", title: "Home // Top", subtitle: "Hero, bio & engineering positioning" },
      { id: "about", title: "About // Engineering Profile", subtitle: "Education, INSAT PFE & domains" },
      { id: "projects", title: "Projects // Selected Works", subtitle: "Hardware, robotics, control & software" },
      { id: "skills", title: "Skills // Technical Matrix", subtitle: "Radar profile, protocols & tooling" },
      { id: "experience", title: "Experience // Career Path", subtitle: "CyberNexus CTO, INSAT robotics & roles" },
      { id: "contact", title: "Contact // Get in Touch", subtitle: "Email, LinkedIn, GitHub & message form" },
    ];

    sections.forEach((sec) => {
      items.push({
        id: `nav-${sec.id}`,
        category: "Sections",
        title: sec.title,
        subtitle: sec.subtitle,
        icon: Navigation,
        action: () => {
          smoothScrollTo(sec.id);
          onClose();
        },
        keywords: [sec.id, "jump", "go to", "scroll"],
      });
    });

    // 2. All Portfolio Projects
    projects.forEach((proj) => {
      items.push({
        id: `proj-${proj.id}`,
        category: "Projects",
        title: proj.title,
        subtitle: `${proj.category} · ${proj.techBadges.slice(0, 3).join(", ")}`,
        icon: FolderGit2,
        action: () => {
          onClose();
          onSelectProject(proj);
        },
        keywords: [
          proj.id,
          proj.category,
          ...proj.techBadges,
          "robot",
          "pcb",
          "control",
          "firmware",
        ],
      });
    });

    // 3. Skills & Competencies (including CAD & Fabrication)
    const skillGroups = [
      {
        name: "CAD & Fabrication",
        desc: "Onshape (primary CAD), SolidWorks, 3D printing & mechanical design for robots",
      },
      {
        name: "Embedded Systems & Hardware",
        desc: "ESP32, STM32, Bare-metal C, Modbus RTU, RS-485, KiCad PCB design",
      },
      {
        name: "Control Systems & Digital Twins",
        desc: "MATLAB, Simulink, closed-loop PID control, HIL simulation",
      },
      {
        name: "Industrial Ingestion & Backend",
        desc: "Python, MQTT, TimescaleDB, Telegraf, Docker Compose",
      },
      {
        name: "Real-Time Dashboards & Frontend",
        desc: "React, TypeScript, WebSockets, high-frequency telemetry",
      },
    ];

    skillGroups.forEach((sg) => {
      items.push({
        id: `skill-${sg.name.toLowerCase().replace(/\s+/g, "-")}`,
        category: "Skills",
        title: sg.name,
        subtitle: sg.desc,
        icon: Layers,
        action: () => {
          smoothScrollTo("skills");
          onClose();
        },
        keywords: ["skills", "competency", "tool", ...sg.name.split(" "), ...sg.desc.split(" ")],
      });
    });

    // 4. Quick Actions
    items.push({
      id: "action-resume",
      category: "Actions",
      title: "Download Resume / CV (PDF)",
      subtitle: "Ahmed Bourmeche engineering CV for PFE internship",
      icon: FileDown,
      action: () => {
        triggerResumeDownload();
        const link = document.createElement("a");
        link.href = ASSET_PATHS.cv();
        link.download = "Ahmed_Bourmeche_RESUME.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Resume download initiated.", "success");
        onClose();
      },
      keywords: ["resume", "cv", "pdf", "download", "pfe", "hire"],
    });

    items.push({
      id: "action-copy-email",
      category: "Actions",
      title: "Copy Email Address",
      subtitle: "ahmed.bourmeche@insat.ucar.tn",
      icon: Copy,
      action: () => {
        handleCopyEmail();
        onClose();
      },
      keywords: ["email", "copy", "contact", "address", "mail"],
    });

    items.push({
      id: "action-theme",
      category: "Actions",
      title: "Toggle Theme (Light / Dark)",
      subtitle: "Switch between precision dark instrument and daylight modes",
      icon: Moon,
      action: () => {
        onToggleTheme();
        onClose();
      },
      keywords: ["theme", "dark", "light", "mode", "color"],
    });

    if (onToggleOscilloscope) {
      items.push({
        id: "action-oscilloscope",
        category: "Actions",
        title: "Toggle Oscilloscope Mode (CRT Phosphor)",
        subtitle: "Easter egg: restyle hero traces as oscilloscope phosphor signal",
        icon: Activity,
        action: () => {
          onToggleOscilloscope();
          showToast("Oscilloscope mode toggled.", "info");
          onClose();
        },
        keywords: ["oscilloscope", "scope", "phosphor", "easter", "egg", "green"],
      });
    }

    return items;
  }, [onClose, onSelectProject, onToggleTheme, onToggleOscilloscope, handleCopyEmail, showToast]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase().trim();
    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchKeywords;
    });
  }, [allItems, query]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle focus trapping and keyboard shortcuts
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs select-none"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Command Navigation Console"
      >
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl bg-panel-raised border border-rule rounded-[2px] shadow-sm overflow-hidden flex flex-col max-h-[75vh]"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-rule bg-panel">
            <Search className="w-4 h-4 text-signal shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, skills (CAD, ESP32, CAN), actions..."
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-soft focus-visible:outline-none font-sans"
              aria-autocomplete="list"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs font-mono text-ink-soft hover:text-ink px-1.5 py-0.5 rounded-[2px] bg-panel-sunk border border-rule"
              >
                Clear
              </button>
            )}
            <kbd className="hidden sm:inline-block font-mono text-[10px] text-ink-soft bg-panel-sunk px-1.5 py-0.5 rounded-[2px] border border-rule">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto divide-y divide-rule/50 flex-1 p-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-ink-soft font-mono text-xs">
                NO COMMAND OR PROJECT MATCHING "{query}"
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left px-3 py-2.5 rounded-[2px] flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? "bg-panel-sunk text-ink border-l-2 border-signal"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-[2px] flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? "bg-signal/15 border-signal/40 text-signal"
                            : "bg-panel border-rule text-ink-soft"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-sans text-xs font-semibold text-ink truncate flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="font-mono text-[9px] uppercase px-1 py-0.2 rounded-[1px] bg-panel border border-rule text-ink-soft">
                            {item.category}
                          </span>
                        </div>
                        {item.subtitle && (
                          <div className="font-sans text-[11px] text-ink-soft truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-signal shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2 border-t border-rule bg-panel font-mono text-[10px] text-ink-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>
                <kbd className="bg-panel-sunk px-1 py-0.5 rounded-[1px] border border-rule">↑</kbd>
                <kbd className="bg-panel-sunk px-1 py-0.5 rounded-[1px] border border-rule ml-1">↓</kbd> Navigate
              </span>
              <span>
                <kbd className="bg-panel-sunk px-1 py-0.5 rounded-[1px] border border-rule">↵</kbd> Select
              </span>
            </div>
            <span>{filteredItems.length} RESULTS</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
