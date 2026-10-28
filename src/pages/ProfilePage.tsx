import React, { useState } from 'react';
import { User, Shield, Edit2, AlertCircle } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { useCommunity } from '../context/CommunityContext';

export const ProfilePage: React.FC = () => {
  const { userProfile, updateProfile } = useCommunity();
  const [isEditing, setIsEditing] = useState(false);
  const [penName, setPenName] = useState(userProfile.penName);
  const [bio, setBio] = useState(userProfile.bio);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ penName, bio });
    setIsEditing(false);
  };

  return (
    <CommunityLayout>
      <div className="space-y-10 max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <User size={13} />
            <span>Writer Profile • ओळख</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Identity in the quiet circle.
          </h1>

          <p className="text-sm text-ankahe-muted font-light leading-relaxed">
            In ANKAHE, identity exists for literary expression — free from follower metrics, blue ticks, or popularity contests.
          </p>
        </div>

        {/* Phase 2 Prototype Disclosure */}
        <div className="p-4 rounded-xl bg-ankahe-secondary/60 border border-ankahe-border text-xs text-ankahe-muted space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-ankahe-gold">
            <AlertCircle size={13} />
            <span>Profile Prototype Preview</span>
          </div>
          <p className="leading-relaxed">
            This screen previews how your writing persona looks to fellow readers. No user accounts or password databases are maintained during this Phase 2 frontend preview.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-ankahe-secondary/80 rounded-2xl p-8 border border-ankahe-border space-y-6 text-xs text-ankahe-text">
          
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-ankahe-border/60">
            <div className="flex items-center gap-4">
              {/* Writer Monogram Avatar */}
              <div className="w-14 h-14 rounded-full bg-ankahe-elevated border border-ankahe-gold/40 flex items-center justify-center font-serif text-xl text-ankahe-gold shadow-sm shrink-0">
                {userProfile.penName.charAt(0).toUpperCase()}
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl text-ankahe-text font-normal">
                  {userProfile.penName}
                </h3>
                <span className="font-mono text-[11px] text-ankahe-muted/70 block">
                  {userProfile.joinedDate}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ankahe-elevated hover:bg-ankahe-secondary text-xs text-ankahe-gold border border-ankahe-gold/30 transition-colors"
            >
              <Edit2 size={12} />
              <span>{isEditing ? 'Cancel' : 'Edit Bio'}</span>
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
                  value={penName}
                  onChange={(e) => setPenName(e.target.value)}
                  className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
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
                  className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium shadow-sm transition-colors"
                >
                  Save Profile Details
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
                  Biography:
                </span>
                <p className="font-serif italic text-sm text-ankahe-text/90 leading-relaxed">
                  "{userProfile.bio}"
                </p>
              </div>

              <div className="pt-4 border-t border-ankahe-border/50 space-y-2">
                <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
                  Preferred Languages:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {userProfile.preferredLanguages.map((l) => (
                    <span
                      key={l}
                      className="px-2.5 py-1 rounded bg-ankahe-elevated text-ankahe-muted text-[11px] font-mono border border-ankahe-border/60"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Anonymous Publishing Explanation (Section 12 Requirement) */}
        <div className="bg-ankahe-secondary/40 rounded-2xl p-6 border border-ankahe-border space-y-3 text-xs text-ankahe-muted">
          <div className="flex items-center gap-2 text-xs font-medium text-ankahe-gold">
            <Shield size={14} />
            <span>Anonymous Publishing in ANKAHE</span>
          </div>
          <p className="leading-relaxed">
            Whenever you publish an anonymous post or poem in ANKAHE, your profile, pen name, and history are completely severed from that piece. Other readers will never be able to navigate to this profile from an anonymous submission.
          </p>
        </div>

      </div>
    </CommunityLayout>
  );
};
