import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { Navbar } from '../components/Navbar';
import { TeaserAtmosphere } from '../components/teaser/TeaserAtmosphere';
import { TeaserHeroOpening } from '../components/teaser/TeaserHeroOpening';
import { TeaserTheThingsWeKeep } from '../components/teaser/TeaserTheThingsWeKeep';
import { TeaserMultilingualSpectrum } from '../components/teaser/TeaserMultilingualSpectrum';
import { TeaserSanctuaryDual } from '../components/teaser/TeaserSanctuaryDual';
import { TeaserThresholdInvitation } from '../components/teaser/TeaserThresholdInvitation';
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
  const { user } = useAuth();
  const isAuthenticated = Boolean(user);
  const navigate = useNavigate();

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
    }, 3000);
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

  const handleEnterAnkahe = () => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      setIsEntryModalOpen(true);
    }
  };

  const scrollToStory = () => {
    const el = document.getElementById('scene-things-we-keep');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-ankahe-bg text-ankahe-text relative selection:bg-ankahe-gold/25 selection:text-ankahe-text">
      {/* Cinematic Ambient Atmosphere (Film grain, pointer lighting, subtle light fields) */}
      <TeaserAtmosphere />

      {/* Editorial Navigation with Procedural Audio Toggle */}
      <Navbar
        onEnterAnkahe={handleEnterAnkahe}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenPrinciplesModal={() => setIsPrinciplesModalOpen(true)}
        isWarmTheme={isWarmTheme}
        onToggleWarmTheme={toggleWarmTheme}
      />

      {/* The 5-Scene Cinematic Teaser Journey */}
      <main className="flex-1 relative z-10">
        {/* Scene 1: Prologue & Hero Composition */}
        <TeaserHeroOpening
          onEnterAnkahe={handleEnterAnkahe}
          onScrollToStory={scrollToStory}
          isAuthenticated={isAuthenticated}
        />

        {/* Scene 2: The Things We Keep (Intimate Notebook & Unsent Letter) */}
        <TeaserTheThingsWeKeep
          onOpenLetter={(letter) => setSelectedLetter(letter)}
          onShowToast={showToast}
        />

        {/* Scene 3: Different Kinds of Words (Multilingual & Multi-Emotional Spectrum) */}
        <TeaserMultilingualSpectrum />

        {/* Scene 4: A Place to Keep Them (Sanctuary Desk & Quiet Community) */}
        <TeaserSanctuaryDual />

        {/* Scene 5: The Threshold & Final Invitation */}
        <TeaserThresholdInvitation
          onEnterAnkahe={handleEnterAnkahe}
          onReadAgain={scrollToTop}
          isAuthenticated={isAuthenticated}
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

      {/* Entry Modal for Unauthenticated Users */}
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
