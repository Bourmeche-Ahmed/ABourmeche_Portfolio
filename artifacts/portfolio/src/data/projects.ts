export type ProjectCategory =
  | "Hardware / PCB Design"
  | "Robotics / AI"
  | "Embedded Systems / Robotics"
  | "Control Systems / Simulation"
  | "Real-time / Control"
  | "IIoT / Analytics"
  | "Web Apps"
  | "Browser Extension"
  | "Computer Vision / HCI"
  | "Experimental";

export interface Language {
  name: string;
  percentage: number;
  color: string;
}

export interface GalleryItem {
  file: string;
  alt: string;
  caption: string;
  fit?: "cover" | "contain";
  focus?: string; // CSS object-position value, e.g. "center top" or "50% 30%"
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  repo: string;
  githubUrl?: string;
  languages?: Language[];
  techBadges: string[];
  highlights: string[];
  architecture: string;
  challenges: string;
  learned: string;
  keyFeatures: string[];
  order?: number;
  cover?: string;
  gallery?: GalleryItem[];
  metrics?: ProjectMetric[];
}

const rawProjects: Project[] = [
  {
    id: "vroom",
    order: 1,
    title: "VROOM – Automotive OBD-II/CAN Telemetry Dashboard",
    description:
      "Smart Automotive Hardware: KiCad-designed companion plugging into vehicle OBD-II/CAN, featuring automotive-grade power regulation (ISO 7637 TVS, TPS54360 buck), dual-core ESP32-S3, HUB75 RGB LED matrix driver, and BLE telemetry.",
    longDescription:
      "VROOM is a smart automotive companion designed from scratch in KiCad, turning live vehicle OBD-II and CAN bus data into a customizable RGB LED matrix display with an accompanying mobile companion app over Bluetooth Low Energy (BLE). The board features an automotive-protected power stage with a fused 12 V vehicle input (2 A fuse), an SMCJ33A TVS clamp for load-dump transients conforming to ISO 7637 considerations, reverse-polarity Schottky protection, a 60 V-capable TPS54360 buck converter (8.2 µH inductor, B560C Schottky catch diode) stepping down to 5 V, and an AP2112K-3.3 LDO producing the 3.3 V logic rail. Vehicle network communication utilizes an SN65HVD230 CAN transceiver equipped with a Würth common-mode choke and SM712 TVS protection across the CAN lines for noisy vehicle buses. The host MCU is an ESP32-S3-WROOM-1 with an intentional antenna keep-out zone for robust BLE range, supported by a USB-C interface with USBLC6-2SC6 ESD protection and 5.1 kΩ CC termination. Two 74HCT244 octal buffers level-shift 3.3 V GPIOs to 5 V logic to drive a standard 16-pin HUB75-style RGB LED matrix connector (R1/G1/B1/R2/G2/B2, A-D, CLK, LAT, OE). Onboard peripherals include a 6-axis MPU-6050 IMU for motion and driving-dynamics effects and a 2N3904-driven acoustic buzzer. The 2-layer PCB (approx. 77 x 67 mm, 55 footprints, four M2 mounting holes) was brought through DRC resolution for routing shorts, ground-plane isolation, and thermal vias ahead of fabrication.",
    category: "Hardware / PCB Design",
    repo: "private-repo-pending-publication",
    techBadges: [
      "KiCad",
      "ESP32-S3",
      "CAN",
      "OBD-II",
      "BLE",
      "Buck Converter",
      "TVS Protection",
      "ISO 7637",
      "HUB75",
      "PCB Design",
      "MPU-6050",
    ],
    metrics: [
      { label: "2-layer PCB", value: "~77 x 67 mm" },
      { label: "MCU", value: "ESP32-S3 (BLE)" },
      { label: "Protection", value: "ISO 7637" },
    ],
    highlights: [
      "Automotive power stage: 2 A fused 12 V input, SMCJ33A TVS clamp (ISO 7637), 60 V-capable TPS54360 buck (5 V), and AP2112K LDO (3.3 V)",
      "CAN/OBD-II bus interface: 3.3 V transceiver (SN65HVD230), Würth common-mode choke, and SM712 TVS protection",
      "ESP32-S3 MCU: dual-core processing, BLE companion app support, USB-C ESD protection (USBLC6-2SC6), and RF antenna keep-out",
      "RGB LED matrix driver: dual 74HCT244 octal buffers level-shifting 3.3 V logic to 5 V for 16-pin HUB75 connector",
      "Integrated 6-axis MPU-6050 IMU for driving dynamics and 2N3904-driven acoustic buzzer",
      "2-layer PCB (~77 x 67 mm, 55 footprints, 4x M2 mounting holes) with continuous ground planes and thermal vias",
    ],
    architecture:
      "12 V Vehicle Input -> Protection (Fuse + TVS) -> TPS54360 Buck (5 V) -> LDO (3.3 V) -> ESP32-S3 <-> CAN Transceiver <-> OBD-II / CAN bus; ESP32-S3 -> 74HCT244 level shifters -> HUB75 RGB Matrix & BLE Companion App",
    challenges:
      "Engineering work resolved a critical cold-crank power-supply trade-off through hold-up-time calculations to maintain rail stability during automotive voltage dips. Layout challenges included fixing design rule check (DRC) issues involving routing shorts, ground-plane continuity, and via placement ahead of PCB fabrication.",
    learned:
      "Deepened practical knowledge of automotive electronics engineering: applying ISO 7637 transient protection guidelines, sizing switching buck converter passives, designing RF keep-outs for ESP32 modules, and rigorous PCB layout verification in KiCad.",
    keyFeatures: [
      "Protected 12 V automotive power supply (60 V-capable buck down to 5 V)",
      "CAN bus and OBD-II physical transceiver with common-mode choke and TVS",
      "ESP32-S3 microcontroller with BLE companion app connectivity",
      "HUB75 RGB LED matrix interface with 74HCT244 level translation",
      "6-axis IMU for motion dynamics and acoustic buzzer alerts",
      "Engineered antenna keep-out zone ensuring reliable Bluetooth range",
    ],
    cover: "vroom1.jpg",
    gallery: [
      {
        file: "vroom1.jpg",
        alt: "VROOM 2-layer PCB 3D render in KiCad showing ESP32-S3 module, buzzer, HUB75 connector, and 74HCT244 buffers",
        caption: "KiCad 3D render: 2-layer PCB (~77 × 67 mm) with ESP32-S3, buzzer (BZ1), HUB75 header, and 74HCT244 level shifters",
        fit: "cover",
      },
      {
        file: "vroom2.jpg",
        alt: "KiCad PCB layout editor view with F.Cu (red) and B.Cu (blue) traces, ground plane, and component footprints",
        caption: "PCB layout: front copper (red) and back copper (blue) routing, ground plane pour, and M2 mounting holes",
        fit: "cover",
      },
      {
        file: "vroom3.jpg",
        alt: "KiCad schematic of CAN transceiver subsystem: SN65HVD230 with SM712 TVS and Würth common-mode choke to OBD-II",
        caption: "Schematic: SN65HVD230 CAN transceiver, SM712 TVS protection, and Würth WE-CNSW common-mode choke",
        fit: "contain",
      },
      {
        file: "vroom4.jpg",
        alt: "KiCad schematic of power supply: 12 V fused input, SMCJ33A TVS, TPS54360 buck converter to 5 V, AP2112K LDO to 3.3 V",
        caption: "Schematic: TPS54360 buck (12 V → 5 V) with B560C catch diode, 8.2 µH inductor, and AP2112K-3.3 LDO",
        fit: "contain",
      },
    ],
  },
  {
    id: "rl-navigation",
    order: 2,
    title: "Autonomous Navigation via Reinforcement Learning",
    description:
      "Autonomous Mobile Robotics & AI: Pioneer 3-AT mobile robot trained with PPO reinforcement learning in Webots physics simulation, navigating dense obstacle courses from raw sonar and proprioceptive signals (81% success, 0% timeouts).",
    longDescription:
      "An autonomous navigation agent developed by training a Pioneer 3-AT robot in Webots simulation using Proximal Policy Optimization (PPO) via Stable-Baselines3 and Gymnasium. The agent navigates cluttered environments using only raw sonar range measurements and proprioceptive feedback (linear/angular velocities and target direction). A custom reward shaping function promotes efficient heading progression toward targets while strictly penalizing near-obstacle proximity. Domain randomization of obstacle layouts and positions was implemented to improve generalizability across unseen configurations. Using true-position collision detection, the policy was evaluated over 50+ randomized test episodes, achieving an 81% success rate with 0% timeouts.",
    category: "Robotics / AI",
    repo: "private-repo-pending-publication",
    techBadges: [
      "Webots",
      "PPO",
      "Stable-Baselines3",
      "Gymnasium",
      "Python",
      "Reinforcement Learning",
      "Reward Shaping",
      "Domain Randomization",
    ],
    metrics: [
      { label: "Success rate", value: "81%" },
      { label: "Timeouts", value: "0%" },
      { label: "Eval", value: "50+ episodes" },
    ],
    highlights: [
      "Pioneer 3-AT mobile robot trained in Webots simulation using PPO via Stable-Baselines3",
      "Observations comprised of raw sonar range data and proprioceptive state feedback",
      "Custom Gymnasium environment interface facilitating synchronous training and evaluation",
      "Custom reward shaping balancing waypoint progress with smooth obstacle clearance penalties",
      "Domain randomization applied across obstacle positions and layouts to avoid overfitting",
      "Evaluated across 50+ randomized episodes: 81% mission success rate, 0% timeouts",
    ],
    architecture:
      "Webots World <-> Gymnasium Environment <-> PPO (Stable-Baselines3) <-> Policy -> Robot Actions",
    challenges:
      "Balancing collision avoidance with forward goal navigation. Without reward shaping, the policy tended to converge to conservative local minima (e.g. stopping or orbiting in place). Formulating dense progression rewards combined with graduated obstacle clearance penalties resolved the issue.",
    learned:
      "Acquired hands-on experience in reinforcement learning for robotics: environment design in Gymnasium, PPO policy optimization with Stable-Baselines3, reward engineering, and applying domain randomization to achieve robust navigation policies.",
    keyFeatures: [
      "End-to-end PPO reinforcement learning navigation",
      "Raw sonar and proprioceptive state input processing",
      "Gymnasium and Webots simulation integration",
      "Domain-randomized training environments",
      "True-position collision detection and verification",
      "High reliability with 0% timeout rate across 50+ evaluation trials",
    ],
    cover: "rl1.png",
    gallery: [
      {
        file: "rl1.png",
        alt: "Side-by-side comparison: Classical VFH (left, yellow path, timeout) vs Learned PPO (right, green path, success) in a grid of cylindrical obstacles",
        caption: "Classical VFH vs Learned PPO: the VFH agent loops and times out; the PPO policy navigates directly to the goal",
        fit: "cover",
      },
      {
        file: "rl2.png",
        alt: "PPO reinforcement learning training and performance curve",
        caption: "PPO training performance curve and trajectory evaluation",
        fit: "contain",
      },
    ],
  },
  {
    id: "farzit",
    order: 3,
    title: "FARZIT – Autonomous Obstacle-Avoidance Robot",
    description:
      "Final-year INSAT autonomous mobile robot: bare-metal STM32 firmware, cascaded PID motor control with quadrature odometry, single ToF obstacle avoidance (Potential Fields/VFH/VFH+), custom SolidWorks chassis, KiCad PCB, and bidirectional ESP32 UART Wi-Fi telemetry and commands.",
    longDescription:
      "Designed and built from the ground up as a final-year engineering project at INSAT with teammate Abdelwahed Eloued. FARZIT is a fully autonomous mobile obstacle-avoidance robot integrating mechanics, electronics, control loops, and embedded software into a tightly coupled system. Running bare-metal firmware on an STM32 Blue Pill (STM32F103C8T6), the robot executes autonomous waypoint navigation using cascaded PID motor control coupled with quadrature-encoder odometry for precise trajectory and heading tracking. Forward obstacle avoidance was tackled by exploring classical navigation algorithms—including Potential Fields, Vector Field Histogram (VFH), and VFH+—and adapting them to operate reliably under the real-world beam constraints of a single Time-of-Flight (ToF) optical distance sensor. Hardware comprises an STM32 core, PWM motor drivers controlling N20 DC gearmotors, a custom KiCad PCB for power management and sensor routing, and a custom multi-tier chassis designed in SolidWorks. Firmware manages low-level STM32 peripherals (GPIO, PWM, hardware timers, UART, external interrupts) and odometric integration. An onboard ESP32 communicates with the STM32 over UART to provide bidirectional Wi-Fi connectivity: streaming real-time pose (x, y, heading) and sensor telemetry to a live web dashboard, and dispatching remote navigation commands back to the robot. The architecture was later replicated across five robot copies assembled for Eurobot.",
    category: "Embedded Systems / Robotics",
    repo: "private-repo-pending-publication",
    techBadges: [
      "STM32",
      "Bare-metal C",
      "ToF Sensor",
      "Cascaded PID",
      "Odometry",
      "VFH / VFH+",
      "ESP32",
      "UART",
      "KiCad",
      "SolidWorks",
    ],
    metrics: [
      { label: "Control", value: "Cascaded PID" },
      { label: "Sensor", value: "Single ToF" },
      { label: "Telemetry", value: "ESP32 UART" },
    ],
    highlights: [
      "Bare-metal STM32 Blue Pill (STM32F103C8T6) firmware with direct peripheral register and timer control",
      "Cascaded PID motor control with quadrature-encoder odometry for autonomous trajectory and heading tracking",
      "Obstacle avoidance using Potential Fields, VFH, and VFH+ algorithms adapted for a single Time-of-Flight (ToF) sensor",
      "Bidirectional STM32-to-ESP32 UART link for live web dashboard telemetry and remote command dispatch",
      "Custom 2-layer KiCad PCB for motor driving, regulated power delivery, and sensor signal integrity",
      "Custom multi-tier mechanical chassis modeled in SolidWorks housing drive motors, batteries, and sensor mounts",
      "Proven reliability: architecture replicated across 5 robot copies assembled for the Eurobot robotics competition",
    ],
    architecture:
      "STM32 Firmware (Bare-metal FSM + Cascaded PID + VFH/ToF) ↔ Quadrature Encoders + Single ToF ↔ Custom PCB + N20 Motors ↔ Bidirectional UART ↔ ESP32 Wi-Fi Bridge ↔ Web Dashboard (Telemetry & Commands)",
    challenges:
      "Translating obstacle avoidance algorithms (Potential Fields, VFH, VFH+) designed for broad sensor arrays to the tight constraints of a single Time-of-Flight sensor in dynamic physical environments. Overcoming noisy sensor readings and odometric drift required strict dead-reckoning calibration, sensor filtering, and reliable bidirectional UART packet synchronization with the ESP32.",
    learned:
      "Mastered full-stack robotics engineering: bare-metal STM32 programming, multi-rate cascaded PID loops, odometry integration, adapting local path planners (VFH+) to sensor-constrained hardware, custom KiCad PCB layout, SolidWorks CAD modeling, and scaling prototype production for Eurobot.",
    keyFeatures: [
      "Autonomous waypoint navigation and single ToF obstacle avoidance",
      "Exploration of Potential Fields, VFH, and VFH+ local motion planning",
      "Cascaded PID speed and position motor regulation with quadrature encoders",
      "Bidirectional ESP32 UART Wi-Fi link for live dashboard telemetry and command dispatch",
      "Custom KiCad PCB for motor/sensor/power management",
      "Custom SolidWorks mechanical chassis",
      "Multi-unit fabrication validated across 5 Eurobot robot clones",
    ],
    cover: "farzit.jpg",
    gallery: [
      {
        file: "farzit.jpg",
        alt: "FARZIT robot SolidWorks 3D render: teal multi-tier chassis with wheels, red emergency stop button, and penguin logo",
        caption: "SolidWorks render of the FARZIT chassis with emergency stop, drive wheels, and team logo",
        fit: "cover",
        focus: "50% 35%",
      },
      {
        file: "chassis-render.png",
        alt: "SolidWorks mechanical chassis render",
        caption: "Custom multi-tier robot chassis modeled in SolidWorks",
        fit: "contain",
      },
      {
        file: "printed-parts.jpg",
        alt: "3D-printed chassis components",
        caption: "3D-printed structural brackets, motor mounts, and sensor housings",
        fit: "cover",
      },
    ],
  },
  {
    id: "pid-control-dashboard",
    order: 4,
    title: "PID Control Dashboard",
    description:
      "Control Systems & Digital Twin: React engineering console tightly coupled via Flask API to a MATLAB Simulink closed-loop plant model, enabling sub-100ms live PID gain tuning and real-time transient response observation.",
    longDescription:
      "A complete industrial control engineering platform that tightly couples a modern web stack with MATLAB Simulink simulation. The React dashboard lets engineers interactively tune PID gain parameters (Kp, Ki, Kd) and visualize the closed-loop system response in real time. A Flask REST API bridges the web layer to a MATLAB Simulink digital twin model running the actual control loop simulation — changes made in the browser propagate to Simulink, and simulation telemetry streams back to the dashboard within milliseconds.",
    category: "Real-time / Control",
    repo: "pid-control-dashboard",
    githubUrl: "https://github.com/Bourmeche-Ahmed/pid-control-dashboard",
    languages: [
      { name: "Python", percentage: 57, color: "#3572A5" },
      { name: "JavaScript", percentage: 38.7, color: "#F1E05A" },
      { name: "CSS", percentage: 3.4, color: "#563D7C" },
      { name: "Other", percentage: 0.9, color: "#6e7681" },
    ],
    techBadges: ["React", "Flask", "MATLAB", "Simulink", "Python", "REST API", "WebSocket", "Control Systems"],
    highlights: [
      "MATLAB Simulink digital twin: full closed-loop PID model with configurable plant, actuator saturation, and disturbance injection blocks",
      "Flask API acts as a bridge — receives gain updates from the dashboard and forwards them to the running Simulink simulation via MATLAB Engine API for Python",
      "Real-time response curve visualization with sub-100ms round-trip latency from browser to Simulink and back",
      "Engineers can inject step inputs, ramp setpoints, and disturbance signals and observe the controller's corrective response live",
      "Simulation telemetry (error signal, control output, plant output) streamed continuously and plotted on the dashboard",
      "Responsive operator interface designed for engineering workstations and lab environments",
    ],
    architecture:
      "React SPA ↔ REST/WebSocket ↔ Flask API ↔ MATLAB Engine API ↔ Simulink Digital Twin",
    challenges:
      "The core challenge was bridging two very different execution models: the browser's asynchronous event loop and MATLAB Simulink's synchronous simulation time steps. Solved with a Python-side buffering layer that decouples the simulation clock from the HTTP response cycle, allowing Simulink to run at its own pace while the frontend receives smooth, interpolated data streams.",
    learned:
      "Gained deep practical understanding of closed-loop control theory (stability, transient response, steady-state error), the MATLAB Engine API for Python, and the architectural patterns needed to make scientific computing environments talk to modern web stacks in real time.",
    keyFeatures: [
      "Live PID gain tuning with immediate Simulink feedback",
      "Step response and ramp input simulation modes",
      "Disturbance injection and rejection testing",
      "Telemetry export: error signal, plant output, control effort as CSV",
      "Simulink model parameter inspection panel",
      "Mobile-responsive operator interface",
    ],
    cover: "pid.png",
    gallery: [
      {
        file: "pid.png",
        alt: "PID Control Dashboard: dark-themed UI showing temperature vs setpoint chart, error signal, control output, and PID tuner sliders (Kp, Ki, Kd)",
        caption: "Dashboard operator view: live temperature tracking, error/control output plots, and PID gain tuning panel",
        fit: "cover",
      },
    ],
  },
  {
    id: "iiot-predictive-maintenance",
    order: 5,
    title: "IIoT Predictive Maintenance Dashboard",
    description:
      "Industrial IoT & Machine Telemetry: Edge-to-cloud predictive maintenance platform monitoring multi-sensor industrial machinery telemetry, running ML anomaly detection models, and triggering automated threshold alerts to prevent downtime.",
    longDescription:
      "A comprehensive IIoT analytics platform built to reduce unplanned downtime. The system aggregates real-time sensor telemetry from industrial equipment, applies machine learning models to predict failure events, and presents actionable insights through an intuitive dashboard with configurable alert thresholds and trend visualizations.",
    category: "IIoT / Analytics",
    repo: "IIoT-predictive-maintenance-dashboard",
    githubUrl:
      "https://github.com/Bourmeche-Ahmed/IIoT-predictive-maintenance-dashboard",
    languages: [
      { name: "JavaScript", percentage: 59, color: "#F1E05A" },
      { name: "Python", percentage: 36, color: "#3572A5" },
      { name: "HTML", percentage: 3.2, color: "#E44D26" },
      { name: "CSS", percentage: 1.8, color: "#563D7C" },
    ],
    techBadges: ["JavaScript", "Python", "ML Models", "REST API", "Charts", "IIoT"],
    highlights: [
      "Real-time sensor telemetry ingestion and visualization",
      "Predictive failure scoring using trained ML models",
      "Configurable alert thresholds with multi-channel notifications",
      "Historical trend analysis with anomaly detection overlays",
      "Equipment health scoring dashboard with drill-down views",
    ],
    architecture: "JS Frontend ↔ Python REST API ↔ ML Inference Engine ↔ Sensor DB",
    challenges:
      "Handling high-frequency sensor data streams without overwhelming the frontend required smart aggregation and downsampling strategies on the backend.",
    learned:
      "Gained practical experience with time-series data handling, ML model integration in production APIs, and designing dashboards for non-technical operators.",
    keyFeatures: [
      "Multi-equipment health overview panel",
      "Anomaly timeline with cause attribution",
      "ML prediction confidence scores",
      "Configurable alert rules per equipment type",
    ],
    cover: "iiot1.png",
    gallery: [
      {
        file: "iiot1.png",
        alt: "IIoT dashboard showing Pump B status: temperature 88.48°C, vibration 0.327 mm/s, pressure 5.94 bar, health score 75/100 Healthy, and time-series charts with warning/critical thresholds",
        caption: "Pump B overview: multi-sensor telemetry (temperature, vibration, pressure), health gauge, and anomaly score timeline",
        fit: "cover",
      },
      {
        file: "iiot2.png",
        alt: "Anomaly detection and machinery telemetry alerts",
        caption: "Real-time machinery telemetry, anomaly detection timeline, and predictive failure analysis",
        fit: "contain",
      },
    ],
  },
  {
    id: "self-balancing-robot",
    order: 6,
    title: "Self-Balancing Robot – Time-Based Trajectory Planning",
    description:
      "Embedded Control Systems: Bare-metal STM32 two-wheeled inverted pendulum robot implementing a 100 Hz PID balance loop, MPU-6050 sensor fusion tilt estimation, and a 20 Hz state-machine planner for time-based trajectory execution.",
    longDescription:
      "A two-wheeled self-balancing robot built on bare-metal STM32 microcontroller firmware. The control architecture uses a cascaded scheme that decouples tilt stabilization from velocity regulation: an inner 100 Hz PID balance loop operates on real-time tilt angle estimation from MPU-6050 6-DOF IMU sensor fusion, while an outer loop regulates translational velocity. A 20 Hz embedded state-machine motion planner coordinates time-based trajectory profiles, generating smooth velocity setpoints for autonomous maneuvers. The control gains were tuned through iterative physical bench testing to achieve dynamic stability and disturbance rejection.",
    category: "Embedded Systems / Robotics",
    repo: "private-repo-pending-publication",
    techBadges: [
      "STM32",
      "Bare-metal C",
      "MPU-6050",
      "PID",
      "Sensor Fusion",
      "State Machine",
      "Real-time",
    ],
    metrics: [
      { label: "Balance loop", value: "100 Hz" },
      { label: "Planner", value: "20 Hz" },
    ],
    highlights: [
      "Bare-metal STM32 C firmware implementation with deterministic hardware timer execution",
      "Inner 100 Hz PID balance loop for real-time inverted pendulum stabilization",
      "MPU-6050 6-DOF IMU sensor fusion providing low-latency tilt angle estimation",
      "Cascaded control architecture cleanly separating tilt stabilization from velocity regulation",
      "20 Hz state-machine motion planner generating time-based velocity trajectories",
      "Tuned through iterative physical bench testing to damp oscillations and reject external disturbances",
    ],
    architecture:
      "MPU-6050 -> Sensor Fusion (tilt) -> 100 Hz Balance PID -> Velocity Regulation -> Motors; 20 Hz State-Machine Planner -> Velocity Setpoints",
    challenges:
      "Decoupling tilt stabilization from velocity regulation without inducing control chatter or phase lag. Resolving this required strict timing discipline across the 100 Hz balance and 20 Hz planner loops and iterative gain scheduling on the physical test bench.",
    learned:
      "Strengthened expertise in real-time embedded control systems: bare-metal STM32 programming, multi-rate control loops, IMU sensor fusion, cascaded PID tuning, and state-machine trajectory generation.",
    keyFeatures: [
      "100 Hz deterministic balance control loop",
      "MPU-6050 real-time tilt estimation via sensor fusion",
      "20 Hz state-machine motion planner for time-based trajectories",
      "Cascaded architecture separating tilt balance from velocity tracking",
      "Bare-metal STM32 peripheral and PWM driver architecture",
      "Iterative bench-tuned stability margins",
    ],
    cover: "robot.jpg",
    gallery: [
      {
        file: "robot.jpg",
        alt: "Self-balancing robot",
        caption: "Self-balancing robot",
        fit: "cover",
      },
      {
        file: "response-plot.png",
        alt: "Tilt and PID response",
        caption: "Tilt and PID response",
        fit: "contain",
      },
      {
        file: "control-architecture.png",
        alt: "Cascaded control architecture",
        caption: "Cascaded control architecture",
        fit: "contain",
      },
      {
        file: "cad-model.png",
        alt: "CAD model of self-balancing robot chassis",
        caption: "CAD model (Onshape)",
        fit: "contain",
      },
      {
        file: "printed-parts.jpg",
        alt: "3D-printed parts for self-balancing robot",
        caption: "3D-printed parts",
        fit: "cover",
      },
    ],
  },
  {
    id: "quarter-car-suspension-system",
    order: 7,
    title: "Quarter Car Suspension System",
    description:
      "Hardware-in-the-Loop Simulation: 2-DOF vehicle suspension benchmark coupling an ATmega328P real-time Euler numerical integrator (Proteus) with LabVIEW supervisory control, achieving 87% peak displacement attenuation via active PD control.",
    longDescription:
      "A hardware-in-the-loop benchmark that couples Proteus and LabVIEW through virtual serial COM ports for real-time suspension testing. Proteus simulates an ATmega328P running an Euler integrator (dt = 1e-4 s) that solves the 2-DOF quarter-car differential equations continuously. LabVIEW acts as the operator and control interface, reading live states and injecting control actions. Open-loop passive tests across varied sprung masses and excitation amplitudes confirmed non-linearity through superposition failure (33% error). An active PD controller (Kp = -2000 N/m, Kd = -800 N.s/m) reduced peak displacement by 87% and suppressed oscillations in approximately 40 seconds.",
    category: "Control Systems / Simulation",
    repo: "private-repo-pending-publication",
    githubUrl: "https://github.com/Bourmeche-Ahmed?tab=repositories",
    languages: [
      { name: "C", percentage: 55, color: "#555555" },
      { name: "LabVIEW", percentage: 35, color: "#F7B500" },
      { name: "Other", percentage: 10, color: "#6e7681" },
    ],
    techBadges: ["LabVIEW", "Proteus", "ATmega328P", "Embedded C", "PD Control", "HIL", "Serial COM", "Euler Integration"],
    highlights: [
      "2-DOF quarter-car model solved in real time on ATmega328P via Euler integration",
      "Virtual COM bridge between Proteus and LabVIEW for HIL-style experimentation",
      "Open-loop passive campaign across masses and excitation amplitudes",
      "Measured non-linearity: superposition principle violated with 33% error",
      "Active PD control (Kp=-2000, Kd=-800) achieved 87% peak displacement suppression",
      "Full oscillation damping reached in about 40 seconds",
    ],
    architecture:
      "LabVIEW Control/Monitor UI ↔ Virtual COM Serial Bridge ↔ Proteus Simulation ↔ ATmega328P C Firmware (Euler Solver)",
    challenges:
      "Synchronizing numerical integration timing and virtual serial exchange while keeping the control loop stable required strict timestep discipline, bounded packet formats, and careful gain tuning to prevent numeric drift and control chatter.",
    learned:
      "Built strong practical intuition in control implementation: translating continuous models into discrete embedded loops, validating non-linearity experimentally, and tuning PD gains in a hardware-in-the-loop workflow.",
    keyFeatures: [
      "Real-time 2-DOF suspension simulation",
      "Embedded Euler solver on ATmega328P",
      "LabVIEW live visualization and command injection",
      "Open-loop non-linearity validation",
      "Active PD suspension control",
      "HIL-ready serial communication pipeline",
    ],
    cover: "hil1.jpg",
    gallery: [
      {
        file: "hil1.jpg",
        alt: "HIL architecture diagram: LabVIEW supervision connected via FabulaTech virtual COM ports (COM3/COM4 params, COM1/COM2 outputs) to Proteus ATmega328P Euler integrator",
        caption: "HIL communication architecture: LabVIEW ↔ virtual serial COM bridge ↔ Proteus ATmega328P solver",
        fit: "contain",
      },
      {
        file: "hil2.jpg",
        alt: "LabVIEW waveform charts: passive suspension (left) showing persistent oscillation vs active PD control (right) converging to zero in ~40 s",
        caption: "Passive vs active PD control: persistent oscillation (left) vs convergence to zero in ≈ 40 s (right)",
        fit: "contain",
      },
      {
        file: "hil3.jpg",
        alt: "Comparison table: passive vs active PD — peak Zs reduced by ~87%, peak Żs by ~83%, oscillations eliminated, settling ≈ 40 s",
        caption: "Quantitative results: 87% peak displacement reduction, 83% velocity reduction, oscillations fully suppressed",
        fit: "contain",
      },
      {
        file: "proteus.png",
        alt: "Proteus simulation",
        caption: "Proteus simulation of ATmega328P Euler solver",
        fit: "contain",
      },
      {
        file: "labview.png",
        alt: "LabVIEW interface",
        caption: "LabVIEW real-time control interface",
        fit: "contain",
      },
      {
        file: "response.png",
        alt: "Displacement response",
        caption: "Active PD control response plot",
        fit: "contain",
      },
    ],
  },
  {
    id: "hand-gesture-controlled-maze-game",
    order: 8,
    title: "Hand Gesture-Controlled Maze Game",
    description:
      "Real-Time Embedded HCI & Computer Vision: Touchless human-machine interface pipeline extracting 21 MediaPipe hand landmarks in real time via OpenCV to classify geometric directional gestures for dynamic closed-loop control.",
    longDescription:
      "An accessibility-focused HCI prototype that removes keyboard and mouse interaction completely. OpenCV captures webcam frames, MediaPipe Hands extracts 21 landmarks per frame, and custom geometric classification logic maps landmarks and angles to directional commands (Up, Down, Left, Right). Commands drive maze navigation in a Tkinter-rendered interface, enabling fully touchless gameplay and validating a low-latency real-time gesture interaction loop.",
    category: "Computer Vision / HCI",
    repo: "private-repo-pending-publication",
    githubUrl: "https://github.com/Bourmeche-Ahmed?tab=repositories",
    languages: [
      { name: "Python", percentage: 90, color: "#3572A5" },
      { name: "Other", percentage: 10, color: "#6e7681" },
    ],
    techBadges: ["Python", "OpenCV", "MediaPipe", "Tkinter", "Computer Vision", "HCI", "Gesture Recognition"],
    highlights: [
      "No keyboard or mouse: gameplay is fully gesture-driven",
      "MediaPipe Hands tracking with 21 landmarks per frame",
      "Landmark-angle based command classification for directional control",
      "OpenCV pipeline for live frame acquisition and preprocessing",
      "Tkinter GUI for maze rendering and player state updates",
      "Accessibility-first interaction model with real-time response",
    ],
    architecture:
      "Webcam Stream (OpenCV) → Hand Landmarks (MediaPipe) → Gesture Classifier → Command Mapper → Tkinter Maze Engine",
    challenges:
      "The hardest part was maintaining robust gesture detection under real-world variability (lighting, hand orientation, camera angle). This was handled with landmark normalization and conservative classification thresholds to minimize false directional triggers.",
    learned:
      "Improved expertise in real-time computer vision pipelines, landmark-based gesture feature design, and HCI prototyping for accessible input alternatives.",
    keyFeatures: [
      "Live webcam-based gesture control",
      "Landmark-driven directional command mapping",
      "Low-latency frame-to-action pipeline",
      "Tkinter maze rendering and state updates",
      "Accessibility-centered control design",
      "Extensible gesture classification logic",
    ],
    cover: "demo.png",
    gallery: [
      {
        file: "demo.png",
        alt: "Maze game demo",
        caption: "Real-time hand gesture tracking driving Tkinter maze game",
        fit: "cover",
      },
    ],
  },
  {
    id: "line-follower-robot",
    order: 9,
    title: "Line-Follower Robot",
    description:
      "Autonomous Embedded Robotics: High-speed differential-drive mobile robot on Arduino UNO featuring an analog/digital IR reflectance sensor array and hand-tuned closed-loop PID steering across varied track geometries.",
    longDescription:
      "An autonomous mobile robot designed and constructed on Arduino UNO in January 2023 for high-speed line tracking. The robot senses track boundaries using an array of infrared (IR) sensors, feeding error signals into an embedded hand-tuned PID controller that modulates differential PWM motor speeds. The platform was validated across varied track geometries (sharp angles, curved turns) and speed profiles through iterative tuning.",
    category: "Embedded Systems / Robotics",
    repo: "private-repo-pending-publication",
    techBadges: ["Arduino UNO", "IR Sensors", "PID", "Embedded C++"],
    metrics: [
      { label: "Platform", value: "Arduino UNO" },
      { label: "Date", value: "Jan 2023" },
    ],
    highlights: [
      "Autonomous line-tracking mobile robot built on Arduino UNO (January 2023)",
      "Infrared (IR) sensor array for real-time track boundary detection",
      "Hand-tuned PID control algorithm modulating differential PWM motor outputs",
      "Validated across varied track geometries and speed profiles through iterative bench and track tuning",
    ],
    architecture:
      "IR Sensor Array -> Analog/Digital Sensing -> Hand-Tuned PID Controller (Arduino UNO) -> PWM Motor Driver",
    challenges:
      "Maintaining stable line tracking through sharp turns without overshoot or loss of track contact. Solved through iterative gain adjustments of proportional and derivative terms across diverse track geometries.",
    learned:
      "Practical experience with hand-tuning PID controllers for real-time differential drive systems, sensor array calibration, and embedded C++ on AVR microcontrollers.",
    keyFeatures: [
      "IR sensor array boundary tracking",
      "Hand-tuned PID closed-loop steering",
      "Differential PWM motor speed control",
      "Multi-geometry track testing and validation",
    ],
    cover: "robot.jpg",
    gallery: [
      {
        file: "robot.jpg",
        alt: "Line-follower robot",
        caption: "Line-follower robot",
        fit: "cover",
      },
      {
        file: "track-test.jpg",
        alt: "Track testing",
        caption: "Track geometry testing",
        fit: "cover",
      },
      {
        file: "cad-model.png",
        alt: "CAD model of line-follower chassis",
        caption: "CAD model (Onshape)",
        fit: "contain",
      },
      {
        file: "printed-parts.jpg",
        alt: "3D-printed parts for line-follower robot",
        caption: "3D-printed parts",
        fit: "cover",
      },
    ],
  },
  {
    id: "linkedin-optimizer",
    title: "LinkedIn Optimizer",
    description:
      "Side Project: A privacy-first Chrome extension exploring browser-native NLP and in-page DOM observation to provide real-time writing suggestions directly in LinkedIn.",
    longDescription:
      "LinkedIn Optimizer is a privacy-friendly Chrome extension that enhances your LinkedIn writing experience with an in-page AI assistant. It analyzes your text as you type and surfaces actionable suggestions for tone, clarity, and engagement — all processed locally or through a lightweight API, without storing your personal content.",
    category: "Browser Extension",
    repo: "linkedin-optimizer",
    githubUrl: "https://github.com/Bourmeche-Ahmed/linkedin-optimizer",
    languages: [
      { name: "JavaScript", percentage: 66.6, color: "#F1E05A" },
      { name: "CSS", percentage: 20.9, color: "#563D7C" },
      { name: "HTML", percentage: 12.5, color: "#E44D26" },
    ],
    techBadges: ["JavaScript", "Chrome Extension API", "CSS", "AI Writing", "NLP"],
    highlights: [
      "In-page writing assistant integrated directly into LinkedIn's editor",
      "Real-time tone analysis and clarity scoring",
      "Privacy-friendly architecture — content is not stored or transmitted",
      "Suggestion UI that adapts to LinkedIn's native design language",
      "Lightweight popup interface for quick settings and feedback",
    ],
    architecture: "Content Script → Background Service Worker → AI Suggestion Engine",
    challenges:
      "Injecting a UI layer into LinkedIn's dynamically rendered DOM without breaking their React component tree required careful DOM observation and shadow DOM isolation.",
    learned:
      "Mastered Chrome Extension Manifest V3 architecture, content script injection patterns, and building AI-assisted writing tools that feel native to third-party platforms.",
    keyFeatures: [
      "Real-time writing suggestions overlay",
      "Tone and clarity score indicators",
      "One-click suggestion acceptance",
      "Privacy-first local processing",
    ],
  },
  {
    id: "stepact-2026-marathon",
    title: "STEP'ACT 2026 Marathon",
    description:
      "Side Project: Full-stack registration and participant management web platform built for an annual trail marathon, featuring PostgreSQL queue management and a responsive registration flow.",
    longDescription:
      "STEP'ACT 2026 is a comprehensive event registration and management platform for a major annual trail running marathon. Built with a modern TypeScript stack, it provides seamless participant registration, detailed event information, and direct contact capabilities. The platform showcases both frontend elegance and backend reliability for handling high-volume event registrations.",
    category: "Web Apps",
    repo: "stepact-lionsclub",
    githubUrl: "https://stepact.lionsinsat.tn",
    languages: [
      { name: "TypeScript", percentage: 65, color: "#3178C6" },
      { name: "React", percentage: 25, color: "#61DAFB" },
      { name: "CSS", percentage: 7, color: "#563D7C" },
      { name: "Other", percentage: 3, color: "#6e7681" },
    ],
    techBadges: ["TypeScript", "React", "Vite", "PostgreSQL", "Express", "REST API"],
    highlights: [
      "Full-stack event registration platform with real-time validation",
      "Responsive design optimized for mobile registration flow",
      "Participant dashboard with registration confirmation and tracking",
      "Admin contact management and email notification system",
      "Multi-distance event categorization and tier management",
      "RESTful API with comprehensive error handling and rate limiting",
    ],
    architecture: "React SPA + Vite ↔ Express API ↔ PostgreSQL Database",
    challenges:
      "Handling concurrent registrations during peak event windows while maintaining data consistency required implementing robust queue management and transaction handling at the database layer.",
    learned:
      "Gained practical experience with event-driven architecture, real-time notification systems, and scalable REST API design for high-demand scenarios.",
    keyFeatures: [
      "Instant registration confirmation",
      "Email notifications for registrants",
      "Race category selection and tier management",
      "Contact form submissions with email routing",
      "Real-time participant count tracking",
      "Admin dashboard for registrations management",
    ],
  },
  {
    id: "testcybernexus3",
    title: "CyberNexus UI Lab",
    description:
      "Side Project / Lab: Experimental UI sandbox exploring state machine primitives, transition animations, and interaction mechanics outside embedded hardware.",
    longDescription:
      "CyberNexus UI Lab is a frontend engineering sandbox built to prototype and stress-test advanced UI concepts. With a 93% TypeScript codebase, it focuses on exploring interaction primitives, complex state management patterns, animated transitions, and accessibility edge cases — generating reusable insights and patterns for production projects.",
    category: "Experimental",
    repo: "testcybernexus3",
    githubUrl: "https://cybernexus.tn",
    languages: [
      { name: "TypeScript", percentage: 93, color: "#3178C6" },
      { name: "JavaScript", percentage: 4, color: "#F1E05A" },
      { name: "CSS", percentage: 2, color: "#563D7C" },
      { name: "Other", percentage: 1, color: "#6e7681" },
    ],
    techBadges: ["TypeScript", "Experimental", "UI Patterns", "Animation", "Prototyping"],
    highlights: [
      "Advanced animation and transition system prototypes",
      "Complex state machine implementations for UI flows",
      "Accessibility-first interaction pattern experiments",
      "Component stress-testing under edge case conditions",
      "Reusable pattern library extracted from experiments",
    ],
    architecture: "TypeScript Experiment Modules → Shared Pattern Library",
    challenges:
      "Balancing exploratory freedom with extractable, production-applicable patterns required disciplined documentation of each experiment's outcomes.",
    learned:
      "Developed a deeper intuition for interaction design trade-offs, TypeScript generics for UI components, and the boundaries of CSS animation performance.",
    keyFeatures: [
      "Modular experiment architecture",
      "Pattern documentation system",
      "Cross-browser compatibility testing",
      "Performance profiling utilities",
    ],
  },
  {
    id: "ytb-voice-gesture-control",
    title: "YTB Voice & Gesture Control",
    description:
      "Side Project / HCI Prototype: An experimental hands-free media interaction prototype combining browser-native speech recognition and computer vision APIs for touchless control.",
    longDescription:
      "YTB Voice & Gesture Control is an experimental prototype that reimagines how users interact with video content. Using browser-native speech recognition and computer vision APIs, it enables hands-free control of YouTube playback through natural voice commands and hand gestures — with a focus on accessibility and future interaction paradigms.",
    category: "Experimental",
    repo: "YTB-VOICE-GESTURE-CONTROL",
    githubUrl: "https://github.com/Bourmeche-Ahmed/YTB-VOICE-GESTURE-CONTROL",
    languages: [
      { name: "JavaScript", percentage: 70, color: "#F1E05A" },
      { name: "HTML", percentage: 20, color: "#E44D26" },
      { name: "CSS", percentage: 10, color: "#563D7C" },
    ],
    techBadges: ["JavaScript", "Web Speech API", "Computer Vision", "Browser APIs", "Accessibility"],
    highlights: [
      "Voice command recognition for play/pause/seek controls",
      "Hand gesture detection for volume and navigation",
      "Browser-native API integration (no external dependencies)",
      "Accessibility-focused interaction design",
      "Prototype validation of future HCI interaction paradigms",
    ],
    architecture: "Browser Speech API + CV Model → Command Interpreter → YouTube Player API",
    challenges:
      "Achieving reliable gesture recognition across varied lighting conditions and camera qualities required robust fallback strategies and confidence thresholding.",
    learned:
      "Explored the current capabilities and limitations of browser-native AI APIs, and gained experience designing multi-modal interaction systems.",
    keyFeatures: [
      "Voice playback control commands",
      "Gesture-based volume control",
      "Visual feedback overlay",
      "Configurable command vocabulary",
    ],
  },
  {
    id: "ieeeweb",
    title: "IEEE Student Branch Website",
    description:
      "Side Project: Responsive organizational portal built for an IEEE student branch featuring modular SCSS architecture and dynamic PHP content management.",
    longDescription:
      "A professional organizational website built for an IEEE student branch, delivering a polished public-facing presence with event listings, member showcases, and publication archives. The project features a maintainable SCSS component architecture, PHP-powered dynamic content, and responsive layouts optimized for all device sizes.",
    category: "Web Apps",
    repo: "ieeeweb",
    githubUrl: "https://nrtf.ieee.tn",
    languages: [
      { name: "HTML", percentage: 65, color: "#E44D26" },
      { name: "SCSS", percentage: 21.5, color: "#C6538C" },
      { name: "PHP", percentage: 7.7, color: "#777BB4" },
      { name: "CSS", percentage: 4.1, color: "#563D7C" },
      { name: "JS", percentage: 1.7, color: "#F1E05A" },
    ],
    techBadges: ["HTML", "SCSS", "PHP", "Responsive Design", "BEM Architecture"],
    highlights: [
      "Fully responsive layout optimized for mobile, tablet, and desktop",
      "Modular SCSS architecture using BEM methodology",
      "PHP backend for dynamic event and member content",
      "Accessible semantic HTML structure throughout",
      "Cross-browser compatible with progressive enhancement",
    ],
    architecture: "HTML/SCSS Frontend → PHP Backend → Content Management",
    challenges:
      "Maintaining design consistency across the full site while accommodating diverse content types (events, people, publications) required a flexible, component-based CSS architecture.",
    learned:
      "Strengthened SCSS component system design skills and gained practical experience building maintainable sites for real organizational stakeholders.",
    keyFeatures: [
      "Event calendar with PHP integration",
      "Member directory and profiles",
      "Publication archive section",
      "Animated navigation and page transitions",
    ],
  },
];

export const projects: Project[] = [...rawProjects].sort((a, b) => {
  if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
  if (a.order !== undefined) return -1;
  if (b.order !== undefined) return 1;
  return 0;
});

export const categories: ProjectCategory[] = [
  "Hardware / PCB Design",
  "Robotics / AI",
  "Embedded Systems / Robotics",
  "Control Systems / Simulation",
  "Real-time / Control",
  "IIoT / Analytics",
  "Web Apps",
  "Browser Extension",
  "Computer Vision / HCI",
  "Experimental",
];
