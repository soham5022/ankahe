import React, { useState, useEffect } from 'react';
import { Moon, Sun, Volume2, VolumeX, Feather } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ambientSound } from '../lib/ambientSound';

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
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const { user, profile } = useAuth();
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Subscribe to sound changes
    const unsubscribe = ambientSound.subscribe((playing) => {
      setIsSoundPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggleSound = async () => {
    await ambientSound.toggle();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ankahe-bg/90 backdrop-blur-md border-b border-ankahe-border/60 py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 flex items-center justify-between">
        {/* Minimal Wordmark: subtle and editorial */}
        <a
          href="#"
          className="group flex items-baseline gap-2.5 focus-visible:outline-none rounded-md py-0.5"
          aria-label="ANKAHE Teaser"
        >
          <span className="font-serif text-lg tracking-[0.15em] text-ankahe-text/90 group-hover:text-ankahe-text uppercase transition-colors">
            ankahe
          </span>
          <span className="text-[12px] font-devanagari text-ankahe-gold/70 font-light">
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

          {/* Optional Ambient Rain / Room Sound Toggle (Muted by default) */}
          <button
            onClick={handleToggleSound}
            className={`p-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isSoundPlaying
                ? 'bg-ankahe-gold/20 text-ankahe-gold border border-ankahe-gold/40 shadow-gold-glow'
                : 'text-ankahe-muted hover:text-ankahe-gold hover:bg-ankahe-secondary'
            }`}
            title={isSoundPlaying ? 'Pause ambient rain sound' : 'Play quiet ambient rain tone (Muted by default)'}
            aria-label={isSoundPlaying ? 'Mute ambient sound' : 'Unmute ambient sound'}
          >
            {isSoundPlaying ? (
              <>
                <Volume2 size={14} className="animate-pulse" />
                <span className="text-[10px] hidden md:inline font-mono">Rain on</span>
              </>
            ) : (
              <VolumeX size={14} />
            )}
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

          {/* Accessible Enter Option */}
          <button
            onClick={onEnterAnkahe}
            id="nav-enter-ankahe"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-ankahe-secondary hover:bg-ankahe-elevated text-ankahe-text hover:text-ankahe-gold border border-ankahe-gold/40 hover:border-ankahe-gold/70 text-xs font-medium transition-colors shadow-sm"
          >
            {isAuthenticated ? (
              <>
                <Feather size={12} className="text-ankahe-gold" />
                <span className="max-w-[100px] truncate">{profile?.displayName || 'Sanctuary'}</span>
              </>
            ) : (
              <span>Enter</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
