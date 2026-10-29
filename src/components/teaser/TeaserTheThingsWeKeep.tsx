import React, { useState } from 'react';
import type { UnsentLetterItem } from '../../types';
import { SAMPLE_LETTERS } from '../../data/unsentLetters';
import { Heart, BookOpen, Quote } from 'lucide-react';

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
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full max-w-[1700px] mx-auto border-t border-white/[0.06] relative"
      aria-label="The things we keep"
    >
      {/* Editorial Section Label Spanning Widescreen */}
      <div className="flex items-center justify-between text-xs font-mono text-ankahe-gold tracking-widest uppercase mb-14 sm:mb-20">
        <div className="flex items-center gap-3">
          <span>01</span>
          <span className="w-12 h-[1px] bg-ankahe-gold/40" />
          <span>The Things We Keep</span>
        </div>
        <span className="text-[11px] text-ankahe-muted/50 hidden sm:inline">
          VOL. 01 • INTIMATE MEMORY
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
        {/* Left Column: Intimate Thought & Unsent Monologue */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-ankahe-text font-normal leading-[1.2] tracking-tight">
              Kabhi kuch kehna tha. <br />
              <span className="italic text-ankahe-gold font-serif bg-gradient-to-r from-ankahe-gold via-[#DFC49B] to-ankahe-gold bg-clip-text text-transparent">
                Phir socha, rehne do.
              </span>
            </h2>

            <p className="font-serif text-lg sm:text-2xl text-ankahe-muted/90 font-light leading-relaxed max-w-xl">
              Some words stay in your drafts. Some stay in your head. Not everything needs an audience, but some things just need somewhere in this world to exist.
            </p>
          </div>

          {/* Intimate Hindi/Urdu Observation Glass Card */}
          <div className="p-7 sm:p-9 rounded-2xl bg-ankahe-secondary/60 backdrop-blur-md border border-white/[0.08] shadow-2xl space-y-4 relative overflow-hidden group hover:border-ankahe-gold/40 transition-all">
            <Quote size={28} className="text-ankahe-gold/20 absolute top-4 right-4" />
            
            <blockquote className="font-serif text-lg sm:text-xl text-ankahe-text italic leading-relaxed">
              "Humne kitni baatein sirf isliye nahi kahi ki samne wala pareshan na ho jaye... aur phir ek din un baaton ne humein hi andar se chup kara diya."
            </blockquote>
            
            <p className="text-sm sm:text-base text-ankahe-muted font-light pt-1">
              Bas ek aadat reh gayi chup rehne ki, jise duniya ne hamara sukoon samajh liya.
            </p>
          </div>

          {/* Interactive Quiet Resonance Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <span className="font-handwriting text-sm sm:text-base text-ankahe-gold">
              draft 3 — unsent at midnight
            </span>

            <button
              onClick={handleResonance}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all border cursor-pointer ${
                hasResonated
                  ? 'bg-ankahe-gold/20 text-ankahe-gold border-ankahe-gold/60 shadow-gold-glow font-medium'
                  : 'bg-ankahe-secondary/80 hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-gold border-ankahe-border hover:border-ankahe-gold/50'
              }`}
              aria-label="I have felt this too"
            >
              <Heart
                size={14}
                className={hasResonated ? 'fill-ankahe-gold text-ankahe-gold' : 'text-ankahe-muted'}
              />
              <span>{hasResonated ? 'Recognised softly' : 'I have felt this too'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Tactile Warm Stationery Letter (Expansive, Realistic) */}
        <div className="lg:col-span-6 relative">
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-ankahe-gold/15 via-transparent to-ankahe-gold/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />

          <div className="relative paper-surface rounded-3xl p-8 sm:p-12 border border-ankahe-paper-border shadow-paper-warm text-ankahe-paper-dark space-y-6 transition-all hover:-translate-y-1 duration-300">
            {/* Stationery Header */}
            <div className="flex items-center justify-between text-xs text-ankahe-paper-dark/70 pb-4 border-b border-dashed border-ankahe-paper-border">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ankahe-paper-dark/80">
                <BookOpen size={14} className="text-ankahe-gold-dark" />
                <span>Khata • Unsent Letter</span>
              </div>
              <span className="font-serif italic text-xs sm:text-sm">
                Autumn, four years later
              </span>
            </div>

            {/* Letter Salutation & Excerpt */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl text-ankahe-paper-dark font-medium leading-snug">
                To someone whose number I still know by heart,
              </h3>

              <p className="font-serif text-base sm:text-lg text-ankahe-paper-dark/90 leading-relaxed font-light">
                I walked past that old bakery near the station yesterday. They were still making those cinnamon biscuits you liked. For a split second, my hand reached into my coat pocket to text you.
              </p>
              <p className="font-serif text-base sm:text-lg text-ankahe-paper-dark/90 leading-relaxed font-light italic">
                Then I remembered we don’t do that anymore. It’s funny how muscle memory takes longer to unlearn than heartbreak.
              </p>
            </div>

            {/* Handwritten Postscript & Modal Action */}
            <div className="pt-5 border-t border-dashed border-ankahe-paper-border flex flex-wrap items-center justify-between gap-4">
              <span className="font-handwriting text-base text-ankahe-paper-dark/80">
                P.S. I didn't buy the biscuits either.
              </span>

              <button
                onClick={() => onOpenLetter(featuredLetter)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-ankahe-gold-dark hover:text-ankahe-paper-dark font-medium underline underline-offset-4 transition-colors focus:outline-none cursor-pointer"
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
