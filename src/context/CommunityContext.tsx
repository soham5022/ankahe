import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
  fetchUserSavedIds, 
  fetchUserReactions, 
  toggleSaveWriting, 
  toggleReaction 
} from '../lib/writingsService';

interface CommunityContextType {
  savedPieceIds: string[];
  resonances: Record<string, { felt?: boolean; stayed?: boolean; warmth?: boolean }>;
  toggleSavePiece: (id: string) => Promise<boolean>;
  toggleResonance: (id: string, type: 'felt' | 'stayed' | 'warmth', message?: string) => Promise<boolean>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  refreshInteractions: () => Promise<void>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [savedPieceIds, setSavedPieceIds] = useState<string[]>([]);
  const [resonances, setResonances] = useState<Record<string, { felt?: boolean; stayed?: boolean; warmth?: boolean }>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  const refreshInteractions = useCallback(async () => {
    if (!user) {
      setSavedPieceIds([]);
      setResonances({});
      return;
    }
    try {
      const [saved, res] = await Promise.all([
        fetchUserSavedIds(user.id),
        fetchUserReactions(user.id),
      ]);
      setSavedPieceIds(saved);
      setResonances(res);
    } catch (err) {
      console.warn('[ANKAHE Community] Interactions load error:', err);
    }
  }, [user]);

  useEffect(() => {
    refreshInteractions();
  }, [refreshInteractions]);

  const toggleSavePiece = async (id: string): Promise<boolean> => {
    if (!user) {
      showToast("Please sign in to save pieces to your quiet sanctuary.");
      return false;
    }

    const { saved, error } = await toggleSaveWriting(id, user.id);
    if (error) {
      showToast(`Could not update saved collection: ${error}`);
      return false;
    }

    setSavedPieceIds((prev) => {
      if (saved) {
        showToast("Saved softly to your private space.");
        return [...prev, id];
      } else {
        showToast("Removed from your saved collection.");
        return prev.filter((item) => item !== id);
      }
    });

    return saved;
  };

  const toggleResonance = async (
    id: string,
    type: 'felt' | 'stayed' | 'warmth',
    message?: string
  ): Promise<boolean> => {
    if (!user) {
      showToast("Please sign in to share a quiet resonance.");
      return false;
    }

    const { active, error } = await toggleReaction(id, type, user.id);
    if (error) {
      showToast(`Could not send resonance: ${error}`);
      return false;
    }

    setResonances((prev) => {
      const current = prev[id] || {};
      return {
        ...prev,
        [id]: { ...current, [type]: active },
      };
    });

    if (active && message) {
      showToast(message);
    } else if (active) {
      showToast("You let this know it was felt.");
    }

    return active;
  };

  return (
    <CommunityContext.Provider
      value={{
        savedPieceIds,
        resonances,
        toggleSavePiece,
        toggleResonance,
        toastMessage,
        showToast,
        refreshInteractions,
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
