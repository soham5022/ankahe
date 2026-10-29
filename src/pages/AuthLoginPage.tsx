import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCommunity } from '../context/CommunityContext';

export const AuthLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const { showToast } = useCommunity();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = (location.state as any)?.from?.pathname || '/home';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error);
    } else {
      showToast("Welcome back to your quiet circle.");
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col justify-between p-6 sm:p-12 selection:bg-ankahe-gold/25 selection:text-ankahe-text relative">
      {/* Top Bar */}
      <header className="max-w-md mx-auto w-full flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-ankahe-muted hover:text-ankahe-gold transition-colors py-2 group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Public Teaser</span>
        </Link>

        <Link to="/home" className="flex items-baseline gap-1.5">
          <span className="font-serif text-lg tracking-wide text-ankahe-text">
            ANKAHE
          </span>
          <span className="font-devanagari text-xs text-ankahe-gold">
            अनकहे
          </span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md mx-auto w-full my-auto py-10 space-y-8">
        <div className="space-y-3 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold">
            Sign In • ओळख
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Welcome back to the circle.
          </h1>
          <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed">
            Enter with your email and password to open your sanctuary.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Real Authentication Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
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

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Password:
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-ankahe-gold hover:text-ankahe-gold-light"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ankahe-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your secret password"
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
            <span>{isSubmitting ? 'Opening space...' : 'Sign In to ANKAHE'}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Guest Explore Option */}
        <div className="text-center">
          <Link
            to="/home"
            className="text-xs text-ankahe-muted hover:text-ankahe-gold transition-colors py-1 inline-block"
          >
            Or browse publicly as a reader first →
          </Link>
        </div>

        {/* Signup Link */}
        <div className="text-center text-xs text-ankahe-muted pt-2 border-t border-ankahe-border/50">
          <span>New to ANKAHE? </span>
          <Link to="/signup" className="text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4">
            Create a pen name & account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-ankahe-muted/50 font-light">
        ANKAHE • An intimate multilingual writing community. Zero ads.
      </footer>
    </div>
  );
};
