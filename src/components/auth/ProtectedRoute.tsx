import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-8 h-8 rounded-full border-2 border-ankahe-gold/30 border-t-ankahe-gold animate-spin" />
        <p className="font-serif italic text-sm text-ankahe-muted">
          Opening your quiet space...
        </p>
      </div>
    );
  }

  if (!user) {
    // Preserve the intended destination in router state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

