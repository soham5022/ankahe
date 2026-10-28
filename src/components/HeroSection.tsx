import React from 'react';
import { Feather, BookOpen, Moon } from 'lucide-react';

interface HeroSectionProps {
  onExpressYourself: () => void;
  onReadSomething: () => void;
  onJustBeHere: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExpressYourself,
  onReadSomething,
  onJustBeHere,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden"
    >
      {/* Delicate background ambient noise & soft warmth */}
      <div
        className="absolute inset-0 pointer-events-none midnight-noise opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[460px] bg-gradient-to-b from-ankahe-gold/5 via-ankahe-rose/5 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Tender Handwritten Note Tucked In */}
      <div className="relative mb-6 sm:mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ankahe-elevated/70 border border-ankahe-border/60 text-xs shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-ankahe-gold/80" />
        <span className="font-handwriting text-sm sm:text-base text-ankahe-gold-light tracking-wide">
          You don't need to be a poet to belong here.
        </span>
      </div>

      {/* Main Headline */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-normal tracking-tight text-ankahe-text leading-[1.25] sm:leading-[1.18]">
          Not everything needs to be <br className="hidden sm:inline" />
          <span className="italic font-normal text-ankahe-gold/90 font-serif">said aloud.</span>
        </h1>

        {/* Emotionally direct, conversational supporting copy */}
        <div className="max-w-xl mx-auto space-y-2 text-base sm:text-lg md:text-xl text-ankahe-muted/90 font-light leading-relaxed px-2">
          <p>
            Maybe you miss someone. Maybe something has been on your mind all day. Maybe you just have a few words you need to let out.
          </p>
          <p className="font-serif italic text-ankahe-text/95 pt-1 text-base sm:text-lg">
            Whatever it is, you can start here.
          </p>
        </div>

        {/* Devanagari gentle whisper */}
        <p className="font-devanagari text-sm sm:text-base text-ankahe-muted/70 tracking-wide font-light pt-1">
          कुछ बातें सिर्फ कागज़ और खामोशी ही समझ पाते हैं।
        </p>
      </div>

      {/* Human Call to Action Buttons */}
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none">
        {/* Primary Invitation */}
        <button
          onClick={onExpressYourself}
          className="w-full sm:w-auto px-7 py-3 rounded-full bg-ankahe-elevated hover:bg-ankahe-hover text-ankahe-text text-sm sm:text-base font-normal border border-ankahe-gold/50 hover:border-ankahe-gold transition-all duration-300 shadow-elevated hover:shadow-gold-glow flex items-center justify-center gap-2.5 group"
          id="hero-cta-express"
        >
          <Feather size={16} className="text-ankahe-gold group-hover:-translate-y-0.5 transition-transform duration-200" />
          <span>Write what's on your mind</span>
        </button>

        {/* Secondary Invitation */}
        <button
          onClick={onReadSomething}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-ankahe-text text-sm sm:text-base font-normal border border-ankahe-border hover:border-ankahe-muted/60 transition-all duration-200 flex items-center justify-center gap-2"
          id="hero-cta-read"
        >
          <BookOpen size={16} className="text-ankahe-muted" />
          <span>Read something that feels familiar</span>
        </button>

        {/* Quiet Sanctuary Option */}
        <button
          onClick={onJustBeHere}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm text-ankahe-muted/80 hover:text-ankahe-gold hover:bg-ankahe-secondary/60 transition-all duration-200 flex items-center justify-center gap-2 border border-transparent hover:border-ankahe-border/60"
          title="No writing or reading required. Just a calm midnight breathing room."
          id="hero-cta-quiet"
        >
          <Moon size={14} className="text-ankahe-gold/80" />
          <span>I'm just here to read</span>
        </button>
      </div>

      {/* Gentle scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ankahe-muted/40 text-xs font-light pointer-events-none">
        <span className="tracking-widest uppercase text-[10px]">Take your time</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-ankahe-muted/40 to-transparent" />
      </div>
    </section>
  );
};
