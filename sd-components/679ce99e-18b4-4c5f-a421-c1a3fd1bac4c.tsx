import React, { useRef, useEffect, useState, useMemo } from 'react';

export interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '60vmin',
  lineColor = 'tomato',
  lineWidth = '0.8vmin',
  lineHeight = '5vmin',
  baseAngle = 0,
  className = '',
  style = {},
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const totalLines = useMemo(() => rows * columns, [rows, columns]);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, totalLines);
  }, [totalLines]);

  useEffect(() => {
    let animationFrameId: number;

    const updateRotations = () => {
      if (!containerRef.current) return;

      itemRefs.current.forEach((el) => {
        if (!el) return;
        if (!cursor) {
          el.style.transform = `rotate(${baseAngle}deg)`;
          return;
        }

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = cursor.x - centerX;
        const dy = cursor.y - centerY;
        const rad = Math.atan2(dy, dx);
        const deg = (rad * 180) / Math.PI;

        el.style.transform = `rotate(${deg}deg)`;
      });
    };

    animationFrameId = requestAnimationFrame(updateRotations);
    return () => cancelAnimationFrame(animationFrameId);
  }, [cursor, baseAngle]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  const handlePointerLeave = () => {
    setCursor(null);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative grid place-items-center cursor-crosshair select-none touch-none ${className}`}
      style={{
        width: containerSize,
        height: containerSize,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...style,
      }}
      role="img"
      aria-label="Interactive kinetic magnetic field visualization"
    >
      {Array.from({ length: totalLines }).map((_, index) => (
        <div
          key={index}
          className="w-full h-full flex items-center justify-center pointer-events-none"
        >
          <span
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className="origin-center will-change-transform rounded-full"
            style={{
              width: lineWidth,
              height: lineHeight,
              backgroundColor: lineColor,
              transform: `rotate(${baseAngle}deg)`,
              transition: cursor
                ? 'transform 0.08s ease-out'
                : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
