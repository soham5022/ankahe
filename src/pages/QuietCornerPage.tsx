import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Moon } from 'lucide-react';

interface QuietThought {
  id: string;
  lines: string[];
  author: string;
  language: string;
  isPaper: boolean;
}

const QUIET_COLLECTION: QuietThought[] = [
  {
    id: 'q-1',
    lines: [
      'You don’t have to prove anything today.',
      'The tea is warm, the room is quiet,',
      'and you survived another week without losing your kindness.',
    ],
    author: 'A quiet evening',
    language: 'English',
    isPaper: true,
  },
  {
    id: 'q-2',
    lines: [
      'कधी कधी एकांत म्हणजे एकटेपणा नसतो.',
      'तो स्वतःला पुन्हा भेटण्याचा शांत मार्ग असतो.',
    ],
    author: 'मनातली नोंद',
    language: 'Marathi',
    isPaper: false,
  },
  {
    id: 'q-3',
    lines: [
      'Humne raaste badle nahi the,',
      'bas thodi der ke liye ped ki chhaon mein baith gaye the.',
      'Thoda rukna bhi chalne ka hi hissa hota hai.',
    ],
    author: 'Dopehar ka sukoon',
    language: 'Hinglish',
    isPaper: true,
  },
  {
    id: 'q-4',
    lines: [
      'رات خاموش ہے اور دل مطمئن،',
      'کچھ کہے بغیر بھی بات سمجھ آ جاتی ہے۔',
    ],
    author: 'شام کا وقت',
    language: 'Urdu',
    isPaper: false,
  },
  {
    id: 'q-5',
    lines: [
      'Some memories don’t sting anymore.',
      'They just sit quietly beside you on the bus,',
      'looking out the same window at the distant rain.',
    ],
    author: 'Eleanor',
    language: 'English',
    isPaper: true,
  },
];

export const QuietCornerPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = QUIET_COLLECTION[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % QUIET_COLLECTION.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + QUIET_COLLECTION.length) % QUIET_COLLECTION.length);
  };

  return (
    <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col justify-between p-6 sm:p-12 lg:p-20 selection:bg-ankahe-gold/25 selection:text-ankahe-text relative">
      
      {/* Top Controls: Return to Community */}
      <header className="flex items-center justify-between max-w-4xl mx-auto w-full">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-xs text-ankahe-muted hover:text-ankahe-gold transition-colors py-2 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Return to Community</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-ankahe-gold/70">
          <Moon size={13} className="text-ankahe-gold" />
          <span>Quiet Corner • एकांत</span>
        </div>
      </header>

      {/* Central Reading Focus (Generous Whitespace, Max-Width 680px) */}
      <main className="max-w-2xl mx-auto w-full my-auto py-16 sm:py-24 space-y-12 text-center">
        
        {/* Intro */}
        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal leading-tight">
            You don't have to say anything.
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-ankahe-muted/80">
            You can simply be here for a while.
          </p>
        </div>

        {/* Thought Display */}
        <div 
          className={`rounded-3xl p-8 sm:p-14 border transition-all duration-500 space-y-6 ${
            current.isPaper
              ? 'paper-surface border-ankahe-paper-border shadow-paper text-ankahe-paper-dark'
              : 'bg-ankahe-secondary border-ankahe-border text-ankahe-text shadow-subtle'
          }`}
        >
          <div className="space-y-4">
            {current.lines.map((line, idx) => (
              <p
                key={idx}
                dir={current.language === 'Urdu' ? 'rtl' : 'ltr'}
                className={`leading-relaxed sm:leading-loose ${
                  current.language === 'Urdu'
                    ? 'poetry-urdu text-2xl sm:text-3xl text-right'
                    : current.language === 'Marathi'
                    ? 'poetry-devanagari text-lg sm:text-2xl font-normal'
                    : 'font-serif text-lg sm:text-2xl font-light'
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="pt-4 border-t border-dashed border-ankahe-border/60 flex items-center justify-between text-xs opacity-70">
            <span className="font-serif italic">— {current.author}</span>
            <span className="font-mono text-[11px]">{current.language}</span>
          </div>
        </div>

        {/* Subtle Next / Previous Navigation */}
        <div className="flex items-center justify-center gap-6 pt-4">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-ankahe-muted hover:text-ankahe-text bg-ankahe-secondary/50 border border-ankahe-border transition-colors"
            aria-label="Previous quiet reflection"
          >
            <ArrowLeft size={13} />
            <span>Previous</span>
          </button>

          <span className="font-mono text-xs text-ankahe-muted/50">
            {currentIndex + 1} of {QUIET_COLLECTION.length}
          </span>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-ankahe-muted hover:text-ankahe-text bg-ankahe-secondary/50 border border-ankahe-border transition-colors"
            aria-label="Next quiet reflection"
          >
            <span>Next</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </main>

      {/* Quiet Footer Note */}
      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-ankahe-muted/50 font-light space-y-1">
        <p>No timers. No reading streaks. No notifications.</p>
        <p className="text-[11px] text-ankahe-muted/40">
          This quiet space is designed for reflection and rest, not as a substitute for professional healthcare.
        </p>
      </footer>

    </div>
  );
};
