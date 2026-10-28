import React from 'react';
import { Sparkles, ArrowUp, Compass } from 'lucide-react';

interface SceneInvitationProps {
  onEnterAnkahe: () => void;
  onStayLonger: () => void;
}

export const SceneInvitation: React.FC<SceneInvitationProps> = ({
  onEnterAnkahe,
  onStayLonger,
}) => {
  return (
    <section
      id="invitation"
      className="py-32 sm:py-44 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/40 relative overflow-hidden bg-ankahe-bg text-center"
    >
      {/* Soft atmospheric radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-ankahe-gold/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto space-y-12">
        {/* Subtle scene cue */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ankahe-secondary/60 border border-ankahe-border/60 text-xs text-ankahe-muted/80">
          <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold" />
          <span className="font-mono text-[11px] uppercase tracking-widest">
            Scene VI • The Invitation
          </span>
        </div>

        {/* Climax Copy */}
        <div className="space-y-6">
          <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ankahe-text font-normal leading-tight">
            Maybe your words <br className="hidden sm:inline" />
            <span className="italic font-normal text-ankahe-gold font-serif">belong here, too.</span>
          </h3>

          <div className="space-y-2 text-base sm:text-xl text-ankahe-muted/90 font-light leading-relaxed">
            <p>You don't have to be a poet.</p>
            <p>You don't have to find the perfect words.</p>
            <p className="font-serif italic text-ankahe-text text-lg sm:text-2xl pt-2">
              You can simply begin.
            </p>
          </div>
        </div>

        {/* Two Clear Choices */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Primary Action: Enter ANKAHE */}
          <button
            onClick={onEnterAnkahe}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-ankahe-elevated hover:bg-ankahe-hover text-ankahe-text text-sm sm:text-base font-medium border border-ankahe-gold/60 hover:border-ankahe-gold transition-all duration-300 shadow-elevated hover:shadow-gold-glow flex items-center justify-center gap-2.5 group"
            id="btn-enter-ankahe-climax"
          >
            <Sparkles size={16} className="text-ankahe-gold group-hover:scale-110 transition-transform" />
            <span>Enter ANKAHE</span>
          </button>

          {/* Secondary Action: Stay a little longer */}
          <button
            onClick={onStayLonger}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-ankahe-secondary/60 hover:bg-ankahe-elevated text-xs sm:text-sm text-ankahe-muted hover:text-ankahe-text border border-ankahe-border hover:border-ankahe-muted/60 transition-colors flex items-center justify-center gap-2"
          >
            <Compass size={14} className="text-ankahe-muted" />
            <span>Stay a little longer</span>
          </button>
        </div>

        {/* Return to beginning */}
        <div className="pt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-xs text-ankahe-muted/50 hover:text-ankahe-gold transition-colors"
          >
            <ArrowUp size={12} />
            <span>Return to the first moment</span>
          </button>
        </div>
      </div>
    </section>
  );
};
