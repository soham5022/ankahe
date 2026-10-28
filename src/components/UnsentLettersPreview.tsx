import React from 'react';
import { SAMPLE_LETTERS } from '../data/unsentLetters';
import type { UnsentLetterItem } from '../types';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface UnsentLettersPreviewProps {
  onOpenLetter: (letter: UnsentLetterItem) => void;
  onExploreAllLetters: () => void;
}

export const UnsentLettersPreview: React.FC<UnsentLettersPreviewProps> = ({
  onOpenLetter,
  onExploreAllLetters,
}) => {
  return (
    <section id="unsent-letters" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/50 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="font-handwriting text-lg sm:text-xl text-ankahe-rose tracking-wide">
            Words that never found their way
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal">
            For the words that never found their way.
          </h2>
          <p className="text-sm sm:text-base text-ankahe-muted/90 font-light leading-relaxed">
            Letters written late at night to strangers, younger versions of ourselves, and parallel lives—sealed with care.
          </p>
        </div>

        {/* Letters Grid: Warm Paper Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_LETTERS.map((letter) => (
            <article
              key={letter.id}
              onClick={() => onOpenLetter(letter)}
              className="group cursor-pointer paper-texture text-ankahe-paper-dark rounded-2xl p-6 sm:p-7 border border-ankahe-paper-border hover:border-ankahe-rose/60 transition-all duration-300 flex flex-col justify-between shadow-paper-warm hover:shadow-paper relative overflow-hidden"
            >
              {/* Top envelope bar */}
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-ankahe-paper-border/80 text-xs">
                <span className="text-[11px] font-mono text-ankahe-paper-faint flex items-center gap-1.5">
                  <Mail size={12} className="text-ankahe-rose-dark" />
                  {letter.dateText}
                </span>
                <span className="text-[11px] capitalize text-ankahe-rose-dark font-medium px-2 py-0.5 rounded-full bg-ankahe-paper-muted">
                  {letter.category}
                </span>
              </div>

              {/* Recipient Headline */}
              <div className="my-5 space-y-3">
                <h3 className="font-serif text-base sm:text-lg text-ankahe-paper-dark font-medium group-hover:text-ankahe-rose-dark transition-colors leading-snug">
                  "{letter.recipient}"
                </h3>
                <p className="text-xs sm:text-sm text-ankahe-paper-faint font-light leading-relaxed line-clamp-4 italic">
                  "{letter.preview}"
                </p>
              </div>

              {/* Letter Footer */}
              <div className="pt-3.5 border-t border-dashed border-ankahe-paper-border/80 flex items-center justify-between">
                <span className="text-xs text-ankahe-paper-dark font-serif">
                  — {letter.author}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-ankahe-rose-dark group-hover:translate-x-1 transition-transform font-medium">
                  <span>Open letter</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Fictional disclosure & explore CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ankahe-border/50 text-xs text-ankahe-muted/70 font-light">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-ankahe-gold" />
            <span>Fictional sample letters for demonstration. Real letters stay entirely private.</span>
          </div>

          <button
            onClick={onExploreAllLetters}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs text-ankahe-text border border-ankahe-border hover:border-ankahe-rose/40 transition-colors"
          >
            <Mail size={13} className="text-ankahe-rose" />
            <span>Read First Letter in Detail</span>
          </button>
        </div>
      </div>
    </section>
  );
};
