import React from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, GraduationCap, Clock } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 border-b border-hairline relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-hairline pb-4 mb-16 font-mono text-xs text-soft">
          <div className="flex items-center gap-2">
            <span className="text-accent font-semibold">01 // PROFILE</span>
            <span>·</span>
            <span>IDENTITY & CREDENTIALS</span>
          </div>
          <div className="text-soft sm:text-right">
            INSAT · UNIVERSITY OF CARTHAGE
          </div>
        </div>

        {/* Asymmetric 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Editorial Narrative (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-ink uppercase tracking-tight leading-[0.95]"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
            >
              Bridging Physical Hardware
              <br />
              <span className="text-soft">&amp; Real-Time Intelligence</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 font-sans text-base sm:text-lg text-soft leading-relaxed"
            >
              <p>
                I am an Industrial Automation and Embedded Systems engineer at INSAT (University of
                Carthage), specializing in the tight co-design of bare-metal firmware, industrial
                telemetry fieldbuses, and closed-loop robotic control.
              </p>

              <p>
                From routing 2-layer automotive PCBs in KiCad and tuning cascaded PID loops with
                quadrature odometry on STM32 to scaling containerized edge microservices in Docker,
                my work focuses on deterministic real-world reliability over theoretical simulation.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Verified Credentials Matrix (5 Columns) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 font-mono">
            {/* Degree Block */}
            <div className="p-5 border border-hairline bg-surface/60 space-y-2">
              <div className="flex items-center gap-2 text-accent text-xs uppercase font-semibold">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span>State Engineering Degree</span>
              </div>
              <p className="text-sm text-ink font-sans font-medium">
                Industrial Automation &amp; Real-Time IoT
              </p>
              <p className="text-xs text-soft">
                National Institute of Applied Science and Technology (INSAT) · 2022–2027
              </p>
            </div>

            {/* PFE Availability Block */}
            <div className="p-5 border border-hairline bg-surface/60 space-y-2">
              <div className="flex items-center gap-2 text-accent text-xs uppercase font-semibold">
                <Clock className="w-4 h-4 text-accent" />
                <span>PFE Internship</span>
              </div>
              <p className="text-sm text-ink font-sans font-medium">
                Available from February 2027 (6 Months)
              </p>
              <p className="text-xs text-soft">
                Seeking graduation internship focused on robotics, IIoT, or embedded firmware.
              </p>
            </div>

            {/* Mobility & Relocation Block */}
            <div className="p-5 border border-hairline bg-surface/60 space-y-2">
              <div className="flex items-center gap-2 text-accent text-xs uppercase font-semibold">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Mobility &amp; Relocation</span>
              </div>
              <p className="text-sm text-ink font-sans font-medium">
                Tunis, Tunisia · Open to Worldwide Relocation
              </p>
              <p className="text-xs text-soft">
                Immediate availability for international mobility, including Paris and Europe.
              </p>
            </div>

            {/* Languages Block */}
            <div className="p-5 border border-hairline bg-surface/60 space-y-2">
              <div className="flex items-center gap-2 text-accent text-xs uppercase font-semibold">
                <Globe className="w-4 h-4 text-accent" />
                <span>Trilingual Communication</span>
              </div>
              <p className="text-sm text-ink font-sans font-medium">
                English (Fluent) · French (Fluent) · Arabic (Native)
              </p>
              <p className="text-xs text-soft">
                Experienced collaborating in international technical workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
