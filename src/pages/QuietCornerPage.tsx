import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Moon, Feather } from 'lucide-react';
import { fetchPublicWritings } from '../lib/writingsService';
import type { WritingItem } from '../types';

export const QuietCornerPage: React.FC = () => {
  const [writings, setWritings] = useState<WritingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadQuietWritings = useCallback(async () => {
    setLoading(true);
    const { writings: data } = await fetchPublicWritings({ limit: 50 });
    setWritings(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadQuietWritings();
  }, [loadQuietWritings]);

  const current = writings[currentIndex];

  const handleNext = () => {
    if (writings.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % writings.length);
  };

  const handlePrev = () => {
    if (writings.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + writings.length) % writings.length);
  };

  const isUrdu = current?.language === 'Urdu';
  const isDevanagari = current?.language === 'Hindi' || current?.language === 'Marathi';

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

      {/* Central Reading Focus */}
      <main className="max-w-2xl mx-auto w-full my-auto py-12 sm:py-20">
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-8 h-8 rounded-full border-2 border-ankahe-gold/30 border-t-ankahe-gold animate-spin mx-auto" />
            <p className="font-serif italic text-sm text-ankahe-muted">
              Entering the quiet space...
            </p>
          </div>
        ) : writings.length === 0 ? (
          <div className="text-center space-y-5 p-8 rounded-3xl bg-ankahe-secondary/30 border border-ankahe-border/60">
            <Moon size={24} className="mx-auto text-ankahe-gold/60" />
            <div className="space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl text-ankahe-text font-normal">
                The sanctuary is at peace.
              </h2>
              <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed max-w-md mx-auto">
                No words have been placed in the circle yet. When someone shares a sher, reflection, or poem, it will rest here quietly.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/write"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium shadow-sm transition-colors"
              >
                <Feather size={13} />
                <span>Write the first words</span>
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={`rounded-3xl border p-8 sm:p-14 lg:p-16 transition-all duration-500 shadow-2xl relative ${
              current.isPaperStyle
                ? 'paper-surface border-ankahe-paper-border text-ankahe-paper-dark'
                : 'bg-ankahe-secondary/70 border-ankahe-border text-ankahe-text'
            }`}
          >
            {/* Metadata Line */}
            <div className="flex items-center justify-between text-xs pb-6 border-b border-dashed border-current/20 font-mono opacity-60">
              <span>{current.language} • {current.type}</span>
              <span>{currentIndex + 1} of {writings.length}</span>
            </div>

            {/* Reading Text */}
            <div className="py-8 sm:py-12 space-y-4">
              {current.title && (
                <h3 className="font-serif text-xl sm:text-2xl font-medium">
                  {current.title}
                </h3>
              )}
              <div
                dir={isUrdu ? 'rtl' : 'ltr'}
                className={`leading-relaxed whitespace-pre-wrap select-text ${
                  isUrdu
                    ? 'poetry-urdu text-2xl sm:text-3xl text-right'
                    : isDevanagari
                    ? 'poetry-devanagari text-xl sm:text-2xl font-normal'
                    : 'font-serif text-xl sm:text-2xl font-light'
                }`}
              >
                {current.content}
              </div>
            </div>

            {/* Author */}
            <div className="pt-6 border-t border-dashed border-current/20 flex items-center justify-between text-xs font-serif italic opacity-75">
              <span>— {current.isAnonymous ? 'Anonymous' : current.author}</span>
              {current.dateApprox && (
                <span className="font-mono text-[11px] not-italic opacity-60">
                  {current.dateApprox}
                </span>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Paging Controls */}
      <footer className="max-w-2xl mx-auto w-full flex items-center justify-between text-xs text-ankahe-muted pt-4">
        {writings.length > 1 ? (
          <>
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-2 hover:text-ankahe-gold transition-colors py-2 group"
              title="Previous writing"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Previous</span>
            </button>

            <span className="font-mono text-[11px] opacity-60">
              Take a quiet breath between thoughts.
            </span>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 hover:text-ankahe-gold transition-colors py-2 group"
              title="Next writing"
            >
              <span>Next</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </>
        ) : (
          <div className="w-full text-center text-xs text-ankahe-muted/60 font-light">
            ANKAHE • Quiet reading space with zero distractions.
          </div>
        )}
      </footer>
    </div>
  );
};
