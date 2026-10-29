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
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto border-t border-ankahe-border/40 relative text-center"
      aria-label="Invitation to enter ANKAHE"
    >
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C7A878 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto space-y-12">
        {/* Intimate Personal Question */}
        <div className="space-y-4">
          <span className="font-handwriting text-base sm:text-lg text-ankahe-gold tracking-wide block">
            A quiet pause
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-ankahe-text font-normal leading-tight">
            Tumhari bhi koi kahani hogi na?
          </h2>

          <p className="font-serif italic text-xl sm:text-2xl text-ankahe-gold font-light">
            Some stories are told. Others are written.
          </p>
        </div>

        {/* Brand Reassurance Copy */}
        <div className="space-y-4 max-w-xl mx-auto text-sm sm:text-base text-ankahe-muted font-light leading-relaxed">
          <p>
            The draft you deleted three times. The goodbye that happened too quietly. The ordinary day you didn't know would be the last of its kind.
          </p>
          <div className="pt-2 space-y-1">
            <p className="font-serif text-base sm:text-lg text-ankahe-text font-normal">
              "Yahan likhne ke liye shayar hona zaroori nahi."
            </p>
            <p className="font-serif italic text-sm sm:text-base text-ankahe-gold">
              "Bas kuch kehna ho, wahi kaafi hai."
            </p>
          </div>
        </div>

        {/* Full Brand Identity Reveal */}
        <div className="pt-2 pb-2 space-y-2">
          <div className="inline-flex items-baseline justify-center gap-3">
            <span className="font-serif text-3xl sm:text-4xl text-ankahe-text tracking-[0.2em] uppercase">
              ANKAHE
            </span>
            <span className="font-devanagari text-xl sm:text-2xl text-ankahe-gold font-light">
              अनकहे
            </span>
          </div>
          <p className="font-serif italic text-sm sm:text-base text-ankahe-muted/80">
            "For everything you couldn't say."
          </p>
        </div>

        {/* Clear, Honest Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Action: Enter ANKAHE */}
          <button
            onClick={onEnterAnkahe}
            id="btn-reveal-enter-ankahe"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-all shadow-md hover:shadow-gold-glow group border border-transparent hover:border-ankahe-gold/30"
          >
            <span>{isAuthenticated ? 'Open Your Sanctuary' : 'Enter ANKAHE'}</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary Action: Read the story again */}
          <button
            onClick={onReadAgain}
            id="btn-read-story-again"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs sm:text-sm text-ankahe-muted hover:text-ankahe-gold border border-ankahe-border hover:border-ankahe-gold/50 transition-colors"
          >
            <RotateCcw size={13} className="text-ankahe-muted" />
            <span>Read the story again</span>
          </button>
        </div>

        {/* Literary Footnote */}
        <p className="text-[11px] text-ankahe-muted/60 font-light pt-2">
          Multilingual Writing Sanctuary • Hindi • Marathi • Urdu • English • Free to join • Zero spam
        </p>
      </div>
    </section>
  );
};
