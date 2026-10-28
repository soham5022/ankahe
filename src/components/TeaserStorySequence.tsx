import React, { useState } from 'react';
import type { UnsentLetterItem } from '../types';
import { SAMPLE_LETTERS } from '../data/unsentLetters';

interface TeaserStorySequenceProps {
  onOpenLetter: (letter: UnsentLetterItem) => void;
  onShowToast: (msg: string) => void;
}

export const TeaserStorySequence: React.FC<TeaserStorySequenceProps> = ({
  onOpenLetter,
  onShowToast,
}) => {
  const [feltOne, setFeltOne] = useState(false);
  const [feltFour, setFeltFour] = useState(false);

  // The featured unsent letter
  const featuredLetter = SAMPLE_LETTERS[2] || SAMPLE_LETTERS[0];

  const handleResonance = (moment: 'one' | 'four', msg: string) => {
    if (moment === 'one') setFeltOne((prev) => !prev);
    if (moment === 'four') setFeltFour((prev) => !prev);
    onShowToast(msg);
  };

  return (
    <div id="story-moments" className="space-y-28 sm:space-y-40 py-16 sm:py-24 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
      
      {/* ========================================================
          MOMENT ONE — SOMETHING UNSAID (Curiosity -> Recognition)
          Quiet, dark, intimate notebook fragment
          ======================================================== */}
      <section className="space-y-6 max-w-2xl border-l-2 border-ankahe-border/60 pl-6 sm:pl-10 py-2">
        <div className="flex items-center gap-2 text-xs font-mono text-ankahe-brown tracking-wider">
          <span>01</span>
          <span>•</span>
          <span>Something unsaid</span>
        </div>

        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-ankahe-text/95 font-normal leading-relaxed sm:leading-loose">
          "Humne kitni baatein sirf isliye nahi kahi ki samne wala pareshan na ho jaye... aur phir ek din un baaton ne humein hi andar se chup kara diya."
        </blockquote>

        <p className="font-serif italic text-base sm:text-lg text-ankahe-muted/80 leading-relaxed">
          Bas ek aadat reh gayi chup rehne ki, jise duniya ne hamara sukoon samajh liya.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-ankahe-muted">
          <span className="font-handwriting text-sm text-ankahe-gold">
            Written at 2:14 AM on the back of an old receipt
          </span>

          <button
            onClick={() => handleResonance('one', "Recognised softly in your thoughts.")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors border ${
              feltOne
                ? 'bg-ankahe-gold/20 text-ankahe-gold border-ankahe-gold/40 font-medium'
                : 'bg-ankahe-secondary hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-gold border-ankahe-border hover:border-ankahe-gold/50'
            }`}
          >
            <span>{feltOne ? 'Felt this' : 'I felt this'}</span>
          </button>
        </div>
      </section>

      {/* ========================================================
          MOMENT TWO — AN UNSENT LETTER (Connection)
          Warm paper surface against dark background
          ======================================================== */}
      <section className="space-y-6 sm:ml-auto max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-mono text-ankahe-brown tracking-wider">
          <span>02</span>
          <span>•</span>
          <span>An unsent letter</span>
        </div>

        {/* Warm Stationery Surface */}
        <div className="paper-surface rounded-2xl p-7 sm:p-10 border border-ankahe-paper-border shadow-paper-warm text-ankahe-paper-dark space-y-5">
          <div className="flex items-center justify-between text-xs text-ankahe-brown pb-3 border-b border-dashed border-ankahe-paper-border">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Khata • Unsent
            </span>
            <span className="font-serif italic text-xs text-ankahe-paper-dark/70">
              Autumn, four years later
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-ankahe-paper-dark font-medium">
            To someone whose number I still know by heart,
          </h3>

          <p className="font-serif text-sm sm:text-base text-ankahe-paper-dark/90 leading-relaxed font-light">
            I walked past that old bakery near the station yesterday. They were still making those cinnamon biscuits you liked. For a split second, my hand reached into my coat pocket to take out my phone and text you.
          </p>
          <p className="font-serif text-sm sm:text-base text-ankahe-paper-dark/90 leading-relaxed font-light italic">
            Then I remembered we don’t do that anymore. It’s funny how muscle memory takes longer to unlearn than heartbreak.
          </p>

          <div className="pt-4 border-t border-dashed border-ankahe-paper-border flex flex-wrap items-center justify-between gap-3 text-xs text-ankahe-paper-dark/70">
            <span className="font-handwriting text-sm text-ankahe-brown">
              P.S. I didn't buy the biscuits either.
            </span>

            <button
              onClick={() => onOpenLetter(featuredLetter)}
              className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold-dark hover:text-ankahe-paper-dark font-medium underline underline-offset-4 transition-colors"
            >
              <span>Read the full letter</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          MOMENT THREE — A MEMORY (Lived-in feeling)
          Ordinary, natural Marathi & Hindi reflection
          ======================================================== */}
      <section className="space-y-6 max-w-2xl py-2">
        <div className="flex items-center gap-2 text-xs font-mono text-ankahe-gold tracking-wider">
          <span>03</span>
          <span>•</span>
          <span>A memory</span>
        </div>

        {/* Marathi Reflection */}
        <div className="space-y-4">
          <blockquote className="poetry-devanagari text-lg sm:text-2xl text-ankahe-text font-normal leading-relaxed">
            "आईच्या हातचा चहा, जुन्या खिडकीतून येणारा गार वारा, आणि काहीही न बोलता एकमेकांच्या शेजारी बसून राहणं..."
          </blockquote>

          <p className="font-serif text-base sm:text-lg text-ankahe-muted leading-relaxed">
            काही दिवस इतके साधे असतात की ते घडताना त्यांचं मोल समजत नाही, पण वर्षानुवर्षे मनात तसेच ओले राहतात.
          </p>
        </div>

        {/* Hindi Counterpart / Ordinary Observation */}
        <div className="pt-4 border-t border-ankahe-border space-y-2">
          <p className="poetry-devanagari text-base sm:text-lg text-ankahe-text/90 leading-relaxed">
            वो पुरानी छत और शाम की ढलती धूप... जब किसी बात की जल्दी नहीं थी। अब समझ आता है कि जिंदगी उसी ठहराव में थी।
          </p>
          <span className="font-handwriting text-sm text-ankahe-gold block pt-1">
            Not all memories carry sadness. Some just carry peace.
          </span>
        </div>
      </section>

      {/* ========================================================
          MOMENT FOUR — A LITTLE HOPE (Warmth & New Beginnings)
          Warm, lighter moment of friendship and quiet gratitude
          ======================================================== */}
      <section className="space-y-6 sm:ml-auto max-w-2xl">
        <div className="flex items-center gap-2 text-xs font-mono text-ankahe-gold tracking-wider">
          <span>04</span>
          <span>•</span>
          <span>A little hope</span>
        </div>

        {/* Warm Secondary Surface Card */}
        <div className="bg-ankahe-secondary rounded-2xl p-7 sm:p-10 border border-ankahe-border space-y-4">
          <blockquote className="font-serif text-lg sm:text-xl text-ankahe-text font-normal leading-relaxed">
            "A friend texted me yesterday out of nowhere: 'Saw something funny today and thought of you. Have you eaten lunch yet?'"
          </blockquote>

          <p className="font-serif text-sm sm:text-base text-ankahe-muted leading-relaxed font-light">
            It wasn't poetry. It wasn't profound. But in the middle of a week where everything felt heavy, that mundane question felt like someone cracking open a window in a stuffy room.
          </p>

          <p className="font-serif italic text-sm sm:text-base text-ankahe-gold-light">
            Hope doesn't always shout. Sometimes it just asks how your day was.
          </p>

          <div className="pt-4 border-t border-ankahe-border flex items-center justify-between text-xs text-ankahe-muted">
            <span className="font-handwriting text-sm text-ankahe-gold">
              It’s okay to feel light again.
            </span>

            <button
              onClick={() => handleResonance('four', "Warmth sent into the quiet.")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors border ${
                feltFour
                  ? 'bg-ankahe-gold/20 text-ankahe-gold border-ankahe-gold/40 font-medium'
                  : 'bg-ankahe-elevated hover:bg-ankahe-secondary text-ankahe-muted hover:text-ankahe-gold border-ankahe-border hover:border-ankahe-gold/50'
              }`}
            >
              <span>{feltFour ? 'Warmth felt' : 'Sending warmth'}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
