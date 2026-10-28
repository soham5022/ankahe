import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Shield, Sparkles, ArrowLeft, ArrowRight, UserPlus } from 'lucide-react';

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const EntryModal: React.FC<EntryModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const navigate = useNavigate();
  const [prototypeNote, setPrototypeNote] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEnterDirectly = () => {
    onClose();
    navigate('/home');
  };

  const handlePrototypeClick = (methodName: string) => {
    setPrototypeNote(
      `Notice: "${methodName}" is in frontend prototype mode for Phase 2. Password databases will arrive in Phase 3. You can step directly into the community now!`
    );
    onShowToast("Authentication is in design prototype mode for Phase 2.");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Enter ANKAHE"
    >
      <div className="relative w-full max-w-lg bg-ankahe-secondary rounded-3xl border border-ankahe-border shadow-2xl p-6 sm:p-10 space-y-8 my-8 text-center">
        
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-ankahe-border/60">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ankahe-gold font-medium">
            <Sparkles size={13} className="text-ankahe-gold" />
            <span>ANKAHE • अनकहे</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-ankahe-muted hover:text-ankahe-text rounded-full hover:bg-ankahe-elevated transition-colors"
            aria-label="Return to teaser"
          >
            <X size={18} />
          </button>
        </div>

        {/* Heading & Supporting Text */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ankahe-text leading-tight">
            Step into the quiet world.
          </h3>

          <div className="space-y-1 text-sm sm:text-base text-ankahe-muted font-light leading-relaxed">
            <p>You don't have to be a poet.</p>
            <p>You don't have to have the right words.</p>
            <p className="font-serif italic text-ankahe-gold pt-1">
              You just have to be yourself.
            </p>
          </div>
        </div>

        {/* Direct Community Action (Phase 2 Entry) */}
        <div className="space-y-3 max-w-sm mx-auto">
          <button
            onClick={handleEnterDirectly}
            className="w-full py-3 px-6 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>Enter Community Experience</span>
            <ArrowRight size={15} />
          </button>

          {/* Or set a pen name */}
          <button
            onClick={() => {
              onClose();
              navigate('/signup');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-ankahe-elevated hover:bg-ankahe-secondary border border-ankahe-border hover:border-ankahe-gold/40 text-xs text-ankahe-text flex items-center justify-center gap-2 transition-colors"
          >
            <UserPlus size={13} className="text-ankahe-gold" />
            <span>Set Pen Name First (/signup)</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 text-xs text-ankahe-muted/40 font-mono max-w-sm mx-auto">
          <span className="flex-1 h-[1px] bg-ankahe-border" />
          <span>Future Auth Preview</span>
          <span className="flex-1 h-[1px] bg-ankahe-border" />
        </div>

        {/* Auth Prototype Buttons */}
        <div className="space-y-2 max-w-sm mx-auto">
          <button
            onClick={() => handlePrototypeClick('Continue with Google')}
            className="w-full py-2 px-3 rounded-lg bg-ankahe-secondary hover:bg-ankahe-elevated border border-ankahe-border text-xs text-ankahe-muted hover:text-ankahe-text flex items-center justify-center gap-2 transition-colors"
          >
            <span>Google Login Preview</span>
          </button>

          <Link
            to="/login"
            onClick={onClose}
            className="block text-xs text-ankahe-gold hover:text-ankahe-gold-light py-1"
          >
            Explore Full Authentication Prototype (/login) →
          </Link>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-4 rounded-2xl bg-ankahe-elevated/50 border border-ankahe-border text-left text-xs space-y-1.5 text-ankahe-muted/90">
          <div className="flex items-center gap-1.5 text-ankahe-gold font-medium">
            <Shield size={13} />
            <span>Phase 2 Frontend Transparency</span>
          </div>
          <p className="font-light leading-relaxed">
            {prototypeNote ||
              "All community routes (Home, Discover, Write, Unsent Letters, Quiet Corner, My Space) are accessible immediately as functional frontend prototypes. Permanent account authentication will be added in Phase 3."}
          </p>
        </div>

        {/* Return Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs text-ankahe-muted hover:text-ankahe-text transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Stay on the quiet teaser</span>
          </button>
        </div>
      </div>
    </div>
  );
};
