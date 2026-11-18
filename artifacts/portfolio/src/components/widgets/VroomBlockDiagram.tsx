import { useState } from "react";
import { Info, Cpu, Zap, Shield, Radio, Activity } from "lucide-react";

interface HardwareBlock {
  id: string;
  name: string;
  tag: string;
  voltage: string;
  category: "power" | "mcu" | "comms" | "display";
  specs: string;
  notes: string;
}

const BLOCKS: HardwareBlock[] = [
  {
    id: "input",
    name: "12 V Vehicle Input",
    tag: "POWER_IN",
    voltage: "12 V DC (Nominal)",
    category: "power",
    specs: "Automotive battery bus with cold-crank voltage dips",
    notes: "Main power feed directly from vehicle OBD-II connector with reverse-polarity protection.",
  },
  {
    id: "protection",
    name: "Fuse & SMCJ33A TVS",
    tag: "ISO 7637",
    voltage: "Clamps > 33 V",
    category: "power",
    specs: "2 A inline fuse + SMCJ33A unidirectional TVS diode",
    notes: "Absorbs automotive load-dump transients and suppresses ISO 7637 electrical spikes.",
  },
  {
    id: "buck",
    name: "TPS54360 Step-Down Buck",
    tag: "SWITCHER",
    voltage: "12 V -> 5 V",
    category: "power",
    specs: "60 V max input, 8.2 µH inductor, B560C Schottky catch diode",
    notes: "High-voltage synchronous buck converter stepping down noisy vehicle rails to clean 5 V.",
  },
  {
    id: "ldo",
    name: "AP2112K-3.3 LDO",
    tag: "REGULATOR",
    voltage: "5 V -> 3.3 V",
    category: "power",
    specs: "600 mA low-dropout regulator, ultra-low noise",
    notes: "Supplies stable 3.3 V logic power to ESP32-S3 and CAN transceiver peripherals.",
  },
  {
    id: "esp32",
    name: "ESP32-S3-WROOM-1",
    tag: "CORE_MCU",
    voltage: "3.3 V Logic",
    category: "mcu",
    specs: "Dual-core Xtensa 240 MHz, BLE 5.0, USB-C ESD protection",
    notes: "Host controller executing telemetry decoding, matrix multiplexing, and BLE app synchronization with dedicated antenna keep-out.",
  },
  {
    id: "can",
    name: "SN65HVD230 CAN Transceiver",
    tag: "BUS_IF",
    voltage: "3.3 V / ISO 11898",
    category: "comms",
    specs: "Würth common-mode choke + SM712 dual TVS diode",
    notes: "Interprets differential CAN signals (CANH/CANL) from vehicle bus with common-mode noise rejection.",
  },
  {
    id: "obd",
    name: "OBD-II Port Interface",
    tag: "DIAGNOSTIC",
    voltage: "J1962 Pinout",
    category: "comms",
    specs: "Pins 6 (CANH), 14 (CANL), 4/5 (GND), 16 (+12V Battery)",
    notes: "Standard physical link to vehicle engine control units (ECU) for live parameters.",
  },
  {
    id: "shifter",
    name: "74HCT244 Octal Buffers",
    tag: "LEVEL_SHIFT",
    voltage: "3.3 V -> 5 V",
    category: "display",
    specs: "Dual 74HCT244 buffers driving 16-pin HUB75 lines",
    notes: "Level-translates 3.3 V ESP32 GPIO signals (R1/G1/B1/R2/G2/B2, A-D, CLK, LAT, OE) to 5 V CMOS logic.",
  },
  {
    id: "matrix",
    name: "HUB75 RGB LED Matrix",
    tag: "DISPLAY",
    voltage: "5 V High Current",
    category: "display",
    specs: "Off-the-shelf RGB LED panel driven via DMA / PWM",
    notes: "Renders real-time automotive driving dynamics, speed, RPM, and diagnostics.",
  },
];

export function VroomBlockDiagram() {
  const [selectedId, setSelectedId] = useState<string>("esp32");
  const selectedBlock = BLOCKS.find((b) => b.id === selectedId) || BLOCKS[4];

  return (
    <div className="border border-rule bg-panel-raised rounded-[2px] p-4 sm:p-5 select-none space-y-4">
      {/* Header with verified indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-rule">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-signal" />
          <h4 className="font-heading font-bold text-sm sm:text-base text-ink">
            VROOM Hardware Signal & Power Topology
          </h4>
        </div>
        <span className="font-mono text-[10px] bg-panel-sunk px-2 py-0.5 rounded-[2px] border border-rule text-ink-soft">
          Illustrative model
        </span>
      </div>

      <p className="text-xs font-sans text-ink-soft">
        Select any functional block below to inspect its electrical ratings, protection stage, and routing role:
      </p>

      {/* Interactive Topology Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {BLOCKS.map((block) => {
          const isSelected = block.id === selectedId;
          const isPower = block.category === "power";
          const isComms = block.category === "comms";

          return (
            <button
              key={block.id}
              onClick={() => setSelectedId(block.id)}
              className={`p-2.5 text-left rounded-[2px] border transition-all ${
                isSelected
                  ? "bg-panel border-signal shadow-xs"
                  : "bg-panel-sunk border-rule hover:border-ink-soft hover:bg-panel"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className={isSelected ? "text-signal font-semibold" : "text-ink-soft"}>
                  {block.tag}
                </span>
                <span className="text-[9px] text-ink-soft/80">{block.voltage}</span>
              </div>
              <div className="font-heading font-bold text-xs sm:text-sm text-ink truncate">
                {block.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Inspector Details Panel */}
      <div className="p-3.5 bg-panel-sunk border border-rule rounded-[2px] space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-rule">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-[1px] bg-signal" />
            <span className="font-heading font-bold text-sm text-ink">
              {selectedBlock.name}
            </span>
          </div>
          <span className="font-mono text-xs text-signal font-semibold">
            {selectedBlock.voltage}
          </span>
        </div>

        <div className="text-xs font-mono text-ink-soft">
          <span className="text-ink font-semibold">SPEC: </span>
          {selectedBlock.specs}
        </div>

        <div className="text-xs font-sans text-ink leading-relaxed">
          <span className="font-semibold text-ink-soft">FUNCTION: </span>
          {selectedBlock.notes}
        </div>
      </div>
    </div>
  );
}

export default VroomBlockDiagram;
