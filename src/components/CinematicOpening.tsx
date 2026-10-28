import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface CinematicOpeningProps {
  onContinue: () => void;
  onEnterAnkahe: () => void;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({
  onContinue,
  onEnterAnkahe,
}) => {
  // Step 0: Initial
  // Step 1: "Some feelings never find their way out."
  // Step 2: "Some words are never spoken."
  // Step 3: Reveal ANKAHE • अनकहे • Tagline
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStage(3);
      return;
    }

    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 2600);
    const t3 = setTimeout(() => setStage(3), 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleSkip = () => {
    setStage(3);
  };

  return (
    <section
      id="opening"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-ankahe-bg overflow-hidden select-none"
      aria-label="ANKAHE cinematic prologue"
    >
      {/* Deep atmospheric radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 45%, #181920 0%, #111216 75%, #0c0d10 100%)',
        }}
      />
      <div className="absolute inset-0 midnight-noise opacity-40 pointer-events-none" />

      {/* Gentle center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-ankahe-gold/5 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000"
        style={{ opacity: stage >= 3 ? 0.8 : 0.3 }}
      />

      {/* Main cinematic text container */}
      <div className="relative z-10 max-w-3xl mx-auto min-h-[300px] flex flex-col items-center justify-center space-y-6">
        {/* Line 1 */}
        <p
          className={`font-serif text-xl sm:text-2xl md:text-3xl text-ankahe-muted/90 font-light tracking-wide transition-all duration-1000 ease-out ${
            stage >= 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          Some feelings never find their way out.
        </p>

        {/* Line 2 */}
        <p
          className={`font-serif text-xl sm:text-2xl md:text-3xl text-ankahe-muted/90 font-light tracking-wide transition-all duration-1000 ease-out delay-150 ${
            stage >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          Some words are never spoken.
        </p>

        {/* Brand reveal */}
        <div
          className={`pt-6 transition-all duration-1000 ease-out space-y-3.5 ${
            stage >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-ankahe-gold/50" />
            <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.2em] text-ankahe-text uppercase pl-2">
              ANKAHE
            </span>
            <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-ankahe-gold/50" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="font-devanagari text-lg sm:text-xl text-ankahe-gold/90 font-light tracking-wider">
              अनकहे
            </span>
          </div>

          <p className="font-serif italic text-base sm:text-xl text-ankahe-muted/90 font-light tracking-wide pt-1">
            "For everything you couldn't say."
          </p>

          <p className="font-devanagari text-xs sm:text-sm text-ankahe-muted/60 font-light pt-0.5">
            कुछ बातें जो सिर्फ़ दिल में रह जाती हैं...
          </p>
        </div>
      </div>

      {/* Immediate interaction cues & Skip control */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 z-10 px-4">
        {stage < 3 ? (
          <button
            onClick={handleSkip}
            className="text-[11px] uppercase tracking-widest text-ankahe-muted/50 hover:text-ankahe-gold transition-colors py-1 px-3 rounded"
          >
            Skip intro
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in duration-700">
            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-elevated/80 hover:bg-ankahe-elevated text-xs sm:text-sm text-ankahe-text border border-ankahe-gold/40 hover:border-ankahe-gold transition-all duration-300 shadow-elevated group"
            >
              <span>Begin the journey</span>
              <ChevronDown size={14} className="text-ankahe-gold group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onEnterAnkahe}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs text-ankahe-muted hover:text-ankahe-gold hover:bg-ankahe-secondary/50 border border-transparent hover:border-ankahe-border transition-colors"
            >
              <Sparkles size={13} className="text-ankahe-gold" />
              <span>Enter directly</span>
            </button>
          </div>
        )}

        <span className="text-[10px] uppercase tracking-widest text-ankahe-muted/40 font-light pt-1">
          Scene I • The First Moment
        </span>
      </div>
    </section>
  );
};
