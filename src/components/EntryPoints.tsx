import React from 'react';
import { Feather, BookOpen, Compass, ArrowUpRight } from 'lucide-react';

interface EntryPointsProps {
  onBeginWriting: () => void;
  onExploreWords: () => void;
  onEnterQuietCorner: () => void;
}

export const EntryPoints: React.FC<EntryPointsProps> = ({
  onBeginWriting,
  onExploreWords,
  onEnterQuietCorner,
}) => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="font-handwriting text-lg sm:text-xl text-ankahe-gold tracking-wide">
            Three quiet doors
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ankahe-text mt-1 font-normal">
            Choose the door that meets you where you are.
          </h2>
          <p className="text-sm text-ankahe-muted/90 mt-2 font-light">
            You don't have to explain your choice. Start wherever feels comfortable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* 1. Write what's on your mind */}
          <div className="group relative bg-ankahe-secondary/70 hover:bg-ankahe-elevated rounded-2xl p-7 sm:p-8 border border-ankahe-border hover:border-ankahe-gold/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-elevated">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-ankahe-elevated border border-ankahe-border flex items-center justify-center text-ankahe-gold group-hover:scale-105 group-hover:border-ankahe-gold/40 transition-all duration-300">
                <Feather size={20} />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-ankahe-muted/70 font-medium">
                  Door One
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-ankahe-text font-normal group-hover:text-ankahe-gold transition-colors">
                  Write what's on your mind
                </h3>
                <p className="text-sm text-ankahe-muted/90 font-light leading-relaxed">
                  A thought, a memory, an unsent line, or something you haven't been able to say out loud.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onBeginWriting}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-ankahe-gold hover:text-ankahe-gold-light group/btn focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-gold"
              >
                <span>Open Notebook</span>
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 2. Read something that feels familiar */}
          <div className="group relative bg-ankahe-secondary/70 hover:bg-ankahe-elevated rounded-2xl p-7 sm:p-8 border border-ankahe-border hover:border-ankahe-border-light transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-elevated">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-ankahe-elevated border border-ankahe-border flex items-center justify-center text-ankahe-muted group-hover:text-ankahe-text group-hover:scale-105 transition-all duration-300">
                <BookOpen size={20} />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-ankahe-muted/70 font-medium">
                  Door Two
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-ankahe-text font-normal group-hover:text-ankahe-text transition-colors">
                  Read what feels familiar
                </h3>
                <p className="text-sm text-ankahe-muted/90 font-light leading-relaxed">
                  Discover words written by people who have carried feelings very similar to yours.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onExploreWords}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-ankahe-text/90 hover:text-ankahe-gold group/btn focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-gold"
              >
                <span>Explore Words</span>
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* 3. I'm just here to read / Quiet Corner */}
          <div className="group relative bg-ankahe-secondary/70 hover:bg-ankahe-elevated rounded-2xl p-7 sm:p-8 border border-ankahe-border hover:border-ankahe-rose/40 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-elevated">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-ankahe-elevated border border-ankahe-border flex items-center justify-center text-ankahe-rose group-hover:scale-105 group-hover:border-ankahe-rose/40 transition-all duration-300">
                <Compass size={20} />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-ankahe-muted/70 font-medium">
                  Door Three
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-ankahe-text font-normal group-hover:text-ankahe-rose transition-colors">
                  I'm just here to read
                </h3>
                <p className="text-sm text-ankahe-muted/90 font-light leading-relaxed">
                  No expectations. No need to post or interact. Simply sit with quiet words and gentle rain.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onEnterQuietCorner}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium text-ankahe-rose hover:text-ankahe-rose-light group/btn focus:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-rose"
              >
                <span>Step Into Quiet Corner</span>
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
