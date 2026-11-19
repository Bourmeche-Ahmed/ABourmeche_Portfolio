import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";

const TOPICS = [
  "imitation learning & policy distillation for robotics",
  "simulation-to-real transfer (NVIDIA Isaac Sim)",
  "Extended Kalman Filter (EKF) 9-DOF IMU fusion",
  "ISO 26262 automotive functional safety considerations",
  "FreeRTOS deterministic task scheduling & queues",
];

export function CurrentlyLearning() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const reducedMotion = useReducedMotion();

  const canAnimate =
    !reducedMotion && motionConfig.flags.micro.learningStatus;

  useEffect(() => {
    if (!canAnimate) {
      setDisplayText(TOPICS[0]);
      return;
    }

    const currentFull = TOPICS[topicIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentFull.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFull.slice(0, displayText.length + 1));
        }, 55);
      } else {
        // Pause at full word for 2.4s
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentFull.slice(0, displayText.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setTopicIdx((idx) => (idx + 1) % TOPICS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, topicIdx, canAnimate]);

  return (
    <div className="flex flex-wrap items-center gap-2 py-2.5 px-3 bg-panel-sunk border border-rule rounded-[2px] font-mono text-xs my-4 select-none">
      <div className="flex items-center gap-1.5 text-signal font-semibold shrink-0">
        <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
        <span className="text-[11px] uppercase tracking-wider">
          Currently Exploring:
        </span>
      </div>

      <div className="text-ink font-medium flex items-center min-w-[220px]">
        <span>{displayText}</span>
        {canAnimate && (
          <span className="w-1.5 h-3.5 bg-signal inline-block ml-1 animate-pulse" />
        )}
      </div>
    </div>
  );
}

export default CurrentlyLearning;
