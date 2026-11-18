# Project Assets Specification

This directory holds project image assets loaded by the portfolio. Simply drop your image files into the corresponding project folder using the exact filenames listed below.

## Image Handling Rules
- **Cover Slot Aspect Ratio**: 16:10 (`aspect-[16/10]`). Recommended cover resolution: **1920×1200** (or 1280×800) in JPG, PNG, or WebP.
- **Schematics, Plots, Diagrams (`fit: "contain"`)**: Always use lossless PNG (recommended: 1920×1080 or 1600×1000) so lines, component labels, and numbers are crisp.
- **Photos & 3D Renders (`fit: "cover"`)**: Use high-resolution JPG or WebP (recommended: 1920×1200).
- **Missing Images Behavior**:
  - In **DEV mode**, any missing image renders a neutral blueprint-style placeholder showing the expected path (e.g. `public/projects/vroom/pcb.jpg`).
  - In **PRODUCTION**, missing gallery items are hidden entirely, while missing cover slots show a clean blueprint placeholder with category icon and crosshairs without breaking the layout.

---

## Image Inventory

| Project ID | File Name | Full Path | Recommended Size / Format | Fit | What It Should Show |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `vroom` | `vroom1.png` (or `.jpg`) | `public/projects/vroom/vroom1.png` | 1920×1200 PNG / JPG / WebP | `cover` (Cover) | KiCad 2-layer PCB layout: automotive power stage, CAN interface, ESP32-S3, and HUB75 driver |
| `vroom` | `vroom2.png` (or `.jpg`) | `public/projects/vroom/vroom2.png` | 1920×1080 PNG (lossless) | `contain` | Schematic: protected 12 V input (SMCJ33A TVS), 60 V-capable TPS54360 buck (5 V), and 3.3 V LDO |
| `vroom` | `vroom3.png` (or `.jpg`) | `public/projects/vroom/vroom3.png` | 1920×1080 PNG (lossless) | `contain` | Schematic: CAN transceiver, common-mode choke, TVS, ESP32-S3, and USB-C ESD protection |
| `vroom` | `vroom4.png` (or `.jpg`) | `public/projects/vroom/vroom4.png` | 1920×1080 PNG (lossless) | `contain` | Schematic: dual 74HCT244 level shifters driving 16-pin HUB75 RGB LED matrix and IMU |
| `rl-navigation` | `rl1.png` | `public/projects/rl-navigation/rl1.png` | 1920×1200 PNG / WebP | `cover` (Cover) | Pioneer 3-AT mobile robot navigating cluttered obstacle course in Webots simulation |
| `rl-navigation` | `rl2.png` | `public/projects/rl-navigation/rl2.png` | 1600×1000 PNG | `contain` | PPO reinforcement learning training performance curve and evaluation |
| `farzit` | `farzit.jpg` (or `.png`) | `public/projects/farzit/farzit.jpg` | 1920×1200 JPG / PNG / WebP | `cover` (Cover) | FARZIT autonomous obstacle-avoidance robot: STM32, single ToF sensor, SolidWorks chassis, and custom KiCad PCB |
| `farzit` | `chassis-render.png` (optional) | `public/projects/farzit/chassis-render.png` | 1920×1080 PNG | `contain` | SolidWorks mechanical chassis 3D CAD render |
| `farzit` | `printed-parts.jpg` (optional) | `public/projects/farzit/printed-parts.jpg` | 1920×1200 JPG | `cover` | 3D-printed structural brackets, motor mounts, and sensor housings |
| `pid-control-dashboard` | `pid.png` | `public/projects/pid-control-dashboard/pid.png` | 1920×1200 PNG / WebP | `cover` (Cover) | React PID Control Dashboard interface displaying real-time step response curves and tuning dials |
| `iiot-predictive-maintenance` | `iiot1.png` | `public/projects/iiot-predictive-maintenance/iiot1.png` | 1920×1200 PNG / WebP | `cover` (Cover) | Industrial IoT predictive maintenance dashboard with sensor telemetry and machine health scores |
| `iiot-predictive-maintenance` | `iiot2.png` | `public/projects/iiot-predictive-maintenance/iiot2.png` | 1920×1080 PNG | `contain` | Machine health timeline with anomaly detection overlays and alert threshold indicators |
| `self-balancing-robot` | `robot.jpg` | `public/projects/self-balancing-robot/robot.jpg` | 1920×1200 JPG / WebP | `cover` (Cover) | Photograph of the STM32 two-wheeled self-balancing robot prototype on test bench |
| `self-balancing-robot` | `response-plot.png` | `public/projects/self-balancing-robot/response-plot.png` | 1600×1000 PNG | `contain` | Real-time tilt angle estimation and 100 Hz PID balance response curve during recovery |
| `self-balancing-robot` | `control-architecture.png` | `public/projects/self-balancing-robot/control-architecture.png` | 1600×1000 PNG | `contain` | Cascaded control architecture diagram separating tilt stabilization from 20 Hz velocity regulation |
| `self-balancing-robot` | `cad-model.png` (optional) | `public/projects/self-balancing-robot/cad-model.png` | 1920×1080 PNG | `contain` | CAD model (Onshape) of chassis and balancing structure |
| `self-balancing-robot` | `printed-parts.jpg` (optional) | `public/projects/self-balancing-robot/printed-parts.jpg` | 1920×1200 JPG | `cover` | 3D-printed parts and mechanical brackets |
| `quarter-car-suspension-system` | `proteus.png` | `public/projects/quarter-car-suspension-system/proteus.png` | 1920×1080 PNG | `contain` (Cover) | Proteus circuit simulation of ATmega328P running real-time Euler numerical integrator |
| `quarter-car-suspension-system` | `labview.png` | `public/projects/quarter-car-suspension-system/labview.png` | 1920×1080 PNG | `contain` | LabVIEW operator interface showing real-time displacement curves and virtual COM serial controls |
| `quarter-car-suspension-system` | `response.png` | `public/projects/quarter-car-suspension-system/response.png` | 1600×1000 PNG | `contain` | Suspension displacement comparison plot showing 87% peak displacement attenuation with active PD control |
| `hand-gesture-controlled-maze-game` | `demo.png` | `public/projects/hand-gesture-controlled-maze-game/demo.png` | 1920×1200 PNG / GIF | `cover` (Cover) | Live webcam feed with MediaPipe 21 hand landmarks controlling Tkinter maze game navigation |
| `line-follower-robot` | `robot.jpg` | `public/projects/line-follower-robot/robot.jpg` | 1920×1200 JPG / WebP | `cover` (Cover) | Autonomous Arduino UNO line-following robot with front IR sensor array |
| `line-follower-robot` | `track-test.jpg` | `public/projects/line-follower-robot/track-test.jpg` | 1920×1080 JPG / WebP | `cover` | Robot negotiating sharp track angles and curved speed profiles during test trials |
| `line-follower-robot` | `cad-model.png` (optional) | `public/projects/line-follower-robot/cad-model.png` | 1920×1080 PNG | `contain` | CAD model (Onshape) of line-follower chassis |
| `line-follower-robot` | `printed-parts.jpg` (optional) | `public/projects/line-follower-robot/printed-parts.jpg` | 1920×1200 JPG | `cover` | 3D-printed parts and sensor array brackets |
| `linkedin-optimizer` | `cover.png` | `public/projects/linkedin-optimizer/cover.png` | 1920×1200 PNG / WebP | `cover` (Cover) | In-page writing assistant overlay and tone scoring badge inside LinkedIn post editor |
| `stepact-2026-marathon` | `cover.png` | `public/projects/stepact-2026-marathon/cover.png` | 1920×1200 PNG / WebP | `cover` (Cover) | Full-stack registration portal interface with multi-tier marathon selection |
| `testcybernexus3` | `cover.png` | `public/projects/testcybernexus3/cover.png` | 1920×1200 PNG / WebP | `cover` (Cover) | CyberNexus UI Lab interface showing state machine animations and interaction primitives |
| `ytb-voice-gesture-control` | `cover.png` | `public/projects/ytb-voice-gesture-control/cover.png` | 1920×1200 PNG / WebP | `cover` (Cover) | Hands-free YouTube media control overlay showing active voice command and gesture recognition feedback |
| `ieeeweb` | `cover.png` | `public/projects/ieeeweb/cover.png` | 1920×1200 PNG / WebP | `cover` (Cover) | IEEE Student Branch website landing page with event calendar and responsive layout |
