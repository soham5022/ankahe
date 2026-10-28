import React, { useState } from 'react';
import type { WritingItem } from '../../types';
import { X, Copy, Check, Heart, Bookmark, Sun } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';

interface WritingReaderModalProps {
  item: WritingItem | null;
  onClose: () => void;
}

export const WritingReaderModal: React.FC<WritingReaderModalProps> = ({ item, onClose }) => {
  const { resonances, toggleResonance, savedPieceIds, toggleSavePiece, showToast } = useCommunity();
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const currentResonance = resonances[item.id] || {};
  const isSaved = savedPieceIds.includes(item.id);
  const isUrdu = item.language === 'Urdu';
  const isDevanagari = item.language === 'Hindi' || item.language === 'Marathi';

  const handleCopy = () => {
    navigator.clipboard.writeText(`${item.title ? `${item.title}\n\n` : ''}${item.content}\n\n— ${item.author} (ANKAHE)`);
    setCopied(true);
    showToast("Words copied gently to clipboard.");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Read writing"
    >
      <div 
        className={`relative w-full max-w-2xl rounded-3xl border p-8 sm:p-14 space-y-8 my-8 shadow-2xl transition-all ${
          item.isPaperStyle
            ? 'paper-surface border-ankahe-paper-border text-ankahe-paper-dark'
            : 'bg-ankahe-secondary border-ankahe-border text-ankahe-text'
        }`}
      >
        {/* Top Controls */}
        <div 
          className={`flex items-center justify-between pb-4 border-b border-dashed ${
            item.isPaperStyle ? 'border-ankahe-paper-border text-ankahe-gold-dark' : 'border-ankahe-border text-ankahe-muted'
          }`}
        >
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="uppercase tracking-widest">{item.type}</span>
            <span>•</span>
            <span>{item.language}</span>
            {item.category && (
              <>
                <span>•</span>
                <span className="capitalize">{item.category}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`p-2 rounded-full transition-colors ${
                item.isPaperStyle
                  ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/70'
                  : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
              }`}
              title="Copy text"
              aria-label="Copy text"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                item.isPaperStyle
                  ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/70'
                  : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
              }`}
              aria-label="Close reading view"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-6">
          {item.title && (
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide">
              {item.title}
            </h2>
          )}

          <div
            dir={isUrdu ? 'rtl' : 'ltr'}
            className={`whitespace-pre-wrap leading-relaxed ${
              isUrdu
                ? 'poetry-urdu text-2xl sm:text-3xl text-right leading-loose'
                : isDevanagari
                ? 'poetry-devanagari text-lg sm:text-2xl font-normal leading-relaxed'
                : 'font-serif text-lg sm:text-2xl font-light leading-relaxed'
            }`}
          >
            {item.content}
          </div>
        </div>

        {/* Author Sign-off */}
        <div 
          className={`pt-6 border-t border-dashed flex flex-wrap items-center justify-between gap-4 text-xs ${
            item.isPaperStyle ? 'border-ankahe-paper-border text-ankahe-paper-dark/80' : 'border-ankahe-border text-ankahe-muted'
          }`}
        >
          <div className="space-y-1">
            <p className="font-serif italic text-sm">
              — {item.isAnonymous ? 'Anonymous' : item.author}
            </p>
            {item.dateApprox && (
              <p className="font-mono text-[11px] opacity-70">
                {item.dateApprox}
              </p>
            )}
          </div>

          {/* Quiet Resonances */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleResonance(item.id, 'felt', "You let this know it was felt.")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors border ${
                currentResonance.felt
                  ? 'bg-ankahe-gold/20 text-ankahe-gold border-ankahe-gold/40 font-medium'
                  : item.isPaperStyle
                  ? 'border-ankahe-paper-border hover:bg-ankahe-paper-muted'
                  : 'border-ankahe-border hover:bg-ankahe-elevated hover:text-ankahe-gold'
              }`}
            >
              <Heart size={13} className={currentResonance.felt ? 'fill-current' : ''} />
              <span>I felt this</span>
            </button>

            <button
              onClick={() => toggleResonance(item.id, 'warmth', "Warmth sent into the quiet.")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors border ${
                currentResonance.warmth
                  ? 'bg-amber-400/20 text-amber-300 border-amber-300/40 font-medium'
                  : item.isPaperStyle
                  ? 'border-ankahe-paper-border hover:bg-ankahe-paper-muted'
                  : 'border-ankahe-border hover:bg-ankahe-elevated hover:text-amber-300'
              }`}
            >
              <Sun size={13} />
              <span>Sending warmth</span>
            </button>

            <button
              onClick={() => toggleSavePiece(item.id)}
              className={`p-2 rounded-full border transition-colors ${
                isSaved
                  ? 'text-ankahe-gold border-ankahe-gold bg-ankahe-gold/15'
                  : item.isPaperStyle
                  ? 'border-ankahe-paper-border hover:bg-ankahe-paper-muted'
                  : 'border-ankahe-border hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
              }`}
              title={isSaved ? "Saved in My Space" : "Save to My Space"}
            >
              <Bookmark size={14} className={isSaved ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
