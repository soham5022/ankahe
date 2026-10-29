import React, { useState, useEffect, useCallback } from 'react';
import { Search, RotateCcw, Compass, Feather } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { CommunityWritingCard } from '../components/community/CommunityWritingCard';
import { WritingReaderModal } from '../components/community/WritingReaderModal';
import { useAuth } from '../context/AuthContext';
import { searchPublicWritings } from '../lib/writingsService';
import type { WritingItem } from '../types';

export const Discover: React.FC = () => {
  const { user } = useAuth();
  const [writings, setWritings] = useState<WritingItem[]>([]);
  const [loading, setLoading] = useState(true);
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
    'Thought',
    'Personal Reflection',
    'Unsent Letter',
    'Quote',
    'Observation',
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
    { label: 'Everyday Life', value: 'everyday life' },
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

  const loadDiscoverWritings = useCallback(async () => {
    setLoading(true);
    const { writings: data } = await searchPublicWritings(searchQuery, {
      type: selectedCategory === 'All Writing' ? undefined : selectedCategory,
      language: selectedLanguage === 'All' ? undefined : selectedLanguage,
      mood: selectedMood === 'All' ? undefined : selectedMood,
      currentUserId: user?.id,
    });
    setWritings(data);
    setLoading(false);
  }, [searchQuery, selectedCategory, selectedLanguage, selectedMood, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDiscoverWritings();
    }, 250);
    return () => clearTimeout(timer);
  }, [loadDiscoverWritings]);

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

          {/* 2. Language & Mood Split Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-ankahe-border/50">
            {/* Language */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
                Language / भाषा:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-ankahe-gold/25 text-ankahe-gold border border-ankahe-gold/40 font-medium'
                        : 'bg-ankahe-elevated/60 text-ankahe-muted hover:text-ankahe-text'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood / Category */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
                Atmosphere / भावना:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {moods.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setSelectedMood(m.value)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      selectedMood === m.value
                        ? 'bg-ankahe-gold/25 text-ankahe-gold border border-ankahe-gold/40 font-medium'
                        : 'bg-ankahe-elevated/60 text-ankahe-muted hover:text-ankahe-text'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Discovery Results */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-8 h-8 rounded-full border-2 border-ankahe-gold/30 border-t-ankahe-gold animate-spin mx-auto" />
            <p className="font-serif italic text-sm text-ankahe-muted">
              Discovering resonance...
            </p>
          </div>
        ) : writings.length === 0 ? (
          <div className="p-12 rounded-3xl bg-ankahe-secondary/30 border border-ankahe-border text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-ankahe-elevated border border-ankahe-border flex items-center justify-center mx-auto text-ankahe-gold">
              <Compass size={20} />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl text-ankahe-text font-normal">
                {hasActiveFilters
                  ? 'No words match this query.'
                  : "Nothing here just yet."}
              </h3>
              <p className="text-xs text-ankahe-muted font-light leading-relaxed">
                {hasActiveFilters
                  ? 'Try relaxing your filters or searching for different sentiments.'
                  : "When someone shares their words, you'll find them here."}
              </p>
            </div>

            {hasActiveFilters ? (
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-full bg-ankahe-elevated hover:bg-ankahe-secondary border border-ankahe-border text-xs text-ankahe-gold transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw size={12} />
                <span>Reset all filters</span>
              </button>
            ) : (
              <Link
                to="/write"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium shadow-sm transition-colors"
              >
                <Feather size={12} />
                <span>Share your writing</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-ankahe-muted/60">
              <span>Found {writings.length} {writings.length === 1 ? 'piece' : 'pieces'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {writings.map((writing) => (
                <CommunityWritingCard
                  key={writing.id}
                  item={writing}
                  onOpen={(item) => setSelectedItem(item)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Reader */}
        <WritingReaderModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </CommunityLayout>
  );
};
