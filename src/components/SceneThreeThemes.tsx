import React from 'react';
import { ArrowDown } from 'lucide-react';

interface SceneThreeThemesProps {
  onContinueToMultilingual: () => void;
}

const THEMES = [
  {
    num: 'I',
    title: "THE WORDS WE COULDN'T SAY",
    hindi: "जो बातें दिल में ही रह गईं",
    subtitle: "For the thoughts that stayed inside.",
    description: "The sentences swallowed back at dinner tables. The questions never asked. The confessions kept until the train pulled away.",
  },
  {
    num: 'II',
    title: "THE LETTERS WE NEVER SENT",
    hindi: "खत जो कभी डाक में नहीं डाले",
    subtitle: "For the things we needed to write, even if nobody ever read them.",
    description: "Addressed to childhood bedrooms, estranged friends, lost loves, and former versions of ourselves who needed gentleness.",
  },
  {
    num: 'III',
    title: "THE FEELINGS WE COULDN'T EXPLAIN",
    hindi: "जज़्बात जिन्हें नाम देना मुश्किल था",
    subtitle: "For the moments when someone else's words help us understand our own.",
    description: "The strange nostalgia of ordinary Tuesdays. The peace of sitting in silence with someone who asks nothing of you.",
  },
];

export const SceneThreeThemes: React.FC<SceneThreeThemesProps> = ({
  onContinueToMultilingual,
}) => {
  return (
    <section
      id="themes"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/40 relative overflow-hidden bg-ankahe-bg"
    >
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ankahe-secondary/80 border border-ankahe-border/60 text-xs text-ankahe-muted/80">
            <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold" />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Scene IV • A Glimpse of the World
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl text-ankahe-text font-normal">
            Three quiet pillars of ANKAHE.
          </h3>
          <p className="text-sm sm:text-base text-ankahe-muted/80 font-light max-w-lg mx-auto">
            Not features on a product checklist, but the three emotional spaces we are creating for you.
          </p>
        </div>

        {/* Narrative Chapters (Not a generic card grid!) */}
        <div className="space-y-16 sm:space-y-20 relative">
          {THEMES.map((theme) => (
            <div
              key={theme.num}
              className="relative pl-6 sm:pl-12 border-l border-ankahe-border/60 hover:border-ankahe-gold/60 transition-colors duration-300 space-y-4 group"
            >
              {/* Roman Numeral Accent */}
              <div className="flex items-center gap-3">
                <span className="font-serif text-sm tracking-widest text-ankahe-gold font-medium">
                  Theme {theme.num}
                </span>
                <span className="text-xs font-devanagari text-ankahe-muted/60 font-light">
                  {theme.hindi}
                </span>
              </div>

              {/* Theme Title */}
              <h4 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ankahe-text font-normal tracking-wide group-hover:text-ankahe-gold-light transition-colors">
                {theme.title}
              </h4>

              {/* Subtitle */}
              <p className="font-serif italic text-base sm:text-xl text-ankahe-gold/90 font-light">
                "{theme.subtitle}"
              </p>

              {/* Context Description */}
              <p className="text-sm sm:text-base text-ankahe-muted font-light leading-relaxed max-w-2xl">
                {theme.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transition cue */}
        <div className="text-center pt-8">
          <button
            onClick={onContinueToMultilingual}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ankahe-muted hover:text-ankahe-gold transition-colors py-2"
          >
            <span>A moment of recognition</span>
            <ArrowDown size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
