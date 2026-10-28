import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { CommunityWritingCard } from '../components/community/CommunityWritingCard';
import { WritingReaderModal } from '../components/community/WritingReaderModal';
import { useCommunity } from '../context/CommunityContext';
import type { WritingItem } from '../types';

export const Discover: React.FC = () => {
  const { writings } = useCommunity();
  const [selectedItem, setSelectedItem] = useState<WritingItem | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Writing');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedMood, setSelectedMood] = useState<string>('All');

  const categories = [
    'All Writing',
    'Sher & Shayari',
    'Poetry',
    'Thoughts',
    'Personal Reflections',
    'Unsent Letters',
    'Quotes',
  ];

  const languages = ['All', 'Hindi', 'Hinglish', 'Marathi', 'English', 'Urdu', 'Other'];

  const moods: { label: string; value: string }[] = [
    { label: 'All Moods', value: 'All' },
    { label: 'Hope', value: 'hope' },
    { label: 'Nostalgia', value: 'nostalgia' },
    { label: 'Heartbreak', value: 'heartbreak' },
    { label: 'Peace', value: 'peace' },
    { label: 'Confusion', value: 'confusion' },
    { label: 'Gratitude', value: 'gratitude' },
    { label: 'Loneliness', value: 'loneliness' },
    { label: 'New Beginnings', value: 'new beginnings' },
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All Writing' ||
    selectedLanguage !== 'All' ||
    selectedMood !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Writing');
    setSelectedLanguage('All');
    setSelectedMood('All');
  };

  // Filter logic
  const filteredWritings = useMemo(() => {
    return writings.filter((item) => {
      // 1. Text Search (title, content, type, language, author)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = item.content.toLowerCase().includes(q);
        const matchesTitle = item.title ? item.title.toLowerCase().includes(q) : false;
        const matchesType = item.type.toLowerCase().includes(q);
        const matchesLang = item.language.toLowerCase().includes(q);
        const matchesAuthor = item.author.toLowerCase().includes(q);
        if (!matchesText && !matchesTitle && !matchesType && !matchesLang && !matchesAuthor) {
          return false;
        }
      }

      // 2. Content Category
      if (selectedCategory !== 'All Writing') {
        if (selectedCategory === 'Thoughts' && item.type !== 'Thought') return false;
        if (selectedCategory === 'Personal Reflections' && item.type !== 'Personal Reflection') return false;
        if (selectedCategory === 'Sher & Shayari' && item.type !== 'Sher & Shayari') return false;
        if (selectedCategory === 'Poetry' && item.type !== 'Poetry') return false;
        if (selectedCategory === 'Unsent Letters' && item.type !== 'Unsent Letter') return false;
        if (selectedCategory === 'Quotes' && item.type !== 'Quote') return false;
      }

      // 3. Language
      if (selectedLanguage !== 'All' && item.language !== selectedLanguage) {
        return false;
      }

      // 4. Mood
      if (selectedMood !== 'All' && item.category !== selectedMood) {
        return false;
      }

      return true;
    });
  }, [writings, searchQuery, selectedCategory, selectedLanguage, selectedMood]);

  return (
    <CommunityLayout>
      <div className="space-y-10">
        
        {/* Header */}
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            Discovery • शोध
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Discover words that resonate.
          </h1>
          <p className="text-sm text-ankahe-muted font-light leading-relaxed">
            Follow a mother tongue, a lingering sentiment, or an ordinary moment. No algorithms dictate what appears here.
          </p>
        </div>

        {/* Search Bar & Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ankahe-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, lines, pen names, or languages..."
              className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl pl-11 pr-4 py-3 text-sm text-ankahe-text placeholder-ankahe-muted/60 focus:outline-none focus:border-ankahe-gold/60 transition-colors"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ankahe-secondary hover:bg-ankahe-elevated text-xs text-ankahe-muted hover:text-ankahe-gold border border-ankahe-border transition-colors shrink-0"
              title="Reset all search filters"
            >
              <RotateCcw size={13} />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Multi-Filter Controls */}
        <div className="space-y-5 bg-ankahe-secondary/50 p-6 rounded-2xl border border-ankahe-border/80 text-xs">
          
          {/* 1. Category Filters */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
              Content Category:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? 'bg-ankahe-paper text-ankahe-ink font-medium shadow-sm'
                      : 'bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-elevated/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Language Filters */}
          <div className="space-y-2 pt-2 border-t border-ankahe-border/50">
            <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
              Language:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-ankahe-gold/20 text-ankahe-gold border border-ankahe-gold/40 font-medium'
                      : 'bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Mood Preference (Browsing preference, not inferred state) */}
          <div className="space-y-2 pt-2 border-t border-ankahe-border/50">
            <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
              Emotional Tone / Feeling:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {moods.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setSelectedMood(m.value)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedMood === m.value
                      ? 'bg-ankahe-gold/20 text-ankahe-gold border border-ankahe-gold/40 font-medium'
                      : 'bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Counter & Active Notice */}
        <div className="flex items-center justify-between text-xs text-ankahe-muted/70">
          <span>
            Found {filteredWritings.length} {filteredWritings.length === 1 ? 'piece' : 'pieces'}
          </span>
          {hasActiveFilters && (
            <span className="font-mono text-[11px] text-ankahe-gold">
              Active filters applied
            </span>
          )}
        </div>

        {/* Filtered Results Grid */}
        {filteredWritings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {filteredWritings.map((item) => (
              <CommunityWritingCard
                key={item.id}
                item={item}
                onOpen={(piece) => setSelectedItem(piece)}
              />
            ))}
          </div>
        ) : (
          /* Empty State (Section 7 Requirement) */
          <div className="text-center py-20 px-6 rounded-3xl bg-ankahe-secondary/30 border border-dashed border-ankahe-border space-y-4 max-w-lg mx-auto">
            <Filter size={24} className="mx-auto text-ankahe-muted/40" />
            <h3 className="font-serif text-xl text-ankahe-text font-normal">
              No words found this time.
            </h3>
            <p className="text-sm text-ankahe-muted font-light leading-relaxed">
              Try another language, adjust your search, or follow a different feeling.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ankahe-elevated hover:bg-ankahe-secondary text-xs text-ankahe-gold border border-ankahe-gold/30 transition-colors"
              >
                <RotateCcw size={12} />
                <span>Clear all filters</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Reader Modal */}
      <WritingReaderModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </CommunityLayout>
  );
};
