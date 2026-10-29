import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface TeaserHeroOpeningProps {
  onEnterAnkahe: () => void;
  onScrollToStory: () => void;
  isAuthenticated?: boolean;
}

export const TeaserHeroOpening: React.FC<TeaserHeroOpeningProps> = ({
  onEnterAnkahe,
  onScrollToStory,
  isAuthenticated = false,
}) => {
  // Staged entrance animation state (0 = init, 1 = prologue line, 2 = wordmark, 3 = question & CTAs)
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Respect reduced motion: show everything immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setStage(3);
      return;
    }

    const t1 = setTimeout(() => setStage(1), 150);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(() => setStage(3), 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="hero-opening"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto pt-28 pb-16 overflow-hidden"
      aria-label="ANKAHE cinematic prologue"
    >
      {/* Background Soft Glow & Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(199, 168, 120, 0.04) 0%, rgba(17, 18, 22, 0) 70%)',
        }}
      />

      <div className="w-full space-y-8 sm:space-y-10 max-w-3xl mx-auto">
        {/* Step 1: Prologue Line */}
        <div
          className={`transition-all duration-1000 ease-out flex items-center justify-center gap-2.5 ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <span className="h-[1px] w-6 sm:w-10 bg-ankahe-border" />
          <p className="font-serif italic text-xs sm:text-sm text-ankahe-gold tracking-widest uppercase">
            Some things are easier to write than to explain.
          </p>
          <span className="h-[1px] w-6 sm:w-10 bg-ankahe-border" />
        </div>

        {/* Step 2: Editorial Wordmark Reveal */}
        <div
          className={`transition-all duration-1000 ease-out space-y-2 ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="inline-flex items-baseline justify-center gap-3 sm:gap-4">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ankahe-text font-normal tracking-[0.18em] uppercase select-none">
              ANKAHE
            </h1>
            <span className="font-devanagari text-2xl sm:text-4xl md:text-5xl text-ankahe-gold font-light tracking-wide">
              अनकहे
            </span>
          </div>
          <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-ankahe-muted/70">
            A private sanctuary for the words we keep inside
          </p>
        </div>

        {/* Step 3: Central Emotional Question & Intimate Handwritten Detail */}
        <div
          className={`transition-all duration-1000 ease-out space-y-6 pt-2 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="space-y-3">
            <p className="font-serif text-2xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-tight">
              Kabhi kisi ko kuch kehna tha… <br className="hidden sm:inline" />
              <span className="italic text-ankahe-gold font-serif">par keh nahi paaye?</span>
            </p>

            <p className="font-serif text-base sm:text-xl text-ankahe-muted font-light max-w-xl mx-auto leading-relaxed">
              Ever had a thousand things to say, but nowhere to put them?
            </p>
          </div>

          {/* World A: Tactile Handwritten Marginal Note */}
          <div className="pt-1 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ankahe-elevated/70 border border-ankahe-border/60 text-xs text-ankahe-muted shadow-sm backdrop-blur-sm">
              <Sparkles size={12} className="text-ankahe-gold" />
              <span className="font-handwriting text-sm text-ankahe-gold tracking-wide">
                notes written at 2:14 AM on the back of an old ticket
              </span>
            </div>
          </div>

          {/* Direct, Honest Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onEnterAnkahe}
              id="hero-enter-button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-all shadow-md hover:shadow-gold-glow group border border-transparent hover:border-ankahe-gold/30"
            >
              <span>{isAuthenticated ? 'Open Your Sanctuary' : 'Enter ANKAHE'}</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onScrollToStory}
              id="hero-explore-button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs sm:text-sm text-ankahe-muted hover:text-ankahe-gold border border-ankahe-border hover:border-ankahe-gold/50 transition-colors"
            >
              <ChevronDown size={14} className="animate-bounce" />
              <span>Read the reflections</span>
            </button>
          </div>

          {/* Subtle Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-ankahe-muted/60 font-light">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/60" />
              Private Writing Desk
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/60" />
              Anonymous Sharing
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/60" />
              Zero Algorithms & Likes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
