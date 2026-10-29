import React, { useEffect, useState, useRef } from 'react';

export const TeaserAtmosphere: React.FC = () => {
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const targetPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);
  const [isPointerSupported, setIsPointerSupported] = useState<boolean>(false);

  useEffect(() => {
    // Check capabilities & preferences
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReduced || !hasFinePointer) {
      setIsPointerSupported(false);
      return;
    }

    setIsPointerSupported(true);

    // Initial center position
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setPointerPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handlePointerMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Smooth lerp loop for the spotlight
    const tick = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      currentPos.current.x += dx * 0.08;
      currentPos.current.y += dy * 0.08;

      setPointerPos({
        x: Math.round(currentPos.current.x),
        y: Math.round(currentPos.current.y),
      });

      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Fine Film Grain Texture (SVG data URI noise filter) */}
      <div
        className="absolute inset-0 opacity-[0.038] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* 2. Soft Ambient Lighting Bloom Fields */}
      <div
        className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C7A878 0%, #191A20 70%, transparent 100%)',
        }}
      />
      <div
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #DFC49B 0%, #202127 75%, transparent 100%)',
        }}
      />

      {/* 3. Pointer-Responsive Interactive Spotlight (Desktop only) */}
      {isPointerSupported && pointerPos && (
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(650px circle at ${pointerPos.x}px ${pointerPos.y}px, rgba(199, 168, 120, 0.055) 0%, rgba(199, 168, 120, 0.015) 40%, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
};
