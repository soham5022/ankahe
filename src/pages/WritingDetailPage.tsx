import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Bookmark, 
  Sun, 
  MessageSquare, 
  Flag, 
  Copy, 
  Check, 
  Trash2, 
  AlertCircle,
  Lock
} from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { useCommunity } from '../context/CommunityContext';
import { useAuth } from '../context/AuthContext';
import { 
  fetchWritingById, 
  fetchComments, 
  addComment, 
  deleteComment, 
  submitReport 
} from '../lib/writingsService';
import type { WritingItem, CommentItem } from '../types';

export const WritingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    savedPieceIds, 
    resonances, 
    toggleSavePiece, 
    toggleResonance, 
    showToast 
  } = useCommunity();

  const [writing, setWriting] = useState<WritingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Comments
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Reporting Modal
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate Content');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);

  const [copied, setCopied] = useState(false);

  const loadWritingData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const { writing: w, error } = await fetchWritingById(id, user?.id);
    if (error || !w) {
      setErrorMessage(error || 'Writing not found.');
      setLoading(false);
      return;
    }

    setWriting(w);
    const c = await fetchComments(id, user?.id);
    setComments(c);
    setLoading(false);
  }, [id, user]);

  useEffect(() => {
    loadWritingData();
  }, [loadWritingData]);

  const handleCopy = () => {
    if (!writing) return;
    const authorLine = writing.isAnonymous ? 'Anonymous' : writing.author;
    navigator.clipboard.writeText(
      `${writing.title ? `${writing.title}\n\n` : ''}${writing.content}\n\n— ${authorLine} (ANKAHE)`
    );
    setCopied(true);
    showToast("Words copied gently to clipboard.");
    setTimeout(() => setCopied(false), 2200);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !user) {
      showToast("Please sign in to leave a kind thought.");
      return;
    }
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    const { comment, error } = await addComment(id, newComment.trim(), user.id);
    setSubmittingComment(false);

    if (error) {
      showToast(`Could not post response: ${error}`);
    } else if (comment) {
      setComments((prev) => [...prev, comment]);
      setNewComment('');
      showToast("Response placed with care.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user) return;
    const { success, error } = await deleteComment(commentId, user.id);
    if (success) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      showToast("Response removed.");
    } else {
      showToast(error || "Could not delete response.");
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !user) {
      showToast("Please sign in to submit a report.");
      return;
    }

    setReportSubmitting(true);
    const { success, error } = await submitReport(id, reportReason, reportDetails, user.id);
    setReportSubmitting(false);

    if (success) {
      setIsReportOpen(false);
      setReportDetails('');
      showToast("Report submitted for quiet review. Thank you for keeping this space safe.");
    } else {
      showToast(error || "Could not submit report.");
    }
  };

  if (loading) {
    return (
      <CommunityLayout>
        <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-ankahe-gold/30 border-t-ankahe-gold animate-spin" />
          <p className="font-serif italic text-sm text-ankahe-muted">
            Opening writing...
          </p>
        </div>
      </CommunityLayout>
    );
  }

  if (errorMessage || !writing) {
    return (
      <CommunityLayout>
        <div className="max-w-md mx-auto py-16 text-center space-y-5">
          <div className="p-4 rounded-2xl bg-ankahe-secondary/70 border border-ankahe-border text-xs text-ankahe-muted space-y-3">
            <AlertCircle size={20} className="mx-auto text-ankahe-gold" />
            <h2 className="font-serif text-lg text-ankahe-text">
              Writing unavailable
            </h2>
            <p>{errorMessage || 'This piece may have been removed or kept in private drafts.'}</p>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light"
          >
            <ArrowLeft size={13} />
            <span>Return to community</span>
          </button>
        </div>
      </CommunityLayout>
    );
  }

  const isSaved = savedPieceIds.includes(writing.id);
  const currentResonance = resonances[writing.id] || {};
  const isUrdu = writing.language === 'Urdu';
  const isDevanagari = writing.language === 'Hindi' || writing.language === 'Marathi';

  return (
    <CommunityLayout>
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-ankahe-muted hover:text-ankahe-gold transition-colors py-1 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-ankahe-secondary hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text border border-ankahe-border transition-colors"
              title="Copy words"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>

            {user && (
              <button
                onClick={() => setIsReportOpen(true)}
                className="p-2 rounded-lg bg-ankahe-secondary hover:bg-ankahe-elevated text-ankahe-muted hover:text-red-400 border border-ankahe-border transition-colors"
                title="Report content"
              >
                <Flag size={14} />
              </button>
            )}
          </div>
        </div>

        {/* The Writing Reading Card */}
        <article
          className={`rounded-3xl border p-8 sm:p-14 space-y-8 shadow-paper ${
            writing.isPaperStyle
              ? 'paper-surface border-ankahe-paper-border text-ankahe-paper-dark'
              : 'bg-ankahe-secondary/80 border-ankahe-border text-ankahe-text'
          }`}
        >
          {/* Header Metadata */}
          <div
            className={`flex items-center justify-between pb-4 border-b border-dashed text-xs ${
              writing.isPaperStyle ? 'border-ankahe-paper-border text-ankahe-gold-dark' : 'border-ankahe-border text-ankahe-muted'
            }`}
          >
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="uppercase tracking-widest">{writing.type}</span>
              <span>•</span>
              <span>{writing.language}</span>
              {writing.category && (
                <>
                  <span>•</span>
                  <span className="capitalize">{writing.category}</span>
                </>
              )}
            </div>

            {writing.visibility === 'private' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded">
                <Lock size={10} />
                <span>Private Draft</span>
              </span>
            )}
          </div>

          {/* Title */}
          {writing.title && (
            <h1
              className={`font-serif text-2xl sm:text-3xl font-medium ${
                writing.isPaperStyle ? 'text-ankahe-paper-dark' : 'text-ankahe-text'
              }`}
            >
              {writing.title}
            </h1>
          )}

          {/* Writing Content */}
          <div
            dir={isUrdu ? 'rtl' : 'ltr'}
            className={`leading-relaxed whitespace-pre-wrap select-text ${
              isUrdu
                ? 'poetry-urdu text-2xl sm:text-3xl text-right'
                : isDevanagari
                ? 'poetry-devanagari text-lg sm:text-xl font-normal'
                : 'font-serif text-lg sm:text-xl font-light'
            } ${
              writing.isPaperStyle ? 'text-ankahe-paper-dark/95' : 'text-ankahe-text/95'
            }`}
          >
            {writing.content}
          </div>

          {/* Author Sign-off */}
          <div
            className={`pt-6 border-t border-dashed flex flex-wrap items-center justify-between gap-4 text-xs ${
              writing.isPaperStyle ? 'border-ankahe-paper-border text-ankahe-paper-dark/70' : 'border-ankahe-border text-ankahe-muted'
            }`}
          >
            <div className="space-y-0.5">
              <span className="font-serif italic text-sm">
                — {writing.isAnonymous ? 'Anonymous' : writing.author}
              </span>
              {writing.dateApprox && (
                <span className="block font-mono text-[11px] opacity-70">
                  Shared {writing.dateApprox}
                </span>
              )}
            </div>

            {/* Quiet Interactions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleResonance(writing.id, 'felt', "You let this know it was felt.")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                  currentResonance.felt
                    ? 'bg-ankahe-gold/25 text-ankahe-gold font-medium'
                    : writing.isPaperStyle
                    ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/80'
                    : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-gold'
                }`}
                title="Acknowledge this resonance"
              >
                <Heart size={14} className={currentResonance.felt ? 'fill-current' : ''} />
                <span>Felt</span>
              </button>

              <button
                onClick={() => toggleResonance(writing.id, 'warmth', "Warmth sent into the quiet.")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                  currentResonance.warmth
                    ? 'bg-amber-400/25 text-amber-300 font-medium'
                    : writing.isPaperStyle
                    ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/80'
                    : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-amber-300'
                }`}
                title="Send quiet warmth"
              >
                <Sun size={14} className={currentResonance.warmth ? 'fill-current' : ''} />
                <span>Warmth</span>
              </button>

              <button
                onClick={() => toggleSavePiece(writing.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                  isSaved
                    ? 'bg-ankahe-gold text-ankahe-ink font-medium shadow-sm'
                    : writing.isPaperStyle
                    ? 'hover:bg-ankahe-paper-muted text-ankahe-paper-dark/80'
                    : 'hover:bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
                }`}
                title="Save to your private sanctuary"
              >
                <Bookmark size={14} className={isSaved ? 'fill-current' : ''} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </article>

        {/* Responses / Comments Section */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <MessageSquare size={13} />
            <span>Reflections & Responses ({comments.length})</span>
          </div>

          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
                placeholder="Leave a kind, thoughtful response..."
                className="w-full bg-ankahe-secondary border border-ankahe-border rounded-2xl p-4 text-xs text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingComment || !newComment.trim()}
                  className="px-5 py-2 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium transition-colors disabled:opacity-50"
                >
                  {submittingComment ? 'Sending...' : 'Share Thought'}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-ankahe-secondary/50 border border-ankahe-border text-xs text-ankahe-muted text-center space-y-1">
              <p>Sign in to leave a kind response for the author.</p>
              <Link to="/login" className="text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4">
                Sign in here →
              </Link>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="p-8 rounded-2xl bg-ankahe-secondary/30 border border-ankahe-border/60 text-center text-xs text-ankahe-muted font-light space-y-1">
                <p className="font-serif italic text-sm">
                  Be the first to respond, if you have something kind to say.
                </p>
                <p className="text-[11px] text-ankahe-muted/60">
                  Every reflection helps someone feel less alone.
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-5 rounded-2xl bg-ankahe-secondary/60 border border-ankahe-border text-xs text-ankahe-text space-y-2.5"
                >
                  <div className="flex items-center justify-between text-ankahe-muted/70 text-[11px]">
                    <span className="font-medium text-ankahe-text">
                      {comment.authorName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span>{comment.createdAt}</span>
                      {comment.isOwn && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-1 text-ankahe-muted hover:text-red-400 transition-colors"
                          title="Delete response"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="leading-relaxed font-light whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Report Modal */}
        {isReportOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/95 backdrop-blur-xl p-4 overflow-y-auto animate-in fade-in"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-ankahe-secondary border border-ankahe-border rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-xs text-ankahe-text">
              <div className="space-y-1.5">
                <h3 className="font-serif text-lg text-ankahe-text font-medium">
                  Report this piece
                </h3>
                <p className="text-ankahe-muted font-light leading-relaxed">
                  Help us protect the quiet, respectful sanctuary of ANKAHE.
                </p>
              </div>

              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                    Reason:
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                  >
                    <option value="Hate Speech or Harassment">Hate Speech or Harassment</option>
                    <option value="Plagiarism or Copyright">Plagiarism or Copyright Infringement</option>
                    <option value="Spam or Unrelated Commercial">Spam or Commercial Promotion</option>
                    <option value="Doxxing or Personal Privacy">Exposing Private Information</option>
                    <option value="Other Safety Concern">Other Safety Concern</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                    Additional Context (Optional):
                  </label>
                  <textarea
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    rows={3}
                    placeholder="Briefly describe what feels harmful..."
                    className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl p-3 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReportOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-ankahe-muted hover:text-ankahe-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reportSubmitting}
                    className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    {reportSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </CommunityLayout>
  );
};
