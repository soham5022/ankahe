import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ForgotPasswordPage: React.FC = () => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    const { error, message } = await requestPasswordReset(email.trim());
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error);
    } else {
      setSuccessMessage(
        message || 'A password recovery link has been sent to your email address.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col justify-between p-6 sm:p-12 selection:bg-ankahe-gold/25 selection:text-ankahe-text relative">
      {/* Top Bar */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs text-ankahe-muted hover:text-ankahe-gold transition-colors py-2 group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Login</span>
        </Link>

        <Link to="/" className="flex items-baseline gap-1.5">
          <span className="font-serif text-lg tracking-wide text-ankahe-text">
            ANKAHE
          </span>
          <span className="font-devanagari text-xs text-ankahe-gold">
            अनकहे
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto w-full my-auto py-10 space-y-8">
        <div className="space-y-3 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold">
            Account Recovery • पुन्हा भेट
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Recover your sanctuary.
          </h1>
          <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed">
            Enter the email associated with your words. We'll send you a link to reset your password.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-start gap-2.5">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {successMessage ? (
          <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 text-xs text-emerald-200 space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base text-emerald-100 font-medium">
                Check your inbox
              </h3>
              <p className="leading-relaxed opacity-90">
                {successMessage}
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4"
              >
                Return to sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Email Address:
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ankahe-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl pl-10 pr-4 py-3 text-sm text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium shadow-sm transition-colors disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Sending link...' : 'Send Recovery Link'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-ankahe-muted pt-2 border-t border-ankahe-border/50">
          <span>Remembered your password? </span>
          <Link to="/login" className="text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </main>

      <footer className="max-w-md mx-auto w-full text-center text-xs text-ankahe-muted/50 font-light">
        ANKAHE • An intimate, multilingual writing sanctuary.
      </footer>
    </div>
  );
};

