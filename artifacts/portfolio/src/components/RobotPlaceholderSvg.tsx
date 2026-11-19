import React from "react";

export function RobotPlaceholderSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto select-none ${className}`}
      aria-label="Procedural Self-Balancing Robot Blueprint Illustration"
    >
      <defs>
        <pattern id="gridPattern" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="var(--hairline)" strokeWidth="0.5" strokeOpacity="0.4" />
        </pattern>
      </defs>

      {/* Background blueprint grid */}
      <rect x="20" y="20" width="360" height="440" fill="url(#gridPattern)" rx="4" />
      <rect x="20" y="20" width="360" height="440" stroke="var(--hairline)" strokeWidth="1" rx="4" />

      {/* Axis & dimension markers */}
      <line x1="200" y1="10" x2="200" y2="470" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="10" y1="240" x2="390" y2="240" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="3 3" />

      {/* Ground balance line */}
      <line x1="60" y1="410" x2="340" y2="410" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="200" cy="410" r="3" fill="var(--accent)" />
      <text x="200" y="428" textAnchor="middle" fill="var(--soft)" fontFamily="monospace" fontSize="8">
        BALANCE DATUM // 0.00°
      </text>

      {/* Left Wheel */}
      <rect x="80" y="320" width="36" height="80" rx="6" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="80" y1="340" x2="116" y2="340" stroke="var(--hairline)" strokeWidth="1" />
      <line x1="80" y1="360" x2="116" y2="360" stroke="var(--hairline)" strokeWidth="1" />
      <line x1="80" y1="380" x2="116" y2="380" stroke="var(--hairline)" strokeWidth="1" />
      <circle cx="98" cy="360" r="8" fill="var(--surface2)" stroke="var(--accent)" strokeWidth="1.5" />

      {/* Right Wheel */}
      <rect x="284" y="320" width="36" height="80" rx="6" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="284" y1="340" x2="320" y2="340" stroke="var(--hairline)" strokeWidth="1" />
      <line x1="284" y1="360" x2="320" y2="360" stroke="var(--hairline)" strokeWidth="1" />
      <line x1="284" y1="380" x2="320" y2="380" stroke="var(--hairline)" strokeWidth="1" />
      <circle cx="302" cy="360" r="8" fill="var(--surface2)" stroke="var(--accent)" strokeWidth="1.5" />

      {/* Axle connecting wheels */}
      <line x1="98" y1="360" x2="302" y2="360" stroke="var(--ink)" strokeWidth="3" />

      {/* Underside IR Sensor Bar */}
      <rect x="150" y="380" width="100" height="12" rx="2" fill="var(--surface2)" stroke="var(--hairline)" strokeWidth="1" />
      <circle cx="165" cy="386" r="2.5" fill="var(--accent)" />
      <circle cx="185" cy="386" r="2.5" fill="var(--accent)" />
      <circle cx="215" cy="386" r="2.5" fill="var(--accent)" />
      <circle cx="235" cy="386" r="2.5" fill="var(--accent)" />

      {/* Lower Chassis Base Plate */}
      <rect x="130" y="330" width="140" height="20" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      <text x="200" y="343" textAnchor="middle" fill="var(--soft)" fontFamily="monospace" fontSize="7">
        CHASSIS PLATE (ALU/FR4)
      </text>

      {/* Battery Pack */}
      <rect x="145" y="275" width="110" height="45" rx="3" fill="var(--surface2)" stroke="var(--hairline)" strokeWidth="1.5" />
      <rect x="150" y="280" width="100" height="35" rx="2" fill="var(--bg)" stroke="var(--hairline)" strokeWidth="1" strokeDasharray="2 2" />
      <text x="200" y="300" textAnchor="middle" fill="var(--ink)" fontFamily="monospace" fontSize="8" fontWeight="bold">
        7.4V LiPo PACK
      </text>

      {/* Structural Standoffs */}
      <line x1="140" y1="330" x2="140" y2="210" stroke="var(--ink)" strokeWidth="2" />
      <line x1="260" y1="330" x2="260" y2="210" stroke="var(--ink)" strokeWidth="2" />

      {/* Mid PCB Plate with Copper Traces */}
      <rect x="125" y="200" width="150" height="22" rx="2" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M 135 211 L 160 211 L 170 206 L 195 206" stroke="var(--accent)" strokeWidth="1" fill="none" />
      <path d="M 230 211 L 245 211 L 255 216 L 265 216" stroke="var(--accent)" strokeWidth="1" fill="none" />

      {/* Chips on PCB */}
      <rect x="175" y="194" width="22" height="12" rx="1" fill="var(--surface2)" stroke="var(--ink)" strokeWidth="1" />
      <text x="186" y="203" textAnchor="middle" fill="var(--ink)" fontFamily="monospace" fontSize="6">MCU</text>

      <rect x="205" y="196" width="14" height="10" rx="1" fill="var(--surface2)" stroke="var(--ink)" strokeWidth="1" />
      <text x="212" y="204" textAnchor="middle" fill="var(--ink)" fontFamily="monospace" fontSize="5">CAN</text>

      {/* IMU 6-DOF Cube */}
      <rect x="152" y="195" width="12" height="12" rx="1" fill="var(--accent)" opacity="0.9" />
      <text x="158" y="204" textAnchor="middle" fill="var(--accent-ink)" fontFamily="monospace" fontSize="6" fontWeight="bold">IMU</text>

      {/* Upper Standoffs */}
      <line x1="140" y1="200" x2="140" y2="130" stroke="var(--ink)" strokeWidth="2" />
      <line x1="260" y1="200" x2="260" y2="130" stroke="var(--ink)" strokeWidth="2" />

      {/* Upper Plate with Telemetry Display & LEDs */}
      <rect x="130" y="120" width="140" height="24" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Back OLED display */}
      <rect x="160" y="125" width="80" height="14" rx="1" fill="var(--bg)" stroke="var(--hairline)" strokeWidth="1" />
      <text x="200" y="135" textAnchor="middle" fill="var(--accent)" fontFamily="monospace" fontSize="7">
        SYS // 100Hz OK
      </text>
      {/* Status LEDs */}
      <circle cx="145" cy="132" r="2.5" fill="var(--accent)" />
      <circle cx="152" cy="132" r="2" fill="var(--soft)" />
      <circle cx="250" cy="132" r="2.5" fill="#10B981" />

      {/* Sensor Tower & ToF Optical Eye */}
      <rect x="186" y="70" width="28" height="50" rx="3" fill="var(--surface2)" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="200" cy="90" r="9" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="200" cy="90" r="4" fill="var(--accent)" />

      {/* Laser range beam cone (subtle) */}
      <path d="M 200 81 L 260 30 L 140 30 Z" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 2" />

      {/* Telemetry Antenna */}
      <line x1="240" y1="120" x2="240" y2="55" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="240" cy="53" r="3" fill="var(--accent)" />
      <path d="M 235 48 A 6 6 0 0 1 245 48" stroke="var(--accent)" strokeWidth="1" fill="none" />
      <path d="M 231 43 A 12 12 0 0 1 249 43" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" fill="none" />

      {/* Spec labels callout */}
      <g fontFamily="monospace" fontSize="8" fill="var(--soft)">
        <text x="40" y="60">PROCEDURAL ROBOT // REV 2.0</text>
        <text x="40" y="74">ODEs: INVERTED PENDULUM</text>
        <text x="40" y="88">LOOP: 100Hz BARE-METAL</text>
      </g>
    </svg>
  );
}

export default RobotPlaceholderSvg;
