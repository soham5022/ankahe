import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export const AuthLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [prototypeNote, setPrototypeNote] = useState<string | null>(null);

  const handleSimulateClick = (provider: string) => {
    setPrototypeNote(
      `Notice: "${provider}" is currently in design prototype mode for Phase 2. Password databases and cloud sessions will be activated in Phase 3. You can enter the community directly without an account!`
    );
  };

  const handleEnterAsGuest = () => {
    navigate('/home');
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
            Authentication Prototype • ओळख
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Welcome back to the circle.
          </h1>
          <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed">
            Enter your pen name or explore as a guest reader.
          </p>
        </div>

        {/* Prototype Transparency Alert */}
        <div className="p-4 rounded-xl bg-ankahe-secondary/80 border border-ankahe-border text-xs text-ankahe-muted space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-ankahe-gold">
            <AlertCircle size={13} />
            <span>Phase 2 Frontend Prototype</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            To ensure complete honesty, we do not collect actual passwords or simulate fake logins. You can enter the full community immediately.
          </p>
        </div>

        {/* Direct Action: Enter Directly */}
        <button
          onClick={handleEnterAsGuest}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium shadow-sm transition-colors"
        >
          <span>Enter Community as Reader / Writer</span>
          <ArrowRight size={14} />
        </button>

        {/* Separator */}
        <div className="flex items-center gap-3 text-xs text-ankahe-muted/40 font-mono">
          <span className="flex-1 h-[1px] bg-ankahe-border" />
          <span>Future Auth Options</span>
          <span className="flex-1 h-[1px] bg-ankahe-border" />
        </div>

        {/* Prototype Login Options */}
        <div className="space-y-3">
          <button
            onClick={() => handleSimulateClick('Continue with Google')}
            className="w-full inline-flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-ankahe-secondary hover:bg-ankahe-elevated text-xs text-ankahe-text border border-ankahe-border hover:border-ankahe-gold/40 transition-colors"
          >
            <span>Continue with Google (Phase 3)</span>
          </button>

          <button
            onClick={() => handleSimulateClick('Continue with Email Link')}
            className="w-full inline-flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-ankahe-secondary hover:bg-ankahe-elevated text-xs text-ankahe-text border border-ankahe-border hover:border-ankahe-gold/40 transition-colors"
          >
            <Mail size={13} className="text-ankahe-gold" />
            <span>Passwordless Email Magic Link</span>
          </button>
        </div>

        {/* Prototype Feedback */}
        {prototypeNote && (
          <div className="p-3.5 rounded-xl bg-ankahe-secondary border border-ankahe-gold/40 text-xs text-ankahe-gold-light leading-relaxed animate-in fade-in">
            {prototypeNote}
          </div>
        )}

        {/* Signup Link */}
        <div className="text-center text-xs text-ankahe-muted pt-2">
          <span>New to ANKAHE? </span>
          <Link to="/signup" className="text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4">
            Explore Account Prototype
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-ankahe-muted/50 font-light">
        ANKAHE • Phase 2 Community Frontend. Zero commercial ads.
      </footer>

    </div>
  );
};
