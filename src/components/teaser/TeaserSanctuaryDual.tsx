import React from 'react';
import { Lock, Feather, Globe, EyeOff, ShieldCheck, HeartHandshake } from 'lucide-react';

export const TeaserSanctuaryDual: React.FC = () => {
  return (
    <section
      id="scene-sanctuary-dual"
      className="py-24 sm:py-36 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full max-w-[1700px] mx-auto border-t border-white/[0.06] relative"
      aria-label="A place to keep them"
    >
      {/* Editorial Section Label Spanning Widescreen */}
      <div className="flex items-center justify-between text-xs font-mono text-ankahe-gold tracking-widest uppercase mb-12 sm:mb-16">
        <div className="flex items-center gap-3">
          <span>03</span>
          <span className="w-12 h-[1px] bg-ankahe-gold/40" />
          <span>A Place to Keep Them</span>
        </div>
        <span className="text-[11px] text-ankahe-muted/50 hidden sm:inline">
          ARCHITECTURE • THE PRIVATE DESK & THE QUIET HORIZON
        </span>
      </div>

      <div className="space-y-12">
        {/* Editorial Heading */}
        <div className="max-w-3xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl xl:text-6xl text-ankahe-text font-normal leading-[1.2] tracking-tight">
            Designed for two equal purposes.
          </h2>
          <p className="font-serif text-lg sm:text-2xl text-ankahe-muted/90 font-light leading-relaxed">
            A quiet sanctuary when you want to write only for yourself. A respectful community when you choose to share your words with the world.
          </p>
        </div>

        {/* Dual Cards: Private Writing Desk vs Quiet Community */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 items-stretch">
          {/* Card 1: The Private Library (Desk) */}
          <div className="rounded-3xl bg-ankahe-secondary/50 backdrop-blur-xl border border-white/[0.08] p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-ankahe-gold/50 shadow-2xl transition-all">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-ankahe-elevated flex items-center justify-center text-ankahe-gold border border-white/[0.08] shadow-inner">
                <Lock size={20} />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-ankahe-gold/90">
                  Purpose 01 • Private Library
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ankahe-text font-normal">
                  Your Personal Writing Desk
                </h3>
              </div>

              <p className="font-serif text-base sm:text-lg text-ankahe-muted font-light leading-relaxed">
                Save raw drafts, unedited poems, midnight thoughts, and unsent letters. Locked strictly to your account, protected by row-level database security.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-ankahe-muted/90">
                <li className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-ankahe-gold shrink-0" />
                  <span>Private by default — only you have access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Feather size={16} className="text-ankahe-gold shrink-0" />
                  <span>Categorise by Sher, Poetry, Memories & Letters</span>
                </li>
                <li className="flex items-center gap-3">
                  <EyeOff size={16} className="text-ankahe-gold shrink-0" />
                  <span>Never shared to any feed unless you explicitly publish</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="font-handwriting text-base text-ankahe-gold">
                ✦ for your eyes only
              </span>
              <span className="text-xs font-mono text-ankahe-muted/50">SECURE VAULT</span>
            </div>
          </div>

          {/* Card 2: The Quiet Community */}
          <div className="rounded-3xl bg-ankahe-secondary/50 backdrop-blur-xl border border-white/[0.08] p-8 sm:p-12 flex flex-col justify-between space-y-8 relative overflow-hidden group hover:border-ankahe-gold/50 shadow-2xl transition-all">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-ankahe-elevated flex items-center justify-center text-ankahe-gold border border-white/[0.08] shadow-inner">
                <Globe size={20} />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-ankahe-gold/90">
                  Purpose 02 • Quiet Community
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ankahe-text font-normal">
                  Intentional Discovery
                </h3>
              </div>

              <p className="font-serif text-base sm:text-lg text-ankahe-muted font-light leading-relaxed">
                When you feel ready, publish words for others to read. Choose to reveal your pen name or share as a completely anonymous whisper.
              </p>

              <ul className="space-y-3 pt-2 text-sm text-ankahe-muted/90">
                <li className="flex items-center gap-3">
                  <HeartHandshake size={16} className="text-ankahe-gold shrink-0" />
                  <span>Zero follower competitions, zero like counters</span>
                </li>
                <li className="flex items-center gap-3">
                  <EyeOff size={16} className="text-ankahe-gold shrink-0" />
                  <span>Real anonymous privacy without identity leaks</span>
                </li>
                <li className="flex items-center gap-3">
                  <Feather size={16} className="text-ankahe-gold shrink-0" />
                  <span>Respectful community built on literary resonance</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
              <span className="font-handwriting text-base text-ankahe-gold">
                ✦ connection without competition
              </span>
              <span className="text-xs font-mono text-ankahe-muted/50">COMMUNITY CIRCLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
