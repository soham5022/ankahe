import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { X, Sparkles, ArrowLeft, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const EntryModal: React.FC<EntryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleEnterDirectly = () => {
    onClose();
    navigate('/home');
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

        {/* Actions based on auth status */}
        {user ? (
          <div className="space-y-3 max-w-sm mx-auto">
            <button
              onClick={handleEnterDirectly}
              className="w-full py-3 px-6 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Return to Community Home</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/my-space');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-ankahe-elevated hover:bg-ankahe-secondary border border-ankahe-border text-xs text-ankahe-text flex items-center justify-center gap-2 transition-colors"
            >
              <span>Open My Space</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-w-sm mx-auto">
            <Link
              to="/login"
              onClick={onClose}
              className="w-full py-3 px-6 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <LogIn size={15} />
              <span>Sign In with Email</span>
            </Link>

            <Link
              to="/signup"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-ankahe-elevated hover:bg-ankahe-secondary border border-ankahe-border hover:border-ankahe-gold/40 text-xs text-ankahe-text flex items-center justify-center gap-2 transition-colors"
            >
              <UserPlus size={13} className="text-ankahe-gold" />
              <span>Create Pen Name & Account</span>
            </Link>

            <div className="pt-2">
              <button
                onClick={handleEnterDirectly}
                className="text-xs text-ankahe-muted hover:text-ankahe-gold transition-colors py-1"
              >
                Browse publicly without signing in →
              </button>
            </div>
          </div>
        )}

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
