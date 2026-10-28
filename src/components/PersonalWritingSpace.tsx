import React, { useState } from 'react';
import type { Language, EmotionCategory, WritingItem } from '../types';
import { Feather, Check, Lock } from 'lucide-react';

interface PersonalWritingSpaceProps {
  onAddLocalDraft: (item: WritingItem) => void;
  onShowToast: (msg: string) => void;
}

const LANGUAGES: Language[] = ['Hinglish', 'Hindi', 'Marathi', 'English', 'Urdu', 'Other'];

const MOODS: { label: string; value: EmotionCategory }[] = [
  { label: 'A quiet thought', value: 'peace' },
  { label: 'A memory', value: 'nostalgia' },
  { label: 'Everyday life', value: 'everyday life' },
  { label: 'Something hopeful', value: 'hope' },
  { label: 'Unspoken hurt', value: 'heartbreak' },
  { label: 'Quiet gratitude', value: 'gratitude' },
  { label: 'Late night loneliness', value: 'loneliness' },
  { label: 'Starting over', value: 'new beginnings' },
];

export const PersonalWritingSpace: React.FC<PersonalWritingSpaceProps> = ({
  onAddLocalDraft,
  onShowToast,
}) => {
  const [text, setText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Hinglish');
  const [selectedMood, setSelectedMood] = useState<EmotionCategory>('peace');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [savedLocally, setSavedLocally] = useState(false);
  const [copied, setCopied] = useState(false);

  const getPlaceholder = (lang: Language) => {
    switch (lang) {
      case 'Hinglish':
        return 'Jo dil mein hai, likh do... chahe ek hi line kyu na ho.';
      case 'Hindi':
        return 'जो दिल में है, लिख दो... चाहे बस एक ही पंक्ति क्यों न हो...';
      case 'Marathi':
        return 'जे मनात आहे, ते मोकळे करा... अगदी एका ओळीपासून सुरुवात करा...';
      case 'Urdu':
        return 'جو دل میں ہے، لکھ دیجیے... چاہے ایک ہی مصرع کیوں نہ ہو...';
      default:
        return 'Whatever is on your mind, put it into words... start with just one line.';
    }
  };

  const handleSavePrivateDraft = () => {
    if (!text.trim()) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setSavedLocally(true);
    onShowToast("Saved privately to clipboard. Only you have this.");
    setTimeout(() => setCopied(false), 2400);
  };

  const handleShareToSession = () => {
    if (!text.trim()) return;
    const newItem: WritingItem = {
      id: `session-${Date.now()}`,
      content: text.trim(),
      author: isAnonymous ? 'Anonymous' : authorName.trim() || 'A Quiet Soul',
      isAnonymous,
      type: 'Thought',
      language: selectedLanguage,
      category: selectedMood,
      dateApprox: 'Written just now',
      isPaperStyle: true,
      scriptStyle: selectedLanguage === 'Hindi' || selectedLanguage === 'Marathi' ? 'devanagari' : selectedLanguage === 'Urdu' ? 'nastaliq' : 'serif',
      feltCount: 1,
      userFelt: true,
    };
    onAddLocalDraft(newItem);
    onShowToast("Your words have been placed gently in this session's feed.");
    setText('');
    setSavedLocally(false);
  };

  return (
    <section id="writing-space" className="py-20 sm:py-32 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto border-t border-ankahe-border/40 space-y-10">
      {/* Section Header: Left-aligned editorial */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-ankahe-brown font-mono">
          Page 02 • Writing Desk
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ankahe-text font-normal">
          You can start with just one line.
        </h2>
        <p className="text-sm sm:text-base text-ankahe-muted font-light leading-relaxed">
          It doesn't have to rhyme. It doesn't have to make sense to anyone else. It only has to mean something to you.
        </p>
      </div>

      {/* Large Comfortable Warm Paper Writing Desk */}
      <div className="paper-surface rounded-2xl p-6 sm:p-10 lg:p-12 border border-ankahe-paper-border shadow-paper-warm text-ankahe-paper-dark relative">
          {/* Top Paper Controls: Language & Tone */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-dashed border-ankahe-paper-border/80 text-xs">
            {/* Language Selector */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-ankahe-paper-faint font-medium mr-1">
                Language:
              </span>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                    selectedLanguage === lang
                      ? 'bg-ankahe-paper-dark text-ankahe-paper font-medium shadow-sm'
                      : 'bg-ankahe-paper-muted text-ankahe-paper-dark/80 hover:bg-ankahe-paper-border'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Mood selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-ankahe-paper-faint font-medium">
                Tone:
              </span>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value as EmotionCategory)}
                className="bg-ankahe-paper-muted border border-ankahe-paper-border rounded-lg px-2.5 py-1 text-xs text-ankahe-paper-dark focus:outline-none focus:ring-1 focus:ring-ankahe-gold-dark"
              >
                {MOODS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Large Writing Surface */}
          <div className="py-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder={getPlaceholder(selectedLanguage)}
              className={`w-full bg-transparent border-0 resize-none text-base sm:text-xl text-ankahe-paper-dark placeholder-ankahe-paper-faint/60 focus:outline-none leading-relaxed sm:leading-loose ${
                selectedLanguage === 'Hindi' || selectedLanguage === 'Marathi'
                  ? 'font-devanagari'
                  : selectedLanguage === 'Urdu'
                  ? 'poetry-urdu text-right text-lg sm:text-2xl'
                  : 'font-serif'
              }`}
            />
          </div>

          {/* Privacy & Pen Name Controls */}
          <div className="pt-4 border-t border-dashed border-ankahe-paper-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-ankahe-paper-faint">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-ankahe-paper-dark focus:ring-0"
                />
                <span className="text-xs text-ankahe-paper-dark font-medium">
                  Stay anonymous
                </span>
              </label>

              {!isAnonymous && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px]">Pen Name:</span>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. A wanderer"
                    className="bg-ankahe-paper-muted/80 border border-ankahe-paper-border rounded px-2 py-0.5 text-xs text-ankahe-paper-dark placeholder-ankahe-paper-faint focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-ankahe-paper-faint">
              <span>{text.trim() ? `${text.trim().split(/\s+/).length} words` : 'Blank page'}</span>
            </div>
          </div>

          {/* Action Buttons: Save Private Draft vs Share to Session */}
          <div className="mt-6 pt-5 border-t border-ankahe-paper-border flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Private Save */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSavePrivateDraft}
                disabled={!text.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-ankahe-paper-border hover:bg-ankahe-paper-muted text-xs text-ankahe-paper-dark disabled:opacity-40 transition-colors"
                title="Copy your text to keep it completely private"
              >
                {copied ? <Check size={14} className="text-emerald-700" /> : <Lock size={13} />}
                <span>{copied ? 'Copied Privately' : 'Keep as Private Draft'}</span>
              </button>
              {savedLocally && (
                <span className="font-handwriting text-sm text-emerald-800">
                  Kept safe with you.
                </span>
              )}
            </div>

            {/* Share to Session */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <button
                onClick={handleShareToSession}
                disabled={!text.trim()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-paper-dark hover:bg-[#1f1d19] text-ankahe-paper text-xs font-medium disabled:opacity-40 shadow-sm transition-colors"
                title="Add your words to the session feed on this page"
              >
                <Feather size={14} className="text-ankahe-brown" />
                <span>Place Gently in Feed</span>
              </button>
            </div>
          </div>

          {/* Honest Privacy Reassurance */}
          <div className="mt-4 pt-3 flex items-center gap-2 text-[11px] text-ankahe-paper-faint/80 leading-normal">
            <Lock size={12} className="shrink-0 text-ankahe-brown" />
            <span>
              Your words exist only in this browser session. Nothing is sent to a server or saved to the cloud. You are always in control.
            </span>
          </div>
        </div>
    </section>
  );
};
