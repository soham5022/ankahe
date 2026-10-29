import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  targetAlpha: number;
}

export const TeaserAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const targetPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [isPointerSupported, setIsPointerSupported] = useState<boolean>(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReduced) return;

    setIsPointerSupported(hasFinePointer);

    // Initial center position
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    currentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setPointerPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handlePointerMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    if (hasFinePointer) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    // Initialize Canvas stardust particles spanning the entire screen
    const canvas = canvasRef.current;
    if (canvas && typeof canvas.getContext === 'function') {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      // Generate 70 delicate drifting celestial motes
      const count = Math.min(80, Math.floor(window.innerWidth / 22));
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.45 + 0.1,
        targetAlpha: Math.random() * 0.5 + 0.1,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.08, // gentle upward drift like night embers
      }));

      const render = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update spotlight position with lerp
        if (hasFinePointer) {
          const dx = targetPos.current.x - currentPos.current.x;
          const dy = targetPos.current.y - currentPos.current.y;
          currentPos.current.x += dx * 0.07;
          currentPos.current.y += dy * 0.07;

          setPointerPos({
            x: Math.round(currentPos.current.x),
            y: Math.round(currentPos.current.y),
          });
        }

        // Draw and update each stardust mote
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -10) p.x = canvas.width + 10;
          if (p.x > canvas.width + 10) p.x = -10;

          // Subtle twinkle
          if (Math.abs(p.alpha - p.targetAlpha) < 0.02) {
            p.targetAlpha = Math.random() * 0.5 + 0.1;
          } else {
            p.alpha += (p.targetAlpha - p.alpha) * 0.02;
          }

          // Render soft celestial gold glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(215, 184, 138, ${p.alpha * 0.6})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(199, 168, 120, 0.4)';
          ctx.fill();
        }

        animFrameId.current = requestAnimationFrame(render);
      };

      animFrameId.current = requestAnimationFrame(render);

      return () => {
        if (hasFinePointer) {
          window.removeEventListener('mousemove', handlePointerMove);
        }
        window.removeEventListener('resize', resize);
        if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      };
    }
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Celestial Gradient Horizon & Atmospheric Depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(120% 80% at 50% -10%, rgba(199, 168, 120, 0.07) 0%, transparent 60%),
            radial-gradient(90% 70% at 15% 45%, rgba(32, 33, 45, 0.6) 0%, transparent 65%),
            radial-gradient(90% 70% at 85% 65%, rgba(28, 25, 20, 0.5) 0%, transparent 65%),
            linear-gradient(180deg, #111216 0%, #0d0e12 50%, #111216 100%)
          `,
        }}
      />

      {/* 2. Interactive Canvas for Drifting Stardust & Cosmic Embers (Whole Screen) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />

      {/* 3. Fine Film Grain Texture (SVG data URI noise filter) */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* 4. Peripheral Cinematic Horizon Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 160px 40px rgba(10, 11, 14, 0.85)',
        }}
      />

      {/* 5. Pointer-Responsive Interactive Spotlight (Desktop only, spans full width) */}
      {isPointerSupported && pointerPos && (
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(850px circle at ${pointerPos.x}px ${pointerPos.y}px, rgba(199, 168, 120, 0.05) 0%, rgba(199, 168, 120, 0.015) 45%, transparent 75%)`,
          }}
        />
      )}
    </div>
  );
};
