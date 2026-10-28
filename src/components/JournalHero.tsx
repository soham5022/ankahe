import React from 'react';
import { ArrowDown, Feather, BookOpen } from 'lucide-react';

interface JournalHeroProps {
  onWrite: () => void;
  onRead: () => void;
}

export const JournalHero: React.FC<JournalHeroProps> = ({ onWrite, onRead }) => {
  return (
    <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
        {/* Main Conversation Column (Left-Aligned, Editorial) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Small introductory text */}
          <div className="flex items-center gap-3">
            <span className="font-handwriting text-base text-ankahe-brown tracking-wide">
              Come as you are.
            </span>
            <span className="w-8 h-[1px] bg-ankahe-border" />
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-[1.25] tracking-tight">
            Ever had something on your mind that you just{' '}
            <span className="italic text-ankahe-brown-light font-serif">couldn't say?</span>
          </h1>

          {/* Conversational Supporting Text */}
          <div className="space-y-4 text-base sm:text-lg text-ankahe-muted font-light leading-relaxed max-w-xl">
            <p>
              Maybe it's a person you miss. Maybe it's something that happened today. Maybe it's just a thought you don't know what to do with.
            </p>
            <p className="text-ankahe-text/90 font-serif italic text-base sm:text-lg">
              You can write it here. Or you can just read for a while.
            </p>
          </div>

          {/* Natural Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onWrite}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-colors shadow-sm"
            >
              <Feather size={14} className="text-ankahe-brown" />
              <span>Write something</span>
            </button>

            <button
              onClick={onRead}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-sm text-ankahe-text/90 hover:text-ankahe-text border border-ankahe-border transition-colors"
            >
              <BookOpen size={14} className="text-ankahe-muted" />
              <span>Read a little</span>
            </button>
          </div>
        </div>

        {/* Editorial Marginal Note (Right Side) */}
        <div className="lg:col-span-4 lg:pt-14 space-y-6">
          {/* Tucked note: warm paper fragment */}
          <div className="paper-surface rounded-2xl p-6 border border-ankahe-paper-border shadow-paper-warm space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-ankahe-brown block">
              Editorial Note • नोंद
            </span>
            <p className="text-xs sm:text-sm text-ankahe-paper-dark font-light leading-relaxed">
              This is not a social network. There are no followers, no public like counts, and no algorithms deciding who gets seen.
            </p>
            <p className="font-handwriting text-sm text-ankahe-brown pt-1">
              "Words don't need applause to matter."
            </p>
          </div>

          {/* Scroll down indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-ankahe-muted/60 font-light pl-2">
            <ArrowDown size={12} />
            <span>Turn the page</span>
          </div>
        </div>
      </div>
    </section>
  );
};
