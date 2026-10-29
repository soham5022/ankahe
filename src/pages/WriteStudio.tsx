import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Feather, 
  Eye, 
  Edit3, 
  Save, 
  Check, 
  Lock, 
  Globe, 
  UserCheck, 
  AlertCircle, 
  ArrowLeft,
  Trash2
} from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { useAuth } from '../context/AuthContext';
import { useCommunity } from '../context/CommunityContext';
import { 
  createWriting, 
  updateWriting, 
  deleteWriting, 
  fetchWritingById 
} from '../lib/writingsService';
import type { WritingType, Language, EmotionCategory, VisibilityPreference } from '../types';

export const WriteStudio: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { showToast } = useCommunity();

  // URL pre-selection support
  const editId = searchParams.get('edit');
  const initialType = (searchParams.get('type') as WritingType) || 'Thought';

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<WritingType>(initialType);
  const [language, setLanguage] = useState<Language>(
    (profile?.preferredLanguage as Language) || 'Hindi'
  );
  const [mood, setMood] = useState<EmotionCategory>('peace');
  const [visibility, setVisibility] = useState<VisibilityPreference>('public');
  const [isPaperSurface, setIsPaperSurface] = useState(false);

  // Status & UI States
  const [isPreview, setIsPreview] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load existing writing if editing
  useEffect(() => {
    if (!editId) return;

    async function loadForEdit() {
      if (!editId) return;
      const { writing, error } = await fetchWritingById(editId, user?.id);
      if (error || !writing) {
        showToast(error || "Could not load writing for editing.");
        return;
      }
      setTitle(writing.title || '');
      setContent(writing.content || '');
      setType(writing.type);
      setLanguage(writing.language);
      setMood(writing.category as EmotionCategory);
      setVisibility(writing.visibility || 'public');
      setIsPaperSurface(Boolean(writing.isPaperStyle));
    }

    loadForEdit();
  }, [editId, user, showToast]);

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

  const languages: Language[] = ['Hindi', 'Hinglish', 'Marathi', 'English', 'Urdu', 'Other'];

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

  const handleSaveDraft = async () => {
    setErrorMessage(null);
    if (!content.trim()) {
      setErrorMessage("Please write your words before saving a draft.");
      return;
    }
    if (!user) {
      setErrorMessage("You must be signed in to save drafts.");
      return;
    }

    setIsSavingDraft(true);
    if (editId) {
      const { error } = await updateWriting(
        editId,
        {
          title: title.trim() || null,
          content: content.trim(),
          type,
          language,
          mood,
          visibility: 'private',
          status: 'draft',
        },
        user.id
      );
      setIsSavingDraft(false);

      if (error) {
        setErrorMessage(error);
      } else {
        showToast("Draft updated safely in your library.");
        navigate('/my-space');
      }
    } else {
      const { error } = await createWriting(
        {
          title: title.trim() || undefined,
          content: content.trim(),
          type,
          language,
          mood,
          visibility: 'private',
          status: 'draft',
        },
        user.id
      );
      setIsSavingDraft(false);

      if (error) {
        setErrorMessage(error);
      } else {
        showToast("Draft saved safely to your private space.");
        navigate('/my-space');
      }
    }
  };

  const handlePublish = async () => {
    setErrorMessage(null);
    if (!content.trim()) {
      setErrorMessage("Please write something before publishing.");
      return;
    }
    if (!user) {
      setErrorMessage("You must be signed in to publish words.");
      return;
    }

    if (visibility === 'private') {
      await handleSaveDraft();
      return;
    }

    setIsPublishing(true);
    if (editId) {
      const { error } = await updateWriting(
        editId,
        {
          title: title.trim() || null,
          content: content.trim(),
          type,
          language,
          mood,
          visibility,
          status: 'published',
        },
        user.id
      );
      setIsPublishing(false);

      if (error) {
        setErrorMessage(error);
      } else {
        showToast("Your writing has been updated and published.");
        navigate('/home');
      }
    } else {
      const { error } = await createWriting(
        {
          title: title.trim() || undefined,
          content: content.trim(),
          type,
          language,
          mood,
          visibility,
          status: 'published',
        },
        user.id
      );
      setIsPublishing(false);

      if (error) {
        setErrorMessage(error);
      } else {
        showToast(
          visibility === 'anonymous'
            ? "Published gently as Anonymous."
            : `Published as ${profile?.displayName || 'Writer'}.`
        );
        navigate('/home');
      }
    }
  };

  const handleDelete = async () => {
    if (!editId || !user) return;
    if (!window.confirm("Are you sure you want to delete this piece? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    const { success, error } = await deleteWriting(editId, user.id);
    setIsDeleting(false);

    if (success) {
      showToast("Piece removed from your sanctuary.");
      navigate('/my-space');
    } else {
      showToast(error || "Could not delete piece.");
    }
  };

  const isUrdu = language === 'Urdu';
  const isDevanagari = language === 'Hindi' || language === 'Marathi';

  return (
    <CommunityLayout>
      <div className="space-y-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
              <Feather size={13} />
              <span>{editId ? 'Edit Writing • संपादन' : 'Writing Sanctuary • लेखन'}</span>
            </div>

            {editId && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs text-red-400 hover:bg-red-950/30 border border-red-900/40 transition-colors"
              >
                <Trash2 size={12} />
                <span>Delete</span>
              </button>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Put your words where they belong.
          </h1>

          <p className="text-sm text-ankahe-muted font-light leading-relaxed">
            A quiet blank page. No timers, no character counts, no distractions.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Studio Controls Header (Format & Language Selectors) */}
        <div className="bg-ankahe-secondary/50 p-6 rounded-2xl border border-ankahe-border space-y-5 text-xs">
          {/* Format / Type */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
              Format / प्रकार:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {contentTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    type === t
                      ? 'bg-ankahe-paper text-ankahe-ink font-medium shadow-sm'
                      : 'bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Language & Mood Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-ankahe-border/50">
            {/* Language */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
                Language / भाषा:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {languages.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLanguage(l)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      language === l
                        ? 'bg-ankahe-gold/25 text-ankahe-gold border border-ankahe-gold/40 font-medium'
                        : 'bg-ankahe-elevated/60 text-ankahe-muted hover:text-ankahe-text'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Atmosphere / Mood */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-ankahe-muted/70 uppercase tracking-wider block">
                Atmosphere / भावना:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {moods.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMood(m.value)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      mood === m.value
                        ? 'bg-ankahe-gold/25 text-ankahe-gold border border-ankahe-gold/40 font-medium'
                        : 'bg-ankahe-elevated/60 text-ankahe-muted hover:text-ankahe-text'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Paper Canvas Toggle */}
          <div className="pt-3 border-t border-ankahe-border/50 flex items-center justify-between">
            <span className="text-ankahe-muted">
              Warm Paper Canvas (renders on soft ivory surface):
            </span>
            <button
              type="button"
              onClick={() => setIsPaperSurface(!isPaperSurface)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                isPaperSurface
                  ? 'bg-ankahe-paper text-ankahe-ink font-medium'
                  : 'bg-ankahe-elevated text-ankahe-muted'
              }`}
            >
              {isPaperSurface ? 'Paper Active' : 'Midnight Dark'}
            </button>
          </div>
        </div>

        {/* Main Writing Canvas */}
        <div
          className={`rounded-3xl border p-6 sm:p-10 space-y-6 transition-all duration-300 ${
            isPaperSurface
              ? 'paper-surface border-ankahe-paper-border text-ankahe-paper-dark shadow-paper'
              : 'bg-ankahe-secondary/80 border-ankahe-border text-ankahe-text'
          }`}
        >
          {/* Mode Tabs: Edit vs Preview */}
          <div className="flex items-center justify-between pb-3 border-b border-dashed border-ankahe-border/60">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPreview(false)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-colors ${
                  !isPreview
                    ? 'bg-ankahe-gold/25 text-ankahe-gold font-medium'
                    : 'text-ankahe-muted hover:text-ankahe-text'
                }`}
              >
                <Edit3 size={12} />
                <span>Writing</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPreview(true)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-colors ${
                  isPreview
                    ? 'bg-ankahe-gold/25 text-ankahe-gold font-medium'
                    : 'text-ankahe-muted hover:text-ankahe-text'
                }`}
              >
                <Eye size={12} />
                <span>Preview</span>
              </button>
            </div>

            <span className="font-mono text-[11px] opacity-60">
              {language} • {type}
            </span>
          </div>

          {!isPreview ? (
            <div className="space-y-4">
              {/* Optional Title Input */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (Optional)"
                className={`w-full bg-transparent border-b border-dashed focus:outline-none py-2 font-serif text-xl sm:text-2xl placeholder:opacity-40 ${
                  isPaperSurface
                    ? 'border-ankahe-paper-border text-ankahe-paper-dark placeholder:text-ankahe-paper-dark/40'
                    : 'border-ankahe-border text-ankahe-text placeholder:text-ankahe-muted'
                }`}
              />

              {/* Main Content Area */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                dir={isUrdu ? 'rtl' : 'ltr'}
                placeholder={getPlaceholder(language)}
                className={`w-full bg-transparent focus:outline-none resize-y leading-relaxed ${
                  isUrdu
                    ? 'poetry-urdu text-xl sm:text-2xl text-right'
                    : isDevanagari
                    ? 'poetry-devanagari text-base sm:text-lg font-normal'
                    : 'font-serif text-base sm:text-lg font-light'
                } ${
                  isPaperSurface
                    ? 'text-ankahe-paper-dark placeholder:text-ankahe-paper-dark/40'
                    : 'text-ankahe-text placeholder:text-ankahe-muted/40'
                }`}
              />
            </div>
          ) : (
            <div className="py-6 space-y-5">
              {title && (
                <h2 className="font-serif text-2xl sm:text-3xl font-medium">
                  {title}
                </h2>
              )}
              <div
                dir={isUrdu ? 'rtl' : 'ltr'}
                className={`whitespace-pre-wrap leading-relaxed ${
                  isUrdu
                    ? 'poetry-urdu text-2xl sm:text-3xl text-right'
                    : isDevanagari
                    ? 'poetry-devanagari text-lg sm:text-xl font-normal'
                    : 'font-serif text-lg sm:text-xl font-light'
                }`}
              >
                {content || <span className="italic opacity-50">Words will appear here...</span>}
              </div>
              <div className="pt-4 border-t border-dashed border-current/20 font-serif italic text-xs opacity-75">
                — {visibility === 'anonymous' ? 'Anonymous' : profile?.displayName || 'A Quiet Soul'}
              </div>
            </div>
          )}
        </div>

        {/* Publishing & Visibility Settings */}
        <div className="bg-ankahe-secondary/50 p-6 rounded-2xl border border-ankahe-border space-y-4 text-xs">
          <span className="font-mono text-[11px] text-ankahe-gold uppercase tracking-wider block">
            Sharing & Visibility • प्रसिद्धी:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setVisibility('public')}
              className={`p-3.5 rounded-xl border text-left transition-all space-y-1 ${
                visibility === 'public'
                  ? 'bg-ankahe-elevated border-ankahe-gold text-ankahe-gold'
                  : 'bg-ankahe-secondary border-ankahe-border text-ankahe-muted hover:text-ankahe-text'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium">
                <Globe size={13} />
                <span>Public Share</span>
              </div>
              <p className="text-[10px] opacity-80 leading-relaxed">
                Appears in Home & Discover under "{profile?.displayName || 'your pen name'}".
              </p>
            </button>

            <button
              type="button"
              onClick={() => setVisibility('anonymous')}
              className={`p-3.5 rounded-xl border text-left transition-all space-y-1 ${
                visibility === 'anonymous'
                  ? 'bg-ankahe-elevated border-ankahe-gold text-ankahe-gold'
                  : 'bg-ankahe-secondary border-ankahe-border text-ankahe-muted hover:text-ankahe-text'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium">
                <UserCheck size={13} />
                <span>Anonymous Share</span>
              </div>
              <p className="text-[10px] opacity-80 leading-relaxed">
                Publicly readable, but your pen name and identity remain hidden.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setVisibility('private')}
              className={`p-3.5 rounded-xl border text-left transition-all space-y-1 ${
                visibility === 'private'
                  ? 'bg-ankahe-elevated border-ankahe-gold text-ankahe-gold'
                  : 'bg-ankahe-secondary border-ankahe-border text-ankahe-muted hover:text-ankahe-text'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium">
                <Lock size={13} />
                <span>Private Draft</span>
              </div>
              <p className="text-[10px] opacity-80 leading-relaxed">
                Kept strictly for your eyes in My Space. Never discovered.
              </p>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs text-ankahe-muted hover:text-ankahe-text inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Cancel and return</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSavingDraft || isPublishing}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs font-medium border border-ankahe-border text-ankahe-muted hover:text-ankahe-text transition-colors disabled:opacity-50"
            >
              <Save size={13} />
              <span>{isSavingDraft ? 'Saving Draft...' : 'Save as Draft'}</span>
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing || isSavingDraft}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium shadow-sm transition-colors disabled:opacity-50"
            >
              <span>
                {isPublishing
                  ? 'Publishing...'
                  : visibility === 'private'
                  ? 'Save Private Draft'
                  : 'Publish to ANKAHE'}
              </span>
              <Check size={14} />
            </button>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
};
