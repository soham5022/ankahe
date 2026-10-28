import React, { useState, useMemo } from 'react';
import type { EmotionCategory, WritingItem, Language } from '../types';
import { WritingCard } from './WritingCard';
import { Feather, Sparkles } from 'lucide-react';

interface EmotionalDiscoveryProps {
  items: WritingItem[];
  onFocusItem: (item: WritingItem) => void;
  onOpenWriteModal: () => void;
  onShowToast: (msg: string) => void;
  onToggleReaction?: (id: string, type: 'felt' | 'stayed' | 'warmth') => void;
}

const CATEGORIES: { label: string; value: EmotionCategory }[] = [
  { label: 'All feelings', value: 'all' },
  { label: 'Everyday life', value: 'everyday life' },
  { label: 'Hope', value: 'hope' },
  { label: 'Nostalgia', value: 'nostalgia' },
  { label: 'Peace', value: 'peace' },
  { label: 'Confusion', value: 'confusion' },
  { label: 'Gratitude', value: 'gratitude' },
  { label: 'Heartbreak', value: 'heartbreak' },
  { label: 'Loneliness', value: 'loneliness' },
  { label: 'New beginnings', value: 'new beginnings' },
];

const LANGUAGES: (Language | 'All')[] = ['All', 'Hinglish', 'Hindi', 'Marathi', 'English', 'Urdu', 'Other'];

export const EmotionalDiscovery: React.FC<EmotionalDiscoveryProps> = ({
  items,
  onFocusItem,
  onOpenWriteModal,
  onShowToast,
  onToggleReaction,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EmotionCategory>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'All'>('All');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchLanguage =
        selectedLanguage === 'All' || item.language === selectedLanguage;
      return matchCategory && matchLanguage;
    });
  }, [items, selectedCategory, selectedLanguage]);

  return (
    <section id="discover" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section 6 Header: Some feelings already have words */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-handwriting text-lg sm:text-xl text-ankahe-gold tracking-wide">
            You are not the first to feel this way
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal">
            Some feelings already have words.
          </h2>
          <p className="text-sm sm:text-base text-ankahe-muted/90 font-light leading-relaxed max-w-xl mx-auto">
            Ordinary thoughts, quiet memories, everyday observations, and feelings carried by people who might understand.
          </p>
        </div>

        {/* Emotional Tone Discovery Controls */}
        <div className="bg-ankahe-secondary/50 rounded-2xl p-6 sm:p-8 border border-ankahe-border space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl text-ankahe-text font-normal">
              What are you carrying today?
            </h3>
            <p className="text-xs sm:text-sm text-ankahe-muted font-light">
              You don’t need to name the feeling perfectly. Select any emotional tone below to explore.
            </p>
          </div>

          {/* Understated text-based category filters */}
          <div
            className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 pt-1"
            role="tablist"
            aria-label="Filter writings by emotion"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-normal transition-all duration-200 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ankahe-gold ${
                    isSelected
                      ? 'bg-ankahe-elevated text-ankahe-gold border-ankahe-gold/60 shadow-sm'
                      : 'bg-transparent text-ankahe-muted border-ankahe-border/70 hover:border-ankahe-muted/60 hover:text-ankahe-text'
                  }`}
                  role="tab"
                  aria-selected={isSelected}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Language filter pills */}
          <div className="pt-3 border-t border-ankahe-border/50 flex flex-wrap items-center justify-between gap-3 text-xs text-ankahe-muted">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-ankahe-muted/70">Language:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2.5 py-0.5 rounded text-[11px] transition-colors ${
                      selectedLanguage === lang
                        ? 'text-ankahe-text bg-ankahe-elevated border border-ankahe-border font-medium'
                        : 'text-ankahe-muted/70 hover:text-ankahe-muted'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[11px] text-ankahe-muted/70 font-light">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'reflection' : 'reflections'}
            </span>
          </div>
        </div>

        {/* Writing Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <WritingCard
                key={item.id}
                item={item}
                onFocusItem={onFocusItem}
                onShowToast={onShowToast}
                onToggleReaction={onToggleReaction}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16 px-6 bg-ankahe-secondary/30 rounded-2xl border border-dashed border-ankahe-border space-y-4 max-w-lg mx-auto">
            <div className="w-10 h-10 rounded-full bg-ankahe-elevated border border-ankahe-border text-ankahe-gold/70 mx-auto flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div className="space-y-1.5">
              <p className="font-serif text-lg text-ankahe-text">
                No one has put this specific feeling into words yet.
              </p>
              <p className="text-xs text-ankahe-muted font-light leading-relaxed">
                If you have even a single line or an unsaid thought, you can be the first to let it rest here.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenWriteModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ankahe-elevated text-xs text-ankahe-gold border border-ankahe-gold/40 hover:border-ankahe-gold transition-colors"
              >
                <Feather size={13} />
                <span>Write what comes to mind</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
