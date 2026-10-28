import React from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface TeaserFinalRevealProps {
  onEnterAnkahe: () => void;
  onReadAgain: () => void;
}

export const TeaserFinalReveal: React.FC<TeaserFinalRevealProps> = ({
  onEnterAnkahe,
  onReadAgain,
}) => {
  return (
    <section
      id="reveal"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto border-t border-ankahe-border/40 relative text-center"
    >
      <div className="max-w-2xl mx-auto space-y-12">
        
        {/* Full Brand Identity Reveal — Earned by the journey */}
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ankahe-text font-normal tracking-wide">
              ANKAHE
            </h2>
            <span className="font-devanagari text-xl sm:text-2xl text-ankahe-gold font-light">
              अनकहे
            </span>
          </div>

          <p className="font-serif italic text-lg sm:text-2xl text-ankahe-text pt-1">
            "For everything you couldn't say."
          </p>
        </div>

        {/* Reassurance Copy */}
        <div className="space-y-3 max-w-lg mx-auto">
          <p className="font-serif text-lg sm:text-xl text-ankahe-text font-normal">
            "Yahan likhne ke liye shayar hona zaroori nahi."
          </p>
          <p className="font-serif italic text-base sm:text-lg text-ankahe-gold">
            "Bas kuch kehna ho, wahi kaafi hai."
          </p>
          <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed pt-2">
            A quiet community for personal thoughts, sher, shayari, memories, unsent letters, and feelings you cannot easily explain. Free from algorithms, like counts, and public competition.
          </p>
        </div>

        {/* Clear, Honest Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Action: Enter ANKAHE (Warm ivory surface for contrast) */}
          <button
            onClick={onEnterAnkahe}
            id="btn-reveal-enter-ankahe"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-all shadow-sm hover:shadow-gold-glow group border border-transparent hover:border-ankahe-gold/30"
          >
            <span>Enter ANKAHE</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Secondary Action: Read the story again (Understated dark button with subtle golden border) */}
          <button
            onClick={onReadAgain}
            id="btn-read-story-again"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs sm:text-sm text-ankahe-muted hover:text-ankahe-gold border border-ankahe-border hover:border-ankahe-gold/50 transition-colors"
          >
            <RotateCcw size={13} className="text-ankahe-muted" />
            <span>Read the story again</span>
          </button>
        </div>

        {/* Quiet footnote reassurance */}
        <p className="text-[11px] text-ankahe-muted/60 font-light pt-4">
          Phase 1 Public Teaser. No credit card required. No spam.
        </p>

      </div>
    </section>
  );
};
