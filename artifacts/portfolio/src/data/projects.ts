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
      "Real-time PID control system with React dashboard, Flask API, and MATLAB Simulink digital twin. Enables live tuning of control parameters with instant visual feedback.",
    longDescription:
      "A full-stack real-time PID control system that bridges web technologies with industrial control engineering. The React frontend delivers live signal visualization while the Flask backend interfaces with a MATLAB Simulink digital twin, enabling engineers to tune Kp, Ki, Kd parameters and observe system response in real time.",
    category: "Real-time / Control",
    repo: "pid-control-dashboard",
    githubUrl: "https://github.com/Bourmeche-Ahmed/pid-control-dashboard",
    languages: [
      { name: "Python", percentage: 57, color: "#3572A5" },
      { name: "JavaScript", percentage: 38.7, color: "#F1E05A" },
      { name: "CSS", percentage: 3.4, color: "#563D7C" },
      { name: "Other", percentage: 0.9, color: "#6e7681" },
    ],
    techBadges: ["React", "Flask", "MATLAB/Simulink", "WebSocket", "Python", "REST API"],
    highlights: [
      "Real-time signal visualization with sub-100ms update latency",
      "Interactive PID parameter tuning with live response curves",
      "MATLAB Simulink digital twin synchronization over REST",
      "Flask API serving control commands and telemetry data",
      "Responsive dashboard designed for industrial operator use",
    ],
    architecture:
      "React SPA ↔ WebSocket/REST ↔ Flask API ↔ MATLAB Simulink Digital Twin",
    challenges:
      "Synchronizing the web frontend update cycle with MATLAB simulation time steps required careful buffering and interpolation to maintain smooth visualizations.",
    learned:
      "Deepened understanding of control systems theory, real-time data streaming, and bridging web stacks with scientific computing environments.",
    keyFeatures: [
      "Live PID response chart with configurable time window",
      "Setpoint and disturbance injection controls",
      "Export simulation logs as CSV",
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
    id: "eltachkila-football-hub",
    title: "ElTachkila Football Hub",
    description:
      "A modern football data platform combining TypeScript frontend with a Python backend — delivering team stats, match data, and interactive visualizations in a clean, fan-first interface.",
    longDescription:
      "ElTachkila is a football intelligence platform built for fans and analysts. It integrates curated football data with a TypeScript-powered frontend and Python backend to deliver real-time match tracking, team statistics, player performance analytics, and community discussion features — all wrapped in a polished, sports-grade UI.",
    category: "Web Apps",
    repo: "eltachkila-football-hub",
    githubUrl: "https://github.com/Bourmeche-Ahmed/eltachkila-football-hub",
    languages: [
      { name: "TypeScript", percentage: 53.6, color: "#3178C6" },
      { name: "Python", percentage: 41.4, color: "#3572A5" },
      { name: "Shell", percentage: 3.7, color: "#89E051" },
      { name: "Other", percentage: 1.3, color: "#6e7681" },
    ],
    techBadges: ["TypeScript", "Python", "REST API", "Data Viz", "Football API"],
    highlights: [
      "Live match tracking with real-time score updates",
      "Team and player statistics with comparative analytics",
      "Interactive data visualizations for performance metrics",
      "Python backend handling data aggregation and caching",
      "Fan-optimized UX with mobile-first responsive layouts",
    ],
    architecture: "TypeScript SPA ↔ Python REST API ↔ Football Data Sources",
    challenges:
      "Modeling and normalizing football data from multiple sources while maintaining query performance required careful schema design and caching strategies.",
    learned:
      "Developed strong patterns for data-intensive applications, sports analytics UX design, and efficient client-server data synchronization.",
    keyFeatures: [
      "Live match scoreboard",
      "Season statistics tables with filters",
      "Head-to-head team comparison views",
      "Player performance heatmaps",
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
    id: "step-act-2026",
    title: "STEP-ACT 2026",
    description:
      "A premium static frontend engineering showcase — demonstrating advanced TypeScript UI patterns, component architecture, and polished production-ready build output.",
    longDescription:
      "STEP-ACT 2026 is a high-quality static frontend build that serves as a demonstration of premium UI engineering capabilities. Built entirely in TypeScript, it showcases component composition patterns, advanced animation techniques, and a production-optimized asset pipeline — reflecting the kind of frontend craftsmanship applicable to SaaS products and marketing sites.",
    category: "Web Apps",
    repo: "STEP-ACT_2026",
    githubUrl: "https://github.com/Bourmeche-Ahmed/STEP-ACT_2026",
    languages: [
      { name: "TypeScript", percentage: 92.9, color: "#3178C6" },
      { name: "HTML", percentage: 4, color: "#E44D26" },
      { name: "CSS", percentage: 2.1, color: "#563D7C" },
      { name: "Other", percentage: 1, color: "#6e7681" },
    ],
    techBadges: ["TypeScript", "Vite", "Static Build", "Component Architecture"],
    highlights: [
      "100% TypeScript codebase with strict type safety",
      "Advanced component composition and reusability patterns",
      "Production-optimized static build with Vite",
      "Performance-focused asset management and code splitting",
      "Deployable on any static hosting platform",
    ],
    architecture: "TypeScript Components → Vite Build Pipeline → Static Assets",
    challenges:
      "Achieving pixel-perfect design fidelity while maintaining zero runtime dependencies required creative use of CSS custom properties and Vite's asset handling.",
    learned:
      "Reinforced best practices in static-first frontend architecture, TypeScript strict mode patterns, and production build optimization.",
    keyFeatures: [
      "Zero-runtime-dependency component library",
      "Type-safe theming system",
      "Optimized production bundle",
      "Live demo deployment",
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
    githubUrl: "https://github.com/Bourmeche-Ahmed/testcybernexus3",
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
    githubUrl: "https://github.com/Bourmeche-Ahmed/ieeeweb",
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
