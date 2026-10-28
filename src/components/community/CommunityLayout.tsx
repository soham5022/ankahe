import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Compass, 
  Feather, 
  Mail, 
  Moon, 
  BookMarked, 
  User, 
  Info, 
  ShieldCheck, 
  ArrowLeft,
  Menu,
  X
} from 'lucide-react';
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
  const { toastMessage } = useCommunity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    { to: '/about', label: 'About', icon: Info },
    { to: '/principles', label: 'Principles', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-ankahe-bg text-ankahe-text flex flex-col md:flex-row selection:bg-ankahe-gold/25 selection:text-ankahe-text">
      
      {/* ========================================================
          DESKTOP LEFT SIDEBAR (Width: 260px)
          ======================================================== */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-ankahe-secondary/70 border-r border-ankahe-border shrink-0 sticky top-0 h-screen p-6 justify-between z-30">
        <div className="space-y-8">
          
          {/* Brand Wordmark & Prototype Badge */}
          <div className="space-y-1.5">
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
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ankahe-gold/70 bg-ankahe-elevated px-2 py-0.5 rounded border border-ankahe-border">
                Community • Phase 2
              </span>
            </div>
          </div>

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

        {/* Footer Area: Secondary links & Return to Teaser */}
        <div className="space-y-4 pt-6 border-t border-ankahe-border/60">
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
          <div className="space-y-2">
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

          <div className="pt-4 border-t border-ankahe-border space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-muted/60 block pb-1">
              Identity & Principles
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

      {/* ========================================================
          MOBILE BOTTOM NAVIGATION (Touch-Friendly bar)
          ======================================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-ankahe-secondary/95 backdrop-blur-md border-t border-ankahe-border z-40 flex items-center justify-around py-2 px-1 safe-area-inset-bottom">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 text-[10px] min-w-[54px] min-h-[44px] justify-center ${
              isActive ? 'text-ankahe-gold font-medium' : 'text-ankahe-muted hover:text-ankahe-text'
            }`
          }
        >
          <HomeIcon size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/discover"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 text-[10px] min-w-[54px] min-h-[44px] justify-center ${
              isActive ? 'text-ankahe-gold font-medium' : 'text-ankahe-muted hover:text-ankahe-text'
            }`
          }
        >
          <Compass size={18} />
          <span>Discover</span>
        </NavLink>

        <NavLink
          to="/write"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 text-[10px] min-w-[54px] min-h-[44px] justify-center ${
              isActive ? 'text-ankahe-gold font-medium' : 'text-ankahe-muted hover:text-ankahe-text'
            }`
          }
        >
          <div className="w-7 h-7 rounded-full bg-ankahe-paper text-ankahe-ink flex items-center justify-center -mt-2 shadow-sm">
            <Feather size={14} />
          </div>
          <span className="font-medium text-ankahe-gold">Write</span>
        </NavLink>

        <NavLink
          to="/unsent-letters"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 text-[10px] min-w-[54px] min-h-[44px] justify-center ${
              isActive ? 'text-ankahe-gold font-medium' : 'text-ankahe-muted hover:text-ankahe-text'
            }`
          }
        >
          <Mail size={18} />
          <span>Letters</span>
        </NavLink>

        <NavLink
          to="/my-space"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 text-[10px] min-w-[54px] min-h-[44px] justify-center ${
              isActive ? 'text-ankahe-gold font-medium' : 'text-ankahe-muted hover:text-ankahe-text'
            }`
          }
        >
          <BookMarked size={18} />
          <span>My Space</span>
        </NavLink>
      </nav>

      {/* Global Toast for resonance / saving feedback */}
      <Toast message={toastMessage} />
    </div>
  );
};
