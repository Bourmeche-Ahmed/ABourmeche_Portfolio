# THE BUILD — 3D Architecture & Technical Specification

## 1. Executive Summary & Design Vision

**"THE BUILD"** transforms Ahmed Bourmeche's engineering portfolio into a continuous scroll-driven cyber-physical narrative. Rather than treating 3D as a superficial decorative widget or background particle effect, the 3D scene proceduralizes the exact subject of his embedded control engineering experience: an **autonomous two-wheeled self-balancing inverted-pendulum robot**.

As the visitor traverses the page:
1. **Hero**: The robot assembles mid-air from constituent subcomponents as a physical flight-in sequence.
2. **Projects**: The robot pivots, focuses, and pulses emissive telemetry indicators matching whichever project category or subsystem is in viewport or hovered (Firmware, Vision, Telemetry, Power).
3. **Skills**: The robot transitions into an exploded technical diagram where parts separate along orthogonal axes, revealing interactive telemetry pins mapped directly to Ahmed's engineering competencies.
4. **About**: The camera dollies to an orthogonal inspection view as an authentic physical ID card with verified credentials flips in the DOM.
5. **Timeline**: The robot maintains an operational hover while dynamic SVG trace lines draw the chronological career trajectory.
6. **Contact**: The robot lands firmly on simulated ground and engages a **real-time inverted pendulum PD balancing simulation**, responding with physics impulses to pointer nudges and nodding with a green confirmation blink upon message dispatch.

---

## 2. Progressive Enhancement Architecture (DOM as Truth)

The foundational principle of this architecture is **strict progressive enhancement**:

```
+-------------------------------------------------------------+
| DOM Layer (Semantic HTML, ARIA, SSR-friendly, Accessible)    |
| - Header / Navigation / Monogram                            |
| - Hero Typography & Real Technical Stat Counters            |
| - Projects Contact Sheet (Full metadata & modal dialogs)    |
| - Semantic Skills Registry & WCAG List                      |
| - Engineering Profile Card & Credentials Back-face          |
| - Experience Bus & Contact Form Transmission Pipeline        |
+-------------------------------------------------------------+
                              |
               Shared State Store (useSyncExternalStore)
               - Scroll progress (0 -> 1)
               - Active subsystem / hovered skill group
               - Device Quality Tier: full | lite | static
               - Theme & Color Preset Tokens
                              |
+-------------------------------------------------------------+
| WebGL Enhancement Layer (React Three Fiber + Drei)          |
| - Fixed viewport-pinned R3F Canvas (pointer-events-none)    |
| - Zero external .gltf, .obj, .hdr, or texture assets        |
| - Procedural Three.js Geometries (Boxes, Cylinders, Lines)  |
| - Dynamic PBR Materials with CSS variable color sync        |
| - 60 FPS Inverted-Pendulum ODE simulation loop              |
+-------------------------------------------------------------+
```

### Static Tier Guarantee
If WebGL is unavailable, GPU memory is constrained, `prefers-reduced-motion` is detected, or the user passes `?tier=static`:
- The R3F Canvas is **never mounted** and its chunk is **never downloaded**.
- A precision vector SVG blueprint illustration (`RobotPlaceholderSvg.tsx`) is rendered inline.
- All DOM animations snap to final states (`reducedMotion: true`).
- 100% of portfolio content, links, resume downloads, modal galleries, and contact submission pipelines function without impairment.

---

## 3. Procedural Robot Geometry & Performance Budget

To eliminate load-time latency, network request waterfalls, and memory overhead from large 3D model files, the entire robot is synthesized procedurally using native Three.js primitives:

| Component Subsystem | Three.js Primitives | Dimensions / Specs | Visual Details |
| :--- | :--- | :--- | :--- |
| **Lower Chassis Plate** | `boxGeometry` | 1.8 x 0.08 x 1.4 m | Matte off-white chamfered PBR body |
| **Drive Wheels (x2)** | `cylinderGeometry` (x2) | R = 0.55 m, W = 0.22 m | 16-lug radial tread geometry, dark rubber rim |
| **Wheel Hubs & Caps** | `cylinderGeometry` (x2) | R = 0.28 m, W = 0.24 m | High-contrast accent color metallic hubcaps |
| **Ground Sensor Bar** | `boxGeometry` + 4 cylinders | L = 1.4 m, 4 IR emitters | Underside line-tracking / cliff detection |
| **LiPo Battery Pack** | `boxGeometry` | 1.1 x 0.45 x 0.85 m | Heavy center-of-mass balancing ballast |
| **Main System PCB** | `boxGeometry` + wire traces | 1.5 x 0.04 x 1.2 m | 2-layer FR4 green/dark substrate with traces |
| **Copper Signal Traces** | `lineSegments` (40 segments) | Procedural orthogonal grid | Simulated differential pairs & bus lines |
| **MCU Module (ESP32/STM32)** | `boxGeometry` + 24 pins | 0.45 x 0.06 x 0.45 m | Central compute unit with silver pin legs |
| **Step-Down Buck Block** | `boxGeometry` + Toroid coil | 0.35 x 0.25 x 0.35 m | High-efficiency switching regulator |
| **IMU / Sensor Cube** | `boxGeometry` | 0.2 x 0.15 x 0.2 m | 6-axis MPU6050 with orientation vector indicator |
| **Sensor Tower** | `cylinderGeometry` + brackets | H = 0.7 m, D = 0.08 m | Structural mast elevating ToF LiDAR optics |
| **ToF Laser Rangefinder** | `cylinderGeometry` (horizontal)| R = 0.12 m, L = 0.2 m | Optical sensor aperture with emissive focal ring |
| **Telemetry Antenna** | `cylinderGeometry` (slanted) | H = 0.85 m, D = 0.02 m | 2.4 GHz wireless transceiving mast |
| **Back OLED Telemetry Screen**| `boxGeometry` + `planeGeometry`| 0.65 x 0.04 x 0.45 m | Telemetry status readout display |
| **Emissive Status LEDs (x6)** | `sphereGeometry` (x6) | R = 0.035 m | Power (green), Fault (red), Comm (pulsing) |

