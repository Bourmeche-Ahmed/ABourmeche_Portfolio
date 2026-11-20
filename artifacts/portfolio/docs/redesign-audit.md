# Editorial Redesign Audit (Phase 0)

## 1. Stack, Build & Deployment Architecture
- **Framework & Tooling**: Vite 7.3, React 18.3, TypeScript 5.9, Tailwind CSS 3.4.
- **Motion & Routing**: Framer Motion 12, Lenis smooth scroll, Wouter 3.3, Lucide React icons.
- **Monorepo Layout**: Root pnpm workspace with application located in `artifacts/portfolio/`.
- **Deploy Pipeline**: `.github/workflows/deploy.yml` triggers on push to `main`, executes `pnpm build` inside `artifacts/portfolio/`, and uploads `dist/public` to GitHub Pages with `BASE_PATH: ./`.

## 2. Parameter Control Audit (?preset and ?tier)
- **`?preset`**: Controls color tokens via `presets.ts` (`vermilion`, `lime`, `ultraviolet`).
  - *Decision*: Remove client-facing selector UI and multi-theme noise. Standardize on a single, authoritative near-black charcoal + lime accent palette (`#0B0C0E` background, `#EDEDED` text, `#C6F432` lime accent). Contrast ratio: **14.5:1** on `#0B0C0E` (surpasses WCAG AAA 7:1). Maintain URL query fallback so `?preset=*` does not break.
- **`?tier`**: Controls 3D WebGL fidelity (`full`, `lite`, `static`).
  - *Decision*: The 943 KB procedural Three.js robot canvas was the primary driver of page weight and visual clutter. 3D is removed from all secondary sections. The hero receives a lightweight, GPU-efficient SVG/Canvas engineering signal motif that pauses off-screen and under reduced motion, shrinking total bundle weight by over 65%.

## 3. Comprehensive Content Inventory

### Positioning & Profile
- **Name**: Ahmed Bourmeche
- **Primary Positioning**: Embedded Systems & Industrial IoT Engineer seeking a Final-Year Engineering Internship (PFE) available from February 2027 (6 months).
- **Institution**: INSAT (National Institute of Applied Science and Technology), University of Carthage.
- **Supporting Disciplines**: Robotics, closed-loop control, industrial automation/IIoT, and electronics.
- **Relocation**: Based in Tunis, open to international relocation (including Paris). Trilingual in Arabic, French, and English.

### Project Catalog (14 Projects)
1. **VROOM – Automotive OBD-II/CAN Telemetry Dashboard** (Featured Bento 1, 7 cols)
   - *Tech*: KiCad, ESP32-S3, CAN, OBD-II, BLE, TPS54360 Buck, ISO 7637 TVS, HUB75 Matrix.
   - *Highlights*: Automotive-grade power regulation, 60V buck down to 5V, common-mode choke CAN bus, dual-core ESP32-S3 BLE companion.
2. **Autonomous Mobile Robot Navigation via Reinforcement Learning** (Featured Bento 2, 5 cols)
   - *Tech*: PPO, Gymnasium, Stable-Baselines3, Webots, Python.
   - *Highlights*: 81% success rate obstacle navigation, single ToF laser eye, 0% timeouts in dense physics obstacle mazes.
3. **IIoT Predictive Maintenance & Edge Microservices Gateway** (Featured Bento 3, 12 cols full-width)
   - *Tech*: Modbus RTU/TCP, RS-485, Docker Compose (9 services), TimescaleDB, MQTT, Grafana.
   - *Highlights*: 13x polling speedup (4.5s -> 350ms) via contiguous register batching, sub-100ms telemetry updates.
4. **Self-Balancing Robot – Closed-Loop Inverted Pendulum** (Featured Bento 4, 6 cols)
   - *Tech*: STM32, FreeRTOS, Cascaded PID, MPU-6050, Encoders.
   - *Highlights*: 100 Hz complementary filter, real-time trajectory tracking, quadrature odometry.
5. **Quarter-Car Active Suspension System Digital Twin** (Featured Bento 5, 6 cols)
   - *Tech*: MATLAB, Simulink, State-Space, Hardware-in-the-Loop (HIL).
   - *Highlights*: 2-DOF active damping achieving ~87% chassis displacement attenuation under road disturbance profiles.
