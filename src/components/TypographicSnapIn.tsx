import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface TypographicSnapInProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delayMultiplier?: number; // seconds per character
  initialDelay?: number; // seconds before sequence starts
  triggerKey?: any; // Replay sequence on demand
  once?: boolean; // Trigger only once or every time it enters viewport
}

export default function TypographicSnapIn({
  text,
  as: Component = 'h1',
  className = '',
  delayMultiplier = 0.02,
  initialDelay = 0.05,
  triggerKey,
  once = false, // Set to false so re-entering viewport re-triggers smooth scroll reveal
}: TypographicSnapInProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  
  // Framer Motion Scroll Reveal hook with margin threshold
  const isInView = useInView(containerRef, {
    once,
    amount: 0.25,
    margin: '0px 0px -60px 0px',
  });

  // Respect system reduced-motion preference
  const shouldReduceMotion = useReducedMotion();

  // Break text into words to prevent unnatural mid-word breaks across responsive lines
  const words = text.split(' ');
  let charCounter = 0;

  // Reduced motion: render clean, immediate typography without translation
  if (shouldReduceMotion) {
    return (
      <Component
        ref={containerRef as any}
        className={`inline-block select-none tracking-tight ${className}`}
        aria-label={text}
      >
        {text}
      </Component>
    );
  }

  return (
    <Component
      ref={containerRef as any}
      key={triggerKey}
      className={`inline-block select-none leading-tight tracking-tight ${className}`}
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        const characters = Array.from(word);

        return (
          <span
            key={`word-${wordIndex}`}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: wordIndex < words.length - 1 ? '0.28em' : 0 }}
          >
            {characters.map((char, charIndex) => {
              const globalIndex = charCounter++;
              const delay = initialDelay + globalIndex * delayMultiplier;

              return (
                <span
                  key={`char-${wordIndex}-${charIndex}`}
                  className="inline-block overflow-hidden align-top"
                  style={{
                    paddingTop: '0.06em',
                    paddingBottom: '0.06em',
                  }}
                  aria-hidden="true"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: '115%', opacity: 0 }}
                    animate={
                      isInView
                        ? { y: '0%', opacity: 1 }
                        : { y: '115%', opacity: 0 }
                    }
                    transition={{
                      y: {
                        duration: 0.65,
                        ease: [0.34, 1.56, 0.64, 1], // Snappy Spring Easing
                        delay,
                      },
                      opacity: {
                        duration: 0.25,
                        ease: 'linear',
                        delay,
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </Component>
  );
}
