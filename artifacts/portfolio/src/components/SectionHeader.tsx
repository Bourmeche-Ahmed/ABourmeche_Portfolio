import { motion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={`mb-8 border-b border-rule pb-3 ${className}`}>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-ink">
          {title}
        </h2>
        {subtitle && (
          <p className="text-ink-soft text-sm sm:text-base max-w-3xl mt-1.5 leading-relaxed font-sans">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={`mb-8 pb-3 relative overflow-hidden ${className}`}>
      {/* Hairline drawing in from left */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-rule origin-left"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Staggered Title */}
      <motion.h2
        className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-ink"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

      {/* Staggered Subtitle */}
      {subtitle && (
        <motion.p
          className="text-ink-soft text-sm sm:text-base max-w-3xl mt-1.5 leading-relaxed font-sans"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
