import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ResetPasswordPage: React.FC = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both fields.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await updatePassword(password);
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col justify-between p-6 sm:p-12 selection:bg-ankahe-gold/25 selection:text-ankahe-text relative">
      <header className="max-w-md mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-1.5">
          <span className="font-serif text-lg tracking-wide text-ankahe-text">
            ANKAHE
          </span>
          <span className="font-devanagari text-xs text-ankahe-gold">
            अनकहे
          </span>
        </Link>
      </header>

      <main className="max-w-md mx-auto w-full my-auto py-10 space-y-8">
        <div className="space-y-3 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold">
            New Password • पासवर्ड
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Choose a new password.
          </h1>
          <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed">
            Protect your thoughts with a new secret key.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-start gap-2.5">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {success ? (
          <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 text-xs text-emerald-200 space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base text-emerald-100 font-medium">
                Password updated successfully
              </h3>
              <p className="leading-relaxed opacity-90">
                You are now signed in. Directing you gently to your home...
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                New Password:
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ankahe-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl pl-10 pr-4 py-3 text-sm text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Confirm New Password:
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ankahe-muted" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl pl-10 pr-4 py-3 text-sm text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium shadow-sm transition-colors disabled:opacity-60 pt-3"
            >
              <span>{isSubmitting ? 'Updating...' : 'Set New Password'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </main>

      <footer className="max-w-md mx-auto w-full text-center text-xs text-ankahe-muted/50 font-light">
        ANKAHE • An intimate, multilingual writing sanctuary.
      </footer>
    </div>
  );
};

