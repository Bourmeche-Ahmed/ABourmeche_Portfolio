import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, Download } from "lucide-react";
import { ASSET_PATHS, triggerResumeDownload } from "@/lib/paths";
import { copyToClipboard } from "@/lib/utils";

const TARGET_EMAIL = "ahmed.bourmeche@insat.ucar.tn";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await copyToClipboard(TARGET_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-4 mb-16 font-mono text-xs text-soft">
          <div className="flex items-center gap-2">
            <span className="text-accent font-semibold">05 // TRANSMISSION</span>
            <span>·</span>
            <span>CONTACT &amp; DIRECT LINKS</span>
          </div>
          <div className="text-soft sm:text-right">
            RESPONSE CYCLE &lt; 24H
          </div>
        </div>

        {/* Big Memorable Editorial Closing Statement */}
        <div className="max-w-4xl space-y-6 mb-16">
          <h2
            className="font-heading font-black text-ink uppercase tracking-tight leading-[0.92]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
          >
            AVAILABLE FOR FINAL-YEAR
            <br />
            <span className="text-accent">PFE INTERNSHIP</span> FROM FEB 2027.
          </h2>

          <p className="font-sans text-base sm:text-xl text-soft leading-relaxed max-w-2xl">
            Open to international opportunities in embedded firmware, industrial automation fieldbuses,
            and autonomous robotic control. Based in Tunis, immediately open to relocation (including Paris).
          </p>
        </div>

        {/* 4 Big Link Blocks Side by Side (12-Column Grid: 4 x 3 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Block 1: Email Copy-to-Clipboard */}
          <div
            onClick={handleCopyEmail}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCopyEmail();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Copy email address to clipboard"
            className="p-6 md:p-8 border border-hairline bg-surface hover:border-accent group flex flex-col justify-between min-h-[180px] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <div className="flex items-center justify-between font-mono text-xs text-soft">
              <span className="text-accent flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>DIRECT EMAIL</span>
              </span>
              {copied ? (
                <span className="text-accent flex items-center gap-1 text-[11px] font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>COPIED</span>
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-soft group-hover:text-accent transition-colors" />
              )}
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs sm:text-sm text-ink group-hover:text-accent transition-colors break-all">
                {TARGET_EMAIL}
              </div>
              <p className="font-sans text-[11px] text-soft">
                {copied ? "Address copied to clipboard" : "Click to copy address"}
              </p>
            </div>
          </div>

          {/* Block 2: LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ahmed-bourmeche/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 md:p-8 border border-hairline bg-surface hover:border-accent group flex flex-col justify-between min-h-[180px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <div className="flex items-center justify-between font-mono text-xs text-soft">
              <span className="text-ink flex items-center gap-1.5 group-hover:text-accent transition-colors">
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-soft group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <div className="space-y-1">
              <div className="font-heading font-black text-xl text-ink uppercase tracking-tight group-hover:text-accent transition-colors">
                Professional Network
              </div>
              <p className="font-sans text-xs text-soft">
                Connect on LinkedIn for career updates
              </p>
            </div>
          </a>

          {/* Block 3: GitHub */}
          <a
            href="https://github.com/Bourmeche-Ahmed"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 md:p-8 border border-hairline bg-surface hover:border-accent group flex flex-col justify-between min-h-[180px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <div className="flex items-center justify-between font-mono text-xs text-soft">
              <span className="text-ink flex items-center gap-1.5 group-hover:text-accent transition-colors">
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-soft group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <div className="space-y-1">
              <div className="font-heading font-black text-xl text-ink uppercase tracking-tight group-hover:text-accent transition-colors">
                Source Code &amp; Repos
              </div>
              <p className="font-sans text-xs text-soft">
                Firmware, CAD repositories &amp; models
              </p>
            </div>
          </a>

          {/* Block 4: Download CV (PDF) */}
          <a
            href={ASSET_PATHS.cv()}
            download="Ahmed_Bourmeche_RESUME.pdf"
            onClick={triggerResumeDownload}
            className="p-6 md:p-8 border border-hairline bg-surface hover:border-accent group flex flex-col justify-between min-h-[180px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <div className="flex items-center justify-between font-mono text-xs text-soft">
              <span className="text-accent flex items-center gap-1.5 font-semibold">
                <Download className="w-4 h-4" />
                <span>CURRICULUM VITAE</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <div className="space-y-1">
              <div className="font-heading font-black text-xl text-ink uppercase tracking-tight group-hover:text-accent transition-colors">
                Download Resume (PDF)
              </div>
              <p className="font-sans text-xs text-soft">
                Verified 1-page engineering CV
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
