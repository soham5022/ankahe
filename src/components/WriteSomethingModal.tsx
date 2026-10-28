import React, { useState } from 'react';
import { X, Feather, Eye, Edit3, Copy, Check, Info, Sparkles } from 'lucide-react';
import type { WritingType, Language, EmotionCategory, WritingItem } from '../types';

interface WriteSomethingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLocalDraft: (item: WritingItem) => void;
  onShowToast: (msg: string) => void;
}

export const WriteSomethingModal: React.FC<WriteSomethingModalProps> = ({
  isOpen,
  onClose,
  onAddLocalDraft,
  onShowToast,
}) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [type, setType] = useState<WritingType>('Poetry');
  const [language, setLanguage] = useState<Language>('English');
  const [category, setCategory] = useState<EmotionCategory>('peace');
  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyWords = () => {
    if (!content.trim()) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    onShowToast("Draft copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToSessionFeed = () => {
    if (!content.trim()) return;
    const newItem: WritingItem = {
      id: `user-${Date.now()}`,
      content: content.trim(),
      author: isAnonymous ? 'Anonymous' : author.trim() || 'A Quiet Soul',
      isAnonymous,
      type,
      language,
      category,
      dateApprox: 'Written just now',
      isPaperStyle: true,
      scriptStyle: language === 'Hindi' || language === 'Marathi' ? 'devanagari' : language === 'Urdu' ? 'nastaliq' : 'serif'
    };
    onAddLocalDraft(newItem);
    onShowToast("Added to your current reading session.");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Write in ANKAHE"
    >
      <div className="relative w-full max-w-2xl bg-ankahe-secondary rounded-3xl border border-ankahe-border shadow-2xl p-6 sm:p-8 space-y-6 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-ankahe-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-ankahe-elevated border border-ankahe-border flex items-center justify-center text-ankahe-gold">
              <Feather size={16} />
            </div>
            <div>
              <h3 className="font-serif text-xl text-ankahe-text font-normal">
                Give your feelings words
              </h3>
              <p className="text-xs text-ankahe-muted font-light">
                No judgment, no audience pressure.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-3 py-1.5 rounded-full border border-ankahe-border text-xs text-ankahe-muted hover:text-ankahe-text flex items-center gap-1.5 transition-colors"
              title="Toggle Paper Preview"
            >
              {previewMode ? <Edit3 size={13} /> : <Eye size={13} />}
              <span>{previewMode ? 'Edit Draft' : 'Paper Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-ankahe-muted hover:text-ankahe-text rounded-full hover:bg-ankahe-elevated transition-colors"
              aria-label="Close writing desk"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form Body or Paper Preview */}
        {!previewMode ? (
          <div className="space-y-5">
            {/* Controls Row: Type, Language, Emotion */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Type */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-ankahe-muted font-light">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as WritingType)}
                  className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                >
                  <option value="Poetry">Poetry (कविता)</option>
                  <option value="Sher & Shayari">Sher & Shayari (शेर)</option>
                  <option value="Thought">Short Thought (विचार)</option>
                  <option value="Personal Reflection">Personal Reflection</option>
                  <option value="Story">Story / Memoir</option>
                  <option value="Unsent Letter">Unsent Letter</option>
                  <option value="Quote">Quote</option>
                  <option value="Observation">Observation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Language */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-ankahe-muted font-light">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                >
                  <option value="English">English</option>
                  <option value="Hinglish">Hinglish</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="Urdu">Urdu (اردو)</option>
                  <option value="Other">Other language</option>
                </select>
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-ankahe-muted font-light">
                  Tone
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as EmotionCategory)}
                  className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold capitalize"
                >
                  <option value="peace">A quiet thought / Peace</option>
                  <option value="everyday life">Everyday life</option>
                  <option value="nostalgia">A memory / Nostalgia</option>
                  <option value="hope">Something hopeful</option>
                  <option value="heartbreak">Heartbreak</option>
                  <option value="confusion">Confusion</option>
                  <option value="gratitude">Gratitude</option>
                  <option value="loneliness">Loneliness</option>
                  <option value="new beginnings">New Beginnings</option>
                </select>
              </div>
            </div>

            {/* Author / Anonymity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-ankahe-elevated/60 border border-ankahe-border text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous-toggle"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-ankahe-border text-ankahe-gold focus:ring-ankahe-gold"
                />
                <label htmlFor="anonymous-toggle" className="text-ankahe-text cursor-pointer">
                  Remain anonymous
                </label>
              </div>

              {!isAnonymous && (
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <span className="text-ankahe-muted text-[11px]">Pen Name:</span>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. A wanderer, Noor..."
                    className="bg-ankahe-bg border border-ankahe-border rounded-lg px-2.5 py-1 text-xs text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
                  />
                </div>
              )}
            </div>

            {/* Writing Textarea */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-ankahe-muted font-light">
                Your writing
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={7}
                placeholder={
                  language === 'Hinglish'
                    ? 'Jo dil mein hai, likh do... start with just one line.'
                    : language === 'Hindi'
                    ? 'यहाँ लिखें... जो कुछ भी आप किसी से नहीं कह सके...'
                    : language === 'Marathi'
                    ? 'इथे लिहा... जे मनात आहे ते मोकळे करा...'
                    : language === 'Urdu'
                    ? 'یہاں لکھیے... وہ بات جو کہی نہ جا سکی...'
                    : 'Whatever is on your mind, put it into words... start with just one line.'
                }
                className={`w-full bg-ankahe-elevated border border-ankahe-border rounded-2xl p-4 text-sm sm:text-base text-ankahe-text placeholder-ankahe-muted/40 focus:outline-none focus:border-ankahe-gold/60 focus:ring-1 focus:ring-ankahe-gold/40 leading-relaxed ${
                  language === 'Hindi' || language === 'Marathi'
                    ? 'font-devanagari'
                    : language === 'Urdu'
                    ? 'poetry-urdu text-right'
                    : 'font-serif'
                }`}
              />
            </div>
          </div>
        ) : (
          /* Live Paper Card Preview */
          <div className="paper-texture rounded-2xl p-6 sm:p-8 border border-ankahe-paper-border text-ankahe-paper-dark shadow-paper-warm space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-dashed border-ankahe-paper-border">
              <span className="px-2.5 py-0.5 rounded-full bg-ankahe-paper-muted text-[11px] uppercase font-medium">
                {type} • {language}
              </span>
              <span className="capitalize text-[11px] text-ankahe-paper-faint">
                {category}
              </span>
            </div>

            <div className="min-h-[120px] flex items-center py-2">
              <p
                className={`whitespace-pre-line text-base sm:text-lg ${
                  language === 'Hindi' || language === 'Marathi'
                    ? 'poetry-devanagari'
                    : language === 'Urdu'
                    ? 'poetry-urdu text-right w-full text-lg'
                    : 'font-serif italic poetry-text'
                }`}
              >
                {content.trim() || 'Your words will appear here as you type them...'}
              </p>
            </div>

            <div className="pt-3 border-t border-dashed border-ankahe-paper-border flex items-center justify-between text-xs">
              <span className="font-serif">
                — {isAnonymous ? 'Anonymous' : author.trim() || 'Pen name'}
              </span>
              <span className="text-ankahe-paper-faint text-[11px]">
                Draft Preview
              </span>
            </div>
          </div>
        )}

        {/* Phase 1 Honest Prototype Notice */}
        <div className="bg-ankahe-elevated/50 rounded-xl p-3.5 border border-ankahe-border text-xs text-ankahe-muted/90 flex items-start gap-2.5">
          <Info size={16} className="text-ankahe-gold shrink-0 mt-0.5" />
          <div className="space-y-1 font-light leading-relaxed">
            <p className="text-ankahe-text font-normal">
              Phase 1 Prototype Transparency:
            </p>
            <p>
              Your text exists safely in this session. Cloud persistent storage, encryption, and public community feeds are scheduled for Phase 2. Use "Copy Words" below to keep a copy for yourself, or "Preview in Session" to see it live on the homepage right now.
            </p>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-ankahe-border/60">
          <button
            onClick={handleCopyWords}
            disabled={!content.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-ankahe-border text-xs text-ankahe-muted hover:text-ankahe-text disabled:opacity-40 transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>Copy Draft</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-full text-xs text-ankahe-muted hover:text-ankahe-text"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToSessionFeed}
              disabled={!content.trim()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-ankahe-gold text-ankahe-bg hover:bg-ankahe-gold-light disabled:opacity-40 text-xs font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>Preview in Session Feed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
