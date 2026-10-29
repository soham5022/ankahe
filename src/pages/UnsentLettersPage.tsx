import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Feather, Lock } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { WritingReaderModal } from '../components/community/WritingReaderModal';
import { useAuth } from '../context/AuthContext';
import { fetchPublicWritings } from '../lib/writingsService';
import type { WritingItem, UnsentLetterCategory } from '../types';

export const UnsentLettersPage: React.FC = () => {
  const { user } = useAuth();
  const [letters, setLetters] = useState<WritingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<WritingItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: (UnsentLetterCategory | 'All')[] = [
    'All',
    'To Someone I Miss',
    'To My Younger Self',
    'To Someone I Never Thanked',
    'To the Past',
    'To the Future',
    'To Life',
  ];

  const loadLetters = useCallback(async () => {
    setLoading(true);
    const { writings } = await fetchPublicWritings({
      type: 'Unsent Letter',
      currentUserId: user?.id,
    });
    setLetters(writings);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadLetters();
  }, [loadLetters]);

  const displayedLetters = letters.filter((l) => {
    if (selectedCategory === 'All') return true;
    return l.category === selectedCategory;
  });

  return (
    <CommunityLayout>
      <div className="space-y-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <Mail size={13} />
            <span>Unsent Letters • अनामिक खत</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-tight">
            For the words that never found their way.
          </h1>

          <p className="font-serif text-base sm:text-lg text-ankahe-muted font-light leading-relaxed">
            Sometimes writing the words is enough to begin. Letters shared here are never delivered to a recipient; they rest gently in the circle.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/write?type=Unsent%20Letter"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium transition-colors shadow-sm"
            >
              <Feather size={14} />
              <span>Write an unsent letter</span>
            </Link>

            {user && (
              <Link
                to="/my-space"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs text-ankahe-muted hover:text-ankahe-text border border-ankahe-border transition-colors"
              >
                <Lock size={12} />
                <span>My Private Letters</span>
              </Link>
            )}
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

        {/* Letters Content Area */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-8 h-8 rounded-full border-2 border-ankahe-gold/30 border-t-ankahe-gold animate-spin mx-auto" />
            <p className="font-serif italic text-sm text-ankahe-muted">
              Opening letter archives...
            </p>
          </div>
        ) : displayedLetters.length === 0 ? (
          <div className="p-12 sm:p-16 rounded-3xl bg-ankahe-secondary/30 border border-ankahe-border text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-ankahe-elevated border border-ankahe-border flex items-center justify-center mx-auto text-ankahe-gold">
              <Mail size={20} />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl text-ankahe-text font-normal">
                No letters have been shared yet.
              </h3>
              <p className="text-xs text-ankahe-muted font-light leading-relaxed">
                {selectedCategory !== 'All'
                  ? `No letters shared in "${selectedCategory}" yet.`
                  : "Letters shared here give closure to the unspoken. Your words can be the first."}
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/write?type=Unsent%20Letter"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium shadow-sm transition-colors"
              >
                <Feather size={12} />
                <span>Write the first letter</span>
              </Link>
            </div>
          </div>
        ) : (
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
                    {letter.dateApprox}
                  </span>
                  {letter.category && (
                    <span className="text-[11px] font-sans font-medium bg-ankahe-paper-muted px-2 py-0.5 rounded capitalize">
                      {letter.category}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {letter.title && (
                    <h3 className="font-serif text-base sm:text-lg font-medium text-ankahe-paper-dark">
                      {letter.title}
                    </h3>
                  )}

                  <p className="font-serif text-sm leading-relaxed text-ankahe-paper-dark/90 line-clamp-4">
                    {letter.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-ankahe-paper-border flex items-center justify-between text-xs text-ankahe-gold-dark">
                  <span className="font-serif italic">
                    — {letter.isAnonymous ? 'Anonymous' : letter.author}
                  </span>
                  <span className="text-[11px] underline underline-offset-4 group-hover:text-ankahe-ink transition-colors">
                    Read letter →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Modal Reader */}
        <WritingReaderModal
          item={selectedLetter}
          onClose={() => setSelectedLetter(null)}
        />
      </div>
    </CommunityLayout>
  );
};
