import React from 'react';
import { X, Sparkles, Globe2, Shield } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrinciples: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenPrinciples,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="About ANKAHE"
    >
      <div className="relative w-full max-w-2xl bg-ankahe-secondary rounded-3xl border border-ankahe-border shadow-2xl p-6 sm:p-10 space-y-7 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-ankahe-border/60">
          <div>
            <div className="flex items-baseline gap-2.5">
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ankahe-text">
                ANKAHE
              </h3>
              <span className="font-devanagari text-lg text-ankahe-gold/90 font-light">
                अनकहे
              </span>
            </div>
            <p className="font-serif italic text-sm text-ankahe-gold/90 mt-1">
              "For everything you couldn't say."
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-ankahe-muted hover:text-ankahe-text rounded-full hover:bg-ankahe-elevated transition-colors"
            aria-label="Close about dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-sm sm:text-base text-ankahe-muted font-light leading-relaxed">
          <p>
            <strong className="text-ankahe-text font-medium">ANKAHE</strong> was born from a simple truth: the most meaningful feelings are often the hardest to speak out loud. They remain folded inside old notebooks, trapped in the throat during quiet train rides, or whispered to the ceiling late at night.
          </p>
          <p>
            Modern platforms turn human vulnerability into algorithmic content—competing for retweets, likes, and engagement metrics. ANKAHE is the deliberate opposite. It is a quiet sanctuary for poetry, sher, shayari, Marathi kavita, Urdu nazms, unsent letters, and philosophical reflections.
          </p>
          <p>
            We believe that sadness does not need to be performative to be worthy of care, and that joy and gratitude do not need an audience to be profound.
          </p>
        </div>

        {/* Value pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-ankahe-elevated/60 border border-ankahe-border space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ankahe-gold font-medium">
              <Globe2 size={14} />
              <span>Multilingual Soul</span>
            </div>
            <p className="text-xs text-ankahe-muted font-light leading-relaxed">
              Express freely in Hindi, Marathi, English, Urdu, or Hinglish. Every dialect of the heart is honored.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-ankahe-elevated/60 border border-ankahe-border space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ankahe-rose font-medium">
              <Shield size={14} />
              <span>Zero Monetisation</span>
            </div>
            <p className="text-xs text-ankahe-muted font-light leading-relaxed">
              No advertisements, no subscriptions, and no sponsored content. A peaceful digital public commons.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-ankahe-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={() => {
              onClose();
              onOpenPrinciples();
            }}
            className="text-ankahe-gold hover:underline flex items-center gap-1.5"
          >
            <Sparkles size={13} />
            <span>Read our 5 Community Principles</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-ankahe-elevated hover:bg-ankahe-hover text-ankahe-text border border-ankahe-border transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
