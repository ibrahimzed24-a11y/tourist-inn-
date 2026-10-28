import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function ScrollRevealSection({
  children,
  className = '',
  id,
  delay = 0,
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.15, margin: '0px 0px -80px 0px' });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.985 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 36, scale: 0.985 }
      }
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // Fluid luxury deceleration
        delay,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
