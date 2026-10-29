import React from 'react';
import { Lock, Feather, Globe, EyeOff, ShieldCheck, HeartHandshake } from 'lucide-react';

export const TeaserSanctuaryDual: React.FC = () => {
  return (
    <section
      id="scene-sanctuary-dual"
      className="py-20 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto border-t border-ankahe-border/30 relative"
      aria-label="A place to keep them"
    >
      {/* Editorial Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono text-ankahe-gold tracking-widest uppercase mb-12 sm:mb-16">
        <span>03</span>
        <span className="w-8 h-[1px] bg-ankahe-gold/40" />
        <span>A Place to Keep Them</span>
      </div>

      <div className="space-y-12">
        {/* Editorial Heading */}
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl text-ankahe-text font-normal leading-tight">
            Designed for two equal purposes.
          </h2>
          <p className="font-serif text-base sm:text-lg text-ankahe-muted/90 font-light leading-relaxed">
            A quiet sanctuary when you want to write only for yourself. A respectful community when you choose to share your words with the world.
          </p>
        </div>

        {/* Dual Cards: Private Writing Desk vs Quiet Community */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: The Private Library (Desk) */}
          <div className="rounded-2xl bg-ankahe-secondary/70 border border-ankahe-border/70 p-8 sm:p-9 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-ankahe-gold/40 transition-all">
            <div className="space-y-5">
              <div className="w-10 h-10 rounded-xl bg-ankahe-elevated flex items-center justify-center text-ankahe-gold border border-ankahe-border/60">
                <Lock size={18} />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold/90">
                  Purpose 01 • Private Library
                </span>
                <h3 className="font-serif text-2xl text-ankahe-text font-normal">
                  Your Personal Writing Desk
                </h3>
              </div>

              <p className="font-serif text-sm sm:text-base text-ankahe-muted font-light leading-relaxed">
                Save raw drafts, unedited poems, midnight thoughts, and unsent letters. Locked strictly to your account, protected by row-level database security.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-ankahe-muted/80">
                <li className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-ankahe-gold" />
                  <span>Private by default — only you have access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Feather size={14} className="text-ankahe-gold" />
                  <span>Categorise by Sher, Poetry, Memories & Letters</span>
                </li>
                <li className="flex items-center gap-2">
                  <EyeOff size={14} className="text-ankahe-gold" />
                  <span>Never shared to any feed unless you explicitly publish</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-ankahe-border/40">
              <span className="font-handwriting text-sm text-ankahe-gold">
                ✦ for your eyes only
              </span>
            </div>
          </div>

          {/* Card 2: The Quiet Community */}
          <div className="rounded-2xl bg-ankahe-secondary/70 border border-ankahe-border/70 p-8 sm:p-9 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-ankahe-gold/40 transition-all">
            <div className="space-y-5">
              <div className="w-10 h-10 rounded-xl bg-ankahe-elevated flex items-center justify-center text-ankahe-gold border border-ankahe-border/60">
                <Globe size={18} />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-ankahe-gold/90">
                  Purpose 02 • Quiet Community
                </span>
                <h3 className="font-serif text-2xl text-ankahe-text font-normal">
                  Intentional Discovery
                </h3>
              </div>

              <p className="font-serif text-sm sm:text-base text-ankahe-muted font-light leading-relaxed">
                When you feel ready, publish words for others to read. Choose to reveal your pen name or share as a completely anonymous voice.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-ankahe-muted/80">
                <li className="flex items-center gap-2">
                  <HeartHandshake size={14} className="text-ankahe-gold" />
                  <span>Zero follower competitions, zero like counters</span>
                </li>
                <li className="flex items-center gap-2">
                  <EyeOff size={14} className="text-ankahe-gold" />
                  <span>Real anonymous privacy without identity leaks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Feather size={14} className="text-ankahe-gold" />
                  <span>Respectful community built on literary resonance</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-ankahe-border/40">
              <span className="font-handwriting text-sm text-ankahe-gold">
                ✦ connection without competition
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
