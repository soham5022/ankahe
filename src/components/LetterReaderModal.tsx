import React, { useState } from 'react';
import { X, Mail, Copy, Check } from 'lucide-react';
import type { UnsentLetterItem } from '../types';

interface LetterReaderModalProps {
  letter: UnsentLetterItem | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const LetterReaderModal: React.FC<LetterReaderModalProps> = ({
  letter,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!letter) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${letter.recipient}\n\n${letter.fullText}\n\n${letter.postscript || ''}`);
    setCopied(true);
    onShowToast("Letter copied softly to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Read Unsent Letter"
    >
      <div className="relative w-full max-w-2xl paper-texture text-ankahe-paper-dark rounded-3xl border border-ankahe-paper-border shadow-paper p-6 sm:p-12 space-y-8 my-8">
        {/* Envelope stamp & top controls */}
        <div className="flex items-start justify-between border-b border-dashed border-ankahe-paper-border pb-5">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-paper-faint flex items-center gap-1.5">
              <Mail size={13} className="text-ankahe-rose-dark" />
              Unsent Letter • {letter.dateText}
            </span>
            <span className="capitalize text-xs font-serif text-ankahe-rose-dark">
              Carrying: {letter.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-ankahe-paper-muted text-ankahe-paper-faint hover:text-ankahe-paper-dark transition-colors"
              title="Copy letter"
              aria-label="Copy letter text"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-ankahe-paper-muted text-ankahe-paper-faint hover:text-ankahe-paper-dark transition-colors"
              aria-label="Close letter"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Recipient */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-ankahe-paper-faint block">
            Addressed to:
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-ankahe-paper-dark font-normal leading-snug">
            {letter.recipient}
          </h3>
        </div>

        {/* Full Letter Body */}
        <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose text-ankahe-paper-dark/95 whitespace-pre-line select-text">
          {letter.fullText}
        </div>

        {/* Postscript if present */}
        {letter.postscript && (
          <div className="pt-4 border-t border-dashed border-ankahe-paper-border text-sm sm:text-base font-serif italic text-ankahe-paper-faint">
            {letter.postscript}
          </div>
        )}

        {/* Signature */}
        <div className="pt-4 border-t border-ankahe-paper-border/60 flex items-center justify-between text-xs text-ankahe-paper-faint font-serif">
          <span>— {letter.author}</span>
          <span className="font-sans text-[11px]">Never delivered • Forever kept safe</span>
        </div>
      </div>
    </div>
  );
};
