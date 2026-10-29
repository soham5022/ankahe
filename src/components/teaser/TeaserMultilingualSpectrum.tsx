import React, { useState } from 'react';
import { Feather, Sun, Moon, Sparkles } from 'lucide-react';

interface SpectrumRealm {
  id: string;
  name: string;
  devanagari: string;
  mood: string;
  icon: React.ReactNode;
  content: {
    primaryText: string;
    primaryClass: string;
    isRtl?: boolean;
    secondaryText: string;
    note: string;
  };
}

const SPECTRUM_REALMS: SpectrumRealm[] = [
  {
    id: 'peace',
    name: 'Stillness & Peace',
    devanagari: 'सुकून • शांतता',
    mood: 'For quiet afternoons and gentle pauses',
    icon: <Moon size={14} />,
    content: {
      primaryText: 'आईच्या हातचा चहा, जुन्या खिडकीतून येणारा गार वारा, आणि काहीही न बोलता एकमेकांच्या शेजारी बसून राहणं... काही दिवस इतके साधे असतात की ते मनात तसेच ओले राहतात।',
      primaryClass: 'poetry-devanagari text-lg sm:text-xl text-ankahe-text leading-relaxed font-normal',
      secondaryText: 'वो पुरानी छत और शाम की ढलती धूप... जब किसी बात की जल्दी नहीं थी। अब समझ आता है कि जिंदगी उसी ठहराव में थी।',
      note: 'Not all reflections carry sadness. Some simply carry peace.',
    },
  },
  {
    id: 'hope',
    name: 'A Little Hope',
    devanagari: 'उम्मीद • आशा',
    mood: 'For small kindnesses and light cracking through',
    icon: <Sun size={14} />,
    content: {
      primaryText: 'A friend texted me yesterday out of nowhere: "Saw something funny today and thought of you. Have you eaten lunch yet?" It wasn’t poetry. But in the middle of a heavy week, that mundane check-in felt like someone cracking open a window.',
      primaryClass: 'font-serif text-base sm:text-lg text-ankahe-text leading-relaxed font-normal',
      secondaryText: 'Hope doesn’t always announce itself with trumpet calls. Sometimes it just asks how your day was.',
      note: 'It is okay to feel light again.',
    },
  },
  {
    id: 'poetry',
    name: 'Sher & Poetry',
    devanagari: 'शायरी • نظم',
    mood: 'For words sculpted with rhythm and grace',
    icon: <Feather size={14} />,
    content: {
      primaryText: 'وہ جو بیان سے باہر ہے، وہی دل کے سب سے قریب ہے۔ خاموشی بھی ایک گفتگو ہے، بشرطیکہ سننے والا باخبر ہو۔',
      primaryClass: 'poetry-urdu text-xl sm:text-2xl text-ankahe-text leading-loose',
      isRtl: true,
      secondaryText: 'कभी-कभी शायरी सिर्फ लफ़्ज़ नहीं होती, वो दिल का वो कोना होती है जो किसी और ज़बान में खुल नहीं पाता।',
      note: 'Written across Devanagari, Urdu Nastaliq, and English scripts.',
    },
  },
  {
    id: 'nostalgia',
    name: 'Memory & Gratitude',
    devanagari: 'कृतज्ञता • यादें',
    mood: 'For people and moments that shaped who we are',
    icon: <Sparkles size={14} />,
    content: {
      primaryText: 'Maybe you miss someone. Maybe you miss who you were back then. Maybe you are just grateful that for a brief season, your stories overlapped.',
      primaryClass: 'font-serif text-base sm:text-lg text-ankahe-text leading-relaxed font-normal',
      secondaryText: 'कुछ लोग ज़िंदगी में सिर्फ इसलिए आते हैं ताकि वो बता सकें कि बिना मिले भी किसी को इज़्ज़त और मोहब्बत से याद रखा जा सकता है।',
      note: 'Gratitude needs no audience to be real.',
    },
  },
];

export const TeaserMultilingualSpectrum: React.FC = () => {
  const [activeRealmId, setActiveRealmId] = useState<string>('peace');
  const activeRealm = SPECTRUM_REALMS.find((r) => r.id === activeRealmId) || SPECTRUM_REALMS[0];

  return (
    <section
      id="scene-multilingual-spectrum"
      className="py-20 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto border-t border-ankahe-border/30 relative"
      aria-label="Different kinds of words"
    >
      {/* Editorial Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-ankahe-gold tracking-widest uppercase mb-10 sm:mb-14">
        <span>02</span>
        <span className="w-8 h-[1px] bg-ankahe-gold/40" />
        <span>Different Kinds of Words</span>
      </div>

      <div className="space-y-10">
        {/* Editorial Heading Explaining the Diversity */}
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal leading-tight">
            ANKAHE is for more than heartbreak.
          </h2>
          <p className="font-serif text-base sm:text-lg text-ankahe-muted/90 font-light leading-relaxed">
            Words of gratitude, fleeting memories, quiet poetry, everyday friendship, and thoughts written on late-night commutes. Every emotion deserves a safe home.
          </p>
        </div>

        {/* Emotion & Tone Interactive Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3" role="tablist" aria-label="Writing emotions">
          {SPECTRUM_REALMS.map((realm) => {
            const isActive = realm.id === activeRealmId;
            return (
              <button
                key={realm.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveRealmId(realm.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all border ${
                  isActive
                    ? 'bg-ankahe-gold/15 text-ankahe-gold border-ankahe-gold/50 shadow-gold-glow font-medium'
                    : 'bg-ankahe-secondary hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text border-ankahe-border'
                }`}
              >
                <span>{realm.icon}</span>
                <span>{realm.name}</span>
                <span className="text-[10px] text-ankahe-gold/80 font-devanagari hidden sm:inline">
                  ({realm.devanagari})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Emotional Reflection Showcase */}
        <div className="relative rounded-2xl bg-ankahe-secondary/60 border border-ankahe-border/60 p-7 sm:p-10 backdrop-blur-sm transition-all duration-300">
          <div className="space-y-6">
            {/* Tone Descriptor */}
            <div className="flex items-center justify-between text-xs text-ankahe-muted/70 pb-3 border-b border-ankahe-border/40">
              <span className="font-mono uppercase tracking-wider text-[11px] text-ankahe-gold">
                {activeRealm.devanagari}
              </span>
              <span className="font-serif italic">
                {activeRealm.mood}
              </span>
            </div>

            {/* Primary Multi-Script Quote */}
            <blockquote
              dir={activeRealm.content.isRtl ? 'rtl' : 'ltr'}
              className={activeRealm.content.primaryClass}
            >
              {activeRealm.content.primaryText}
            </blockquote>

            {/* Supporting Reflection */}
            <p className="font-serif text-sm sm:text-base text-ankahe-muted font-light leading-relaxed pt-2 border-t border-ankahe-border/30">
              {activeRealm.content.secondaryText}
            </p>

            {/* Marginal Handwritten Note */}
            <div className="pt-2 flex items-center justify-between text-xs text-ankahe-muted">
              <span className="font-handwriting text-sm text-ankahe-gold">
                ✦ {activeRealm.content.note}
              </span>
              <span className="text-[11px] font-mono text-ankahe-muted/50">
                multilingual typography
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
