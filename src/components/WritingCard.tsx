import React, { useState } from 'react';
import type { WritingItem } from '../types';
import { Copy, Check, Maximize2, Heart, Bookmark, Sun } from 'lucide-react';

interface WritingCardProps {
  item: WritingItem;
  onFocusItem: (item: WritingItem) => void;
  onShowToast: (msg: string) => void;
  onToggleReaction?: (id: string, type: 'felt' | 'stayed' | 'warmth') => void;
}

export const WritingCard: React.FC<WritingCardProps> = ({
  item,
  onFocusItem,
  onShowToast,
  onToggleReaction,
}) => {
  const [copied, setCopied] = useState(false);
  const [localFelt, setLocalFelt] = useState(item.userFelt || false);
  const [localStayed, setLocalStayed] = useState(item.userStayed || false);
  const [localWarmth, setLocalWarmth] = useState(item.userWarmth || false);

  const [feltCount, setFeltCount] = useState(item.feltCount || 0);
  const [stayedCount, setStayedCount] = useState(item.stayedCount || 0);
  const [warmthCount, setWarmthCount] = useState(item.warmthCount || 0);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.content);
    setCopied(true);
    onShowToast("Words softly saved to clipboard.");
    setTimeout(() => setCopied(false), 2200);
  };

  const handleFeltClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!localFelt) {
      setLocalFelt(true);
      setFeltCount((c) => c + 1);
      onShowToast("You let this know it was felt.");
    } else {
      setLocalFelt(false);
      setFeltCount((c) => Math.max(0, c - 1));
    }
    if (onToggleReaction) onToggleReaction(item.id, 'felt');
  };

  const handleStayedClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!localStayed) {
      setLocalStayed(true);
      setStayedCount((c) => c + 1);
      onShowToast("Held softly in your thoughts.");
    } else {
      setLocalStayed(false);
      setStayedCount((c) => Math.max(0, c - 1));
    }
    if (onToggleReaction) onToggleReaction(item.id, 'stayed');
  };

  const handleWarmthClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!localWarmth) {
      setLocalWarmth(true);
      setWarmthCount((c) => c + 1);
      onShowToast("Warmth sent into the quiet.");
    } else {
      setLocalWarmth(false);
      setWarmthCount((c) => Math.max(0, c - 1));
    }
    if (onToggleReaction) onToggleReaction(item.id, 'warmth');
  };

  const isWarmPaper = item.isPaperStyle;

  return (
    <article
      onClick={() => onFocusItem(item)}
      className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
        isWarmPaper
          ? 'paper-texture text-ankahe-paper-dark border-ankahe-paper-border shadow-paper-warm hover:shadow-paper'
          : 'bg-ankahe-elevated text-ankahe-text border-ankahe-border hover:border-ankahe-gold/30 shadow-elevated hover:shadow-gold-glow'
      }`}
      aria-label={`${item.type} by ${item.author}`}
    >
      {/* Top Meta info */}
      <div className="flex items-center justify-between pb-3.5 border-b border-dashed border-current/15 text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase ${
              isWarmPaper
                ? 'bg-ankahe-paper-muted text-ankahe-paper-dark'
                : 'bg-ankahe-secondary text-ankahe-gold/90 border border-ankahe-border'
            }`}
          >
            {item.type}
          </span>
          <span className={`${isWarmPaper ? 'text-ankahe-paper-faint' : 'text-ankahe-muted'} font-light text-[11px]`}>
            • {item.language}
          </span>
        </div>

        {/* Emotion tag */}
        <span
          className={`capitalize text-[11px] font-light ${
            isWarmPaper ? 'text-ankahe-paper-faint' : 'text-ankahe-rose/90'
          }`}
        >
          {item.category}
        </span>
      </div>

      {/* Main Poetry / Writing Body */}
      <div className="my-5 min-h-[95px] flex items-center">
        <blockquote
          className={`whitespace-pre-line text-base sm:text-lg select-text ${
            item.language === 'Urdu'
              ? 'poetry-urdu text-right w-full text-lg sm:text-xl font-normal'
              : item.language === 'Hindi' || item.language === 'Marathi'
              ? 'poetry-devanagari font-normal'
              : 'poetry-text font-serif italic'
          } ${isWarmPaper ? 'text-ankahe-paper-dark' : 'text-ankahe-text/95'}`}
        >
          {item.content}
        </blockquote>
      </div>

      {/* Author & Actions Area */}
      <div className="space-y-3 pt-3.5 border-t border-dashed border-current/15">
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`font-serif text-sm font-medium ${
                isWarmPaper ? 'text-ankahe-paper-dark' : 'text-ankahe-text'
              }`}
            >
              {item.author}
              {item.isAnonymous && (
                <span className="font-sans text-[11px] font-light italic opacity-70 ml-1.5">
                  (anonymous)
                </span>
              )}
            </p>
            {item.dateApprox && (
              <p
                className={`text-[11px] font-light ${
                  isWarmPaper ? 'text-ankahe-paper-faint' : 'text-ankahe-muted/70'
                }`}
              >
                {item.dateApprox}
              </p>
            )}
          </div>

          {/* Quick utility controls */}
          <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className={`p-1.5 rounded-lg transition-colors ${
                isWarmPaper
                  ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-faint hover:text-ankahe-paper-dark'
                  : 'hover:bg-ankahe-secondary text-ankahe-muted hover:text-ankahe-gold'
              }`}
              title="Copy words"
              aria-label="Copy writing to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFocusItem(item);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isWarmPaper
                  ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-faint hover:text-ankahe-paper-dark'
                  : 'hover:bg-ankahe-secondary text-ankahe-muted hover:text-ankahe-text'
              }`}
              title="Read in quiet focus"
              aria-label="Expand reading view"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        {/* Quiet Human Resonances: I felt this, Stayed with me, Sending warmth */}
        <div className="pt-2 border-t border-current/10 flex items-center justify-between gap-1 text-[11px]">
          <button
            onClick={handleFeltClick}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
              localFelt
                ? isWarmPaper
                  ? 'bg-ankahe-rose/20 text-ankahe-rose-dark font-medium'
                  : 'bg-ankahe-rose/20 text-ankahe-rose font-medium'
                : isWarmPaper
                ? 'text-ankahe-paper-faint hover:bg-ankahe-paper-muted hover:text-ankahe-paper-dark'
                : 'text-ankahe-muted hover:text-ankahe-rose hover:bg-ankahe-secondary'
            }`}
            title="Acknowledge that this resonated with you"
          >
            <Heart size={12} className={localFelt ? 'fill-current' : ''} />
            <span>I felt this {feltCount > 0 ? `(${feltCount})` : ''}</span>
          </button>

          <button
            onClick={handleStayedClick}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
              localStayed
                ? isWarmPaper
                  ? 'bg-ankahe-gold/25 text-ankahe-gold-dark font-medium'
                  : 'bg-ankahe-gold/20 text-ankahe-gold font-medium'
                : isWarmPaper
                ? 'text-ankahe-paper-faint hover:bg-ankahe-paper-muted hover:text-ankahe-paper-dark'
                : 'text-ankahe-muted hover:text-ankahe-gold hover:bg-ankahe-secondary'
            }`}
            title="Save this reflection in your memory"
          >
            <Bookmark size={12} className={localStayed ? 'fill-current' : ''} />
            <span>Stayed with me {stayedCount > 0 ? `(${stayedCount})` : ''}</span>
          </button>

          <button
            onClick={handleWarmthClick}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
              localWarmth
                ? isWarmPaper
                  ? 'bg-amber-100 text-amber-900 font-medium'
                  : 'bg-amber-500/20 text-amber-300 font-medium'
                : isWarmPaper
                ? 'text-ankahe-paper-faint hover:bg-ankahe-paper-muted hover:text-ankahe-paper-dark'
                : 'text-ankahe-muted hover:text-amber-300 hover:bg-ankahe-secondary'
            }`}
            title="Send quiet warmth to whoever wrote this"
          >
            <Sun size={12} />
            <span>Warmth {warmthCount > 0 ? `(${warmthCount})` : ''}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
