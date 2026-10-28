import React from 'react';

interface TeaserOpeningProps {
  onScrollToStory: () => void;
}

export const TeaserOpening: React.FC<TeaserOpeningProps> = ({ onScrollToStory }) => {
  return (
    <section className="min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto pt-28 pb-16 relative">
      <div className="space-y-10 sm:space-y-12">
        {/* Intimate, Asymmetrical Question */}
        <div className="space-y-6 max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ankahe-text font-normal leading-[1.2] tracking-tight">
            Kabhi kuch kehna tha... <br />
            <span className="italic text-ankahe-gold font-serif">par keh nahi paaye?</span>
          </h1>

          <p className="font-serif text-lg sm:text-2xl text-ankahe-muted font-light leading-relaxed">
            Some words stay with us longer than people do.
          </p>
        </div>

        {/* Quiet scroll cue: Not a loud CTA, but an intimate invitation to discover */}
        <div className="pt-6 sm:pt-10">
          <button
            onClick={onScrollToStory}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm text-ankahe-gold hover:text-ankahe-gold-light transition-colors py-2 focus:outline-none"
            aria-label="Continue reading"
          >
            <span className="group-hover:translate-y-0.5 transition-transform duration-200">↓</span>
            <span className="font-light tracking-wide">There's something here for you.</span>
          </button>
        </div>
      </div>
    </section>
  );
};
