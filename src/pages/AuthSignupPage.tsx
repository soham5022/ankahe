import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  User, 
  AtSign, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCommunity } from '../context/CommunityContext';
import type { Language } from '../types';

export const AuthSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { showToast } = useCommunity();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>('Hindi');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);

  const languages: Language[] = ['Hindi', 'Hinglish', 'Marathi', 'English', 'Urdu', 'Other'];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsRateLimited(false);

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (cleanUsername.length < 3 || cleanUsername.length > 30) {
      setErrorMessage('Username must be between 3 and 30 characters long.');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setErrorMessage('Username may only contain letters, numbers, and underscores.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const { error, needsEmailConfirmation, isRateLimited: rateLimited } = await signUp(
      cleanEmail,
      password,
      {
        username: cleanUsername,
        displayName: displayName.trim() || cleanUsername,
        bio: bio.trim() || undefined,
        preferredLanguage,
      }
    );
    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error);
      if (rateLimited) {
        setIsRateLimited(true);
      }
    } else if (needsEmailConfirmation) {
      setNeedsVerification(true);
      showToast("Verification link sent! Check your email.");
    } else {
      showToast(`Welcome to ANKAHE, ${displayName.trim() || cleanUsername}!`);
      navigate('/home');
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

      {/* Main Signup Card */}
      <main className="max-w-md mx-auto w-full my-auto py-10 space-y-8">
        <div className="space-y-3 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold">
            Account Creation • नाव
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Choose how you are known.
          </h1>
          <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed">
            Create your pen name and account. Real authentication, zero fake metrics.
          </p>
        </div>

        {/* Rate Limit Solution Box */}
        {isRateLimited ? (
          <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/60 text-xs text-amber-200 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 font-medium text-amber-300">
              <HelpCircle size={15} className="shrink-0" />
              <span>How to Resolve This in 15 Seconds</span>
            </div>

            <p className="leading-relaxed opacity-90 text-[11px]">
              Supabase's default shared email service has an hourly rate limit (3 emails/hour) for verification emails.
            </p>

            <div className="p-3 rounded-xl bg-ankahe-secondary/80 border border-amber-800/40 space-y-2 text-[11px]">
              <span className="font-semibold text-amber-300 block">
                Quickest Fix (Instant Signups):
              </span>
              <ol className="list-decimal list-inside space-y-1 text-amber-100/90 pl-1">
                <li>
                  Open{' '}
                  <a
                    href="https://supabase.com/dashboard/project/dgydrhsvobeskgvcgnvq/auth/providers"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-ankahe-gold hover:text-ankahe-gold-light inline-flex items-center gap-1 font-medium"
                  >
                    <span>Supabase Email Settings</span>
                    <ExternalLink size={10} />
                  </a>
                </li>
                <li>
                  Toggle <strong className="text-white">Confirm email</strong> to <strong className="text-white">OFF</strong>
                </li>
                <li>Click <strong className="text-white">Save</strong></li>
              </ol>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleSignup}
                disabled={isSubmitting}
                className="flex-1 py-2 px-3 rounded-xl bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium inline-flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <RefreshCw size={12} className={isSubmitting ? 'animate-spin' : ''} />
                <span>{isSubmitting ? 'Retrying...' : 'I Updated Supabase — Retry Sign Up'}</span>
              </button>
            </div>
          </div>
        ) : errorMessage ? (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        ) : null}

        {needsVerification ? (
          <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 text-xs text-emerald-200 space-y-4 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-base text-emerald-100 font-medium">
                Verify your email
              </h3>
              <p className="leading-relaxed opacity-90">
                We've sent a verification link to <strong className="text-emerald-300">{email}</strong>. 
                Please click the link in your email to activate your account and start sharing your words.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4"
              >
                Proceed to sign in →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4 text-xs">
            {/* Pen Name */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Pen Name / नाव:
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ankahe-muted" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Soham Magar, काफ़िर, Kabir..."
                  required
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl pl-10 pr-4 py-3 text-sm text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Unique Handle (@username):
              </label>
              <div className="relative">
                <AtSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ankahe-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="ankahe"
                  required
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl pl-10 pr-4 py-3 text-sm text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
                />
              </div>
            </div>

            {/* Email */}
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
                  placeholder="sohammagar2308@gmail.com"
                  required
                  className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl pl-10 pr-4 py-3 text-sm text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Password:
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

            {/* Preferred Language */}
            <div className="space-y-1.5 pt-1">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Primary Writing Tongue:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setPreferredLanguage(lang)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      preferredLanguage === lang
                        ? 'bg-ankahe-paper text-ankahe-ink font-medium shadow-sm'
                        : 'bg-ankahe-secondary text-ankahe-muted hover:text-ankahe-text'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio (Optional) */}
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                A line about your quiet corner (Optional):
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                placeholder="e.g. Writing in the quiet corners of late night trains..."
                className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl px-4 py-2.5 text-xs text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium shadow-sm transition-colors disabled:opacity-60 pt-3"
            >
              <span>{isSubmitting ? 'Creating sanctuary...' : 'Join ANKAHE'}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* Existing login link */}
        <div className="text-center text-xs text-ankahe-muted pt-2 border-t border-ankahe-border/50">
          <span>Already have an account? </span>
          <Link to="/login" className="text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4">
            Sign In here
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-ankahe-muted/50 font-light">
        ANKAHE • An intimate multilingual writing community. Zero commercial ads.
      </footer>
    </div>
  );
};
