import React, { createContext, useContext, useState } from 'react';
import type { WritingItem, DraftItem, UserProfile, UnsentLetterItem } from '../types';
import { SAMPLE_WRITINGS } from '../data/sampleWriting';
import { SAMPLE_LETTERS } from '../data/unsentLetters';

interface CommunityContextType {
  writings: WritingItem[];
  letters: UnsentLetterItem[];
  drafts: DraftItem[];
  savedPieceIds: string[];
  resonances: Record<string, { felt?: boolean; stayed?: boolean; warmth?: boolean }>;
  userProfile: UserProfile;
  addWriting: (item: Omit<WritingItem, 'id'>) => WritingItem;
  saveDraft: (draft: Omit<DraftItem, 'id' | 'savedAt'> & { id?: string }) => DraftItem;
  deleteDraft: (id: string) => void;
  toggleSavePiece: (id: string) => void;
  toggleResonance: (id: string, type: 'felt' | 'stayed' | 'warmth', message: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [writings, setWritings] = useState<WritingItem[]>(SAMPLE_WRITINGS);
  const [letters] = useState<UnsentLetterItem[]>(SAMPLE_LETTERS);
  
  // In-memory drafts for current session
  const [drafts, setDrafts] = useState<DraftItem[]>([
    {
      id: 'draft-demo-1',
      title: 'Midnight on the platform',
      content: 'I saw someone who looked like you today. I almost called out...',
      type: 'Thought',
      language: 'Hinglish',
      category: 'nostalgia',
      visibility: 'private',
      savedAt: 'Session draft'
    }
  ]);

  // Saved pieces
  const [savedPieceIds, setSavedPieceIds] = useState<string[]>(['w-1', 'w-5']);

  // Resonances
  const [resonances, setResonances] = useState<Record<string, { felt?: boolean; stayed?: boolean; warmth?: boolean }>>({
    'w-1': { felt: true },
    'w-5': { warmth: true },
  });

  // User Profile Prototype
  const [userProfile, setUserProfile] = useState<UserProfile>({
    penName: 'A Quiet Heart',
    bio: 'Writing in the quiet corners of late night trains and empty tea stalls.',
    preferredLanguages: ['Hinglish', 'Hindi', 'English', 'Marathi'],
    isAnonymousDefault: false,
    joinedDate: 'Phase 2 Prototype Member',
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addWriting = (item: Omit<WritingItem, 'id'>): WritingItem => {
    const newItem: WritingItem = {
      ...item,
      id: `community-${Date.now()}`,
      feltCount: 1,
      userFelt: true,
    };
    // Add to in-memory demonstration feed (at top)
    setWritings((prev) => [newItem, ...prev]);
    showToast("Words placed gently in session feed.");
    return newItem;
  };

  const saveDraft = (draftData: Omit<DraftItem, 'id' | 'savedAt'> & { id?: string }): DraftItem => {
    const id = draftData.id || `draft-${Date.now()}`;
    const newDraft: DraftItem = {
      ...draftData,
      id,
      savedAt: 'Saved just now (Session)',
    };

    setDrafts((prev) => {
      const existingIdx = prev.findIndex((d) => d.id === id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newDraft;
        return updated;
      }
      return [newDraft, ...prev];
    });

    showToast("Draft kept safe in this session.");
    return newDraft;
  };

  const deleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    showToast("Draft removed.");
  };

  const toggleSavePiece = (id: string) => {
    setSavedPieceIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast("Removed from your saved pieces.");
        return prev.filter((item) => item !== id);
      } else {
        showToast("Saved softly to your private space.");
        return [...prev, id];
      }
    });
  };

  const toggleResonance = (id: string, type: 'felt' | 'stayed' | 'warmth', message: string) => {
    setResonances((prev) => {
      const current = prev[id] || {};
      const nextVal = !current[type];
      return {
        ...prev,
        [id]: { ...current, [type]: nextVal },
      };
    });
    showToast(message);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    showToast("Profile prototype updated.");
  };

  return (
    <CommunityContext.Provider
      value={{
        writings,
        letters,
        drafts,
        savedPieceIds,
        resonances,
        userProfile,
        addWriting,
        saveDraft,
        deleteDraft,
        toggleSavePiece,
        toggleResonance,
        updateProfile,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
