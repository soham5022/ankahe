import React, { useState } from 'react';

import { Navbar } from '../components/Navbar';
import { TeaserOpening } from '../components/TeaserOpening';
import { TeaserStorySequence } from '../components/TeaserStorySequence';
import { TeaserPersonalMoment } from '../components/TeaserPersonalMoment';
import { TeaserFinalReveal } from '../components/TeaserFinalReveal';
import { Footer } from '../components/Footer';

// Interactive Modals
import { EntryModal } from '../components/EntryModal';
import { LetterReaderModal } from '../components/LetterReaderModal';
import { AboutModal } from '../components/AboutModal';
import { PrinciplesModal } from '../components/PrinciplesModal';
import { SafetyModal } from '../components/SafetyModal';
import { Toast } from '../components/Toast';

import type { UnsentLetterItem } from '../types';

export const Home: React.FC = () => {
  // Modal states
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<UnsentLetterItem | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrinciplesModalOpen, setIsPrinciplesModalOpen] = useState(false);
  const [safetyModalType, setSafetyModalType] = useState<'privacy' | 'safety' | 'contact' | null>(null);

  // Paper warmth appearance toggle
  const [isWarmTheme, setIsWarmTheme] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const toggleWarmTheme = () => {
    setIsWarmTheme((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('warm-light-theme');
        showToast("Paper warmth appearance enabled.");
      } else {
        document.documentElement.classList.remove('warm-light-theme');
        showToast("Midnight dark appearance restored.");
      }
      return next;
    });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story-moments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-ankahe-bg text-ankahe-text relative selection:bg-ankahe-gold/25 selection:text-ankahe-text">
      {/* 
        Minimal Navigation:
        Extremely restrained wordmark, About, Principles, Theme Toggle, and skip-to-Enter option.
        Rain sound toggle intentionally removed so words and curiosity lead the experience.
      */}
      <Navbar
        onEnterAnkahe={() => setIsEntryModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenPrinciplesModal={() => setIsPrinciplesModalOpen(true)}
        isWarmTheme={isWarmTheme}
        onToggleWarmTheme={toggleWarmTheme}
      />

      {/* The Teaser Experience: Curiosity -> Recognition -> Connection -> Personal Pause -> Full Reveal */}
      <main className="flex-1">
        {/* Phase 1: Opening — Curiosity */}
        <TeaserOpening onScrollToStory={scrollToStory} />

        {/* Phase 2: Visual Story Sequence — Recognition & Connection (Four Moments) */}
        <TeaserStorySequence
          onOpenLetter={(letter) => setSelectedLetter(letter)}
          onShowToast={showToast}
        />

        {/* Phase 3: The Personal Moment — Intimate Reflection with Generous Whitespace */}
        <TeaserPersonalMoment />

        {/* Phase 4: The Final Reveal — Revelation & Invitation */}
        <TeaserFinalReveal
          onEnterAnkahe={() => setIsEntryModalOpen(true)}
          onReadAgain={scrollToTop}
        />
      </main>

      {/* Understated Literary Footer */}
      <Footer
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenPrinciplesModal={() => setIsPrinciplesModalOpen(true)}
        onOpenPrivacyModal={() => setSafetyModalType('privacy')}
        onOpenSafetyModal={() => setSafetyModalType('safety')}
        onOpenContactModal={() => setSafetyModalType('contact')}
      />

      {/* Phase 1 Prototype Authentication Entry Modal */}
      <EntryModal
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Full Unsent Letter Reading Modal */}
      <LetterReaderModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
        onShowToast={showToast}
      />

      {/* Educational & Care Modals */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenPrinciples={() => setIsPrinciplesModalOpen(true)}
      />

      <PrinciplesModal
        isOpen={isPrinciplesModalOpen}
        onClose={() => setIsPrinciplesModalOpen(false)}
      />

      <SafetyModal
        isOpen={safetyModalType !== null}
        type={safetyModalType || 'privacy'}
        onClose={() => setSafetyModalType(null)}
      />

      {/* Quiet Status Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default Home;
