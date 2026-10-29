import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Compass, 
  Feather, 
  Mail, 
  Moon, 
  BookMarked, 
  User, 
  Settings as SettingsIcon,
  Info, 
  ShieldCheck, 
  ArrowLeft,
  Menu,
  X,
  LogIn,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCommunity } from '../../context/CommunityContext';
import { Toast } from '../Toast';

interface CommunityLayoutProps {
  children: React.ReactNode;
  rightContextPanel?: React.ReactNode;
}

export const CommunityLayout: React.FC<CommunityLayoutProps> = ({ 
  children, 
  rightContextPanel 
}) => {
  const { user, profile, signOut } = useAuth();
  const { toastMessage, showToast } = useCommunity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    showToast("Signed out. Your words remain safe.");
    navigate('/');
  };

  const navLinks = [
    { to: '/home', label: 'Home', icon: HomeIcon },
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/write', label: 'Write', icon: Feather, isPrimary: true },
    { to: '/unsent-letters', label: 'Unsent Letters', icon: Mail },
    { to: '/quiet-corner', label: 'Quiet Corner', icon: Moon },
    { to: '/my-space', label: 'My Space', icon: BookMarked },
  ];

  const secondaryLinks = [
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
    { to: '/about', label: 'About', icon: Info },
    { to: '/principles', label: 'Principles', icon: ShieldCheck },
  ];

  const userInitial = (profile?.displayName || user?.email || 'A').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col md:flex-row selection:bg-ankahe-gold/25 selection:text-ankahe-text">
      {/* ========================================================
          DESKTOP LEFT SIDEBAR (Width: 260px)
          ======================================================== */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-ankahe-secondary/70 border-r border-ankahe-border shrink-0 sticky top-0 h-screen p-6 justify-between z-30">
        <div className="space-y-6">
          {/* Brand Wordmark */}
          <div className="space-y-1">
            <Link 
              to="/home" 
              className="group flex items-baseline gap-2 focus:outline-none"
              aria-label="ANKAHE Community Home"
            >
              <span className="font-serif text-2xl tracking-wide text-ankahe-text group-hover:text-ankahe-gold transition-colors">
                ANKAHE
              </span>
              <span className="font-devanagari text-xs text-ankahe-gold/80 font-light">
                अनकहे
              </span>
            </Link>
          </div>

          {/* User Monogram Card if Authenticated */}
          {user ? (
            <Link
              to="/profile"
              className="p-3 rounded-2xl bg-ankahe-elevated/70 border border-ankahe-border hover:border-ankahe-gold/40 flex items-center gap-3 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-ankahe-secondary border border-ankahe-gold/40 flex items-center justify-center font-serif text-sm text-ankahe-gold shrink-0">
                {userInitial}
              </div>
              <div className="min-w-0 flex-1">
                <span className="block font-medium text-xs text-ankahe-text group-hover:text-ankahe-gold truncate">
                  {profile?.displayName || 'A Quiet Soul'}
                </span>
                <span className="block font-mono text-[10px] text-ankahe-muted/70 truncate">
                  @{profile?.username || 'writer'}
                </span>
              </div>
            </Link>
          ) : (
            <div className="p-3 rounded-2xl bg-ankahe-elevated/50 border border-ankahe-border space-y-2 text-xs">
              <span className="text-[11px] text-ankahe-muted block">
                Reading as guest visitor
              </span>
              <Link
                to="/login"
                className="w-full py-1.5 px-3 rounded-xl bg-ankahe-paper text-ankahe-ink hover:bg-ankahe-cream text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <LogIn size={12} />
                <span>Sign In</span>
              </Link>
            </div>
          )}

          {/* Primary Navigation Links */}
          <nav className="space-y-1" aria-label="Community primary navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      item.isPrimary
                        ? isActive
                          ? 'bg-ankahe-paper text-ankahe-ink font-medium shadow-sm'
                          : 'bg-ankahe-elevated/70 text-ankahe-text hover:bg-ankahe-elevated hover:text-ankahe-gold border border-ankahe-gold/30 font-medium'
                        : isActive
                        ? 'bg-ankahe-elevated text-ankahe-gold border border-ankahe-border font-medium'
                        : 'text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-elevated/50'
                    }`
                  }
                >
                  <Icon size={16} className={item.isPrimary ? 'text-inherit' : 'text-ankahe-muted/70'} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: Secondary links, Sign out & Return to Teaser */}
        <div className="space-y-4 pt-4 border-t border-ankahe-border/60">
          <div className="space-y-1">
            {secondaryLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      isActive
                        ? 'text-ankahe-gold font-medium bg-ankahe-elevated/40'
                        : 'text-ankahe-muted/80 hover:text-ankahe-text hover:bg-ankahe-elevated/30'
                    }`
                  }
                >
                  <Icon size={14} className="text-ankahe-muted/60" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {user && (
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs text-ankahe-muted/80 hover:text-red-400 hover:bg-ankahe-elevated/30 transition-colors"
              >
                <LogOut size={14} className="text-ankahe-muted/60" />
                <span>Sign Out</span>
              </button>
            )}
          </div>

          {/* Return to Public Teaser */}
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-ankahe-muted/60 hover:text-ankahe-gold transition-colors py-1 group"
              title="Return to the public teaser page"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Public Teaser</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MOBILE TOPBAR
          ======================================================== */}
      <header className="md:hidden flex items-center justify-between p-4 bg-ankahe-secondary/90 backdrop-blur-md border-b border-ankahe-border sticky top-0 z-40">
        <Link to="/home" className="flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-wide text-ankahe-text">
            ANKAHE
          </span>
          <span className="font-devanagari text-xs text-ankahe-gold font-light">
            अनकहे
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/write"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ankahe-paper text-ankahe-ink text-xs font-medium shadow-sm"
          >
            <Feather size={12} />
            <span>Write</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-ankahe-muted hover:text-ankahe-text hover:bg-ankahe-elevated focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Expandable Menu) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 bg-ankahe-bg/95 backdrop-blur-lg z-30 p-6 space-y-6 overflow-y-auto animate-in fade-in duration-200">
          {user ? (
            <div className="p-3 rounded-xl bg-ankahe-secondary border border-ankahe-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-ankahe-elevated border border-ankahe-gold/40 flex items-center justify-center font-serif text-sm text-ankahe-gold">
                {userInitial}
              </div>
              <div>
                <span className="block font-medium text-xs text-ankahe-text">
                  {profile?.displayName || 'A Quiet Soul'}
                </span>
                <span className="block font-mono text-[10px] text-ankahe-muted">
                  @{profile?.username || 'writer'}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center rounded-xl bg-ankahe-paper text-ankahe-ink text-xs font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 text-center rounded-xl bg-ankahe-secondary text-ankahe-text border border-ankahe-border text-xs"
              >
                Sign Up
              </Link>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold/80 block pb-1">
              Main Menu
            </span>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-base ${
                    location.pathname === item.to
                      ? 'bg-ankahe-elevated text-ankahe-gold font-medium border border-ankahe-border'
                      : 'text-ankahe-text hover:bg-ankahe-elevated/40'
                  }`}
                >
                  <Icon size={18} className="text-ankahe-gold/80" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-ankahe-border space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-muted/60 block pb-1">
              Identity & Care
            </span>
            {secondaryLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-lg text-sm text-ankahe-muted hover:text-ankahe-text"
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg text-sm text-red-400 hover:bg-red-950/20"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            )}

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-2.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light"
            >
              <ArrowLeft size={14} />
              <span>Return to Public Teaser</span>
            </Link>
          </div>
        </div>
      )}

      {/* ========================================================
          CENTRAL CONTENT AREA
          ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 pb-20 md:pb-12 max-w-5xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
          {children}
        </main>
      </div>

      {/* ========================================================
          OPTIONAL RIGHT CONTEXTUAL PANEL (Desktop only)
          ======================================================== */}
      {rightContextPanel && (
        <aside className="hidden xl:block w-72 lg:w-80 border-l border-ankahe-border bg-ankahe-secondary/30 p-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
          {rightContextPanel}
        </aside>
      )}

      {/* Global Quiet Toast Notifications */}
      <Toast message={toastMessage} />
    </div>
  );
};
