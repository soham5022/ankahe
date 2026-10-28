import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feather, Compass, Moon, Mail, Sparkles } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { CommunityWritingCard } from '../components/community/CommunityWritingCard';
import { WritingReaderModal } from '../components/community/WritingReaderModal';
import { useCommunity } from '../context/CommunityContext';
import type { WritingItem } from '../types';

export const CommunityHome: React.FC = () => {
  const { writings, userProfile } = useCommunity();
  const [selectedItem, setSelectedItem] = useState<WritingItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Writing' },
    { id: 'Poetry', label: 'Poetry' },
    { id: 'Sher & Shayari', label: 'Sher & Shayari' },
    { id: 'Personal Reflection', label: 'Reflections' },
    { id: 'Thought', label: 'Thoughts' },
    { id: 'Observation', label: 'Observations' },
  ];

  const displayedWritings = writings.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  const rightPanel = (
    <div className="space-y-8">
      {/* Quiet Welcome Widget */}
      <div className="paper-surface rounded-2xl p-6 border border-ankahe-paper-border shadow-paper text-ankahe-paper-dark space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-ankahe-gold-dark block">
          Writer Desk • नोंद
        </span>
        <h4 className="font-serif text-base font-medium">
          Writing as: <span className="text-ankahe-gold-dark">{userProfile.penName}</span>
        </h4>
        <p className="text-xs font-light leading-relaxed text-ankahe-paper-dark/80">
          Your thoughts exist only in this browser session. Nothing is tracked, monetized, or ranked.
        </p>
        <div className="pt-2">
          <Link
            to="/write"
            className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold-dark font-medium underline underline-offset-4"
          >
            <Feather size={12} />
            <span>Open notebook</span>
          </Link>
        </div>
      </div>

      {/* Invitation to Quiet Corner */}
      <div className="bg-ankahe-elevated/70 rounded-2xl p-6 border border-ankahe-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-ankahe-gold uppercase tracking-wider">
          <Moon size={13} />
          <span>Quiet Corner</span>
        </div>
        <p className="text-xs text-ankahe-muted font-light leading-relaxed">
          Need a reading space with zero distractions and zero feeds? Visit the sanctuary.
        </p>
        <Link
          to="/quiet-corner"
          className="inline-flex items-center gap-1 text-xs text-ankahe-gold hover:text-ankahe-gold-light transition-colors"
        >
          <span>Step inside quietly</span>
          <span>→</span>
        </Link>
      </div>

      {/* Unsent Letters Prompt */}
      <div className="bg-ankahe-elevated/40 rounded-2xl p-6 border border-ankahe-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-ankahe-muted uppercase tracking-wider">
          <Mail size={13} />
          <span>Unsent Letters</span>
        </div>
        <p className="text-xs text-ankahe-muted/80 font-light leading-relaxed">
          Six quiet archives dedicated to the words that never reached their destination.
        </p>
        <Link
          to="/unsent-letters"
          className="inline-flex items-center gap-1 text-xs text-ankahe-muted hover:text-ankahe-text transition-colors"
        >
          <span>Read unsent letters</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );

  return (
    <CommunityLayout rightContextPanel={rightPanel}>
      <div className="space-y-12">
        {/* ========================================================
            WELCOME SECTION (Section 6 Requirements)
            ======================================================== */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-ankahe-gold uppercase tracking-widest">
            <Sparkles size={13} />
            <span>Welcome to ANKAHE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-tight">
            You're here. <br />
            <span className="italic text-ankahe-gold font-serif">Take your time.</span>
          </h1>

          <p className="font-serif text-base sm:text-lg text-ankahe-muted font-light leading-relaxed">
            Read a little. Write a little. Or simply be here.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/write"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium transition-colors shadow-sm"
            >
              <Feather size={14} />
              <span>Write what's on your mind</span>
            </Link>

            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs sm:text-sm text-ankahe-muted hover:text-ankahe-text border border-ankahe-border transition-colors"
            >
              <Compass size={14} />
              <span>Browse by feeling or language</span>
            </Link>
          </div>
        </div>

        {/* Content Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-ankahe-border/60 pb-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors ${
                activeTab === tab.id
                  ? 'bg-ankahe-elevated text-ankahe-gold border border-ankahe-gold/40 font-medium'
                  : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================
            COMMUNITY WRITING FEED (Editorial Spread)
            ======================================================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-ankahe-muted/60">
            <span>Showing {displayedWritings.length} community pieces</span>
            <span className="font-mono text-[11px]">Honest fictional demonstration data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {displayedWritings.map((writing) => (
              <CommunityWritingCard
                key={writing.id}
                item={writing}
                onOpen={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>

        {/* Quiet footer encouragement */}
        <div className="text-center py-10 border-t border-ankahe-border/40 space-y-2">
          <p className="font-serif italic text-base text-ankahe-muted/80">
            "Words don't need applause to matter."
          </p>
          <p className="text-xs text-ankahe-muted/50 font-light">
            No endless scrolling. You have reached the bottom of this collection.
          </p>
        </div>
      </div>

      {/* Reader Modal */}
      <WritingReaderModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </CommunityLayout>
  );
};
