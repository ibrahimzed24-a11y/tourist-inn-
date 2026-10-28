import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Fluid luxury spring acceleration matching our high-end aesthetic
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.2,
    restDelta: 0.0008,
  });

  if (shouldReduceMotion) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full bg-gradient-to-r from-[#0891b2] via-[#14b8a6] to-[#ff5a36] origin-left shadow-[0_0_10px_rgba(20,184,166,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
}
