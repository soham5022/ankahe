import React, { useState } from 'react';
import { Heart, Bookmark, Sun } from 'lucide-react';

interface EditorialWritingsProps {
  onShowToast: (msg: string) => void;
}

export const EditorialWritings: React.FC<EditorialWritingsProps> = ({ onShowToast }) => {
  // Local state for gentle resonances
  const [resonances, setResonances] = useState<Record<string, { felt?: boolean; stayed?: boolean; warmth?: boolean }>>({});

  const toggleResonance = (id: string, type: 'felt' | 'stayed' | 'warmth', toastMsg: string) => {
    setResonances((prev) => {
      const current = prev[id] || {};
      const nextVal = !current[type];
      return {
        ...prev,
        [id]: { ...current, [type]: nextVal },
      };
    });
    onShowToast(toastMsg);
  };

  return (
    <section id="readings" className="py-20 sm:py-32 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-24">
      {/* Section Introduction: Editorial, not corporate */}
      <div className="max-w-xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-ankahe-brown font-mono">
          Page 01 • Human Fragments
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-ankahe-text font-normal">
          Thoughts carried through ordinary days.
        </h2>
        <p className="text-sm text-ankahe-muted font-light leading-relaxed">
          Not polished literature or competition. Just feelings given words by different lives.
        </p>
      </div>

      {/* Narrative Spread: Varied Presentations */}
      <div className="space-y-20 sm:space-y-28">
        
        {/* Fragment 1: Breathable Hinglish Shayari (Left-Aligned, Generous Spacing) */}
        <div className="max-w-2xl border-l-2 border-ankahe-border pl-6 sm:pl-8 space-y-4">
          <blockquote className="text-xl sm:text-2xl text-ankahe-text/95 font-serif leading-relaxed sm:leading-loose">
            "kabhi kabhi us insaan ki yaad nahi aati,<br />
            bas uske saath wala apna aap yaad aata hai."
          </blockquote>
          
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-ankahe-muted">
            <span className="font-mono text-[11px] text-ankahe-muted/70">
              Late night balcony • Hinglish
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleResonance('f-1', 'felt', "You let this know it was felt.")}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                  resonances['f-1']?.felt
                    ? 'bg-ankahe-faded-rose/20 text-ankahe-faded-rose'
                    : 'text-ankahe-muted hover:text-ankahe-faded-rose hover:bg-ankahe-secondary'
                }`}
              >
                <Heart size={12} className={resonances['f-1']?.felt ? 'fill-current' : ''} />
                <span>I felt this</span>
              </button>

              <button
                onClick={() => toggleResonance('f-1', 'stayed', "Saved softly in your thoughts.")}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                  resonances['f-1']?.stayed
                    ? 'bg-ankahe-brown/20 text-ankahe-brown-light'
                    : 'text-ankahe-muted hover:text-ankahe-brown-light hover:bg-ankahe-secondary'
                }`}
              >
                <Bookmark size={12} className={resonances['f-1']?.stayed ? 'fill-current' : ''} />
                <span>Stayed with me</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fragment 2: Warm Paper Surface Note (Offset, Devanagari Marathi Thought) */}
        <div className="sm:ml-auto max-w-xl paper-surface rounded-2xl p-7 sm:p-9 border border-ankahe-paper-border shadow-paper-warm space-y-5">
          <div className="flex items-center justify-between text-xs text-ankahe-brown pb-3 border-b border-dashed border-ankahe-paper-border">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Marathi • मराठी नोंद
            </span>
            <span className="font-handwriting text-xs text-ankahe-brown">
              साध्या गोष्टींचा सांत्वन
            </span>
          </div>

          <blockquote className="poetry-devanagari text-base sm:text-lg text-ankahe-paper-dark font-normal leading-relaxed">
            "आज काही विशेष घडलं नाही,<br />
            पण मनात खूप काही साचलं होतं.<br />
            कधी कधी रिकाम्या हातात चहाचा कप धरून बसणं हीच सगळ्यात मोठी गरज असते."
          </blockquote>

          <div className="pt-2 flex items-center justify-between text-xs text-ankahe-paper-dark/70">
            <span className="font-serif italic text-xs">
              — सई, एका शांत संध्याकाळी
            </span>

            <button
              onClick={() => toggleResonance('f-2', 'warmth', "Warmth sent into the quiet.")}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                resonances['f-2']?.warmth
                  ? 'bg-amber-200/60 text-amber-900 font-medium'
                  : 'text-ankahe-paper-dark/80 hover:bg-ankahe-paper-muted'
              }`}
            >
              <Sun size={12} />
              <span>Sending warmth</span>
            </button>
          </div>
        </div>

        {/* Fragment 3: Narrow Reading Column (Hesitation & Unsent Message) */}
        <div className="max-w-md space-y-4 py-2">
          <span className="font-handwriting text-sm text-ankahe-muted-grey block">
            Three drafts that never left:
          </span>

          <blockquote className="editorial-prose font-serif text-base sm:text-lg text-ankahe-text/90 font-light leading-relaxed space-y-3">
            <p>
              I wrote the message three times. First with an apology, then as a casual question, then as a little joke.
            </p>
            <p className="italic text-ankahe-brown-light">
              Then I deleted all of it and put my phone face down.
            </p>
            <p>
              I realised I didn't actually want a reply. I just wanted them to have known.
            </p>
          </blockquote>

          <div className="pt-2 flex items-center justify-between text-xs text-ankahe-muted/60">
            <span>Anonymous reflection</span>
            <button
              onClick={() => toggleResonance('f-3', 'felt', "Recognised and felt.")}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs transition-colors ${
                resonances['f-3']?.felt ? 'text-ankahe-faded-rose' : 'hover:text-ankahe-text'
              }`}
            >
              <Heart size={11} className={resonances['f-3']?.felt ? 'fill-current' : ''} />
              <span>I felt this</span>
            </button>
          </div>
        </div>

        {/* Fragment 4: Quiet Healing Reflection (Wide Typography with Handwritten note) */}
        <div className="max-w-2xl bg-ankahe-secondary/50 rounded-2xl p-7 sm:p-9 border border-ankahe-border space-y-4">
          <blockquote className="font-serif text-lg sm:text-xl text-ankahe-text font-normal leading-relaxed">
            "Some memories don't hurt anymore. They just sit quietly beside you on the evening bus, looking out the window at the same rain."
          </blockquote>

          <div className="flex items-center justify-between pt-2 border-t border-ankahe-border/60 text-xs">
            <span className="font-handwriting text-sm text-ankahe-brown-light">
              Gently made peace with it.
            </span>
            <span className="text-[11px] text-ankahe-muted/60 font-mono">
              Eleanor • Autumn
            </span>
          </div>
        </div>

        {/* Fragment 5: Excerpt from an Unsent Letter (Tender Stationery) */}
        <div className="max-w-xl sm:ml-12 paper-surface rounded-2xl p-7 sm:p-10 border border-ankahe-paper-border shadow-paper-warm space-y-4">
          <span className="text-[11px] uppercase tracking-widest text-ankahe-brown font-mono block">
            Unsent Letter • खत
          </span>

          <h4 className="font-serif text-lg text-ankahe-paper-dark font-medium">
            To my seventeen-year-old self,
          </h4>

          <p className="editorial-prose font-serif text-sm sm:text-base text-ankahe-paper-dark/90 leading-relaxed font-light">
            Stop checking your phone under the desk to see if they texted. They won't. And that silence will turn out to be one of the greatest kindnesses the universe ever granted you.
          </p>
          <p className="editorial-prose font-serif text-sm sm:text-base text-ankahe-paper-dark/90 leading-relaxed font-light">
            You will discover that poetry doesn't require an admission scorecard, and that being awkward is not a permanent flaw.
          </p>

          <div className="pt-3 border-t border-dashed border-ankahe-paper-border flex items-center justify-between text-xs text-ankahe-paper-dark/70">
            <span className="font-handwriting text-sm text-ankahe-brown">
              Take a breath. You are not late.
            </span>
            <span className="font-serif italic text-xs">
              — Devika, ten years later
            </span>
          </div>
        </div>

        {/* Fragment 6: Everyday Gratitude */}
        <div className="max-w-lg space-y-3">
          <span className="text-xs font-mono text-ankahe-muted/60 uppercase tracking-wider block">
            Everyday warmth
          </span>
          <blockquote className="font-serif text-base sm:text-lg text-ankahe-text/90 font-light leading-relaxed">
            "A friend texted me out of nowhere asking if I had eaten dinner. It was such a mundane thing, but in that moment, it felt like someone had thrown a warm blanket over my whole exhausted week."
          </blockquote>
          <span className="text-xs text-ankahe-muted/60 font-serif italic block">
            — A quiet Thursday
          </span>
        </div>

      </div>
    </section>
  );
};
