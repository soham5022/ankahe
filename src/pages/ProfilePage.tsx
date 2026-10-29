import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User, Edit2, Shield, Settings as SettingsIcon, Feather } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { CommunityWritingCard } from '../components/community/CommunityWritingCard';
import { WritingReaderModal } from '../components/community/WritingReaderModal';
import { useAuth } from '../context/AuthContext';
import { useCommunity } from '../context/CommunityContext';
import { fetchUserWritings } from '../lib/writingsService';
import type { WritingItem } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const { showToast } = useCommunity();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [preferredLanguage, setPreferredLanguage] = useState(profile?.preferredLanguage || 'Hindi');
  const [isSaving, setIsSaving] = useState(false);

  const [myWritings, setMyWritings] = useState<WritingItem[]>([]);
  const [loadingWritings, setLoadingWritings] = useState(true);
  const [selectedItem, setSelectedItem] = useState<WritingItem | null>(null);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setBio(profile.bio);
      setPreferredLanguage(profile.preferredLanguage);
    }
  }, [profile]);

  const loadUserPieces = useCallback(async () => {
    if (!user) return;
    setLoadingWritings(true);
    const { writings } = await fetchUserWritings(user.id);
    setMyWritings(writings);
    setLoadingWritings(false);
  }, [user]);

  useEffect(() => {
    loadUserPieces();
  }, [loadUserPieces]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { error } = await updateProfile({
      displayName: displayName.trim(),
      bio: bio.trim(),
      preferredLanguage,
    });
    setIsSaving(false);

    if (error) {
      showToast(`Error updating profile: ${error}`);
    } else {
      setIsEditing(false);
      showToast("Profile updated successfully.");
    }
  };

  const userInitial = (profile?.displayName || 'A').charAt(0).toUpperCase();

  return (
    <CommunityLayout>
      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
              <User size={13} />
              <span>Writer Profile • ओळख</span>
            </div>

            <Link
              to="/settings"
              className="inline-flex items-center gap-1.5 text-xs text-ankahe-muted hover:text-ankahe-gold transition-colors"
            >
              <SettingsIcon size={12} />
              <span>Settings</span>
            </Link>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Identity in the quiet circle.
          </h1>

          <p className="text-sm text-ankahe-muted font-light leading-relaxed">
            In ANKAHE, identity exists for authentic literary expression — free from follower metrics, blue ticks, or popularity contests.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-ankahe-secondary/80 rounded-3xl p-8 border border-ankahe-border space-y-6 text-xs text-ankahe-text">
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-ankahe-border/60">
            <div className="flex items-center gap-4">
              {/* Writer Monogram Avatar */}
              <div className="w-16 h-16 rounded-full bg-ankahe-elevated border border-ankahe-gold/40 flex items-center justify-center font-serif text-2xl text-ankahe-gold shadow-sm shrink-0">
                {userInitial}
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl text-ankahe-text font-normal">
                  {profile?.displayName || 'A Quiet Soul'}
                </h3>
                <span className="font-mono text-xs text-ankahe-gold block">
                  @{profile?.username || 'writer'}
                </span>
                {user?.email && (
                  <span className="font-mono text-[11px] text-ankahe-muted/60 block">
                    {user.email}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ankahe-elevated hover:bg-ankahe-secondary text-xs text-ankahe-gold border border-ankahe-gold/30 transition-colors"
            >
              <Edit2 size={12} />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Edit Form */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                  Pen Name / टोपणनाव:
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-4 py-2.5 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                  Short Biography / परिचय:
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Tell fellow readers a little about your quiet reflections..."
                  className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-4 py-2.5 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium shadow-sm transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Profile Details'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
                  Biography:
                </span>
                <p className="text-sm font-light leading-relaxed text-ankahe-text/90 italic">
                  "{profile?.bio || 'Writing in the quiet corners of late night trains and empty tea stalls.'}"
                </p>
              </div>

              <div className="pt-4 border-t border-dashed border-ankahe-border/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-ankahe-gold text-[11px] font-mono">
                  <Shield size={12} />
                  <span>Verified Member of the Sanctuary</span>
                </div>

                <span className="font-mono text-[11px] text-ankahe-muted/60">
                  Primary Tongue: {profile?.preferredLanguage || 'Hindi'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* User's Published Writings */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl text-ankahe-text font-normal">
              Your Shared Writing ({myWritings.length})
            </h3>
            <Link
              to="/write"
              className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light"
            >
              <Feather size={12} />
              <span>Write new piece</span>
            </Link>
          </div>

          {loadingWritings ? (
            <div className="py-12 text-center text-xs text-ankahe-muted">
              Loading your words...
            </div>
          ) : myWritings.length === 0 ? (
            <div className="p-8 rounded-2xl bg-ankahe-secondary/30 border border-ankahe-border text-center space-y-2 text-xs text-ankahe-muted font-light">
              <p className="font-serif italic text-sm">
                You haven't published any writing yet.
              </p>
              <p>When you publish a poem, thought, or sher, it will be listed here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {myWritings.map((writing) => (
                <CommunityWritingCard
                  key={writing.id}
                  item={writing}
                  onOpen={(item) => setSelectedItem(item)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Modal Reader */}
        <WritingReaderModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </CommunityLayout>
  );
};