### GPU Budget Metrics
- **Total Triangle Count**: ~18,400 triangles (far below the 60,000 threshold).
- **Draw Calls**: ~34 draw calls per frame (budget: < 60).
- **Textures**: 0 KB external texture files (100% procedural materials).
- **HDRIs / Environment Maps**: 0 KB external files (procedural Drei `Lightformer` ambient rig).

---

## 4. Scroll Choreography Timeline

The 3D scene responds continuously to window scroll progress (`scrollProgress` $\in [0, 1]$), calculated with precision through the unified `useLenisScroll` hook:

| Scroll Domain | Section | Target Position [X, Y, Z] | Target Rotation [Rx, Ry, Rz] | Explosion Ratio | Mechanical Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0.00 – 0.15** | **Hero** | `[2.2, 0.0, 0.0]` | `[0.15, -0.45, 0.0]` | $1.0 \to 0.0$ | **Assembly Flight-in**: Wheels, battery, sensor mast, and PCB converge to chassis from detached coordinates. |
| **0.15 – 0.45** | **Projects** | `[2.0, -0.2, 0.5]` | `[0.2, 0.6, -0.1]` | $0.0 \to 0.05$ | **Inspection Orbit**: Camera focuses on subsystems. Hovering firmware highlights MCU; telemetry tilts to antenna. |
| **0.45 – 0.65** | **Skills** | `[0.0, 0.1, 0.2]` | `[0.25, 0.0, 0.0]` | $0.0 \to 1.0$ | **Exploded Blueprint**: Parts displace along orthogonal vectors (Z: +1.6m mast, Y: +1.2m PCB, X: $\pm 1.4$m wheels). |
| **0.65 – 0.80** | **About** | `[-1.8, 0.0, 0.0]` | `[0.1, 0.55, 0.0]` | $1.0 \to 0.0$ | **Re-convergence & Orthogonal Dolly**: Robot locks into rigid assembled state while framed card flips. |
| **0.80 – 0.90** | **Timeline** | `[2.1, -0.3, 0.0]` | `[0.15, -0.35, 0.0]` | $0.0$ | **Stationary Cruise**: Robot hovers alongside the chronological line-drawing experience trace. |
| **0.90 – 1.00** | **Contact** | `[0.0, -1.1, 1.2]` | `[0.0, 0.0, 0.0]` | $0.0$ | **Live PD Balancing Simulation**: Robot touches ground plane; inverted-pendulum ODE loop activates. |

---

## 5. Inverted-Pendulum PD Balancing Physics Engine

In Section 05 (Contact), the robot demonstrates real closed-loop control dynamics identical to Ahmed's self-balancing project:

### Differential Equations of Motion
The state vector is $\mathbf{x} = [\theta, \dot{\theta}, x, \dot{x}]^T$, where $\theta$ is the tilt angle from vertical and $x$ is horizontal position.

The control torque $\tau$ applied at the wheel hub is governed by a cascaded PD loop:

$$\tau = K_p \theta + K_d \dot{\theta} + K_{px} x + K_{dx} \dot{x}$$

where:
- $K_p = 48.0$: Proportional stiffness holding the mast upright.
- $K_d = 7.5$: Derivative damping preventing overshoot and high-frequency oscillation.
- $K_{px} = 3.2$: Position centering restoring the robot to center screen.
- $K_{dx} = 2.1$: Velocity damping.

### Interactive Dynamics
- **Pointer Push**: Clicking or dragging across the contact section injects a horizontal angular velocity impulse $\Delta \dot{\theta} \sim 2.5 \text{ rad/s}$. The simulation visibly leans, overshoots with exponential decay, and re-stabilizes within ~1.2 seconds.
- **Message Transmission Nod**: Upon successful submission of the contact form, `triggerRobotNod()` injects a calibrated dual-pitch nod ($\Delta \theta = +0.22 \text{ rad} \to -0.15 \text{ rad}$) while flashing the diagnostic LED cluster green.

---

## 6. Dynamic PBR Material System & Theme Presets

Materials are not static. `RobotMaterials.ts` subscribes to CSS variables via a requestAnimationFrame lerp loop:
- `--color-accent` is extracted every frame and smoothly lerped over ~400 ms into Three.js `Color` instances using `color.lerp(target, 0.1)`.
- When switching between **Vermilion**, **Electric Lime**, and **Ultraviolet**, or toggling between **Dark** and **Light** modes, the robot smoothly transitions its accent hubcaps, circuit lines, and LED emitters without hitching or recreating geometry.
- Emissive properties utilize realistic PBR roughness (0.28) and metalness (0.85) for crisp specular rim highlights.
