import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
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

      <main className="max-w-md mx-auto w-full my-auto py-12 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-ankahe-secondary border border-ankahe-border flex items-center justify-center mx-auto text-ankahe-gold shadow-sm">
          <Compass size={24} />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold">
            Page Not Found • 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            A road that hasn't been written.
          </h1>
          <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed">
            The quiet corner or words you are seeking could not be found. Perhaps they found a different path.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/home"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium shadow-sm transition-colors"
          >
            <Home size={13} />
            <span>Community Home</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-xs text-ankahe-muted hover:text-ankahe-text border border-ankahe-border transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Public Teaser</span>
          </Link>
        </div>
      </main>

      <footer className="max-w-md mx-auto w-full text-center text-xs text-ankahe-muted/50 font-light">
        ANKAHE • An intimate, multilingual writing sanctuary.
      </footer>
    </div>
  );
};

