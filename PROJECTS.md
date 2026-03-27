# Ahmed BOURMECHE — Portfolio Projects

## 1. PID Control Dashboard

**Category:** Real-time / Control  
**Repository:** [GitHub](https://github.com/Bourmeche-Ahmed/pid-control-dashboard)  
**Languages:** Python (57%), JavaScript (38.7%), CSS (3.4%), Other (0.9%)  
**Tech Stack:** React, Flask, MATLAB, Simulink, Python, REST API, WebSocket, Control Systems

### Overview
A complete industrial control engineering platform that tightly couples a modern web stack with MATLAB Simulink simulation. The React dashboard lets engineers interactively tune PID gain parameters (Kp, Ki, Kd) and visualize the closed-loop system response in real time. A Flask REST API bridges the web layer to a MATLAB Simulink digital twin model running the actual control loop simulation — changes made in the browser propagate to Simulink, and simulation telemetry streams back to the dashboard within milliseconds.

### Architecture
React SPA ↔ REST/WebSocket ↔ Flask API ↔ MATLAB Engine API ↔ Simulink Digital Twin

### Key Highlights
- MATLAB Simulink digital twin: full closed-loop PID model with configurable plant, actuator saturation, and disturbance injection blocks
- Flask API acts as a bridge — receives gain updates from the dashboard and forwards them to the running Simulink simulation via MATLAB Engine API for Python
- Real-time response curve visualization with sub-100ms round-trip latency from browser to Simulink and back
- Engineers can inject step inputs, ramp setpoints, and disturbance signals and observe the controller's corrective response live
- Simulation telemetry (error signal, control output, plant output) streamed continuously and plotted on the dashboard
- Responsive operator interface designed for engineering workstations and lab environments

### Challenges
The core challenge was bridging two very different execution models: the browser's asynchronous event loop and MATLAB Simulink's synchronous simulation time steps. Solved with a Python-side buffering layer that decouples the simulation clock from the HTTP response cycle, allowing Simulink to run at its own pace while the frontend receives smooth, interpolated data streams.

### What I Learned
Gained deep practical understanding of closed-loop control theory (stability, transient response, steady-state error), the MATLAB Engine API for Python, and the architectural patterns needed to make scientific computing environments talk to modern web stacks in real time.

### Key Features
- Live PID gain tuning with immediate Simulink feedback
- Step response and ramp input simulation modes
- Disturbance injection and rejection testing
- Telemetry export: error signal, plant output, control effort as CSV
- Simulink model parameter inspection panel
- Mobile-responsive operator interface

---

## 2. IIoT Predictive Maintenance Dashboard

**Category:** IIoT / Analytics  
**Repository:** [GitHub](https://github.com/Bourmeche-Ahmed/IIoT-predictive-maintenance-dashboard)  
**Languages:** JavaScript (59%), Python (36%), HTML (3.2%), CSS (1.8%)  
**Tech Stack:** JavaScript, Python, ML Models, REST API, Charts, IIoT

### Overview
A comprehensive IIoT analytics platform built to reduce unplanned downtime. The system aggregates real-time sensor telemetry from industrial equipment, applies machine learning models to predict failure events, and presents actionable insights through an intuitive dashboard with configurable alert thresholds and trend visualizations.

### Architecture
JS Frontend ↔ Python REST API ↔ ML Inference Engine ↔ Sensor DB

### Key Highlights
- Real-time sensor telemetry ingestion and visualization
- Predictive failure scoring using trained ML models
- Configurable alert thresholds with multi-channel notifications
- Historical trend analysis with anomaly detection overlays
- Equipment health scoring dashboard with drill-down views

### Challenges
Handling high-frequency sensor data streams without overwhelming the frontend required smart aggregation and downsampling strategies on the backend.

### What I Learned
Gained practical experience with time-series data handling, ML model integration in production APIs, and designing dashboards for non-technical operators.

### Key Features
- Multi-equipment health overview panel
- Anomaly timeline with cause attribution
- ML prediction confidence scores
- Configurable alert rules per equipment type

---

## 3. LinkedIn Optimizer

**Category:** Browser Extension  
**Repository:** [GitHub](https://github.com/Bourmeche-Ahmed/linkedin-optimizer)  
**Languages:** JavaScript (66.6%), CSS (20.9%), HTML (12.5%)  
**Tech Stack:** JavaScript, Chrome Extension API, CSS, AI Writing, NLP

### Overview
LinkedIn Optimizer is a privacy-friendly Chrome extension that enhances your LinkedIn writing experience with an in-page AI assistant. It analyzes your text as you type and surfaces actionable suggestions for tone, clarity, and engagement — all processed locally or through a lightweight API, without storing your personal content.

### Architecture
Content Script → Background Service Worker → AI Suggestion Engine

### Key Highlights
- In-page writing assistant integrated directly into LinkedIn's editor
- Real-time tone analysis and clarity scoring
- Privacy-friendly architecture — content is not stored or transmitted
- Suggestion UI that adapts to LinkedIn's native design language
- Lightweight popup interface for quick settings and feedback

### Challenges
Injecting a UI layer into LinkedIn's dynamically rendered DOM without breaking their React component tree required careful DOM observation and shadow DOM isolation.

### What I Learned
Mastered Chrome Extension Manifest V3 architecture, content script injection patterns, and building AI-assisted writing tools that feel native to third-party platforms.

### Key Features
- Real-time writing suggestions overlay
- Tone and clarity score indicators
- One-click suggestion acceptance
- Privacy-first local processing

---

## 4. STEP'ACT 2026 Marathon

**Category:** Web Apps  
**Website:** [https://stepact.lions.tn](https://stepact.lions.tn)  
**Languages:** TypeScript (65%), React (25%), CSS (7%), Other (3%)  
**Tech Stack:** TypeScript, React, Vite, PostgreSQL, Express, REST API

### Overview
STEP'ACT 2026 is a comprehensive event registration and management platform for a major annual trail running marathon. Built with a modern TypeScript stack, it provides seamless participant registration, detailed event information, and direct contact capabilities. The platform showcases both frontend elegance and backend reliability for handling high-volume event registrations.

### Architecture
React SPA + Vite ↔ Express API ↔ PostgreSQL Database

### Key Highlights
- Full-stack event registration system with real-time validation
- Responsive design optimized for mobile registration flow
- Participant dashboard with registration confirmation and tracking
- Admin contact management and email notification system
- Multi-distance event categorization and tier management
- RESTful API with comprehensive error handling and rate limiting

### Challenges
Handling concurrent registrations during peak event windows while maintaining data consistency required implementing robust queue management and transaction handling at the database layer.

### What I Learned
Gained practical experience with event-driven architecture, real-time notification systems, and scalable REST API design for high-demand scenarios.

### Key Features
- Instant registration confirmation
- Email notifications for registrants
- Race category selection and tier management
- Contact form submissions with email routing
- Real-time participant count tracking
- Admin dashboard for registrations management

---

## 5. CyberNexus UI Lab

**Category:** Experimental  
**Website:** [https://cybernexus.tn](https://cybernexus.tn)  
**Languages:** TypeScript (93%), JavaScript (4%), CSS (2%), Other (1%)  
**Tech Stack:** TypeScript, Experimental, UI Patterns, Animation, Prototyping

### Overview
CyberNexus UI Lab is a frontend engineering sandbox built to prototype and stress-test advanced UI concepts. With a 93% TypeScript codebase, it focuses on exploring interaction primitives, complex state management patterns, animated transitions, and accessibility edge cases — generating reusable insights and patterns for production projects.

### Architecture
TypeScript Experiment Modules → Shared Pattern Library

### Key Highlights
- Advanced animation and transition system prototypes
- Complex state machine implementations for UI flows
- Accessibility-first interaction pattern experiments
- Component stress-testing under edge case conditions
- Reusable pattern library extracted from experiments

### Challenges
Balancing exploratory freedom with extractable, production-applicable patterns required disciplined documentation of each experiment's outcomes.

### What I Learned
Developed a deeper intuition for interaction design trade-offs, TypeScript generics for UI components, and the boundaries of CSS animation performance.

### Key Features
- Modular experiment architecture
- Pattern documentation system
- Cross-browser compatibility testing
- Performance profiling utilities

---

## 6. YTB Voice & Gesture Control

**Category:** Experimental  
**Repository:** [GitHub](https://github.com/Bourmeche-Ahmed/YTB-VOICE-GESTURE-CONTROL)  
**Languages:** JavaScript (70%), HTML (20%), CSS (10%)  
**Tech Stack:** JavaScript, Web Speech API, Computer Vision, Browser APIs, Accessibility

### Overview
YTB Voice & Gesture Control is an experimental prototype that reimagines how users interact with video content. Using browser-native speech recognition and computer vision APIs, it enables hands-free control of YouTube playback through natural voice commands and hand gestures — with a focus on accessibility and future interaction paradigms.

### Architecture
Browser Speech API + CV Model → Command Interpreter → YouTube Player API

### Key Highlights
- Voice command recognition for play/pause/seek controls
- Hand gesture detection for volume and navigation
- Browser-native API integration (no external dependencies)
- Accessibility-focused interaction design
- Prototype validation of future HCI interaction paradigms

### Challenges
Achieving reliable gesture recognition across varied lighting conditions and camera qualities required robust fallback strategies and confidence thresholding.

### What I Learned
Explored the current capabilities and limitations of browser-native AI APIs, and gained experience designing multi-modal interaction systems.

### Key Features
- Voice playback control commands
- Gesture-based volume control
- Visual feedback overlay
- Configurable command vocabulary

---

## 7. IEEE Student Branch Website

**Category:** Web Apps  
**Website:** [https://nrtf.ieee.tn](https://nrtf.ieee.tn)  
**Languages:** HTML (65%), SCSS (21.5%), PHP (7.7%), CSS (4.1%), JS (1.7%)  
**Tech Stack:** HTML, SCSS, PHP, Responsive Design, BEM Architecture

### Overview
A professional organizational website built for an IEEE student branch, delivering a polished public-facing presence with event listings, member showcases, and publication archives. The project features a maintainable SCSS component architecture, PHP-powered dynamic content, and responsive layouts optimized for all device sizes.

### Architecture
HTML/SCSS Frontend → PHP Backend → Content Management

### Key Highlights
- Fully responsive layout optimized for mobile, tablet, and desktop
- Modular SCSS architecture using BEM methodology
- PHP backend for dynamic event and member content
- Accessible semantic HTML structure throughout
- Cross-browser compatible with progressive enhancement

### Challenges
Maintaining design consistency across the full site while accommodating diverse content types (events, people, publications) required a flexible, component-based CSS architecture.

### What I Learned
Strengthened SCSS component system design skills and gained practical experience building maintainable sites for real organizational stakeholders.

### Key Features
- Event calendar with PHP integration
- Member directory and profiles
- Publication archive section
- Animated navigation and page transitions

---

## Project Categories Summary

| Category | Projects |
|----------|----------|
| **Real-time / Control** | PID Control Dashboard |
| **IIoT / Analytics** | IIoT Predictive Maintenance Dashboard |
| **Web Apps** | STEP'ACT 2026 Marathon, IEEE Student Branch Website |
| **Browser Extension** | LinkedIn Optimizer |
| **Experimental** | CyberNexus UI Lab, YTB Voice & Gesture Control |

## Technical Skills Summary

### Frontend
- React, TypeScript, JavaScript, CSS, SCSS, HTML
- Framer Motion, Vite, Animation Systems
- Chrome Extension Development (Manifest V3)
- Responsive Web Design, BEM Architecture

### Backend
- Python, Flask, Express.js, PHP
- REST API Design, WebSocket Communication
- PostgreSQL, Real-time Data Streaming
- MATLAB Engine API Integration

### Technologies
- MATLAB Simulink, Machine Learning
- Web Speech API, Computer Vision
- Control Systems Engineering
- IIoT & Sensor Integration

### Concepts
- Real-time Systems, Control Theory (PID)
- Predictive Maintenance, ML Integration
- Accessibility & UX Design
- Event-driven Architecture
- Scalable API Design
