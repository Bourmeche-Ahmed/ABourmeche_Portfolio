import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useAppState, SubsystemId, SkillGroupId, Tier } from "@/store";
import { createRobotColors, updateColorsFromCss } from "./RobotMaterials";

interface RobotProps {
  tier: Tier;
}

export function ProceduralRobot({ tier }: RobotProps) {
  const rootGroup = useRef<THREE.Group>(null);
  const headTower = useRef<THREE.Group>(null);
  const tofEye = useRef<THREE.Mesh>(null);
  const chassisGroup = useRef<THREE.Group>(null);
  const pcbGroup = useRef<THREE.Group>(null);
  const wheelsGroup = useRef<THREE.Group>(null);
  const antennaGroup = useRef<THREE.Group>(null);
  const batteryGroup = useRef<THREE.Group>(null);
  const screenGroup = useRef<THREE.Group>(null);

  // Materials & Colors
  const colors = useMemo(() => createRobotColors(), []);
  const bodyMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.1 }),
    []
  );
  const accentMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 0.4, emissiveIntensity: 0.2 }),
    []
  );
  const metalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.8 }),
    []
  );
  const pcbMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.15 }),
    []
  );
  const copperMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.25, metalness: 0.9 }),
    []
  );
  const ledGreenMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ roughness: 0.2, metalness: 0.1, emissiveIntensity: 1 }),
    []
  );

  // Inverted pendulum physics state for contact section & assembly
  const physics = useRef({
    theta: 0, // Inverted pendulum angle (radians)
    thetaDot: 0,
    x: 0, // Cart displacement
    xDot: 0,
    nodAngle: 0,
    nodSpeed: 0,
    assembly: 0, // 0 to 1
  });

  const scroll = useAppState((s) => s.scroll);
  const activeSubsystem = useAppState((s) => s.activeSubsystem);
  const hoveredSkillGroup = useAppState((s) => s.hoveredSkillGroup);
  const formSuccessCount = useAppState((s) => s.formSuccessCount);
  const balanceImpulse = useAppState((s) => s.robotBalanceImpulse);

  const prevSuccessCount = useRef(formSuccessCount);

  // On form submit, trigger nod and impulse
  useEffect(() => {
    if (formSuccessCount > prevSuccessCount.current) {
      physics.current.nodSpeed = 8;
      physics.current.thetaDot += 0.25;
      prevSuccessCount.current = formSuccessCount;
    }
  }, [formSuccessCount]);

  // Pointer tracking for look-at and push
  const pointerPos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handlePointer = (e: MouseEvent) => {
      pointerPos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handlePointer, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointer);
  }, []);

  useFrame((state, delta) => {
    if (!rootGroup.current) return;

    // 1. Update dynamic palette colors from CSS
    updateColorsFromCss(colors);
    bodyMaterial.color.copy(colors.body);
    accentMaterial.color.copy(colors.accent);
    metalMaterial.color.copy(colors.surface);
    pcbMaterial.color.copy(colors.pcb);
    copperMaterial.color.copy(colors.copper);
    ledGreenMaterial.color.set(formSuccessCount > 0 ? "#10B981" : "#FF5A2B");
    ledGreenMaterial.emissive.copy(ledGreenMaterial.color);

    // Subsystem highlighting pulse
    const hasHighlight = activeSubsystem !== null || hoveredSkillGroup !== null;
    accentMaterial.emissive.copy(colors.accent);
    accentMaterial.emissiveIntensity = hasHighlight
      ? 0.8 + Math.sin(state.clock.elapsedTime * 8) * 0.5
      : 0.15;

    // 2. Assembly transition (0 to 1 over first 2.4s)
    physics.current.assembly = Math.min(1, physics.current.assembly + delta * 0.8);
    const assemble = physics.current.assembly;

    // 3. Scroll-driven Stage Choreography
    const p = scroll; // 0 to 1
    const isMobile = window.innerWidth < 1024;

    // Target positions and rotations
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let explodeDistance = 0;

    if (p < 0.18) {
      // Stage 1: Hero (Center or Right, gentle idle float)
      targetX = isMobile ? 0 : 1.4;
      targetY = -0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      targetZ = isMobile ? -2 : 0;
      targetRotY = -0.3 + pointerPos.current.x * 0.15;
      targetRotX = pointerPos.current.y * 0.08;
    } else if (p < 0.45) {
      // Stage 2: Projects (Rotates to show focused subsystem)
      targetX = isMobile ? 0 : 2.0;
      targetY = -0.3;
      targetZ = isMobile ? -3 : -0.5;

      // Subsystem angle mapping
      if (activeSubsystem === "pcb" || activeSubsystem === "power") {
        targetRotY = 0.5;
        targetRotX = 0.3;
      } else if (activeSubsystem === "tower" || activeSubsystem === "ir") {
        targetRotY = 0.0;
        targetRotX = 0.0;
      } else if (activeSubsystem === "antenna" || activeSubsystem === "screen") {
        targetRotY = Math.PI - 0.2;
        targetRotX = 0.1;
      } else if (activeSubsystem === "wheels" || activeSubsystem === "chassis") {
        targetRotY = 1.2;
        targetRotX = 0.2;
      } else {
        targetRotY = 0.8 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
    } else if (p < 0.65) {
      // Stage 3: Skills (Explode View)
      targetX = isMobile ? 0 : 1.6;
      targetY = -0.1;
      targetZ = isMobile ? -2.5 : 0;
      targetRotY = state.clock.elapsedTime * 0.2;
      explodeDistance = 0.7; // Explode parts outward!
    } else if (p < 0.82) {
      // Stage 4: Experience (Calm Re-assembly)
      targetX = isMobile ? 0 : 1.8;
      targetY = -0.4;
      targetZ = -0.8;
      targetRotY = 0.4;
      explodeDistance = 0;
    } else {
      // Stage 5: Contact (Inverted Pendulum Balancing on line!)
      targetX = isMobile ? 0 : 1.2;
      targetY = -0.6;
      targetZ = 0.2;
      explodeDistance = 0;

      // Real Inverted Pendulum PD simulation ODE
      // theta_ddot = (g * sin(theta) - u) / L
      // u = Kp * theta + Kd * theta_dot (PD controller)
      const g = 9.81;
      const L = 0.8;
      const Kp = 32.0;
      const Kd = 6.5;

      // Pointer interactive push: when moving mouse near bottom, apply gentle impulse
      if (Math.abs(pointerPos.current.x) > 0.05 && p > 0.88) {
        physics.current.thetaDot += pointerPos.current.x * delta * 0.2;
      }

      const u = Kp * physics.current.theta + Kd * physics.current.thetaDot;
      const thetaDdot = (g * Math.sin(physics.current.theta) - u) / L;

      physics.current.thetaDot += thetaDdot * delta;
      physics.current.theta += physics.current.thetaDot * delta;
      // Clamp to prevent runaway
      physics.current.theta = Math.max(-0.4, Math.min(0.4, physics.current.theta));

      targetRotX = physics.current.theta;
      targetRotY = 0.1;
    }

    // 4. Smooth root transform lerp
    rootGroup.current.position.x += (targetX - rootGroup.current.position.x) * 0.08;
    rootGroup.current.position.y += (targetY - rootGroup.current.position.y) * 0.08;
    rootGroup.current.position.z += (targetZ - rootGroup.current.position.z) * 0.08;
    rootGroup.current.rotation.y += (targetRotY - rootGroup.current.rotation.y) * 0.08;
    rootGroup.current.rotation.x += (targetRotX - rootGroup.current.rotation.x) * 0.08;

    // 5. Part Explosion Lerps (Skills stage)
    const flyInOffset = (1 - assemble) * 3;

    if (chassisGroup.current) {
      chassisGroup.current.position.y = -0.15 - explodeDistance * 0.5 - flyInOffset * 0.8;
    }
    if (pcbGroup.current) {
      pcbGroup.current.position.y = 0.35 + explodeDistance * 0.4 + flyInOffset * 0.5;
    }
    if (headTower.current) {
      headTower.current.position.y = 0.85 + explodeDistance * 0.8 + flyInOffset;
      // Head look-at pointer
      headTower.current.rotation.y = pointerPos.current.x * 0.4;
      headTower.current.rotation.x = -pointerPos.current.y * 0.3;
    }
    if (antennaGroup.current) {
      antennaGroup.current.position.z = -0.4 - explodeDistance * 0.6;
      antennaGroup.current.position.y = 0.85 + explodeDistance * 0.4;
    }
    if (wheelsGroup.current) {
      wheelsGroup.current.position.y = -0.4;
      // Wheel rolling motion when balancing
      if (p > 0.82) {
        wheelsGroup.current.rotation.z = -physics.current.theta * 4;
      }
    }
    if (screenGroup.current) {
      screenGroup.current.position.z = -0.45 - explodeDistance * 0.4;
    }

    // 6. Nod animation on form success
    if (physics.current.nodSpeed > 0 && headTower.current) {
      physics.current.nodAngle = Math.sin(state.clock.elapsedTime * 12) * 0.3;
      headTower.current.rotation.x += physics.current.nodAngle;
      physics.current.nodSpeed -= delta * 3;
    }
  });

  return (
    <group ref={rootGroup} scale={1.2}>
      {/* ================= 1. LOWER CHASSIS & IR SENSOR ================= */}
      <group ref={chassisGroup}>
        {/* Main Base Plate */}
        <mesh material={bodyMaterial} position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.08, 1.0]} />
        </mesh>
        {/* Accent Edge Band */}
        <mesh material={accentMaterial} position={[0, -0.01, 0]}>
          <boxGeometry args={[1.54, 0.03, 1.04]} />
        </mesh>

        {/* Underside IR Sensor Bar */}
        <mesh material={metalMaterial} position={[0, -0.08, 0.35]}>
          <boxGeometry args={[0.9, 0.05, 0.12]} />
        </mesh>
        {/* IR Sensor Emitters (4 dots) */}
        {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
          <mesh key={i} material={accentMaterial} position={[x, -0.11, 0.35]}>
            <sphereGeometry args={[0.025, 8, 8]} />
          </mesh>
        ))}

        {/* Structural Standoffs (4 pillars) */}
        {[
          [-0.6, 0.25, 0.4],
          [0.6, 0.25, 0.4],
          [-0.6, 0.25, -0.4],
          [0.6, 0.25, -0.4],
        ].map(([x, y, z], i) => (
          <mesh key={i} material={metalMaterial} position={[x, y, z]}>
            <cylinderGeometry args={[0.03, 0.03, 0.45, 12]} />
          </mesh>
        ))}
      </group>

      {/* ================= 2. DRIVE WHEELS & AXLE ================= */}
      <group ref={wheelsGroup}>
        {/* Center Motor / Axle Housing */}
        <mesh material={metalMaterial} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 1.8, 16]} />
        </mesh>

        {/* Left Wheel with Rim & Tread */}
        <group position={[-0.95, 0, 0]}>
          <mesh material={metalMaterial} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.42, 0.42, 0.18, 24]} />
          </mesh>
          <mesh material={accentMaterial} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.19, 16]} />
          </mesh>
        </group>

        {/* Right Wheel with Rim & Tread */}
        <group position={[0.95, 0, 0]}>
          <mesh material={metalMaterial} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.42, 0.42, 0.18, 24]} />
          </mesh>
          <mesh material={accentMaterial} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.19, 16]} />
          </mesh>
        </group>
      </group>

      {/* ================= 3. BATTERY PACK ================= */}
      <group ref={batteryGroup} position={[0, 0.18, 0]}>
        <mesh material={metalMaterial}>
          <boxGeometry args={[1.0, 0.28, 0.65]} />
        </mesh>
        <mesh material={accentMaterial} position={[0, 0.05, 0]}>
          <boxGeometry args={[0.7, 0.1, 0.67]} />
        </mesh>
      </group>

      {/* ================= 4. MID PCB PLATE WITH CHIPS & IMU ================= */}
      <group ref={pcbGroup}>
        {/* PCB Board Layer */}
        <mesh material={pcbMaterial} position={[0, 0, 0]}>
          <boxGeometry args={[1.45, 0.05, 0.95]} />
        </mesh>

        {/* Copper Traces (Decorative thin bars) */}
        <mesh material={copperMaterial} position={[-0.2, 0.03, 0.1]}>
          <boxGeometry args={[0.7, 0.015, 0.03]} />
        </mesh>
        <mesh material={copperMaterial} position={[0.2, 0.03, -0.15]}>
          <boxGeometry args={[0.6, 0.015, 0.03]} />
        </mesh>

        {/* Main MCU Module (ESP32-S3 / STM32) */}
        <mesh material={metalMaterial} position={[-0.15, 0.06, -0.05]}>
          <boxGeometry args={[0.35, 0.06, 0.35]} />
        </mesh>

        {/* Power / Buck Converter Block (TPS54360) */}
        <mesh material={accentMaterial} position={[0.35, 0.06, 0.15]}>
          <boxGeometry args={[0.25, 0.07, 0.22]} />
        </mesh>
        {/* Inductor Coil */}
        <mesh material={metalMaterial} position={[0.35, 0.08, -0.1]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
        </mesh>

        {/* IMU 6-DOF Cube (MPU-6050) */}
        <mesh material={accentMaterial} position={[-0.45, 0.05, 0.2]}>
          <boxGeometry args={[0.12, 0.08, 0.12]} />
        </mesh>

        {/* Status Emissive LEDs */}
        <mesh material={ledGreenMaterial} position={[-0.6, 0.04, 0.4]}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
        <mesh material={accentMaterial} position={[-0.5, 0.04, 0.4]}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
      </group>

      {/* ================= 5. SENSOR TOWER & ToF EYE ================= */}
      <group ref={headTower}>
        {/* Tower Mast */}
        <mesh material={bodyMaterial} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 0.45, 16]} />
        </mesh>

        {/* Head Block */}
        <mesh material={bodyMaterial} position={[0, 0.28, 0]}>
          <boxGeometry args={[0.55, 0.28, 0.4]} />
        </mesh>

        {/* Front ToF Optical Eye (Lens + Emissive Ring) */}
        <group position={[0, 0.28, 0.21]}>
          <mesh material={metalMaterial} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.05, 20]} />
          </mesh>
          <mesh ref={tofEye} material={accentMaterial} position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
          </mesh>
        </group>
      </group>

      {/* ================= 6. TELEMETRY ANTENNA ================= */}
      <group ref={antennaGroup}>
        <mesh material={metalMaterial} position={[0.45, 0.35, -0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
        </mesh>
        <mesh material={accentMaterial} position={[0.45, 0.72, -0.3]}>
          <sphereGeometry args={[0.04, 8, 8]} />
        </mesh>
      </group>

      {/* ================= 7. BACK SCREEN PLATE ================= */}
      <group ref={screenGroup} position={[0, 0.5, -0.42]}>
        <mesh material={metalMaterial}>
          <boxGeometry args={[0.7, 0.28, 0.04]} />
        </mesh>
        <mesh material={accentMaterial} position={[0, 0, -0.02]}>
          <boxGeometry args={[0.62, 0.22, 0.02]} />
        </mesh>
      </group>
    </group>
  );
}

export default ProceduralRobot;
