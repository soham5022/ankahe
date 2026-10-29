import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AlertCircle } from 'lucide-react';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function handleAuthCallback() {
      try {
        // Exchange code for session if present
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setErrorMessage(error.message);
          return;
        }

        if (data.session) {
          navigate('/home', { replace: true });
        } else {
          // Listen briefly for hash parsing
          const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
              authListener.subscription.unsubscribe();
              navigate('/home', { replace: true });
            }
          });
        }
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Authentication callback failed.');
      }
    }

    handleAuthCallback();
  }, [navigate]);

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 max-w-md text-xs text-red-200 space-y-3">
          <div className="flex items-center justify-center gap-2 text-red-400 font-medium">
            <AlertCircle size={16} />
            <span>Verification Link Issue</span>
          </div>
          <p className="leading-relaxed">{errorMessage}</p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="px-4 py-2 rounded-full bg-ankahe-paper text-ankahe-ink text-xs font-medium"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col items-center justify-center p-6 space-y-4 text-center">
      <div className="w-8 h-8 rounded-full border-2 border-ankahe-gold/30 border-t-ankahe-gold animate-spin" />
      <p className="font-serif italic text-sm text-ankahe-muted">
        Verifying your sanctuary access...
      </p>
    </div>
  );
};
