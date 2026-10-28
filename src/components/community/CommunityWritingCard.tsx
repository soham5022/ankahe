import React from 'react';
import type { WritingItem } from '../../types';
import { Heart, Bookmark, Sun, Eye, Lock } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';

interface CommunityWritingCardProps {
  item: WritingItem;
  onOpen: (item: WritingItem) => void;
}

export const CommunityWritingCard: React.FC<CommunityWritingCardProps> = ({ item, onOpen }) => {
  const { resonances, toggleResonance, savedPieceIds, toggleSavePiece } = useCommunity();
  const currentResonance = resonances[item.id] || {};
  const isSaved = savedPieceIds.includes(item.id);

  const isUrdu = item.language === 'Urdu';
  const isDevanagari = item.language === 'Hindi' || item.language === 'Marathi';

  return (
    <article
      className={`rounded-2xl transition-all duration-300 relative border ${
        item.isPaperStyle
          ? 'paper-surface p-7 sm:p-9 border-ankahe-paper-border shadow-paper text-ankahe-paper-dark'
          : 'bg-ankahe-secondary/70 hover:bg-ankahe-secondary p-7 sm:p-9 border-ankahe-border text-ankahe-text shadow-subtle'
      }`}
    >
      {/* Top Metadata Line */}
      <div
        className={`flex items-center justify-between text-xs pb-3.5 border-b border-dashed ${
          item.isPaperStyle ? 'border-ankahe-paper-border text-ankahe-gold-dark' : 'border-ankahe-border/70 text-ankahe-muted/70'
        }`}
      >
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="uppercase tracking-wider font-medium">{item.type}</span>
          <span>•</span>
          <span>{item.language}</span>
          {item.category && (
            <>
              <span>•</span>
              <span className="capitalize">{item.category}</span>
            </>
          )}
        </div>

        {item.visibility === 'private' && (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
            <Lock size={10} />
            <span>Private</span>
          </span>
        )}
      </div>

      {/* Main Content Area */}
      <div 
        onClick={() => onOpen(item)}
        className="py-5 cursor-pointer group"
      >
        {item.title && (
          <h3 
            className={`font-serif text-lg sm:text-xl font-medium mb-3 group-hover:text-ankahe-gold transition-colors ${
              item.isPaperStyle ? 'text-ankahe-paper-dark' : 'text-ankahe-text'
            }`}
          >
            {item.title}
          </h3>
        )}

        <div
          dir={isUrdu ? 'rtl' : 'ltr'}
          className={`leading-relaxed whitespace-pre-wrap ${
            isUrdu
              ? 'poetry-urdu text-xl sm:text-2xl text-right'
              : isDevanagari
              ? 'poetry-devanagari text-base sm:text-lg font-normal'
              : 'font-serif text-base sm:text-lg font-light'
          } ${
            item.isPaperStyle ? 'text-ankahe-paper-dark/95' : 'text-ankahe-text/90'
          }`}
        >
          {item.content}
        </div>
      </div>

      {/* Bottom Footer: Author & Quiet Resonances */}
      <div
        className={`pt-4 border-t border-dashed flex flex-wrap items-center justify-between gap-3 text-xs ${
          item.isPaperStyle ? 'border-ankahe-paper-border text-ankahe-paper-dark/70' : 'border-ankahe-border/60 text-ankahe-muted'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-serif italic">
            — {item.isAnonymous ? 'Anonymous' : item.author}
          </span>
          {item.dateApprox && (
            <span className="text-[11px] font-mono opacity-60">
              ({item.dateApprox})
            </span>
          )}
        </div>

        {/* Quiet Resonance & Save Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* I felt this */}
          <button
            onClick={() => toggleResonance(item.id, 'felt', "You let this know it was felt.")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors ${
              currentResonance.felt
                ? 'bg-ankahe-gold/20 text-ankahe-gold font-medium'
                : item.isPaperStyle
                ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/80'
                : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-gold'
            }`}
            title="Acknowledge this resonance without numbers"
            aria-label="I felt this"
          >
            <Heart size={12} className={currentResonance.felt ? 'fill-current' : ''} />
            <span className="hidden sm:inline">Felt</span>
          </button>

          {/* Sending Warmth */}
          <button
            onClick={() => toggleResonance(item.id, 'warmth', "Warmth sent into the quiet.")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors ${
              currentResonance.warmth
                ? 'bg-amber-400/20 text-amber-300 font-medium'
                : item.isPaperStyle
                ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/80'
                : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-amber-300'
            }`}
            title="Send quiet warmth"
            aria-label="Send warmth"
          >
            <Sun size={12} />
            <span className="hidden sm:inline">Warmth</span>
          </button>

          {/* Bookmark / Save */}
          <button
            onClick={() => toggleSavePiece(item.id)}
            className={`p-1.5 rounded-full transition-colors ${
              isSaved
                ? 'text-ankahe-gold bg-ankahe-gold/15'
                : item.isPaperStyle
                ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/70 hover:text-ankahe-paper-dark'
                : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
            }`}
            title={isSaved ? "Saved in My Space" : "Save to My Space"}
            aria-label={isSaved ? "Saved" : "Save piece"}
          >
            <Bookmark size={13} className={isSaved ? 'fill-current' : ''} />
          </button>

          {/* Open Complete View */}
          <button
            onClick={() => onOpen(item)}
            className={`p-1.5 rounded-full transition-colors ${
              item.isPaperStyle
                ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/70 hover:text-ankahe-paper-dark'
                : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
            }`}
            title="Read in quiet focus"
            aria-label="Open reading mode"
          >
            <Eye size={13} />
          </button>
        </div>
      </div>
    </article>
  );
};
