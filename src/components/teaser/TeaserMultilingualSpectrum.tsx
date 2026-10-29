import React, { useState } from 'react';
import { Feather, Sun, Moon, Sparkles } from 'lucide-react';

interface SpectrumRealm {
  id: string;
  name: string;
  devanagari: string;
  watermark: string;
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
    watermark: 'सुकून',
    mood: 'For quiet afternoons and gentle pauses',
    icon: <Moon size={14} />,
    content: {
      primaryText: 'आईच्या हातचा चहा, जुन्या खिडकीतून येणारा गार वारा, आणि काहीही न बोलता एकमेकांच्या शेजारी बसून राहणं... काही दिवस इतके साधे असतात की ते मनात तसेच ओले राहतात।',
      primaryClass: 'poetry-devanagari text-xl sm:text-2xl md:text-3xl text-ankahe-text leading-relaxed font-normal',
      secondaryText: 'वो पुरानी छत और शाम की ढलती धूप... जब किसी बात की जल्दी नहीं थी। अब समझ आता है कि जिंदगी उसी ठहराव में थी।',
      note: 'Not all reflections carry sadness. Some simply carry peace.',
    },
  },
  {
    id: 'hope',
    name: 'A Little Hope',
    devanagari: 'उम्मीद • आशा',
    watermark: 'उम्मीद',
    mood: 'For small kindnesses and light cracking through',
    icon: <Sun size={14} />,
    content: {
      primaryText: 'A friend texted me yesterday out of nowhere: "Saw something funny today and thought of you. Have you eaten lunch yet?" It wasn’t poetry. But in the middle of a heavy week, that mundane check-in felt like someone cracking open a window.',
      primaryClass: 'font-serif text-lg sm:text-2xl text-ankahe-text leading-relaxed font-normal',
      secondaryText: 'Hope doesn’t always announce itself with trumpet calls. Sometimes it just asks how your day was.',
      note: 'It is okay to feel light again.',
    },
  },
  {
    id: 'poetry',
    name: 'Sher & Poetry',
    devanagari: 'शायरी • نظم',
    watermark: 'شاعری',
    mood: 'For words sculpted with rhythm and grace',
    icon: <Feather size={14} />,
    content: {
      primaryText: 'وہ جو بیان سے باہر ہے، وہی دل کے سب سے قریب ہے۔ خاموشی بھی ایک گفتگو ہے، بشرطیکہ سننے والا باخبر ہو۔',
      primaryClass: 'poetry-urdu text-2xl sm:text-3xl md:text-4xl text-ankahe-text leading-loose',
      isRtl: true,
      secondaryText: 'कभी-कभी शायरी सिर्फ लफ़्ज़ नहीं होती, वो दिल का वो कोना होती है जो किसी और ज़बान में खुल नहीं पाता।',
      note: 'Written across Devanagari, Urdu Nastaliq, and English scripts.',
    },
  },
  {
    id: 'nostalgia',
    name: 'Memory & Gratitude',
    devanagari: 'कृतज्ञता • यादें',
    watermark: 'यादें',
    mood: 'For people and moments that shaped who we are',
    icon: <Sparkles size={14} />,
    content: {
      primaryText: 'Maybe you miss someone. Maybe you miss who you were back then. Maybe you are just grateful that for a brief season, your stories overlapped.',
      primaryClass: 'font-serif text-lg sm:text-2xl text-ankahe-text leading-relaxed font-normal',
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
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full max-w-[1700px] mx-auto border-t border-white/[0.06] relative"
      aria-label="Different kinds of words"
    >
      {/* Editorial Section Label Spanning Widescreen */}
      <div className="flex items-center justify-between text-xs font-mono text-ankahe-gold tracking-widest uppercase mb-12 sm:mb-16">
        <div className="flex items-center gap-3">
          <span>02</span>
          <span className="w-12 h-[1px] bg-ankahe-gold/40" />
          <span>Different Kinds of Words</span>
        </div>
        <span className="text-[11px] text-ankahe-muted/50 hidden sm:inline">
          MULTILINGUAL • HINDI • MARATHI • URDU • ENGLISH
        </span>
      </div>

      <div className="space-y-12">
        {/* Editorial Heading Explaining the Spectrum */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-ankahe-text font-normal leading-[1.2] tracking-tight">
            ANKAHE is for more than heartbreak.
          </h2>
          <p className="font-serif text-lg sm:text-2xl text-ankahe-muted/90 font-light leading-relaxed">
            Words of gratitude, fleeting memories, quiet poetry, everyday friendship, and thoughts written on late-night commutes. Every emotion deserves a safe home.
          </p>
        </div>

        {/* Emotion & Tone Interactive Tabs */}
        <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Writing emotions">
          {SPECTRUM_REALMS.map((realm) => {
            const isActive = realm.id === activeRealmId;
            return (
              <button
                key={realm.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveRealmId(realm.id)}
                className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-xs sm:text-sm transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-ankahe-gold/20 text-ankahe-gold border-ankahe-gold/60 shadow-gold-glow font-medium'
                    : 'bg-ankahe-secondary/70 hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text border-white/[0.08]'
                }`}
              >
                <span>{realm.icon}</span>
                <span>{realm.name}</span>
                <span className="text-xs text-ankahe-gold/80 font-devanagari hidden sm:inline">
                  ({realm.devanagari})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Emotional Reflection Showcase (Cinematic Glass Card with Giant Watermark) */}
        <div className="relative rounded-3xl bg-ankahe-secondary/60 backdrop-blur-xl border border-white/[0.08] p-8 sm:p-14 shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Subtle Realm Watermark Floating Behind */}
          <div
            className="absolute right-4 -bottom-6 font-devanagari text-[12vw] text-white/[0.02] font-bold select-none pointer-events-none leading-none -z-0"
            aria-hidden="true"
          >
            {activeRealm.watermark}
          </div>

          <div className="relative z-10 space-y-8">
            {/* Tone Descriptor */}
            <div className="flex items-center justify-between text-xs text-ankahe-muted/70 pb-4 border-b border-white/[0.06]">
              <span className="font-mono uppercase tracking-widest text-xs text-ankahe-gold font-medium">
                {activeRealm.devanagari}
              </span>
              <span className="font-serif italic text-sm">
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
            <p className="font-serif text-base sm:text-xl text-ankahe-muted font-light leading-relaxed pt-2 border-t border-white/[0.06]">
              {activeRealm.content.secondaryText}
            </p>

            {/* Marginal Handwritten Note */}
            <div className="pt-2 flex items-center justify-between text-xs text-ankahe-muted">
              <span className="font-handwriting text-base text-ankahe-gold">
                ✦ {activeRealm.content.note}
              </span>
              <span className="text-xs font-mono text-ankahe-muted/60">
                multilingual typography
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
