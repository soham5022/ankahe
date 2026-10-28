import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import type { WritingItem } from '../types';

interface FocusReaderModalProps {
  item: WritingItem | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const FocusReaderModal: React.FC<FocusReaderModalProps> = ({
  item,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${item.content}\n\n— ${item.author}`);
    setCopied(true);
    onShowToast("Copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Quiet Reading Focus"
    >
      <div className="absolute inset-0 midnight-noise opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-xl mx-auto space-y-8 my-auto py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between text-xs text-ankahe-muted pb-4 border-b border-ankahe-border/60">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-ankahe-elevated text-ankahe-gold/90 text-[11px] font-medium border border-ankahe-border uppercase">
              {item.type}
            </span>
            <span className="text-[11px] font-light">• {item.language}</span>
            <span className="text-[11px] text-ankahe-rose font-light capitalize">• {item.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-ankahe-muted hover:text-ankahe-gold rounded-full hover:bg-ankahe-elevated transition-colors"
              title="Copy words"
              aria-label="Copy words"
            >
              {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-ankahe-muted hover:text-ankahe-text rounded-full hover:bg-ankahe-elevated transition-colors"
              aria-label="Close focus reader"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Central Writing Text */}
        <div className="my-8 py-4">
          <blockquote
            className={`whitespace-pre-line text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed text-ankahe-text/95 ${
              item.language === 'Urdu'
                ? 'poetry-urdu text-right text-2xl sm:text-3xl'
                : item.language === 'Hindi' || item.language === 'Marathi'
                ? 'poetry-devanagari'
                : 'poetry-text font-serif italic'
            }`}
          >
            {item.content}
          </blockquote>
        </div>

        {/* Bottom Author attribution */}
        <div className="pt-6 border-t border-dashed border-ankahe-border/60 flex items-center justify-between text-sm text-ankahe-muted">
          <div>
            <p className="font-serif text-ankahe-text text-base">
              — {item.author} {item.isAnonymous && <span className="text-xs font-sans italic opacity-70">(anonymous)</span>}
            </p>
            {item.dateApprox && (
              <p className="text-xs text-ankahe-muted/60 font-light mt-0.5">
                {item.dateApprox}
              </p>
            )}
          </div>

          <span className="text-xs text-ankahe-muted/50 font-light italic">
            ANKAHE • अनकहे
          </span>
        </div>
      </div>
    </div>
  );
};
