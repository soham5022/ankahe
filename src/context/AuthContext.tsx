import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserProfile } from '../types';

interface SignUpOptions {
  username: string;
  displayName: string;
  bio?: string;
  preferredLanguage?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, options: SignUpOptions) => Promise<{ error?: string; needsEmailConfirmation?: boolean; isRateLimited?: boolean }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<{ displayName: string; bio: string; preferredLanguage: string; avatarUrl: string }>) => Promise<{ error?: string }>;
  requestPasswordReset: (email: string) => Promise<{ error?: string; message?: string }>;
  updatePassword: (newPassword: string) => Promise<{ error?: string }>;
  deleteAccount: () => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user profile from Supabase profiles table
  const fetchProfile = useCallback(async (userId: string, userMeta?: Record<string, unknown>): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('[ANKAHE Auth] Could not fetch profile:', error.message);
      }

      if (data) {
        return {
          id: data.id,
          username: data.username,
          displayName: data.display_name || data.username || 'A Quiet Soul',
          bio: data.bio || '',
          avatarUrl: data.avatar_url || undefined,
          preferredLanguage: data.preferred_language || 'Hindi',
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }

      // If profile record does not yet exist, create it from metadata
      const metaName = (userMeta?.display_name || userMeta?.pen_name || 'A Quiet Soul') as string;
      const metaUsername = (userMeta?.username || `writer_${userId.substring(0, 8)}`) as string;
      const metaLang = (userMeta?.preferred_language || 'Hindi') as string;

      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username: metaUsername,
          display_name: metaName,
          preferred_language: metaLang,
        })
        .select('*')
        .maybeSingle();

      if (!insertError && newProfile) {
        return {
          id: newProfile.id,
          username: newProfile.username,
          displayName: newProfile.display_name || newProfile.username,
          bio: newProfile.bio || '',
          avatarUrl: newProfile.avatar_url || undefined,
          preferredLanguage: newProfile.preferred_language || 'Hindi',
        };
      }

      return {
        id: userId,
        username: metaUsername,
        displayName: metaName,
        bio: '',
        preferredLanguage: metaLang,
      };
    } catch (err) {
      console.warn('[ANKAHE Auth] Profile error:', err);
      return null;
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const p = await fetchProfile(user.id, user.user_metadata);
    setProfile(p);
  }, [user, fetchProfile]);

  // Initial session restoration & auth state listener
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      if (!isSupabaseConfigured) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.warn('[ANKAHE Auth] Session check error:', error.message);
        }

        if (initialSession && isMounted) {
          setSession(initialSession);
          setUser(initialSession.user);
          const p = await fetchProfile(initialSession.user.id, initialSession.user.user_metadata);
          if (isMounted) setProfile(p);
        }
      } catch (err) {
        console.warn('[ANKAHE Auth] Init error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted) return;

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        const p = await fetchProfile(currentSession.user.id, currentSession.user.user_metadata);
        if (isMounted) setProfile(p);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // Sign In with email and password
  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase credentials are not configured in your .env file.' };
    }
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { error: 'Please enter both email and password.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          return { error: 'Invalid email or password. Please check your details and try again.' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: 'Please confirm your email address before signing in. Check your inbox for the verification link.' };
        }
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        const p = await fetchProfile(data.user.id, data.user.user_metadata);
        setProfile(p);
      }

      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An unexpected network error occurred.' };
    }
  };

  // Sign Up
  const signUp = async (
    email: string,
    password: string,
    options: SignUpOptions
  ): Promise<{ error?: string; needsEmailConfirmation?: boolean; isRateLimited?: boolean }> => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase credentials are not configured in your .env file.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = options.username.trim().toLowerCase();
    if (cleanUsername.length < 3 || cleanUsername.length > 30) {
      return { error: 'Username must be between 3 and 30 characters.' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      return { error: 'Username can only contain letters, numbers, and underscores.' };
    }
    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters.' };
    }

    try {
      // Check for username collision
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', cleanUsername)
        .maybeSingle();

      if (existingUser) {
        return { error: `The username "${cleanUsername}" is already taken. Please choose another.` };
      }

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            username: cleanUsername,
            display_name: options.displayName.trim() || cleanUsername,
            bio: options.bio?.trim() || '',
            preferred_language: options.preferredLanguage || 'Hindi',
          },
        },
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          return { 
            error: 'Supabase email rate limit exceeded for this project.',
            isRateLimited: true 
          };
        }
        if (error.message.includes('already registered')) {
          return { error: 'An account with this email already exists. Please log in instead.' };
        }
        return { error: error.message };
      }

      // If email confirmation is required and no session was returned
      if (data.user && !data.session) {
        return { needsEmailConfirmation: true };
      }

      if (data.user && data.session) {
        setUser(data.user);
        setSession(data.session);
        const p = await fetchProfile(data.user.id, data.user.user_metadata);
        setProfile(p);
      }

      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'An unexpected error occurred during signup.' };
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[ANKAHE Auth] SignOut error:', err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  };

  // Update Profile
  const updateProfile = async (
    updates: Partial<{ displayName: string; bio: string; preferredLanguage: string; avatarUrl: string }>
  ): Promise<{ error?: string }> => {
    if (!user) return { error: 'You must be signed in to update your profile.' };

    try {
      const payload: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };
      if (updates.displayName !== undefined) payload.display_name = updates.displayName.trim();
      if (updates.bio !== undefined) payload.bio = updates.bio.trim();
      if (updates.preferredLanguage !== undefined) payload.preferred_language = updates.preferredLanguage;
      if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;

      const { data, error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', user.id)
        .select('*')
        .single();

      if (error) return { error: error.message };

      if (data) {
        setProfile({
          id: data.id,
          username: data.username,
          displayName: data.display_name || data.username,
          bio: data.bio || '',
          avatarUrl: data.avatar_url || undefined,
          preferredLanguage: data.preferred_language || 'Hindi',
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        });
      }

      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to update profile.' };
    }
  };

  // Password Recovery Request
  const requestPasswordReset = async (email: string): Promise<{ error?: string; message?: string }> => {
    if (!isSupabaseConfigured) {
      return { error: 'Supabase credentials are not configured.' };
    }
    if (!email.trim()) {
      return { error: 'Please enter your email address.' };
    }

    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      if (error) return { error: error.message };
      return { message: 'If an account exists for this email, a recovery link has been sent.' };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to send recovery email.' };
    }
  };

  // Update Password (when authenticated or on reset page)
  const updatePassword = async (newPassword: string): Promise<{ error?: string }> => {
    if (newPassword.length < 6) {
      return { error: 'New password must be at least 6 characters.' };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) return { error: error.message };
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to update password.' };
    }
  };

  // Delete Account
  const deleteAccount = async (): Promise<{ error?: string }> => {
    if (!user) return { error: 'No authenticated user to delete.' };

    try {
      // Delete user's profile and writings (cascade deletes comments, reactions, saved)
      await supabase.from('writings').delete().eq('user_id', user.id);
      await supabase.from('saved_writings').delete().eq('user_id', user.id);
      await supabase.from('reactions').delete().eq('user_id', user.id);
      await supabase.from('profiles').delete().eq('id', user.id);

      // Sign out
      await signOut();
      return {};
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Could not complete account deletion.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        updateProfile,
        requestPasswordReset,
        updatePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
