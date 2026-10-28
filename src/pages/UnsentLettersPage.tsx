import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Feather, ArrowRight, X, Copy, Check } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { useCommunity } from '../context/CommunityContext';
import type { UnsentLetterItem, UnsentLetterCategory } from '../types';

export const UnsentLettersPage: React.FC = () => {
  const { letters, showToast } = useCommunity();
  const [selectedLetter, setSelectedLetter] = useState<UnsentLetterItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const categories: (UnsentLetterCategory | 'All')[] = [
    'All',
    'To Someone I Miss',
    'To My Younger Self',
    'To Someone I Never Thanked',
    'To the Past',
    'To the Future',
    'To Life',
  ];

  const displayedLetters = letters.filter((l) => {
    if (selectedCategory === 'All') return true;
    return l.category === selectedCategory;
  });

  const handleCopy = (letter: UnsentLetterItem) => {
    navigator.clipboard.writeText(`${letter.recipient}\n\n${letter.fullText}\n\n${letter.postscript || ''}\n— ${letter.author}`);
    setCopied(true);
    showToast("Letter copied gently to clipboard.");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <CommunityLayout>
      <div className="space-y-12 max-w-4xl mx-auto">
        
        {/* ========================================================
            HEADER (Section 9 Requirements)
            ======================================================== */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <Mail size={13} />
            <span>Unsent Letters • अनामिक खत</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-tight">
            For the words that never found their way.
          </h1>

          <p className="font-serif text-base sm:text-lg text-ankahe-muted font-light leading-relaxed">
            Sometimes writing the words is enough to begin.
          </p>

          <div className="pt-2">
            <Link
              to="/write?type=Unsent%20Letter"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium transition-colors shadow-sm"
            >
              <Feather size={14} />
              <span>Write your own unsent letter</span>
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-ankahe-border/60 pb-4 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                selectedCategory === cat
                  ? 'bg-ankahe-elevated text-ankahe-gold border border-ankahe-gold/40 font-medium'
                  : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {displayedLetters.map((letter) => (
            <article
              key={letter.id}
              onClick={() => setSelectedLetter(letter)}
              className="group cursor-pointer paper-surface rounded-2xl p-7 sm:p-9 border border-ankahe-paper-border shadow-paper hover:shadow-lg transition-all duration-300 space-y-4 text-ankahe-paper-dark"
            >
              <div className="flex items-center justify-between text-xs text-ankahe-gold-dark pb-3 border-b border-dashed border-ankahe-paper-border font-mono">
                <span className="flex items-center gap-1.5">
                  <Mail size={12} />
                  {letter.dateText}
                </span>
                <span className="text-[11px] font-sans font-medium bg-ankahe-paper-muted px-2 py-0.5 rounded">
                  {letter.category}
                </span>
              </div>

              <h3 className="font-serif text-lg font-medium leading-snug group-hover:text-ankahe-gold-dark transition-colors">
                "{letter.recipient}"
              </h3>

              <p className="text-sm font-light leading-relaxed line-clamp-3 italic opacity-90">
                "{letter.preview}"
              </p>

              <div className="pt-3 border-t border-dashed border-ankahe-paper-border flex items-center justify-between text-xs opacity-75">
                <span className="font-serif italic">— {letter.author}</span>
                <span className="inline-flex items-center gap-1 text-xs text-ankahe-gold-dark font-medium group-hover:translate-x-0.5 transition-transform">
                  <span>Open envelope</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Privacy Promise Notice */}
        <div className="p-5 rounded-2xl bg-ankahe-secondary/50 border border-ankahe-border text-xs text-ankahe-muted/80 leading-relaxed max-w-2xl space-y-1">
          <p className="font-medium text-ankahe-gold">Honest Archival Standard:</p>
          <p>
            ANKAHE does not send letters to recipients or collect email addresses of intended recipients. Letters written here remain personal reflections and private expressions.
          </p>
        </div>

      </div>

      {/* Full Letter Reader Dialog */}
      {selectedLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl paper-surface text-ankahe-paper-dark rounded-3xl border border-ankahe-paper-border shadow-2xl p-7 sm:p-12 space-y-8 my-8">
            {/* Header / Envelope */}
            <div className="flex items-start justify-between border-b border-dashed border-ankahe-paper-border pb-5">
              <div className="space-y-1 font-mono text-xs text-ankahe-gold-dark">
                <span className="flex items-center gap-1.5 uppercase tracking-widest text-[11px]">
                  <Mail size={13} />
                  {selectedLetter.category}
                </span>
                <span className="font-sans text-xs opacity-70">
                  {selectedLetter.dateText}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(selectedLetter)}
                  className="p-2 rounded-full hover:bg-ankahe-paper-muted text-ankahe-paper-dark/70 transition-colors"
                  title="Copy letter"
                >
                  {copied ? <Check size={16} className="text-emerald-700" /> : <Copy size={16} />}
                </button>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="p-2 rounded-full hover:bg-ankahe-paper-muted text-ankahe-paper-dark/70 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Salutation & Body */}
            <div className="space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-medium">
                {selectedLetter.recipient}
              </h2>

              <div className="font-serif text-base sm:text-lg font-light leading-relaxed whitespace-pre-wrap opacity-95">
                {selectedLetter.fullText}
              </div>

              {selectedLetter.postscript && (
                <div className="pt-4 border-t border-dashed border-ankahe-paper-border text-sm italic font-handwriting text-ankahe-gold-dark">
                  {selectedLetter.postscript}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-dashed border-ankahe-paper-border flex items-center justify-between text-xs opacity-75 font-serif italic">
              <span>— {selectedLetter.author}</span>
              <span className="font-mono text-[11px] not-italic">ANKAHE Unsent Archive</span>
            </div>
          </div>
        </div>
      )}
    </CommunityLayout>
  );
};
