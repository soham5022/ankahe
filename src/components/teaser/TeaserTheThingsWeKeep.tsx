import React, { useState } from 'react';
import type { UnsentLetterItem } from '../../types';
import { SAMPLE_LETTERS } from '../../data/unsentLetters';
import { Heart, BookOpen } from 'lucide-react';

interface TeaserTheThingsWeKeepProps {
  onOpenLetter: (letter: UnsentLetterItem) => void;
  onShowToast: (msg: string) => void;
}

export const TeaserTheThingsWeKeep: React.FC<TeaserTheThingsWeKeepProps> = ({
  onOpenLetter,
  onShowToast,
}) => {
  const [hasResonated, setHasResonated] = useState(false);
  const featuredLetter = SAMPLE_LETTERS[2] || SAMPLE_LETTERS[0];

  const handleResonance = () => {
    setHasResonated((prev) => !prev);
    if (!hasResonated) {
      onShowToast("Softly held in the quiet. You are not alone in having unsaid words.");
    }
  };

  return (
    <section
      id="scene-things-we-keep"
      className="py-20 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto border-t border-ankahe-border/30 relative"
      aria-label="The things we keep"
    >
      {/* Editorial Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-ankahe-gold tracking-widest uppercase mb-12 sm:mb-16">
        <span>01</span>
        <span className="w-8 h-[1px] bg-ankahe-gold/40" />
        <span>The Things We Keep</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Intimate Thought & Unsent Monologue */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-5">
            <h2 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal leading-snug">
              Kabhi kuch kehna tha. <br />
              <span className="italic text-ankahe-gold font-serif">Phir socha, rehne do.</span>
            </h2>

            <p className="font-serif text-lg sm:text-xl text-ankahe-muted/90 font-light leading-relaxed">
              Some words stay in your drafts. Some stay in your head. Not everything needs an audience, but some things just need somewhere to exist.
            </p>
          </div>

          {/* Intimate Hindi/Urdu Observation */}
          <div className="p-6 rounded-2xl bg-ankahe-secondary/70 border border-ankahe-border/60 space-y-4">
            <blockquote className="font-serif text-base sm:text-lg text-ankahe-text/90 italic leading-relaxed">
              "Humne kitni baatein sirf isliye nahi kahi ki samne wala pareshan na ho jaye... aur phir ek din un baaton ne humein hi andar se chup kara diya."
            </blockquote>
            <p className="text-xs sm:text-sm text-ankahe-muted font-light">
              Bas ek aadat reh gayi chup rehne ki, jise duniya ne hamara sukoon samajh liya.
            </p>
          </div>

          {/* Interactive Quiet Resonance Button */}
          <div className="pt-2 flex items-center justify-between">
            <span className="font-handwriting text-sm text-ankahe-gold">
              draft 3 — unsent at midnight
            </span>

            <button
              onClick={handleResonance}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all border ${
                hasResonated
                  ? 'bg-ankahe-gold/20 text-ankahe-gold border-ankahe-gold/50 shadow-gold-glow font-medium'
                  : 'bg-ankahe-secondary hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-gold border-ankahe-border hover:border-ankahe-gold/40'
              }`}
              aria-label="I have felt this too"
            >
              <Heart
                size={13}
                className={hasResonated ? 'fill-ankahe-gold text-ankahe-gold' : 'text-ankahe-muted'}
              />
              <span>{hasResonated ? 'Recognised softly' : 'I have felt this too'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Tactile Warm Stationery Letter (World A + World B) */}
        <div className="lg:col-span-6 relative">
          {/* Subtle desk shadow and layered paper effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-ankahe-gold/10 to-transparent rounded-3xl blur-xl opacity-40 pointer-events-none" />

          <div className="relative paper-surface rounded-2xl p-7 sm:p-9 border border-ankahe-paper-border shadow-paper-warm text-ankahe-paper-dark space-y-5 transition-transform hover:-translate-y-1 duration-300">
            {/* Stationery Header */}
            <div className="flex items-center justify-between text-xs text-ankahe-paper-dark/60 pb-3 border-b border-dashed border-ankahe-paper-border">
              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ankahe-paper-dark/70">
                <BookOpen size={13} className="text-ankahe-gold-dark" />
                <span>Khata • Unsent Letter</span>
              </div>
              <span className="font-serif italic text-xs">
                Autumn, four years later
              </span>
            </div>

            {/* Letter Salutation & Excerpt */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl text-ankahe-paper-dark font-medium">
                To someone whose number I still know by heart,
              </h3>

              <p className="font-serif text-sm sm:text-base text-ankahe-paper-dark/85 leading-relaxed font-light">
                I walked past that old bakery near the station yesterday. They were still making those cinnamon biscuits you liked. For a split second, my hand reached into my coat pocket to text you.
              </p>
              <p className="font-serif text-sm sm:text-base text-ankahe-paper-dark/85 leading-relaxed font-light italic">
                Then I remembered we don’t do that anymore. It’s funny how muscle memory takes longer to unlearn than heartbreak.
              </p>
            </div>

            {/* Handwritten Postscript & Letter Modal Action */}
            <div className="pt-4 border-t border-dashed border-ankahe-paper-border flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-handwriting text-sm text-ankahe-paper-dark/75">
                P.S. I didn't buy the biscuits either.
              </span>

              <button
                onClick={() => onOpenLetter(featuredLetter)}
                className="inline-flex items-center gap-1 text-xs text-ankahe-gold-dark hover:text-ankahe-paper-dark font-medium underline underline-offset-4 transition-colors focus:outline-none"
              >
                <span>Read the complete letter</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
