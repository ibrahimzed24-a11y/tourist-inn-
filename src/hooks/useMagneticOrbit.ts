import { useRef, useEffect } from 'react';

interface UseMagneticOrbitOptions {
  radius?: number; // 40px bounding field
  maxDisplacementRatio?: number; // up to 25% of vector
}

export function useMagneticOrbit<T extends HTMLElement>(options: UseMagneticOrbitOptions = {}) {
  const { radius = 40, maxDisplacementRatio = 0.25 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isHovered = false;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      // Trigger if pointer is within the element or inside the 40px orbit boundary
      const effectiveRadius = Math.max(rect.width, rect.height) / 2 + radius;

      if (distance < effectiveRadius) {
        isHovered = true;
        const shiftX = dx * maxDisplacementRatio;
        const shiftY = dy * maxDisplacementRatio;

        el.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
        el.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
      } else if (isHovered) {
        isHovered = false;
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      }
    };

    const handlePointerLeave = () => {
      isHovered = false;
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [radius, maxDisplacementRatio]);

  return ref;
}
