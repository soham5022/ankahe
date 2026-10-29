import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  Shield, 
  Key, 
  Globe, 
  Trash2, 
  AlertTriangle, 
  LogOut 
} from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';
import { useAuth } from '../context/AuthContext';
import { useCommunity } from '../context/CommunityContext';
import type { Language } from '../types';

export const SettingsPage: React.FC = () => {
  const { user, profile, updateProfile, updatePassword, signOut, deleteAccount } = useAuth();
  const { showToast } = useCommunity();
  const navigate = useNavigate();

  // Language Preference State
  const [preferredLang, setPreferredLang] = useState(profile?.preferredLanguage || 'Hindi');
  const [savingLang, setSavingLang] = useState(false);

  // Password Change State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  // Account Deletion State
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const languages: Language[] = ['Hindi', 'Hinglish', 'Marathi', 'English', 'Urdu', 'Other'];

  const handleUpdateLanguage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLang(true);
    const { error } = await updateProfile({ preferredLanguage: preferredLang });
    setSavingLang(false);

    if (error) {
      showToast(`Error updating language: ${error}`);
    } else {
      showToast("Language preference saved.");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.");
      return;
    }

    setSavingPassword(true);
    const { error } = await updatePassword(newPassword);
    setSavingPassword(false);

    if (error) {
      showToast(`Password update error: ${error}`);
    } else {
      setNewPassword('');
      setConfirmPassword('');
      showToast("Password updated successfully.");
    }
  };

  const handleLogout = async () => {
    await signOut();
    showToast("Signed out gently. Your words remain safe.");
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.trim().toUpperCase() !== 'DELETE') {
      setDeleteError('Please type DELETE to confirm account removal.');
      return;
    }

    setDeleteError(null);
    const { error } = await deleteAccount();
    if (error) {
      setDeleteError(error);
    } else {
      showToast("Your account and private space have been removed.");
      navigate('/');
    }
  };

  return (
    <CommunityLayout>
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <SettingsIcon size={13} />
            <span>Account & Sanctuary Settings</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal">
            Preferences & Security.
          </h1>

          <p className="text-sm text-ankahe-muted font-light leading-relaxed">
            Manage your quiet space, reading tongue, and account safety.
          </p>
        </div>

        {/* 1. Account Identity Summary */}
        <section className="p-6 rounded-2xl bg-ankahe-secondary/70 border border-ankahe-border space-y-4 text-xs text-ankahe-text">
          <div className="flex items-center justify-between pb-3 border-b border-ankahe-border/60">
            <div className="flex items-center gap-2 text-ankahe-gold font-mono uppercase tracking-wider text-[11px]">
              <Shield size={13} />
              <span>Identity Summary</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ankahe-elevated hover:bg-ankahe-secondary text-ankahe-muted hover:text-ankahe-text border border-ankahe-border transition-colors"
            >
              <LogOut size={12} />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="font-mono text-[10px] text-ankahe-muted/70 uppercase tracking-wider block">
                Pen Name / नाव:
              </span>
              <p className="font-medium text-sm text-ankahe-text pt-0.5">
                {profile?.displayName || 'A Quiet Soul'}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] text-ankahe-muted/70 uppercase tracking-wider block">
                Username:
              </span>
              <p className="font-mono text-xs text-ankahe-gold pt-0.5">
                @{profile?.username || 'writer'}
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="font-mono text-[10px] text-ankahe-muted/70 uppercase tracking-wider block">
                Registered Email:
              </span>
              <p className="font-mono text-xs text-ankahe-muted pt-0.5">
                {user?.email || 'Authenticated user'}
              </p>
            </div>
          </div>
        </section>

        {/* 2. Reading Language Preference */}
        <section className="p-6 rounded-2xl bg-ankahe-secondary/70 border border-ankahe-border space-y-4 text-xs text-ankahe-text">
          <div className="flex items-center gap-2 text-ankahe-gold font-mono uppercase tracking-wider text-[11px] pb-2 border-b border-ankahe-border/60">
            <Globe size={13} />
            <span>Preferred Language</span>
          </div>

          <p className="text-ankahe-muted font-light leading-relaxed">
            Choose your natural language for writing placeholders and editor defaults.
          </p>

          <form onSubmit={handleUpdateLanguage} className="space-y-4 pt-1">
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setPreferredLang(lang)}
                  className={`px-3 py-1.5 rounded-xl transition-colors ${
                    preferredLang === lang
                      ? 'bg-ankahe-paper text-ankahe-ink font-medium shadow-sm'
                      : 'bg-ankahe-elevated text-ankahe-muted hover:text-ankahe-text'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={savingLang}
                className="px-5 py-2 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium transition-colors disabled:opacity-50"
              >
                {savingLang ? 'Saving...' : 'Save Language Preference'}
              </button>
            </div>
          </form>
        </section>

        {/* 3. Password Update */}
        <section className="p-6 rounded-2xl bg-ankahe-secondary/70 border border-ankahe-border space-y-4 text-xs text-ankahe-text">
          <div className="flex items-center gap-2 text-ankahe-gold font-mono uppercase tracking-wider text-[11px] pb-2 border-b border-ankahe-border/60">
            <Key size={13} />
            <span>Change Password</span>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                New Password:
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[11px] text-ankahe-muted uppercase tracking-wider block">
                Confirm New Password:
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-ankahe-elevated border border-ankahe-border rounded-xl px-3 py-2 text-xs text-ankahe-text focus:outline-none focus:border-ankahe-gold"
              />
            </div>

            <button
              type="submit"
              disabled={savingPassword || !newPassword}
              className="px-5 py-2 rounded-full bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium transition-colors disabled:opacity-50"
            >
              {savingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </section>

        {/* 4. Danger Zone: Account Deletion */}
        <section className="p-6 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-4 text-xs text-red-200">
          <div className="flex items-center gap-2 text-red-400 font-mono uppercase tracking-wider text-[11px] pb-2 border-b border-red-900/40">
            <AlertTriangle size={13} />
            <span>Danger Zone • Account Deletion</span>
          </div>

          <div className="space-y-2 text-red-200/90 font-light leading-relaxed">
            <p>
              Deleting your account permanently deletes your profile, writings, private drafts, saved pieces, and resonances.
            </p>
            <p className="text-[11px] text-red-300/80">
              This action cannot be undone. All your words in ANKAHE will be erased from our database.
            </p>
          </div>

          {deleteError && (
            <div className="p-3 rounded-xl bg-red-900/30 border border-red-800 text-red-200 text-xs">
              {deleteError}
            </div>
          )}

          {!isDeleting ? (
            <button
              type="button"
              onClick={() => setIsDeleting(true)}
              className="px-4 py-2 rounded-xl bg-red-900/30 hover:bg-red-900/60 text-red-300 border border-red-800/60 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Trash2 size={12} />
              <span>Delete My Account</span>
            </button>
          ) : (
            <div className="space-y-3 pt-2">
              <label className="font-mono text-[11px] text-red-300 uppercase tracking-wider block">
                Type DELETE to confirm:
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE"
                  className="bg-ankahe-secondary border border-red-800/80 rounded-xl px-3 py-2 text-xs text-red-100 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors"
                >
                  Permanently Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleting(false);
                    setDeleteConfirmation('');
                    setDeleteError(null);
                  }}
                  className="px-3 py-2 rounded-xl text-xs text-ankahe-muted hover:text-ankahe-text"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </CommunityLayout>
  );
};
