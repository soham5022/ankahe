import React from 'react';
import { Feather, BookOpen } from 'lucide-react';

interface WelcomeNotPoetProps {
  onWrite: () => void;
  onRead: () => void;
}

export const WelcomeNotPoet: React.FC<WelcomeNotPoetProps> = ({ onWrite, onRead }) => {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-ankahe-border/40">
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-handwriting text-base text-ankahe-brown tracking-wide">
            A quiet reassurance
          </span>
          <span className="w-8 h-[1px] bg-ankahe-border" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-tight">
          You don't have to be a poet.
        </h2>

        <div className="space-y-3 text-base sm:text-lg text-ankahe-muted font-light leading-relaxed">
          <p>
            You can write two lines that make sense only to you. You can write a whole page. You can start and stop halfway through.
          </p>
          <p className="font-serif italic text-ankahe-text/90">
            There's no right way to put a feeling into words.
          </p>
        </div>

        {/* Straightforward human choices */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={onWrite}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-colors shadow-sm"
          >
            <Feather size={14} className="text-ankahe-brown" />
            <span>Write what's on your mind</span>
          </button>

          <button
            onClick={onRead}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-sm text-ankahe-text/90 hover:text-ankahe-text border border-ankahe-border transition-colors"
          >
            <BookOpen size={14} className="text-ankahe-muted" />
            <span>Read what others have written</span>
          </button>
        </div>
      </div>
    </section>
  );
};
