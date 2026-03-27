export type ProjectCategory =
  | "Real-time / Control"
  | "IIoT / Analytics"
  | "Web Apps"
  | "Browser Extension"
  | "Experimental";

export interface Language {
  name: string;
  percentage: number;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  repo: string;
  githubUrl: string;
  languages: Language[];
  techBadges: string[];
  highlights: string[];
  architecture: string;
  challenges: string;
  learned: string;
  keyFeatures: string[];
}

export const projects: Project[] = [
  {
    id: "pid-control-dashboard",
    title: "PID Control Dashboard",
    description:
      "Full-stack real-time PID control system — React dashboard connected to a Flask API and a MATLAB Simulink digital twin. Engineers tune Kp, Ki, Kd live and watch the simulated system response update instantly.",
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
  },
  {
    id: "iiot-predictive-maintenance",
    title: "IIoT Predictive Maintenance Dashboard",
    description:
      "Industrial IoT dashboard for predictive maintenance — monitoring sensor metrics, anomaly alerts, trend analysis, and ML model outputs across connected machinery.",
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
  },
  {
    id: "linkedin-optimizer",
    title: "LinkedIn Optimizer",
    description:
      "A Chrome extension providing an AI-powered writing coach directly within LinkedIn — offering real-time tone and clarity suggestions while you compose posts and messages.",
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
      "Event registration platform for STEP'ACT 2026 — a prestigious multi-distance trail running event held annually. Features participant registration, event information management, and contact submissions.",
    longDescription:
      "STEP'ACT 2026 is a comprehensive event registration and management platform for a major annual trail running marathon. Built with a modern TypeScript stack, it provides seamless participant registration, detailed event information, and direct contact capabilities. The platform showcases both frontend elegance and backend reliability for handling high-volume event registrations.",
    category: "Web Apps",
    repo: "stepact-lionsclub",
    githubUrl: "https://stepact.lions.tn",
    languages: [
      { name: "TypeScript", percentage: 65, color: "#3178C6" },
      { name: "React", percentage: 25, color: "#61DAFB" },
      { name: "CSS", percentage: 7, color: "#563D7C" },
      { name: "Other", percentage: 3, color: "#6e7681" },
    ],
    techBadges: ["TypeScript", "React", "Vite", "PostgreSQL", "Express", "REST API"],
    highlights: [
      "Full-stack event registration system with real-time validation",
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
      "An experimental TypeScript UI prototype exploring advanced interaction patterns, component compositions, and edge-case rendering challenges — a personal lab for pushing frontend boundaries.",
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
      "A prototype for controlling YouTube playback through voice commands and hand gesture recognition — exploring hands-free media interaction using browser-native APIs.",
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
      "A fully responsive website for an IEEE student branch — featuring a clean SCSS architecture, PHP backend integration, and structured content management for events and publications.",
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

export const categories: ProjectCategory[] = [
  "Real-time / Control",
  "IIoT / Analytics",
  "Web Apps",
  "Browser Extension",
  "Experimental",
];
