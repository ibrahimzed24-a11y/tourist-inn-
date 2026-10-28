import { useRef, useEffect } from 'react';

interface UseCardTiltOptions {
  maxTiltDeg?: number; // up to strict 12 degrees
  scale?: number; // scale(1.04)
}

export function useCardTilt<T extends HTMLElement>(options: UseCardTiltOptions = {}) {
  const { maxTiltDeg = 12, scale = 1.04 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      const rotateY = relativeX * maxTiltDeg * 2;
      const rotateX = -relativeY * maxTiltDeg * 2;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`;
      el.style.transition = 'transform 0.08s ease-out';
    };

    const handlePointerLeave = () => {
      // Fluid Luxury Deceleration profile: cubic-bezier(0.16, 1, 0.3, 1)
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      el.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [maxTiltDeg, scale]);

  return ref;
}
