import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles, Shield, Feather, Lock, Radio } from 'lucide-react';

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

    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 500);
    const t3 = setTimeout(() => setStage(3), 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section
      id="hero-opening"
      className="relative min-h-[96vh] sm:min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full pt-28 pb-12 overflow-hidden"
      aria-label="ANKAHE cinematic prologue"
    >
      {/* Background Cinematic Watermark Calligraphy (Faint Devanagari floating in space) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none font-devanagari text-[16vw] sm:text-[20vw] text-ankahe-gold/[0.018] font-bold leading-none -z-10 tracking-widest"
        aria-hidden="true"
      >
        अनकहे
      </div>

      {/* Top Edge: Panoramic Ambient Data Bar (Expands across full screen width) */}
      <div
        className={`w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-ankahe-muted/60 transition-all duration-1000 ${
          stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/70 animate-pulse" />
          <span className="hidden sm:inline">COORDINATES • 28°36'N 77°12'E</span>
          <span className="sm:hidden">ARCHIVE</span>
        </div>

        <div className="flex items-center gap-2 text-center text-ankahe-gold/90">
          <span className="hidden md:inline h-[1px] w-8 bg-gradient-to-r from-transparent to-ankahe-gold/40" />
          <p className="font-serif italic text-xs tracking-widest capitalize">
            Some things are easier to write than to explain.
          </p>
          <span className="hidden md:inline h-[1px] w-8 bg-gradient-to-l from-transparent to-ankahe-gold/40" />
        </div>

        <div className="flex items-center gap-2">
          <Radio size={12} className="text-ankahe-gold/70" />
          <span className="hidden sm:inline">SANCTUARY VOL. 02</span>
          <span className="sm:hidden">SILENCE</span>
        </div>
      </div>

      {/* Main Panoramic Stage (Using the Full Widescreen Width) */}
      <div className="w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          
          {/* Left Column (Desktop Only): Floating Tactile Journal Fragment (World A) */}
          <div
            className={`hidden lg:flex lg:col-span-3 flex-col space-y-4 transition-all duration-1000 delay-300 ${
              stage >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            <div className="p-5 rounded-2xl bg-ankahe-secondary/50 backdrop-blur-md border border-white/[0.07] shadow-2xl relative overflow-hidden group hover:border-ankahe-gold/40 transition-all">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-ankahe-gold/80 pb-2 border-b border-white/[0.06]">
                <span>FRAGMENT 01</span>
                <span>2:14 AM</span>
              </div>
              <p className="font-serif italic text-sm text-ankahe-text/90 pt-3 leading-relaxed">
                "Humne kitni baatein sirf isliye nahi kahi ki samne wala pareshan na ho..."
              </p>
              <div className="pt-4 flex items-center justify-between text-xs text-ankahe-muted/60">
                <span className="font-handwriting text-xs text-ankahe-gold">
                  unwritten thoughts
                </span>
                <Feather size={12} className="text-ankahe-gold/60" />
              </div>
            </div>

            <div className="px-3 py-2 rounded-xl bg-ankahe-elevated/40 border border-white/[0.04] text-[11px] text-ankahe-muted/70 flex items-center gap-2.5">
              <Lock size={12} className="text-ankahe-gold/80" />
              <span>Private Vault • Encrypted drafts only you see</span>
            </div>
          </div>

          {/* Center Column: Monumental Cinematic Centerpiece */}
          <div className="lg:col-span-6 flex flex-col items-center text-center space-y-6 sm:space-y-8">
            {/* Monumental Wordmark */}
            <div
              className={`transition-all duration-1000 ease-out space-y-3 ${
                stage >= 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
              }`}
            >
              <div className="inline-flex items-baseline justify-center gap-4 sm:gap-6 flex-wrap">
                <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl xl:text-9xl text-ankahe-text font-normal tracking-[0.22em] sm:tracking-[0.28em] uppercase select-none drop-shadow-md">
                  ANKAHE
                </h1>
                <span className="font-devanagari text-3xl sm:text-5xl md:text-6xl text-ankahe-gold font-light tracking-wide drop-shadow">
                  अनकहे
                </span>
              </div>

              {/* Glowing Cinematic Horizon Streak */}
              <div className="w-full flex items-center justify-center gap-3 pt-1">
                <span className="h-[1px] flex-1 max-w-[120px] sm:max-w-[180px] bg-gradient-to-r from-transparent via-ankahe-gold/50 to-transparent" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-ankahe-muted/70 whitespace-nowrap">
                  A Private World Between Memory, Words, and Silence
                </span>
                <span className="h-[1px] flex-1 max-w-[120px] sm:max-w-[180px] bg-gradient-to-l from-transparent via-ankahe-gold/50 to-transparent" />
              </div>
            </div>

            {/* Central Emotional Question */}
            <div
              className={`transition-all duration-1000 ease-out space-y-4 max-w-2xl ${
                stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <h2 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-ankahe-text font-normal leading-[1.2] tracking-tight">
                Kabhi kisi ko kuch kehna tha… <br className="hidden sm:inline" />
                <span className="italic text-ankahe-gold font-serif bg-gradient-to-r from-ankahe-gold via-[#DFC49B] to-ankahe-gold bg-clip-text text-transparent">
                  par keh nahi paaye?
                </span>
              </h2>

              <p className="font-serif text-base sm:text-xl text-ankahe-muted/90 font-light leading-relaxed">
                Ever had a thousand things to say, but nowhere in the world to put them?
              </p>

              {/* Handwritten Marginalia Pill */}
              <div className="pt-1 flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ankahe-elevated/70 border border-ankahe-border/60 text-xs text-ankahe-muted shadow-sm backdrop-blur-sm">
                  <Sparkles size={12} className="text-ankahe-gold" />
                  <span className="font-handwriting text-sm text-ankahe-gold tracking-wide">
                    notes written at 2:14 AM on the back of an old ticket
                  </span>
                </div>
              </div>

              {/* High-Impact Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto w-full">
                <button
                  onClick={onEnterAnkahe}
                  id="hero-enter-button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-all shadow-lg hover:shadow-gold-glow group border border-transparent hover:border-ankahe-gold/40 cursor-pointer"
                >
                  <span>{isAuthenticated ? 'Open Your Sanctuary' : 'Enter ANKAHE'}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={onScrollToStory}
                  id="hero-explore-button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-ankahe-secondary/80 hover:bg-ankahe-elevated text-xs sm:text-sm text-ankahe-muted hover:text-ankahe-gold border border-ankahe-border/70 hover:border-ankahe-gold/50 transition-colors backdrop-blur-sm cursor-pointer"
                >
                  <ChevronDown size={14} className="animate-bounce" />
                  <span>Read the reflections</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop Only): Community Principles & Script Preview (World C) */}
          <div
            className={`hidden lg:flex lg:col-span-3 flex-col space-y-4 transition-all duration-1000 delay-300 ${
              stage >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            <div className="p-5 rounded-2xl bg-ankahe-secondary/50 backdrop-blur-md border border-white/[0.07] shadow-2xl space-y-3.5 group hover:border-ankahe-gold/40 transition-all">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-ankahe-gold/80 pb-2 border-b border-white/[0.06]">
                <span>THE SANCTUARY RULES</span>
                <Shield size={12} />
              </div>
              
              <ul className="space-y-2 text-xs text-ankahe-muted/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/70" />
                  <span>No algorithms or feed rankings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/70" />
                  <span>Zero like counts or follower contests</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/70" />
                  <span>Anonymous whispers with full privacy</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-ankahe-muted/60">
                <span>LANGUAGES</span>
                <span className="text-ankahe-gold">हिंदी • اردو • मराठी • ENG</span>
              </div>
            </div>

            <div className="px-3 py-2 rounded-xl bg-ankahe-elevated/40 border border-white/[0.04] text-[11px] text-ankahe-muted/70 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                <span>Zero fake metrics. Real writing.</span>
              </span>
              <span className="font-mono text-[10px] text-ankahe-gold/70">100% ORGANIC</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Panoramic Status Dock (Full-Bleed across the widescreen) */}
      <div
        className={`w-full pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-[11px] text-ankahe-muted/60 transition-all duration-1000 delay-500 ${
          stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/70" />
            <span>Private Writing Desk</span>
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/70" />
            <span>Anonymous Community</span>
          </span>
          <span className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/70" />
            <span>Zero Algorithms</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-ankahe-gold/80 font-mono text-[10px]">
          <span>SCROLL TO EXPLORE</span>
          <span className="animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
};
