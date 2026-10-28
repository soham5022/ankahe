import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, Feather, Lock, Bookmark, AlertCircle, Trash2, Edit3 } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { CommunityWritingCard } from '../components/community/CommunityWritingCard';
import { WritingReaderModal } from '../components/community/WritingReaderModal';
import { useCommunity } from '../context/CommunityContext';
import type { WritingItem } from '../types';

export const MySpacePage: React.FC = () => {
  const { writings, drafts, savedPieceIds, userProfile, deleteDraft, updateProfile } = useCommunity();
  const [activeTab, setActiveTab] = useState<'writings' | 'drafts' | 'saved' | 'preferences'>('drafts');
  const [selectedItem, setSelectedItem] = useState<WritingItem | null>(null);

  // User's own writing added during this session
  const mySessionWritings = writings.filter(
    (w) => w.author === userProfile.penName || w.id.startsWith('community-')
  );

  // Saved pieces
  const savedPieces = writings.filter((w) => savedPieceIds.includes(w.id));

  return (
    <CommunityLayout>
      <div className="space-y-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <BookMarked size={13} />
            <span>My Space • माझी जागा</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Your personal sanctuary.
          </h1>

          <p className="text-sm text-ankahe-muted font-light leading-relaxed">
            Where your drafts, quiet bookmarks, and private reflections stay during your visit.
          </p>
        </div>

        {/* Phase 2 Prototype Storage Notice (Section 11 Requirement) */}
        <div className="p-4 rounded-xl bg-ankahe-secondary/60 border border-ankahe-border text-xs text-ankahe-muted space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-ankahe-gold">
            <AlertCircle size={13} />
            <span>Phase 2 Session Storage Notice</span>
          </div>
          <p className="leading-relaxed">
            Your writing and drafts are currently stored in browser session memory. Account-based permanent cloud storage across devices will be activated in Phase 3.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-ankahe-border/60 pb-3 text-xs">
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-4 py-2 rounded-xl transition-colors font-medium ${
              activeTab === 'drafts'
                ? 'bg-ankahe-paper text-ankahe-ink shadow-sm'
                : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary'
            }`}
          >
            Private Drafts ({drafts.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl transition-colors font-medium ${
              activeTab === 'saved'
                ? 'bg-ankahe-paper text-ankahe-ink shadow-sm'
                : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary'
            }`}
          >
            Saved Pieces ({savedPieces.length})
          </button>

          <button
            onClick={() => setActiveTab('writings')}
            className={`px-4 py-2 rounded-xl transition-colors font-medium ${
              activeTab === 'writings'
                ? 'bg-ankahe-paper text-ankahe-ink shadow-sm'
                : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary'
            }`}
          >
            Session Posts ({mySessionWritings.length})
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-2 rounded-xl transition-colors font-medium ${
              activeTab === 'preferences'
                ? 'bg-ankahe-paper text-ankahe-ink shadow-sm'
                : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary'
            }`}
          >
            Reading Preferences
          </button>
        </div>

        {/* Tab 1: Private Drafts */}
        {activeTab === 'drafts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-ankahe-muted">
              <span>Drafts in this browser session</span>
              <Link
                to="/write"
                className="inline-flex items-center gap-1.5 text-ankahe-gold hover:text-ankahe-gold-light"
              >
                <Feather size={12} />
                <span>Start new draft</span>
              </Link>
            </div>

            {drafts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-6 rounded-2xl bg-ankahe-secondary/80 border border-ankahe-border space-y-4 text-xs text-ankahe-text"
                  >
                    <div className="flex items-center justify-between text-ankahe-muted pb-2 border-b border-dashed border-ankahe-border/60">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
                        <Lock size={11} />
                        <span>Private Draft</span>
                      </div>
                      <span className="font-mono text-[10px]">{draft.savedAt}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-serif text-base text-ankahe-text font-medium">
                        {draft.title}
                      </h4>
                      <p className="font-serif italic text-sm text-ankahe-muted line-clamp-3 leading-relaxed">
                        "{draft.content}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-dashed border-ankahe-border/60 flex items-center justify-between">
                      <span className="font-mono text-[11px] text-ankahe-muted">
                        {draft.language} • {draft.type}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deleteDraft(draft.id)}
                          className="p-1.5 text-ankahe-muted hover:text-rose-400 transition-colors"
                          title="Delete draft"
                        >
                          <Trash2 size={13} />
                        </button>

                        <Link
                          to={`/write?type=${encodeURIComponent(draft.type)}`}
                          className="inline-flex items-center gap-1 text-ankahe-gold hover:text-ankahe-gold-light font-medium"
                        >
                          <span>Continue writing</span>
                          <Edit3 size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl bg-ankahe-secondary/30 border border-dashed border-ankahe-border space-y-3">
                <Lock size={20} className="mx-auto text-ankahe-muted/40" />
                <p className="font-serif text-base text-ankahe-text">No drafts in this session.</p>
                <Link
                  to="/write"
                  className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light"
                >
                  <Feather size={12} />
                  <span>Write something now</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Pieces */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <span className="text-xs text-ankahe-muted block">
              Pieces you have bookmarked softly during your reading
            </span>

            {savedPieces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedPieces.map((piece) => (
                  <CommunityWritingCard
                    key={piece.id}
                    item={piece}
                    onOpen={(item) => setSelectedItem(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl bg-ankahe-secondary/30 border border-dashed border-ankahe-border space-y-3">
                <Bookmark size={20} className="mx-auto text-ankahe-muted/40" />
                <p className="font-serif text-base text-ankahe-text">No saved pieces yet.</p>
                <p className="text-xs text-ankahe-muted">Click the bookmark icon on any piece while browsing.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Session Posts */}
        {activeTab === 'writings' && (
          <div className="space-y-6">
            <span className="text-xs text-ankahe-muted block">
              Writing placed gently into the in-memory community feed during this visit
            </span>

            {mySessionWritings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mySessionWritings.map((piece) => (
                  <CommunityWritingCard
                    key={piece.id}
                    item={piece}
                    onOpen={(item) => setSelectedItem(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl bg-ankahe-secondary/30 border border-dashed border-ankahe-border space-y-3">
                <Feather size={20} className="mx-auto text-ankahe-muted/40" />
                <p className="font-serif text-base text-ankahe-text">You haven't posted any pieces in this session.</p>
                <Link
                  to="/write"
                  className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light"
                >
                  <span>Open writing studio</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Reading Preferences */}
        {activeTab === 'preferences' && (
          <div className="bg-ankahe-secondary/60 rounded-2xl p-7 border border-ankahe-border space-y-6 max-w-xl text-xs">
            <h3 className="font-serif text-lg text-ankahe-text font-medium">
              Reading & Language Preferences
            </h3>

            <div className="space-y-3">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Languages You Read:
              </label>
              <div className="flex flex-wrap gap-2">
                {['Hindi', 'Hinglish', 'Marathi', 'English', 'Urdu'].map((lang) => {
                  const isSelected = userProfile.preferredLanguages.includes(lang as any);
                  return (
                    <button
                      key={lang}
                      onClick={() => {
                        const updated = isSelected
                          ? userProfile.preferredLanguages.filter((l) => l !== lang)
                          : [...userProfile.preferredLanguages, lang as any];
                        updateProfile({ preferredLanguages: updated });
                      }}
                      className={`px-3 py-1.5 rounded-lg border transition-colors ${
                        isSelected
                          ? 'bg-ankahe-gold/20 text-ankahe-gold border-ankahe-gold/50 font-medium'
                          : 'bg-ankahe-elevated text-ankahe-muted border-ankahe-border'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-ankahe-border/60 text-xs text-ankahe-muted/80 leading-relaxed">
              <p>Preferences adjust default language highlighting and filter suggestions in this session.</p>
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
