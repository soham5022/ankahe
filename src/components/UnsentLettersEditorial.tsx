import React from 'react';
import { SAMPLE_LETTERS } from '../data/unsentLetters';
import type { UnsentLetterItem } from '../types';
import { Mail, ArrowRight } from 'lucide-react';

interface UnsentLettersEditorialProps {
  onOpenLetter: (letter: UnsentLetterItem) => void;
}

export const UnsentLettersEditorial: React.FC<UnsentLettersEditorialProps> = ({
  onOpenLetter,
}) => {
  return (
    <section id="letters" className="py-20 sm:py-32 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-ankahe-border/40 space-y-16">
      <div className="max-w-xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-ankahe-brown font-mono">
          Page 03 • Unsent Letters
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-ankahe-text font-normal">
          For the words that never found their way.
        </h2>
        <p className="text-sm text-ankahe-muted font-light leading-relaxed">
          Letters written in the middle of the night to strangers, younger versions of ourselves, and people we once knew.
        </p>
      </div>

      {/* Editorial List of Letters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {SAMPLE_LETTERS.map((letter) => (
          <article
            key={letter.id}
            onClick={() => onOpenLetter(letter)}
            className="group cursor-pointer paper-surface rounded-2xl p-7 sm:p-9 border border-ankahe-paper-border shadow-paper-warm hover:shadow-paper transition-all duration-300 space-y-4 text-ankahe-paper-dark"
          >
            <div className="flex items-center justify-between text-xs text-ankahe-brown pb-3 border-b border-dashed border-ankahe-paper-border">
              <span className="font-mono text-[11px] flex items-center gap-1.5">
                <Mail size={12} className="text-ankahe-brown" />
                {letter.dateText}
              </span>
              <span className="font-handwriting text-xs text-ankahe-brown">
                {letter.category}
              </span>
            </div>

            <h3 className="font-serif text-lg text-ankahe-paper-dark font-medium leading-snug group-hover:text-ankahe-brown transition-colors">
              "{letter.recipient}"
            </h3>

            <p className="text-sm text-ankahe-paper-dark/80 font-light leading-relaxed line-clamp-3 italic">
              "{letter.preview}"
            </p>

            <div className="pt-3 border-t border-dashed border-ankahe-paper-border flex items-center justify-between text-xs text-ankahe-paper-dark/70">
              <span className="font-serif italic text-xs">— {letter.author}</span>
              <span className="inline-flex items-center gap-1 text-xs text-ankahe-brown group-hover:translate-x-0.5 transition-transform font-medium">
                <span>Read letter</span>
                <ArrowRight size={12} />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
