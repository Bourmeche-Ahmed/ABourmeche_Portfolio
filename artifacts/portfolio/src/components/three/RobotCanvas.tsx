import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useAppState, store } from "@/store";
import { ProceduralRobot } from "./ProceduralRobot";

export function RobotCanvas() {
  const tier = useAppState((s) => s.tier);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering when tab is hidden or page is blurred
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  if (tier === "static" || !isVisible) {
    return null;
  }

  const dpr = tier === "full" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const enableShadows = tier === "full";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={dpr}
        shadows={enableShadows}
        frameloop={tier === "lite" ? "always" : "always"}
        gl={{
          antialias: tier === "full",
          powerPreference: "high-performance",
          alpha: true,
        }}
        onCreated={({ gl }) => {
          // Handle WebGL context loss gracefully
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("WebGL context lost. Falling back to static tier.");
            store.setState({ tier: "static" });
          });
        }}
      >
        {/* Balanced Lighting Rig */}
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.2}
          castShadow={enableShadows}
          shadow-mapSize={tier === "full" ? 1024 : 512}
        />
        <directionalLight position={[-4, 2, -3]} intensity={0.5} />
        {/* Subtle Rim Light */}
        <pointLight position={[0, 4, -4]} intensity={0.9} color="#CFE8FF" />

        {/* The Procedural Self-Balancing Robot */}
        <ProceduralRobot tier={tier} />
      </Canvas>
    </div>
  );
}

export default RobotCanvas;