6. **FARZIT – Autonomous Obstacle-Avoidance Robot** (Secondary Index)
7. **PID Control Dashboard** (Secondary Index)
8. **Hand Gesture-Controlled Maze Game** (Secondary Index)
9. **Line-Follower Robot** (Secondary Index)
10. **LinkedIn Optimizer** (Secondary Index)
11. **STEP'ACT 2026 Marathon Platform** (Secondary Index)
12. **CyberNexus UI Lab** (Secondary Index)
13. **YTB Voice & Gesture Control** (Secondary Index)
14. **IEEE Student Branch Website** (Secondary Index)

### Experience & Education (Journey)
- **ESD (Electronic Systems Development) · Vimar Group** (Jun 2024 – Aug 2024): Embedded & IIoT Intern — RS-485 BACnet/Modbus/OCPP smart edge gateway, 9 Docker microservices.
- **LAB619 Makerspace** (2023 – 2024): Robotics Hardware Developer — Eurobot competitive robots, custom KiCad 2-layer PCBs, cascaded PID loops on STM32.
- **CyberNexus Junior Enterprise** (2023 – 2024): CTO & Lead Engineer — Engineering roadmap, CI/CD pipelines, IoT & web delivery.
- **STEP'ACT 2026 Marathon** (2023 – 2024): Lead Full-Stack Developer — 2,500+ participants handled with zero downtime.
- **INSAT Carthage** (2022 – 2027): State Engineering Degree in Industrial Automation & Real-Time IoT.

### Skills Domains (5 Groups)
1. **Robotics & Control**: Cascaded PID, Inverted Pendulum, PPO Reinforcement Learning, Webots Simulation, State-Space Modeling, Quadrature Odometry.
2. **Embedded Systems**: Bare-metal C/C++, STM32 (HAL & Register Level), ESP32-S3 (ESP-IDF, FreeRTOS), Timers, PWM, DMA, I2C, SPI, UART.
3. **Industrial Automation & IIoT**: RS-485, Modbus RTU/TCP, CAN 2.0B / CANopen, BACnet MS/TP, OCPP 1.6J, MQTT, Edge Gateways.
4. **Software & Development**: Python (FastAPI, Django), TypeScript, React, Docker Compose, TimescaleDB, PostgreSQL, Redis, Linux, Git CI/CD.
5. **Electronics & Hardware**: 2-Layer PCB Layout (KiCad), Switching Regulators, TVS Protection (ISO 7637), Level Shifting, SolidWorks & Onshape CAD, 3D Printing.

## 4. Animation Assessment (Keep / Simplify / Remove)
- **3D Procedural Robot canvas**: REMOVE — 943 KB bundle, too busy; replace with subtle SVG/canvas control-loop signal in hero.
- **Oversized background numerals (01-05)**: REMOVE — visual noise that disrupts clean typographic hierarchy.
- **Hero stat counter tiles**: REMOVE — dashboard widgets that conflict with the editorial aesthetic.
- **SectionRail left telemetry bar**: REMOVE — distracting edge UI.
- **Palette preset pills in navbar**: REMOVE — single authoritative palette.
- **Holographic ID flip card**: SIMPLIFY — replace with an asymmetric two-column editorial about block.
- **Project floating thumbnail cursor tracker**: SIMPLIFY — replace with clean Bento grid and hash-routed modal.
- **Experience vertical line-drawing**: SIMPLIFY — replace with horizontal scroll-snap and multi-column grid.
- **EmailJS contact form**: REMOVE — replace with high-impact closing statement + direct email copy / social links.
- **Lenis smooth scrolling**: KEEP — maintains calm, fluid scroll momentum; respects reduced-motion.
- **IntersectionObserver reveals**: KEEP & TUNE — discrete 20px transform/opacity reveals on scroll.

## 5. Baseline Performance & Asset Weight
- **Lighthouse Performance**: 100
- **Lighthouse Accessibility**: 83 (contrast and button accessible name warnings)
- **Lighthouse Best Practices**: 100
- **Lighthouse SEO**: 100
- **Core JS Size**: 469.72 KB (147.31 KB gzip)
- **CSS Size**: 79.36 KB (14.08 KB gzip)
- **Three.js Chunk**: 943.40 KB (254.00 KB gzip)
- **Target**: Eliminate Three.js chunk, achieving < 200 KB total gzip payload and raising Accessibility to $\ge 95$.
