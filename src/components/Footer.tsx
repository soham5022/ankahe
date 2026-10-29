import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenAboutModal: () => void;
  onOpenPrinciplesModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenSafetyModal: () => void;
  onOpenContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAboutModal,
  onOpenPrinciplesModal,
  onOpenPrivacyModal,
  onOpenSafetyModal,
  onOpenContactModal,
}) => {
  return (
    <footer className="border-t border-white/[0.08] bg-ankahe-secondary/70 backdrop-blur-md text-ankahe-muted py-14 sm:py-20 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 mt-auto">
      <div className="max-w-[1700px] mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-normal tracking-wide text-ankahe-text">
                ANKAHE
              </span>
              <span className="font-devanagari text-sm text-ankahe-gold font-light">
                अनकहे
              </span>
            </div>

            <p className="font-serif italic text-base text-ankahe-text">
              "For everything you couldn't say."
            </p>

            <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed max-w-md">
              A contemporary literary space and refuge for unspoken feelings, poetry, unsent letters, and quiet reflections. Designed for human expression over algorithmic noise.
            </p>
          </div>

          {/* Teaser Story Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ankahe-gold font-medium">
              The Story
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#scene-things-we-keep" className="hover:text-ankahe-gold transition-colors">
                  01 • The Things We Keep
                </a>
              </li>
              <li>
                <a href="#scene-multilingual-spectrum" className="hover:text-ankahe-gold transition-colors">
                  02 • Different Kinds of Words
                </a>
              </li>
              <li>
                <a href="#scene-sanctuary-dual" className="hover:text-ankahe-gold transition-colors">
                  03 • Sanctuary & Discovery
                </a>
              </li>
              <li>
                <a href="#reveal" className="hover:text-ankahe-gold transition-colors">
                  The Threshold • ANKAHE
                </a>
              </li>
            </ul>
          </div>

          {/* Ethics & Values */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-ankahe-gold font-medium">
              Principles & Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/home"
                  className="text-ankahe-gold hover:text-ankahe-gold-light transition-colors font-medium"
                >
                  Enter Community (/home) →
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <Link
                    to="/about"
                    className="hover:text-ankahe-gold transition-colors text-left"
                  >
                    About ANKAHE
                  </Link>
                  <button
                    onClick={onOpenAboutModal}
                    className="text-[10px] text-ankahe-muted/60 hover:text-ankahe-gold font-mono"
                    title="Quick modal view"
                  >
                    [quick view]
                  </button>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <Link
                    to="/principles"
                    className="hover:text-ankahe-gold transition-colors text-left"
                  >
                    Community Principles
                  </Link>
                  <button
                    onClick={onOpenPrinciplesModal}
                    className="text-[10px] text-ankahe-muted/60 hover:text-ankahe-gold font-mono"
                    title="Quick modal view"
                  >
                    [quick view]
                  </button>
                </div>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyModal}
                  className="hover:text-ankahe-gold transition-colors text-left"
                >
                  Privacy & Anonymity
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSafetyModal}
                  className="hover:text-ankahe-gold transition-colors text-left"
                >
                  Safety & Crisis Support
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContactModal}
                  className="hover:text-ankahe-gold transition-colors text-left"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright / disclaimer */}
        <div className="pt-8 border-t border-ankahe-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ankahe-muted/60 font-light text-center sm:text-left">
          <p>
            ANKAHE (अनकहे) — A personal journal that lives on the internet. Zero advertisements. No algorithmic competition.
          </p>
          <p className="font-devanagari">
            कुछ बातें सिर्फ कागज़ और खामोशी ही समझ पाते हैं।
          </p>
        </div>
      </div>
    </footer>
  );
};
