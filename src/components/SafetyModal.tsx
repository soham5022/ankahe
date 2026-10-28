import React from 'react';
import { X, Shield, EyeOff, Lock } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  type: 'privacy' | 'safety' | 'contact';
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={type === 'privacy' ? 'Privacy & Anonymity' : type === 'safety' ? 'Safety & Well-being' : 'Contact & Care'}
    >
      <div className="relative w-full max-w-2xl bg-ankahe-secondary rounded-3xl border border-ankahe-border shadow-2xl p-6 sm:p-10 space-y-7 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-ankahe-border/60">
          <div>
            <span className="text-xs uppercase tracking-widest text-ankahe-gold font-medium">
              Community Care
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ankahe-text font-normal mt-1">
              {type === 'privacy' && 'Privacy & Anonymity'}
              {type === 'safety' && 'Safety & Emotional Well-being'}
              {type === 'contact' && 'A Note on Connecting with Us'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-ankahe-muted hover:text-ankahe-text rounded-full hover:bg-ankahe-elevated transition-colors"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content based on type */}
        {type === 'privacy' && (
          <div className="space-y-4 text-sm text-ankahe-muted font-light leading-relaxed">
            <p>
              At <strong className="text-ankahe-text font-medium">ANKAHE</strong>, privacy is not a checkbox; it is the cornerstone of trust.
            </p>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-ankahe-elevated/50 border border-ankahe-border flex items-start gap-3">
                <EyeOff size={16} className="text-ankahe-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-ankahe-text font-medium text-xs">Anonymous by Choice</h4>
                  <p className="text-xs text-ankahe-muted mt-0.5">
                    You can post anonymously or use a fictional pen name. We do not require real names, phone numbers, or social media links.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-ankahe-elevated/50 border border-ankahe-border flex items-start gap-3">
                <Lock size={16} className="text-ankahe-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-ankahe-text font-medium text-xs">Zero Tracking or Third-Party Analytics</h4>
                  <p className="text-xs text-ankahe-muted mt-0.5">
                    We do not sell data, use behavioural advertising trackers, or fingerprint your browser.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-ankahe-elevated/50 border border-ankahe-border flex items-start gap-3">
                <Shield size={16} className="text-ankahe-rose shrink-0 mt-1" />
                <div>
                  <h4 className="text-ankahe-text font-medium text-xs">Honest Disclosure</h4>
                  <p className="text-xs text-ankahe-muted mt-0.5">
                    We never claim impossible "magical" anonymity. What we promise is respectful data minimization and complete freedom from commercial exploitation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'safety' && (
          <div className="space-y-4 text-sm text-ankahe-muted font-light leading-relaxed">
            <p>
              ANKAHE is a refuge for gentle expression, not a competition over suffering. We reject romanticizing self-harm or despair.
            </p>
            <p className="text-xs text-ankahe-muted/80">
              If you or someone you care about is carrying overwhelming grief or thoughts of self-harm, please know that you do not have to carry it in silence:
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="p-3 rounded-xl bg-ankahe-elevated/60 border border-ankahe-border flex items-center justify-between text-xs">
                <div>
                  <span className="text-ankahe-text font-medium block">Tele-MANAS (India, 24/7 Free)</span>
                  <span className="text-ankahe-muted/70 text-[11px]">National Tele Mental Health Programme</span>
                </div>
                <span className="font-mono text-ankahe-gold font-semibold">14416 / 1800-891-4416</span>
              </div>

              <div className="p-3 rounded-xl bg-ankahe-elevated/60 border border-ankahe-border flex items-center justify-between text-xs">
                <div>
                  <span className="text-ankahe-text font-medium block">Vandrevala Foundation Helpline</span>
                  <span className="text-ankahe-muted/70 text-[11px]">Free confidential 24/7 mental health support</span>
                </div>
                <span className="font-mono text-ankahe-gold font-semibold">+91 9999 666 555</span>
              </div>

              <div className="p-3 rounded-xl bg-ankahe-elevated/60 border border-ankahe-border flex items-center justify-between text-xs">
                <div>
                  <span className="text-ankahe-text font-medium block">Befrienders Worldwide</span>
                  <span className="text-ankahe-muted/70 text-[11px]">Global emotional support network</span>
                </div>
                <a
                  href="https://www.befrienders.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ankahe-rose hover:underline"
                >
                  befrienders.org
                </a>
              </div>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4 text-sm text-ankahe-muted font-light leading-relaxed">
            <p>
              ANKAHE is maintained by an independent group of writers, poets, and technologists who believe in preserving quiet corners of the internet.
            </p>
            <div className="p-4 rounded-2xl bg-ankahe-elevated/60 border border-ankahe-border space-y-2 text-xs">
              <h4 className="text-ankahe-text font-medium">Community Care Desk</h4>
              <p className="text-ankahe-muted/80 leading-relaxed">
                During this Phase 1 prototype, public communications are managed directly through community discussions and repository issue channels.
              </p>
              <p className="text-ankahe-muted/60 pt-2 italic">
                If you wish to suggest a poem, share feedback on accessible reading, or report content that violates our values, our open community desk will be accessible directly upon Phase 2 deployment.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-ankahe-border/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-ankahe-elevated hover:bg-ankahe-hover text-ankahe-text text-xs border border-ankahe-border transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
