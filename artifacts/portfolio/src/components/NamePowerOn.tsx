import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motionConfig } from "@/config/motion";

interface NamePowerOnProps {
  name?: string;
  className?: string;
}

export function NamePowerOn({
  name = "Ahmed Bourmeche",
  className = "",
}: NamePowerOnProps) {
  const reducedMotion = useReducedMotion();
  const canAnimate =
    !reducedMotion && motionConfig.flags.micro.namePowerOn;

  if (reducedMotion || !motionConfig.flags.micro.namePowerOn) {
    return <h1 className={className}>{name}</h1>;
  }

  const letters = Array.from(name);

  return (
    <h1 className={`select-none ${className}`}>
      {letters.map((char, i) => {
        if (char === " ") {
          return (
            <span key={i} className="inline-block w-3 sm:w-4">
              &nbsp;
            </span>
          );
        }

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: 0.15 + i * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -4,
              color: "var(--signal)",
              transition: { duration: 0.12, ease: "easeOut" },
            }}
            className="inline-block cursor-default transition-colors duration-150"
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        );
      })}
    </h1>
  );
}

export default NamePowerOn;
