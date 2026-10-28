import React, { useState } from 'react';
import { MULTILINGUAL_RECOGNITION } from '../data/teaserFragments';
import { ArrowDown, Globe } from 'lucide-react';

interface SceneMultilingualRecognitionProps {
  onContinueToInvitation: () => void;
}

export const SceneMultilingualRecognition: React.FC<SceneMultilingualRecognitionProps> = ({
  onContinueToInvitation,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Hindi');

  const current =
    MULTILINGUAL_RECOGNITION.find((m) => m.language === selectedLanguage) ||
    MULTILINGUAL_RECOGNITION[0];

  return (
    <section
      id="recognition"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/40 relative overflow-hidden bg-ankahe-secondary/20"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ankahe-secondary/80 border border-ankahe-border/60 text-xs text-ankahe-muted/80">
            <Globe size={12} className="text-ankahe-gold" />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              Scene V • A Small Moment of Recognition
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-5xl text-ankahe-text font-normal">
            Somewhere, someone might understand.
          </h3>
          <p className="text-sm sm:text-base text-ankahe-muted/90 font-light max-w-lg mx-auto">
            Different lives. Different stories. Sometimes, the same feelings.
          </p>
        </div>

        {/* Language Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {MULTILINGUAL_RECOGNITION.map((item) => {
            const isSelected = selectedLanguage === item.language;
            return (
              <button
                key={item.language}
                onClick={() => setSelectedLanguage(item.language)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 border ${
                  isSelected
                    ? 'bg-ankahe-elevated text-ankahe-gold border-ankahe-gold/60 shadow-sm font-medium'
                    : 'bg-transparent text-ankahe-muted border-ankahe-border hover:border-ankahe-muted/60 hover:text-ankahe-text'
                }`}
              >
                {item.language}
              </button>
            );
          })}
        </div>

        {/* Selected Language Display Card */}
        <div className="paper-texture text-ankahe-paper-dark rounded-3xl p-8 sm:p-14 border border-ankahe-paper-border shadow-paper-warm space-y-6 max-w-2xl mx-auto transition-all duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-dashed border-ankahe-paper-border text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-ankahe-paper-muted text-[11px] font-medium text-ankahe-paper-dark uppercase">
              {current.language}
            </span>
            <span className="text-[11px] font-serif italic text-ankahe-paper-faint">
              Tone: {current.tone}
            </span>
          </div>

          <div className="py-6 min-h-[120px] flex items-center justify-center text-center">
            <div className="space-y-3 w-full">
              {current.lines.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-lg sm:text-2xl font-normal leading-relaxed sm:leading-loose ${
                    current.language === 'Urdu'
                      ? 'poetry-urdu text-right w-full text-xl sm:text-3xl'
                      : current.language === 'Hindi' || current.language === 'Marathi'
                      ? 'poetry-devanagari'
                      : 'font-serif italic'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-ankahe-paper-border flex items-center justify-between text-xs text-ankahe-paper-faint">
            <span className="font-sans text-[11px]">
              Every dialect of the heart is honored.
            </span>
            <span className="font-serif">ANKAHE • अनकहे</span>
          </div>
        </div>

        {/* Honest illustrative note */}
        <p className="text-center text-xs text-ankahe-muted/50 font-light max-w-md mx-auto">
          Illustrative fragments representing the multilingual soul of the future community. No fake metrics or rankings.
        </p>

        {/* Transition cue */}
        <div className="text-center pt-4">
          <button
            onClick={onContinueToInvitation}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ankahe-gold hover:text-ankahe-gold-light transition-colors py-2"
          >
            <span>The Invitation</span>
            <ArrowDown size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
