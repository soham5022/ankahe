import React from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface TeaserThresholdInvitationProps {
  onEnterAnkahe: () => void;
  onReadAgain: () => void;
  isAuthenticated?: boolean;
}

export const TeaserThresholdInvitation: React.FC<TeaserThresholdInvitationProps> = ({
  onEnterAnkahe,
  onReadAgain,
  isAuthenticated = false,
}) => {
  return (
    <section
      id="reveal"
      className="py-28 sm:py-44 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full max-w-[1700px] mx-auto border-t border-white/[0.06] relative text-center overflow-hidden"
      aria-label="Invitation to enter ANKAHE"
    >
      {/* Background Celestial Portal Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, #C7A878 0%, #191A20 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-12 sm:space-y-14">
        {/* Intimate Personal Question */}
        <div className="space-y-5">
          <span className="font-handwriting text-lg sm:text-xl text-ankahe-gold tracking-wide block">
            A quiet pause
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ankahe-text font-normal leading-tight">
            Tumhari bhi koi kahani hogi na?
          </h2>

          <p className="font-serif italic text-2xl sm:text-3xl text-ankahe-gold font-light">
            Some stories are told. Others are written.
          </p>
        </div>

        {/* Brand Reassurance Copy */}
        <div className="space-y-6 max-w-2xl mx-auto text-base sm:text-xl text-ankahe-muted font-light leading-relaxed">
          <p>
            The draft you deleted three times. The goodbye that happened too quietly. The ordinary day you didn't know would be the last of its kind.
          </p>
          <div className="pt-2 space-y-2">
            <p className="font-serif text-lg sm:text-2xl text-ankahe-text font-normal">
              "Yahan likhne ke liye shayar hona zaroori nahi."
            </p>
            <p className="font-serif italic text-base sm:text-xl text-ankahe-gold">
              "Bas kuch kehna ho, wahi kaafi hai."
            </p>
          </div>
        </div>

        {/* Full Brand Identity Reveal with Cinematic Spacing */}
        <div className="pt-4 pb-2 space-y-3">
          <div className="inline-flex items-baseline justify-center gap-4 sm:gap-6 flex-wrap">
            <span className="font-serif text-4xl sm:text-6xl md:text-7xl text-ankahe-text tracking-[0.25em] uppercase font-normal">
              ANKAHE
            </span>
            <span className="font-devanagari text-2xl sm:text-4xl md:text-5xl text-ankahe-gold font-light">
              अनकहे
            </span>
          </div>
          <p className="font-serif italic text-base sm:text-xl text-ankahe-muted/80">
            "For everything you couldn't say."
          </p>
        </div>

        {/* Clear, Cinematic Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 max-w-md mx-auto w-full">
          {/* Primary Action: Enter ANKAHE */}
          <button
            onClick={onEnterAnkahe}
            id="btn-reveal-enter-ankahe"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm sm:text-base font-medium transition-all shadow-xl hover:shadow-gold-glow group border border-transparent hover:border-ankahe-gold/40 cursor-pointer"
          >
            <span>{isAuthenticated ? 'Open Your Sanctuary' : 'Enter ANKAHE'}</span>
            <ArrowRight size={17} className="group-hover:translate-x-1.5 transition-transform" />
          </button>

          {/* Secondary Action: Read the story again */}
          <button
            onClick={onReadAgain}
            id="btn-read-story-again"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-ankahe-secondary/80 hover:bg-ankahe-elevated text-xs sm:text-sm text-ankahe-muted hover:text-ankahe-gold border border-ankahe-border/80 hover:border-ankahe-gold/60 transition-colors backdrop-blur-sm cursor-pointer"
          >
            <RotateCcw size={14} className="text-ankahe-muted" />
            <span>Read the story again</span>
          </button>
        </div>

        {/* Literary Footnote */}
        <p className="text-xs sm:text-sm text-ankahe-muted/60 font-light pt-4">
          Multilingual Writing Sanctuary • Hindi • Marathi • Urdu • English • Free to join • Zero spam
        </p>
      </div>
    </section>
  );
};
