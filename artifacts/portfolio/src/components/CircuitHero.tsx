import React from "react";

export function CircuitHero() {
  return (
    <>
      <style>{`
        @keyframes signalPulse {
          0% {
            stroke-dashoffset: 400;
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
        }

        @keyframes nodeGlow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 2px rgba(0, 200, 255, 0.4));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(0, 200, 255, 0.8));
          }
        }

        @keyframes chipPulse {
          0%, 100% {
            opacity: 0.7;
            filter: drop-shadow(0 0 4px rgba(0, 200, 255, 0.3));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 12px rgba(0, 200, 255, 0.6));
          }
        }

        @keyframes ambientGlow {
          0%, 100% {
            filter: drop-shadow(0 0 30px rgba(0, 200, 255, 0.06));
          }
          50% {
            filter: drop-shadow(0 0 50px rgba(0, 200, 255, 0.12));
          }
        }

        .circuit-hero-container {
          position: relative;
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
          display: none;
        }

        @media (min-width: 1024px) {
          .circuit-hero-container {
            display: block;
          }
        }

        .circuit-hero-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 0 40px rgba(0, 200, 255, 0.08));
          animation: ambientGlow 4s ease-in-out infinite;
        }

        .dot-grid {
          fill: none;
        }

        .dot-grid-pattern {
          fill: #0a2035;
        }

        .chip-group {
          animation: chipPulse 3s ease-in-out infinite;
        }

        .trace-inactive {
          stroke: #0e4d6e;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .trace-pulse {
          stroke: #00c8ff;
          stroke-width: 2.5;
          fill: none;
          stroke-dasharray: 16 999;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .trace-pulse:nth-of-type(1) {
          animation: signalPulse 2.5s linear infinite;
        }
        .trace-pulse:nth-of-type(2) {
          animation: signalPulse 2.5s linear infinite 0.5s;
        }
        .trace-pulse:nth-of-type(3) {
          animation: signalPulse 2.5s linear infinite 1s;
        }
        .trace-pulse:nth-of-type(4) {
          animation: signalPulse 2.5s linear infinite 1.5s;
        }
        .trace-pulse:nth-of-type(5) {
          animation: signalPulse 2.5s linear infinite 2s;
        }
        .trace-pulse:nth-of-type(6) {
          animation: signalPulse 2.5s linear infinite 2.5s;
        }

        .skill-node {
          animation: nodeGlow 2s ease-in-out infinite;
        }

        .skill-node:nth-child(1) {
          animation-delay: 0s;
        }
        .skill-node:nth-child(2) {
          animation-delay: 0.3s;
        }
        .skill-node:nth-child(3) {
          animation-delay: 0.6s;
        }
        .skill-node:nth-child(4) {
          animation-delay: 0.9s;
        }
        .skill-node:nth-child(5) {
          animation-delay: 1.2s;
        }
        .skill-node:nth-child(6) {
          animation-delay: 1.5s;
        }

        .via-pad {
          fill: #00c8ff;
          opacity: 0.7;
          animation: chipPulse 3s ease-in-out infinite;
        }

        .ic-pin {
          stroke: #00c8ff;
          stroke-width: 1.5;
          fill: none;
        }

        .chip-rect {
          fill: #0a1f35;
          stroke: #00c8ff;
          stroke-width: 1.5;
        }

        .pin-dot {
          fill: #00c8ff;
        }

        .chip-text-title {
          font-family: monospace;
          font-size: 18px;
          font-weight: bold;
          fill: #00c8ff;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        .chip-text-sub {
          font-family: monospace;
          font-size: 8px;
          fill: #0e7490;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        .node-rect {
          fill: #040d18;
          stroke: #00c8ff;
          stroke-width: 1;
        }

        .node-title {
          font-family: monospace;
          font-size: 9px;
          font-weight: bold;
          fill: #00c8ff;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        .node-subtitle {
          font-family: monospace;
          font-size: 7px;
          fill: #0e7490;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        .node-pad {
          fill: #00c8ff;
          opacity: 0.6;
        }
      `}</style>

      <div className="circuit-hero-container">
        <svg
          viewBox="0 0 400 400"
          className="circuit-hero-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dot Grid Background */}
          <defs>
            <pattern id="dotGrid" x="18" y="18" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="9" cy="9" r="0.8" className="dot-grid-pattern" />
            </pattern>
          </defs>

          <rect width="400" height="400" fill="#050a12" />
          <rect width="400" height="400" fill="url(#dotGrid)" />

          {/* PCB Traces - Inactive */}
          <path className="trace-inactive" d="M 170,160 L 170,70 L 100,70" />
          <path className="trace-inactive" d="M 215,160 L 215,70 L 300,70" />
          <path className="trace-inactive" d="M 125,200 L 80,200" />
          <path className="trace-inactive" d="M 275,200 L 320,200" />
          <path className="trace-inactive" d="M 170,240 L 170,330 L 100,330" />
          <path className="trace-inactive" d="M 215,240 L 215,330 L 300,330" />

          {/* PCB Traces - Animated Pulses */}
          <path className="trace-pulse" d="M 170,160 L 170,70 L 100,70" />
          <path className="trace-pulse" d="M 215,160 L 215,70 L 300,70" />
          <path className="trace-pulse" d="M 125,200 L 80,200" />
          <path className="trace-pulse" d="M 275,200 L 320,200" />
          <path className="trace-pulse" d="M 170,240 L 170,330 L 100,330" />
          <path className="trace-pulse" d="M 215,240 L 215,330 L 300,330" />

          {/* Via Pads */}
          <circle className="via-pad" cx="170" cy="70" r="3" />
          <circle className="via-pad" cx="215" cy="70" r="3" />
          <circle className="via-pad" cx="170" cy="330" r="3" />
          <circle className="via-pad" cx="215" cy="330" r="3" />

          {/* Central IC Chip */}
          <g className="chip-group">
            {/* Chip Rectangle */}
            <rect className="chip-rect" x="125" y="160" width="150" height="80" rx="4" />

            {/* Chip Text */}
            <text className="chip-text-title" x="200" y="185">
              AB
            </text>
            <text className="chip-text-sub" x="200" y="198">
              ENGINEER v2.0
            </text>
            <text className="chip-text-sub" x="200" y="210">
              IoT · PCB · MCU
            </text>

            {/* Pin Orientation Dot */}
            <circle className="pin-dot" cx="133" cy="168" r="3" />

            {/* Top IC Pin Legs */}
            <line className="ic-pin" x1="155" y1="160" x2="155" y2="150" />
            <line className="ic-pin" x1="170" y1="160" x2="170" y2="150" />
            <line className="ic-pin" x1="185" y1="160" x2="185" y2="150" />
            <line className="ic-pin" x1="215" y1="160" x2="215" y2="150" />
            <line className="ic-pin" x1="230" y1="160" x2="230" y2="150" />

            {/* Bottom IC Pin Legs */}
            <line className="ic-pin" x1="155" y1="240" x2="155" y2="250" />
            <line className="ic-pin" x1="170" y1="240" x2="170" y2="250" />
            <line className="ic-pin" x1="185" y1="240" x2="185" y2="250" />
            <line className="ic-pin" x1="215" y1="240" x2="215" y2="250" />
            <line className="ic-pin" x1="230" y1="240" x2="230" y2="250" />

            {/* Left IC Pin Legs */}
            <line className="ic-pin" x1="125" y1="183" x2="115" y2="183" />
            <line className="ic-pin" x1="125" y1="200" x2="115" y2="200" />
            <line className="ic-pin" x1="125" y1="217" x2="115" y2="217" />

            {/* Right IC Pin Legs */}
            <line className="ic-pin" x1="275" y1="183" x2="285" y2="183" />
            <line className="ic-pin" x1="275" y1="200" x2="285" y2="200" />
            <line className="ic-pin" x1="275" y1="217" x2="285" y2="217" />
          </g>

          {/* Skill Nodes */}
          <g>
            {/* Node A - STM32 / ESP32 */}
            <g className="skill-node" transform="translate(60, 70)">
              <rect className="node-rect" x="-40" y="-14" width="80" height="28" rx="2" />
              <circle className="node-pad" cx="-38" cy="-12" r="2" />
              <circle className="node-pad" cx="38" cy="-12" r="2" />
              <circle className="node-pad" cx="-38" cy="12" r="2" />
              <circle className="node-pad" cx="38" cy="12" r="2" />
              <text className="node-title" x="0" y="-4">
                STM32 / ESP32
              </text>
              <text className="node-subtitle" x="0" y="6">
                MCU CORE
              </text>
            </g>

            {/* Node B - INDUSTRIAL IoT */}
            <g className="skill-node" transform="translate(340, 70)">
              <rect className="node-rect" x="-40" y="-14" width="80" height="28" rx="2" />
              <circle className="node-pad" cx="-38" cy="-12" r="2" />
              <circle className="node-pad" cx="38" cy="-12" r="2" />
              <circle className="node-pad" cx="-38" cy="12" r="2" />
              <circle className="node-pad" cx="38" cy="12" r="2" />
              <text className="node-title" x="0" y="-4">
                INDUSTRIAL IoT
              </text>
              <text className="node-subtitle" x="0" y="6">
                MQTT · OTA
              </text>
            </g>

            {/* Node C - PCB DESIGN */}
            <g className="skill-node" transform="translate(40, 200)">
              <rect className="node-rect" x="-40" y="-14" width="80" height="28" rx="2" />
              <circle className="node-pad" cx="-38" cy="-12" r="2" />
              <circle className="node-pad" cx="38" cy="-12" r="2" />
              <circle className="node-pad" cx="-38" cy="12" r="2" />
              <circle className="node-pad" cx="38" cy="12" r="2" />
              <text className="node-title" x="0" y="-4">
                PCB DESIGN
              </text>
              <text className="node-subtitle" x="0" y="6">
                KiCad · EDA
              </text>
            </g>

            {/* Node D - EMBEDDED C/C++ */}
            <g className="skill-node" transform="translate(360, 200)">
              <rect className="node-rect" x="-40" y="-14" width="80" height="28" rx="2" />
              <circle className="node-pad" cx="-38" cy="-12" r="2" />
              <circle className="node-pad" cx="38" cy="-12" r="2" />
              <circle className="node-pad" cx="-38" cy="12" r="2" />
              <circle className="node-pad" cx="38" cy="12" r="2" />
              <text className="node-title" x="0" y="-4">
                EMBEDDED C/C++
              </text>
              <text className="node-subtitle" x="0" y="6">
                RTOS · HAL
              </text>
            </g>

            {/* Node E - AUTOMATION */}
            <g className="skill-node" transform="translate(60, 330)">
              <rect className="node-rect" x="-40" y="-14" width="80" height="28" rx="2" />
              <circle className="node-pad" cx="-38" cy="-12" r="2" />
              <circle className="node-pad" cx="38" cy="-12" r="2" />
              <circle className="node-pad" cx="-38" cy="12" r="2" />
              <circle className="node-pad" cx="38" cy="12" r="2" />
              <text className="node-title" x="0" y="-4">
                AUTOMATION
              </text>
              <text className="node-subtitle" x="0" y="6">
                PLC · SCADA
              </text>
            </g>

            {/* Node F - FULL-STACK */}
            <g className="skill-node" transform="translate(340, 330)">
              <rect className="node-rect" x="-40" y="-14" width="80" height="28" rx="2" />
              <circle className="node-pad" cx="-38" cy="-12" r="2" />
              <circle className="node-pad" cx="38" cy="-12" r="2" />
              <circle className="node-pad" cx="-38" cy="12" r="2" />
              <circle className="node-pad" cx="38" cy="12" r="2" />
              <text className="node-title" x="0" y="-4">
                FULL-STACK
              </text>
              <text className="node-subtitle" x="0" y="6">
                React · Node
              </text>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}

export default CircuitHero;
