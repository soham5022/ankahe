import React from 'react';
import { ArrowUp, Compass } from 'lucide-react';

interface JournalInvitationProps {
  onEnterAnkahe: () => void;
  onJustLooking: () => void;
}

export const JournalInvitation: React.FC<JournalInvitationProps> = ({
  onEnterAnkahe,
  onJustLooking,
}) => {
  return (
    <section
      id="invitation"
      className="py-24 sm:py-36 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-ankahe-border/40 relative"
    >
      <div className="max-w-2xl space-y-8">
        <div className="flex items-center gap-3">
          <span className="font-handwriting text-base text-ankahe-brown tracking-wide">
            A quiet door
          </span>
          <span className="w-8 h-[1px] bg-ankahe-border" />
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-[1.25]">
            Whenever you're ready, there is{' '}
            <span className="italic text-ankahe-brown-light font-serif">room for your words</span> here.
          </h2>
          
          <p className="text-base sm:text-lg text-ankahe-muted font-light leading-relaxed">
            ANKAHE is being built as a quiet refuge — free from feeds, followers, and the rush to be noticed. You can join the circle now or return whenever you have something to write.
          </p>
        </div>

        {/* Clear, Honest Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={onEnterAnkahe}
            id="btn-enter-ankahe"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-all shadow-sm group"
          >
            <span>Enter ANKAHE</span>
          </button>

          <button
            onClick={onJustLooking}
            id="btn-just-looking"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-sm text-ankahe-text/90 hover:text-ankahe-text border border-ankahe-border transition-colors"
          >
            <Compass size={14} className="text-ankahe-muted" />
            <span>Just looking around</span>
          </button>
        </div>

        {/* Reassurance note */}
        <p className="text-xs text-ankahe-muted/60 font-light pt-2">
          No credit cards. No advertisements. No spam in your inbox.
        </p>

        {/* Quiet return to top link */}
        <div className="pt-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-xs text-ankahe-muted/60 hover:text-ankahe-text transition-colors"
          >
            <ArrowUp size={13} />
            <span>Back to the beginning</span>
          </button>
        </div>
      </div>
    </section>
  );
};
