import React, { useState } from 'react';

interface LanguageFragment {
  language: string;
  nativeLabel: string;
  context: string;
  text: string[];
  script: 'devanagari' | 'nastaliq' | 'latin';
}

const FRAGMENTS: LanguageFragment[] = [
  {
    language: 'Hindi',
    nativeLabel: 'हिंदी',
    context: 'A quiet realization',
    text: ['कभी किसी की खामोशी सुनी है?', 'वो चीखों से भी ज्यादा भारी होती है।'],
    script: 'devanagari',
  },
  {
    language: 'Marathi',
    nativeLabel: 'मराठी',
    context: 'Unspoken weight',
    text: ['काही गोष्टी मनातच राहतात,', 'कागदावर आल्या तरी कोणाला दाखवता येत नाहीत.'],
    script: 'devanagari',
  },
  {
    language: 'Hinglish',
    nativeLabel: 'Hinglish',
    context: 'Growing up in between',
    text: [
      'We grew up pretending we didn’t care,',
      'until we forgot how to show that we did.',
    ],
    script: 'latin',
  },
  {
    language: 'Urdu',
    nativeLabel: 'اردو',
    context: 'Longing for quiet understanding',
    text: ['کبھی کبھی دل چاہتا ہے کہ', 'کوئی بغیر بولے سب کچھ سمجھ لے'],
    script: 'nastaliq',
  },
  {
    language: 'English',
    nativeLabel: 'English',
    context: 'Gently carrying the past',
    text: [
      'It isn’t that I have forgotten.',
      'It’s just that I have learned where to put the memory so it doesn’t hurt the bruised parts.',
    ],
    script: 'latin',
  },
];

export const MultilingualGlimpse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Hindi');
  const current = FRAGMENTS.find((f) => f.language === activeTab) || FRAGMENTS[0];

  return (
    <section id="languages" className="py-20 sm:py-32 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-ankahe-border/40 space-y-12">
      {/* Editorial Header */}
      <div className="max-w-xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-ankahe-brown font-mono">
          Page 04 • Different Tongues
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-ankahe-text font-normal">
          Feelings spoken in every mother tongue.
        </h2>
        <p className="text-sm text-ankahe-muted font-light leading-relaxed">
          Some sentiments can only be properly held in Hindi, Marathi, or Urdu; others in Hinglish or English. ANKAHE welcomes every script and dialect of the heart.
        </p>
      </div>

      {/* Language Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ankahe-border/60 pb-3">
        {FRAGMENTS.map((item) => (
          <button
            key={item.language}
            onClick={() => setActiveTab(item.language)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === item.language
                ? 'bg-ankahe-paper text-ankahe-ink shadow-sm'
                : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary'
            }`}
          >
            <span>{item.language}</span>
            <span className="ml-1.5 opacity-60 font-light">({item.nativeLabel})</span>
          </button>
        ))}
      </div>

      {/* Literary Presentation Box */}
      <div className="max-w-2xl paper-surface rounded-2xl p-7 sm:p-10 border border-ankahe-paper-border shadow-paper-warm space-y-6">
        <div className="flex items-center justify-between text-xs text-ankahe-brown pb-3 border-b border-dashed border-ankahe-paper-border">
          <span className="font-mono text-[11px] uppercase tracking-wider">
            {current.language} • {current.context}
          </span>
          <span className="font-serif italic text-ankahe-paper-dark/70">
            ANKAHE • अनकहे
          </span>
        </div>

        <div className="py-4">
          {current.script === 'nastaliq' ? (
            <div className="space-y-3 text-right" dir="rtl">
              {current.text.map((line, i) => (
                <p key={i} className="poetry-urdu text-xl sm:text-2xl text-ankahe-paper-dark leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ) : current.script === 'devanagari' ? (
            <div className="space-y-2">
              {current.text.map((line, i) => (
                <p key={i} className="poetry-devanagari text-lg sm:text-xl text-ankahe-paper-dark leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {current.text.map((line, i) => (
                <p key={i} className="font-serif italic text-base sm:text-lg text-ankahe-paper-dark leading-relaxed">
                  "{line}"
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-dashed border-ankahe-paper-border text-xs text-ankahe-paper-dark/60 flex items-center justify-between">
          <span className="font-handwriting text-sm text-ankahe-brown">
            Untranslated and understood.
          </span>
          <span className="font-mono text-[11px]">
            Original writing
          </span>
        </div>
      </div>
    </section>
  );
};
