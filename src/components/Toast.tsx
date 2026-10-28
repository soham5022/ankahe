import React from 'react';
import { Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-ankahe-elevated/95 backdrop-blur-md text-ankahe-text border border-ankahe-gold/40 shadow-xl text-xs font-light animate-in fade-in slide-in-from-bottom-2 duration-200"
      role="status"
      aria-live="polite"
    >
      <Sparkles size={14} className="text-ankahe-gold shrink-0" />
      <span>{message}</span>
    </div>
  );
};
