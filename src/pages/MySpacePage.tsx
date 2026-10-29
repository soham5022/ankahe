import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookMarked, 
  Feather, 
  Lock, 
  Bookmark, 
  Trash2, 
  Edit3, 
  Mail, 
  ExternalLink 
} from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { CommunityWritingCard } from '../components/community/CommunityWritingCard';
import { WritingReaderModal } from '../components/community/WritingReaderModal';
import { useAuth } from '../context/AuthContext';
import { useCommunity } from '../context/CommunityContext';
import { 
  fetchUserWritings, 
  fetchUserSavedWritings, 
  deleteWriting 
} from '../lib/writingsService';
import type { WritingItem, DraftItem } from '../types';

export const MySpacePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useCommunity();

  const [activeTab, setActiveTab] = useState<'drafts' | 'writings' | 'letters' | 'saved'>('drafts');
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [publishedWritings, setPublishedWritings] = useState<WritingItem[]>([]);
  const [savedWritings, setSavedWritings] = useState<WritingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<WritingItem | null>(null);

  const loadUserContent = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const [userRes, savedRes] = await Promise.all([
      fetchUserWritings(user.id),
      fetchUserSavedWritings(user.id),
    ]);

    setDrafts(userRes.drafts);
    setPublishedWritings(userRes.writings);
    setSavedWritings(savedRes.writings);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadUserContent();
  }, [loadUserContent]);

  const handleDeleteDraft = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to remove this draft?")) return;

    const { success, error } = await deleteWriting(id, user.id);
    if (success) {
      setDrafts((prev) => prev.filter((d) => d.id !== id));
      showToast("Draft removed safely.");
    } else {
      showToast(error || "Could not delete draft.");
    }
  };

  const handleDeletePublished = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this writing from ANKAHE?")) return;

    const { success, error } = await deleteWriting(id, user.id);
    if (success) {
      setPublishedWritings((prev) => prev.filter((w) => w.id !== id));
      showToast("Writing deleted.");
    } else {
      showToast(error || "Could not delete writing.");
    }
  };

  // Filter unsent letters from published writings
  const myLetters = publishedWritings.filter((w) => w.type === 'Unsent Letter');

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
            Where your drafts, quiet bookmarks, and private reflections stay safe.
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
            onClick={() => setActiveTab('writings')}
            className={`px-4 py-2 rounded-xl transition-colors font-medium ${
              activeTab === 'writings'
                ? 'bg-ankahe-paper text-ankahe-ink shadow-sm'
                : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary'
            }`}
          >
            Published Pieces ({publishedWritings.length})
          </button>

          <button
            onClick={() => setActiveTab('letters')}
            className={`px-4 py-2 rounded-xl transition-colors font-medium ${
              activeTab === 'letters'
                ? 'bg-ankahe-paper text-ankahe-ink shadow-sm'
                : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary'
            }`}
          >
            My Unsent Letters ({myLetters.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl transition-colors font-medium ${
              activeTab === 'saved'
                ? 'bg-ankahe-paper text-ankahe-ink shadow-sm'
                : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-secondary'
            }`}
          >
            Saved Collection ({savedWritings.length})
          </button>
        </div>

        {/* Content Tabs */}
        {loading ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-8 h-8 rounded-full border-2 border-ankahe-gold/30 border-t-ankahe-gold animate-spin mx-auto" />
            <p className="font-serif italic text-sm text-ankahe-muted">
              Loading your quiet sanctuary...
            </p>
          </div>
        ) : (
          <>
            {/* Tab 1: Private Drafts */}
            {activeTab === 'drafts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-ankahe-muted">
                  <span>Kept strictly for your eyes</span>
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
                        className="p-6 rounded-2xl bg-ankahe-secondary/80 border border-ankahe-border space-y-4 text-xs text-ankahe-text flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-ankahe-muted pb-2 border-b border-dashed border-ankahe-border/60">
                            <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
                              <Lock size={11} />
                              <span>Private Draft</span>
                            </div>
                            <span className="font-mono text-[10px]">{draft.savedAt}</span>
                          </div>

                          <div className="space-y-1">
                            {draft.title && (
                              <h4 className="font-serif text-base text-ankahe-text font-medium">
                                {draft.title}
                              </h4>
                            )}
                            <p className="font-serif italic text-sm text-ankahe-muted line-clamp-3 leading-relaxed">
                              "{draft.content}"
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-dashed border-ankahe-border/60 flex items-center justify-between">
                          <span className="font-mono text-[11px] text-ankahe-muted">
                            {draft.type} • {draft.language}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/write?edit=${draft.id}`)}
                              className="p-1.5 rounded-lg text-ankahe-muted hover:text-ankahe-gold hover:bg-ankahe-elevated transition-colors"
                              title="Edit draft"
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteDraft(draft.id)}
                              className="p-1.5 rounded-lg text-ankahe-muted hover:text-red-400 hover:bg-ankahe-elevated transition-colors"
                              title="Delete draft"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 rounded-3xl bg-ankahe-secondary/30 border border-ankahe-border text-center space-y-3 max-w-md mx-auto">
                    <Lock size={20} className="mx-auto text-emerald-500/80" />
                    <h3 className="font-serif text-lg text-ankahe-text">
                      You haven't saved a draft yet.
                    </h3>
                    <p className="text-xs text-ankahe-muted font-light leading-relaxed">
                      Write down a fleeting memory or an unpolished line. It remains strictly yours.
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/write"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ankahe-paper text-ankahe-ink text-xs font-medium"
                      >
                        <Feather size={12} />
                        <span>Write a draft</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Published Pieces */}
            {activeTab === 'writings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-ankahe-muted">
                  <span>Words you've shared with the circle</span>
                  <Link
                    to="/write"
                    className="inline-flex items-center gap-1.5 text-ankahe-gold hover:text-ankahe-gold-light"
                  >
                    <Feather size={12} />
                    <span>Write new piece</span>
                  </Link>
                </div>

                {publishedWritings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {publishedWritings.map((writing) => (
                      <div
                        key={writing.id}
                        className="p-6 rounded-2xl bg-ankahe-secondary/80 border border-ankahe-border space-y-4 text-xs text-ankahe-text flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-ankahe-muted pb-2 border-b border-dashed border-ankahe-border/60">
                            <span className="font-mono text-[11px] text-ankahe-gold">
                              {writing.isAnonymous ? 'Shared Anonymously' : 'Publicly Shared'}
                            </span>
                            <span className="font-mono text-[10px]">{writing.dateApprox}</span>
                          </div>

                          <div className="space-y-1">
                            {writing.title && (
                              <h4 className="font-serif text-base text-ankahe-text font-medium">
                                {writing.title}
                              </h4>
                            )}
                            <p className="font-serif text-sm text-ankahe-muted line-clamp-3 leading-relaxed">
                              {writing.content}
                            </p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-dashed border-ankahe-border/60 flex items-center justify-between">
                          <span className="font-mono text-[11px] text-ankahe-muted">
                            {writing.type} • {writing.language}
                          </span>

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/writing/${writing.id}`}
                              className="p-1.5 rounded-lg text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-elevated transition-colors"
                              title="View reading page"
                            >
                              <ExternalLink size={13} />
                            </Link>
                            <button
                              onClick={() => navigate(`/write?edit=${writing.id}`)}
                              className="p-1.5 rounded-lg text-ankahe-muted hover:text-ankahe-gold hover:bg-ankahe-elevated transition-colors"
                              title="Edit piece"
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeletePublished(writing.id)}
                              className="p-1.5 rounded-lg text-ankahe-muted hover:text-red-400 hover:bg-ankahe-elevated transition-colors"
                              title="Delete piece"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 rounded-3xl bg-ankahe-secondary/30 border border-ankahe-border text-center space-y-3 max-w-md mx-auto">
                    <Feather size={20} className="mx-auto text-ankahe-gold" />
                    <h3 className="font-serif text-lg text-ankahe-text">
                      Your words can begin here.
                    </h3>
                    <p className="text-xs text-ankahe-muted font-light leading-relaxed">
                      You haven't published anything to the community yet. Whenever you are ready, the circle is listening.
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/write"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ankahe-paper text-ankahe-ink text-xs font-medium"
                      >
                        <Feather size={12} />
                        <span>Share your first words</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: My Unsent Letters */}
            {activeTab === 'letters' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-ankahe-muted">
                  <span>Letters you've set down in ink</span>
                  <Link
                    to="/write?type=Unsent%20Letter"
                    className="inline-flex items-center gap-1.5 text-ankahe-gold hover:text-ankahe-gold-light"
                  >
                    <Mail size={12} />
                    <span>Write an unsent letter</span>
                  </Link>
                </div>

                {myLetters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myLetters.map((letter) => (
                      <CommunityWritingCard
                        key={letter.id}
                        item={letter}
                        onOpen={(item) => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 rounded-3xl bg-ankahe-secondary/30 border border-ankahe-border text-center space-y-3 max-w-md mx-auto">
                    <Mail size={20} className="mx-auto text-ankahe-gold" />
                    <h3 className="font-serif text-lg text-ankahe-text">
                      No letters written yet.
                    </h3>
                    <p className="text-xs text-ankahe-muted font-light leading-relaxed">
                      Write to someone you miss, your younger self, or the future.
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/write?type=Unsent%20Letter"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ankahe-paper text-ankahe-ink text-xs font-medium"
                      >
                        <Mail size={12} />
                        <span>Write an unsent letter</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Saved Writings */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <div className="text-xs text-ankahe-muted">
                  <span>Writings you have held onto</span>
                </div>

                {savedWritings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedWritings.map((writing) => (
                      <CommunityWritingCard
                        key={writing.id}
                        item={writing}
                        onOpen={(item) => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 rounded-3xl bg-ankahe-secondary/30 border border-ankahe-border text-center space-y-3 max-w-md mx-auto">
                    <Bookmark size={20} className="mx-auto text-ankahe-gold" />
                    <h3 className="font-serif text-lg text-ankahe-text">
                      The words you save will find a home here.
                    </h3>
                    <p className="text-xs text-ankahe-muted font-light leading-relaxed">
                      Whenever you come across a poem or thought that stays with you, tap "Save" to keep it here.
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/discover"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ankahe-paper text-ankahe-ink text-xs font-medium"
                      >
                        <span>Discover words</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
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
