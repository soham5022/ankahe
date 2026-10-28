import React, { useState } from 'react';
import { TEASER_FRAGMENTS } from '../data/teaserFragments';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

interface SceneFragmentsProps {
  onContinueToThemes: () => void;
}

export const SceneFragments: React.FC<SceneFragmentsProps> = ({
  onContinueToThemes,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevFragment = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TEASER_FRAGMENTS.length - 1));
  };

  const nextFragment = () => {
    setActiveIndex((prev) => (prev < TEASER_FRAGMENTS.length - 1 ? prev + 1 : 0));
  };

  const current = TEASER_FRAGMENTS[activeIndex];

  return (
    <section
      id="fragments"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/40 relative overflow-hidden bg-ankahe-secondary/30"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Tag */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ankahe-secondary/80 border border-ankahe-border/60 text-xs text-ankahe-muted/80">
            <span className="w-1.5 h-1.5 rounded-full bg-ankahe-rose" />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Scene III • Fragments of Human Feeling
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Small scenes from an inner world.
          </h3>
          <p className="text-sm sm:text-base text-ankahe-muted/80 font-light max-w-lg mx-auto">
            Not performance. Not poetry contests. Just the thoughts people carry through ordinary days.
          </p>
        </div>

        {/* Featured Cinematic Fragment Display */}
        <div className="relative bg-ankahe-elevated/80 backdrop-blur-md rounded-3xl p-8 sm:p-14 border border-ankahe-border shadow-elevated transition-all duration-500">
          {/* Top fragment metadata */}
          <div className="flex items-center justify-between pb-6 border-b border-ankahe-border/60 text-xs">
            <span className="px-3 py-1 rounded-full bg-ankahe-secondary text-ankahe-gold text-[11px] font-medium border border-ankahe-border uppercase tracking-wider">
              {current.theme}
            </span>

            <span className="text-[11px] text-ankahe-muted/70 font-mono">
              Fragment {activeIndex + 1} of {TEASER_FRAGMENTS.length}
            </span>
          </div>

          {/* Central Quote Body */}
          <div className="my-10 sm:my-14 min-h-[140px] flex items-center justify-center text-center">
            <div className="space-y-3">
              {current.lines.map((line, idx) => (
                <p
                  key={idx}
                  className={`font-serif text-xl sm:text-3xl text-ankahe-text/95 font-light leading-relaxed sm:leading-loose ${
                    idx === 0 && current.lines.length > 2 ? 'italic text-ankahe-gold/90 text-lg sm:text-2xl' : ''
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Bottom attribution & controls */}
          <div className="pt-6 border-t border-ankahe-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-ankahe-muted/60 font-serif italic text-xs sm:text-sm">
              — {current.sourceNote}
            </span>

            {/* Stepper buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevFragment}
                className="p-2 rounded-full border border-ankahe-border hover:border-ankahe-gold text-ankahe-muted hover:text-ankahe-text transition-colors"
                aria-label="Previous fragment"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5">
                {TEASER_FRAGMENTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeIndex === i ? 'w-6 bg-ankahe-gold' : 'w-1.5 bg-ankahe-border hover:bg-ankahe-muted'
                    }`}
                    aria-label={`Go to fragment ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextFragment}
                className="p-2 rounded-full border border-ankahe-border hover:border-ankahe-gold text-ankahe-muted hover:text-ankahe-text transition-colors"
                aria-label="Next fragment"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Transition cue to next scene */}
        <div className="text-center pt-2">
          <button
            onClick={onContinueToThemes}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ankahe-muted hover:text-ankahe-gold transition-colors py-2"
          >
            <span>Discover the three themes</span>
            <ArrowDown size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
