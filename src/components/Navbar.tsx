import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
  onEnterAnkahe: () => void;
  onOpenAboutModal: () => void;
  onOpenPrinciplesModal: () => void;
  isWarmTheme: boolean;
  onToggleWarmTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onEnterAnkahe,
  onOpenAboutModal,
  onOpenPrinciplesModal,
  isWarmTheme,
  onToggleWarmTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ankahe-bg/90 backdrop-blur-md border-b border-ankahe-border/50 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Minimal Wordmark: subtle, not dominating */}
        <a
          href="#"
          className="group flex items-baseline gap-2 focus-visible:outline-none rounded-md py-0.5"
          aria-label="ANKAHE Teaser"
        >
          <span className="font-serif text-lg tracking-wider text-ankahe-text/80 group-hover:text-ankahe-text transition-colors">
            ankahe
          </span>
          <span className="text-[11px] font-devanagari text-ankahe-muted/60 font-light">
            अनकहे
          </span>
        </a>

        {/* Minimal Public Controls */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs text-ankahe-muted">
          {/* Subtle About Link */}
          <button
            onClick={onOpenAboutModal}
            className="hover:text-ankahe-gold transition-colors py-1"
          >
            About
          </button>

          {/* Principles Link */}
          <button
            onClick={onOpenPrinciplesModal}
            className="hidden sm:inline-block hover:text-ankahe-gold transition-colors py-1 tracking-wider text-[11px] text-ankahe-muted"
          >
            Principles
          </button>

          {/* Warm Theme Toggle */}
          <button
            onClick={onToggleWarmTheme}
            className="p-1.5 text-ankahe-muted hover:text-ankahe-gold rounded-full hover:bg-ankahe-secondary transition-colors"
            title={isWarmTheme ? 'Switch to Midnight Dark' : 'Switch to Soft Paper Ambience'}
            aria-label="Toggle paper warmth"
          >
            {isWarmTheme ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Accessible Enter Option: Understated dark button with subtle gold border */}
          <button
            onClick={onEnterAnkahe}
            id="nav-enter-ankahe"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-ankahe-text hover:text-ankahe-gold border border-ankahe-gold/40 hover:border-ankahe-gold/70 text-xs font-medium transition-colors shadow-sm"
          >
            <span>Enter</span>
          </button>
        </div>
      </div>
    </header>
  );
};
