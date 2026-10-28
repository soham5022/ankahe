import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ScenePersonalConversationProps {
  onExploreFragments: () => void;
}

export const ScenePersonalConversation: React.FC<ScenePersonalConversationProps> = ({
  onExploreFragments,
}) => {
  return (
    <section
      id="conversation"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-t border-ankahe-border/40 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[680px] h-[380px] sm:h-[480px] bg-gradient-to-b from-ankahe-gold/5 via-ankahe-rose/5 to-transparent rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-10">
        {/* Subtle scene cue */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ankahe-secondary/60 border border-ankahe-border/60 text-xs text-ankahe-muted/80">
          <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/80" />
          <span className="font-mono text-[11px] uppercase tracking-widest">
            Scene II • A Quiet Conversation
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ankahe-text leading-[1.25] sm:leading-[1.18]">
          Some things are easier <br className="hidden sm:inline" />
          <span className="italic font-normal text-ankahe-gold/90 font-serif">to write than to say.</span>
        </h2>

        {/* Conversational Supporting Text */}
        <div className="max-w-xl mx-auto space-y-4 text-base sm:text-xl text-ankahe-muted font-light leading-relaxed sm:leading-loose">
          <p>
            Maybe you miss someone.
          </p>
          <p>
            Maybe something has been on your mind all day.
          </p>
          <p>
            Maybe you just have a few words you need to let out.
          </p>
          <p className="font-serif italic text-ankahe-text/95 pt-2 text-lg sm:text-2xl">
            Whatever it is, you can start here.
          </p>
        </div>

        {/* Hindi gentle note */}
        <p className="font-devanagari text-sm sm:text-base text-ankahe-muted/70 tracking-wide font-light">
          यहाँ किसी को सफाई देने की ज़रूरत नहीं...
        </p>

        {/* Transition prompt */}
        <div className="pt-6">
          <button
            onClick={onExploreFragments}
            className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-ankahe-gold hover:text-ankahe-gold-light transition-all group py-2"
          >
            <span>Read human fragments</span>
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
