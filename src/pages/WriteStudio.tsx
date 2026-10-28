import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Feather, Eye, Edit3, Save, Check, Lock, Globe, UserCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { useCommunity } from '../context/CommunityContext';
import type { WritingType, Language, EmotionCategory, VisibilityPreference } from '../types';

export const WriteStudio: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addWriting, saveDraft, userProfile, showToast } = useCommunity();

  // URL pre-selection support
  const initialType = (searchParams.get('type') as WritingType) || 'Thought';

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<WritingType>(initialType);
  const [language, setLanguage] = useState<Language>('Hinglish');
  const [mood, setMood] = useState<EmotionCategory>('peace');
  const [visibility, setVisibility] = useState<VisibilityPreference>('public');
  const [isPaperSurface, setIsPaperSurface] = useState(false);

  // Preview Mode
  const [isPreview, setIsPreview] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [publishFeedback, setPublishFeedback] = useState<string | null>(null);

  useEffect(() => {
    const paramType = searchParams.get('type') as WritingType;
    if (paramType) {
      setType(paramType);
    }
  }, [searchParams]);

  const contentTypes: WritingType[] = [
    'Thought',
    'Sher & Shayari',
    'Poetry',
    'Personal Reflection',
    'Story',
    'Unsent Letter',
    'Quote',
    'Observation',
    'Other',
  ];

  const languages: Language[] = ['Hinglish', 'Hindi', 'Marathi', 'English', 'Urdu', 'Other'];

  const moods: { label: string; value: EmotionCategory }[] = [
    { label: 'Peace', value: 'peace' },
    { label: 'Hope', value: 'hope' },
    { label: 'Nostalgia', value: 'nostalgia' },
    { label: 'Heartbreak', value: 'heartbreak' },
    { label: 'Gratitude', value: 'gratitude' },
    { label: 'Confusion', value: 'confusion' },
    { label: 'Loneliness', value: 'loneliness' },
    { label: 'New Beginnings', value: 'new beginnings' },
    { label: 'Everyday Life', value: 'everyday life' },
  ];

  const getPlaceholder = (lang: Language) => {
    switch (lang) {
      case 'Hindi':
        return 'जो दिल में है, लिख दो... चाहे बस एक ही पंक्ति क्यों न हो...';
      case 'Marathi':
        return 'जे मनात साचलं आहे, ते कागदावर उतरवा... अगदी एका ओळीपासून सुरुवात करा...';
      case 'Urdu':
        return 'جو دل پر بوجھ ہے، لکھ دیجیے... چاہے ایک ہی مصرع کیوں نہ ہو...';
      case 'Hinglish':
        return 'Jo dil mein hai, likh do... chahe do hi line kyu na ho.';
      default:
        return 'You do not need the perfect words. Start with whatever is on your mind...';
    }
  };

  const handleSaveDraft = () => {
    if (!content.trim()) {
      showToast("Write a line before saving as a draft.");
      return;
    }
    saveDraft({
      title: title.trim() || 'Untitled reflection',
      content: content.trim(),
      type,
      language,
      category: mood,
      visibility,
    });
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2400);
  };

  const handlePublishPrototype = () => {
    if (!content.trim()) {
      showToast("Please write something before publishing.");
      return;
    }

    if (visibility === 'private') {
      handleSaveDraft();
      setPublishFeedback("Saved as private draft. It is held only in your session and will not appear in the public feed.");
      return;
    }

    const authorDisplay = visibility === 'anonymous' ? 'Anonymous' : userProfile.penName;
    addWriting({
      title: title.trim() || undefined,
      content: content.trim(),
      author: authorDisplay,
      isAnonymous: visibility === 'anonymous',
      type,
      language,
      category: mood,
      visibility,
      isPaperStyle: isPaperSurface,
      scriptStyle: language === 'Hindi' || language === 'Marathi' ? 'devanagari' : language === 'Urdu' ? 'nastaliq' : 'serif',
      dateApprox: 'Written in this session',
    });

    setPublishFeedback(
      `Your piece has been placed gently into the in-memory session feed as ${
        visibility === 'anonymous' ? 'an anonymous post' : `"${userProfile.penName}"`
      }. Remember: This is a Phase 2 prototype demonstration; it exists in memory for this session.`
    );
  };

  const isUrdu = language === 'Urdu';
  const isDevanagari = language === 'Hindi' || language === 'Marathi';

  return (
    <CommunityLayout>
      <div className="space-y-10 max-w-3xl mx-auto">
        
        {/* ========================================================
            INTRODUCTORY COPY (Section 8 Requirements)
            ======================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <Feather size={13} />
            <span>Writing Studio • लेखणी</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Take your time.
          </h1>

          <p className="font-serif text-base sm:text-lg text-ankahe-muted font-light leading-relaxed">
            You don't need the perfect words. Start with whatever is on your mind.
          </p>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="bg-ankahe-secondary/60 rounded-xl p-4 border border-ankahe-border text-xs text-ankahe-muted space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-ankahe-gold">
            <AlertCircle size={13} />
            <span>Honest Session Notice</span>
          </div>
          <p className="leading-relaxed">
            Phase 2 stores drafts and demonstration posts strictly in browser application memory. Nothing is sent to external cloud databases until Phase 3 account activation.
          </p>
        </div>

        {/* Preview / Edit Toggle Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-ankahe-border/60 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreview(false)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                !isPreview
                  ? 'bg-ankahe-elevated text-ankahe-gold font-medium border border-ankahe-border'
                  : 'text-ankahe-muted hover:text-ankahe-text'
              }`}
            >
              <Edit3 size={13} />
              <span>Editor</span>
            </button>

            <button
              onClick={() => setIsPreview(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                isPreview
                  ? 'bg-ankahe-elevated text-ankahe-gold font-medium border border-ankahe-border'
                  : 'text-ankahe-muted hover:text-ankahe-text'
              }`}
            >
              <Eye size={13} />
              <span>Preview</span>
            </button>
          </div>

          {/* Word Count */}
          <span className="font-mono text-ankahe-muted/60 text-[11px]">
            {content.trim() ? `${content.trim().split(/\s+/).length} words` : 'Blank page'}
          </span>
        </div>

        {/* ========================================================
            EDITOR FORM / PREVIEW
            ======================================================== */}
        {!isPreview ? (
          <div className="space-y-6">
            
            {/* Metadata Selectors (Type, Language, Mood) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Content Type */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                  Content Type:
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as WritingType)}
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                >
                  {contentTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                  Language:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                >
                  {languages.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Emotional Mood / Tone */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                  Feeling / Tone:
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value as EmotionCategory)}
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                >
                  {moods.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Title */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Title (Optional):
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your words a title, or leave it quiet..."
                className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl px-4 py-2.5 text-sm text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
              />
            </div>

            {/* Writing Area with Warm Paper Toggle */}
            <div 
              className={`rounded-2xl p-6 sm:p-8 transition-all border ${
                isPaperSurface
                  ? 'paper-surface border-ankahe-paper-border shadow-paper text-ankahe-paper-dark'
                  : 'bg-ankahe-secondary border-ankahe-border text-ankahe-text shadow-subtle'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-ankahe-border/60 text-xs mb-4">
                <span className="font-mono text-[11px] opacity-70">
                  Writing Desk ({language})
                </span>

                <label className="flex items-center gap-1.5 cursor-pointer text-xs select-none">
                  <input
                    type="checkbox"
                    checked={isPaperSurface}
                    onChange={(e) => setIsPaperSurface(e.target.checked)}
                    className="rounded text-ankahe-gold focus:ring-0"
                  />
                  <span>Warm stationery texture</span>
                </label>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={9}
                dir={isUrdu ? 'rtl' : 'ltr'}
                placeholder={getPlaceholder(language)}
                className={`w-full bg-transparent border-0 resize-none focus:outline-none leading-relaxed text-base sm:text-xl ${
                  isUrdu
                    ? 'poetry-urdu text-right text-xl sm:text-2xl'
                    : isDevanagari
                    ? 'poetry-devanagari'
                    : 'font-serif'
                } ${
                  isPaperSurface
                    ? 'text-ankahe-paper-dark placeholder-ankahe-paper-dark/40'
                    : 'text-ankahe-text placeholder-ankahe-muted/40'
                }`}
              />
            </div>

            {/* Visibility Options (Section 8 Requirements) */}
            <div className="bg-ankahe-secondary/50 rounded-2xl p-6 border border-ankahe-border space-y-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ankahe-gold block">
                Visibility Preference:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* 1. Public under pen name */}
                <label
                  onClick={() => setVisibility('public')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 select-none ${
                    visibility === 'public'
                      ? 'bg-ankahe-elevated border-ankahe-gold text-ankahe-text'
                      : 'border-ankahe-border hover:bg-ankahe-elevated/40 text-ankahe-muted'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-medium text-ankahe-gold">
                    <UserCheck size={14} />
                    <span>Public Pen Name</span>
                  </div>
                  <p className="text-[11px] text-ankahe-muted/80 leading-normal">
                    Appears with your pen name "{userProfile.penName}".
                  </p>
                </label>

                {/* 2. Anonymous public post */}
                <label
                  onClick={() => setVisibility('anonymous')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 select-none ${
                    visibility === 'anonymous'
                      ? 'bg-ankahe-elevated border-ankahe-gold text-ankahe-text'
                      : 'border-ankahe-border hover:bg-ankahe-elevated/40 text-ankahe-muted'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-medium text-ankahe-gold">
                    <Globe size={14} />
                    <span>Anonymous</span>
                  </div>
                  <p className="text-[11px] text-ankahe-muted/80 leading-normal">
                    No pen name or profile link will be displayed on this piece.
                  </p>
                </label>

                {/* 3. Private draft */}
                <label
                  onClick={() => setVisibility('private')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 select-none ${
                    visibility === 'private'
                      ? 'bg-ankahe-elevated border-ankahe-gold text-ankahe-text'
                      : 'border-ankahe-border hover:bg-ankahe-elevated/40 text-ankahe-muted'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-medium text-ankahe-gold">
                    <Lock size={14} />
                    <span>Private Draft</span>
                  </div>
                  <p className="text-[11px] text-ankahe-muted/80 leading-normal">
                    Never shown in community discovery. Kept only in My Space.
                  </p>
                </label>
              </div>

              <p className="text-[11px] text-ankahe-muted/60 italic">
                Note: In Phase 2, anonymous publishing omits all author identifiers. Technical guarantees will be formalized in Phase 3.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-ankahe-border/60">
              <button
                onClick={handleSaveDraft}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs text-ankahe-text border border-ankahe-border hover:border-ankahe-gold/40 transition-colors"
              >
                {draftSaved ? <Check size={14} className="text-emerald-500" /> : <Save size={14} />}
                <span>{draftSaved ? 'Draft Saved in Session' : 'Save as Private Draft'}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsPreview(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs text-ankahe-muted hover:text-ankahe-text border border-ankahe-border transition-colors"
                >
                  <Eye size={13} />
                  <span>Preview</span>
                </button>

                <button
                  onClick={handlePublishPrototype}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium shadow-sm transition-colors"
                >
                  <Feather size={14} />
                  <span>Place in Session Feed</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* ========================================================
              LIVE PREVIEW MODE
              ======================================================== */
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-ankahe-muted pb-2 border-b border-ankahe-border/60">
              <span className="font-mono text-ankahe-gold uppercase tracking-wider">
                Live Preview Mode
              </span>

              <button
                onClick={() => setIsPreview(false)}
                className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4"
              >
                <Edit3 size={13} />
                <span>Return to editing</span>
              </button>
            </div>

            {/* Rendered Preview Card */}
            <div
              className={`rounded-2xl p-8 sm:p-12 border shadow-paper transition-all ${
                isPaperSurface
                  ? 'paper-surface border-ankahe-paper-border text-ankahe-paper-dark'
                  : 'bg-ankahe-secondary border-ankahe-border text-ankahe-text'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-ankahe-border/60 text-xs text-ankahe-gold-dark font-mono">
                <div className="flex items-center gap-2">
                  <span className="uppercase">{type}</span>
                  <span>•</span>
                  <span>{language}</span>
                  <span>•</span>
                  <span className="capitalize">{mood}</span>
                </div>
                <span className="capitalize">{visibility}</span>
              </div>

              <div className="py-6 space-y-4">
                {title && (
                  <h3 className="font-serif text-2xl font-medium">
                    {title}
                  </h3>
                )}

                <div
                  dir={isUrdu ? 'rtl' : 'ltr'}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    isUrdu
                      ? 'poetry-urdu text-2xl text-right'
                      : isDevanagari
                      ? 'poetry-devanagari text-lg'
                      : 'font-serif text-lg font-light'
                  }`}
                >
                  {content || <span className="opacity-40 italic">Nothing written yet...</span>}
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-ankahe-border/60 flex items-center justify-between text-xs opacity-80">
                <span className="font-serif italic">
                  — {visibility === 'anonymous' ? 'Anonymous' : userProfile.penName}
                </span>
                <span className="font-mono text-[11px]">Preview</span>
              </div>
            </div>

            {/* Action inside preview */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setIsPreview(false)}
                className="inline-flex items-center gap-1.5 text-xs text-ankahe-muted hover:text-ankahe-text"
              >
                <ArrowLeft size={13} />
                <span>Back to edit text</span>
              </button>

              <button
                onClick={handlePublishPrototype}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium shadow-sm"
              >
                <Feather size={14} />
                <span>Publish to Session Feed</span>
              </button>
            </div>
          </div>
        )}

        {/* Publish / Action Feedback Message */}
        {publishFeedback && (
          <div className="p-4 rounded-xl bg-ankahe-secondary border border-ankahe-gold/40 text-xs text-ankahe-text space-y-2 animate-in fade-in">
            <p className="font-medium text-ankahe-gold">Feed Update Notice:</p>
            <p className="leading-relaxed text-ankahe-muted">{publishFeedback}</p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => navigate('/home')}
                className="px-4 py-1.5 rounded-lg bg-ankahe-elevated hover:bg-ankahe-secondary text-xs text-ankahe-gold border border-ankahe-gold/30"
              >
                View on Community Home
              </button>
              <button
                onClick={() => setPublishFeedback(null)}
                className="text-xs text-ankahe-muted hover:text-ankahe-text"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

      </div>
    </CommunityLayout>
  );
};
