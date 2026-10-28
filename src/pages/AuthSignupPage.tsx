import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCommunity } from '../context/CommunityContext';

export const AuthSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile, showToast } = useCommunity();
  const [penName, setPenName] = useState('');
  const [bio, setBio] = useState('');

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (penName.trim()) {
      updateProfile({ penName: penName.trim(), bio: bio.trim() || undefined });
      showToast(`Welcome, ${penName.trim()}! Pen name saved for this session.`);
    }
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

      {/* Main Signup Card */}
      <main className="max-w-md mx-auto w-full my-auto py-10 space-y-8">
        
        <div className="space-y-3 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold">
            Pen Name Creation • नाव
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Choose how you are known.
          </h1>
          <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed">
            Pick a pen name for this session, or enter quietly as an anonymous visitor.
          </p>
        </div>

        {/* Prototype Transparency Alert */}
        <div className="p-4 rounded-xl bg-ankahe-secondary/80 border border-ankahe-border text-xs text-ankahe-muted space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-ankahe-gold">
            <AlertCircle size={13} />
            <span>Phase 2 Session Identity</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            In Phase 2, pen names are kept in your browser session without passwords or tracking. Full account linking arrives in Phase 3.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleStartSession} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
              Chosen Pen Name / टोपणनाव:
            </label>
            <input
              type="text"
              value={penName}
              onChange={(e) => setPenName(e.target.value)}
              placeholder="e.g. A Wanderer, काफ़िर, Kabir..."
              className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl px-4 py-3 text-sm text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
              A line about your quiet corner (Optional):
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              placeholder="e.g. Writing about memories and late night tea..."
              className="w-full bg-ankahe-secondary border border-ankahe-border rounded-xl px-4 py-2.5 text-xs text-ankahe-text placeholder-ankahe-muted/50 focus:outline-none focus:border-ankahe-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs sm:text-sm font-medium shadow-sm transition-colors pt-3"
          >
            <span>Enter ANKAHE Community</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Anonymous Skip Option */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="text-xs text-ankahe-muted hover:text-ankahe-gold transition-colors py-1"
          >
            Or browse anonymously without setting a pen name →
          </button>
        </div>

        {/* Existing login link */}
        <div className="text-center text-xs text-ankahe-muted pt-2 border-t border-ankahe-border/50">
          <span>Already familiar with ANKAHE? </span>
          <Link to="/login" className="text-ankahe-gold hover:text-ankahe-gold-light underline underline-offset-4">
            Return to Login Prototype
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-ankahe-muted/50 font-light">
        ANKAHE • Phase 2 Community Frontend.
      </footer>

    </div>
  );
};
