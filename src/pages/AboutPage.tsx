import React from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';

export const AboutPage: React.FC = () => {
  return (
    <CommunityLayout>
      <div className="space-y-12 max-w-2xl mx-auto py-4">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <Info size={13} />
            <span>About • अनकहे बद्दल</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-tight">
            A place for the words we keep inside.
          </h1>

          <p className="font-serif italic text-lg text-ankahe-gold">
            "For everything you couldn't say."
          </p>
        </div>

        {/* Narrative Essay */}
        <div className="space-y-6 text-sm sm:text-base text-ankahe-muted font-light leading-relaxed">
          <p>
            Most of the internet demands a performance. It asks us to look happy, productive, witty, or profound. It gives us follower counts to measure our worth and algorithms that reward whatever causes the loudest reaction.
          </p>

          <p>
            ANKAHE was born from a simple observation: the most real things human beings carry are almost never suitable for a leaderboard.
          </p>

          <div className="paper-surface rounded-2xl p-7 border border-ankahe-paper-border text-ankahe-paper-dark space-y-3 shadow-paper my-8">
            <h3 className="font-serif text-lg font-medium">
              Why the name ANKAHE?
            </h3>
            <p className="font-serif text-sm sm:text-base leading-relaxed italic opacity-95">
              In Hindi and Urdu, "Ankahe" (अनकहे) means that which was left unsaid. The thoughts that stayed back in the throat. The letters never posted. The confessions that dissolved into a quiet smile.
            </p>
          </div>

          <p>
            Here, you don't need a formal poetic education. You don't need to rhyme. You can write two lines that only make sense to you late on a Tuesday night, or you can write a long unsent letter to someone you will never see again.
          </p>

          <p>
            And if you don't want to write anything at all, you are welcome to simply sit in the corner and read. No one will ask you to register, like, or subscribe.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-ankahe-border/60 text-xs">
          <div className="p-5 rounded-2xl bg-ankahe-secondary/60 border border-ankahe-border space-y-2">
            <span className="font-mono text-ankahe-gold uppercase tracking-wider block">Zero Monetization</span>
            <p className="text-ankahe-muted/80 leading-relaxed">
              No ads, no paid subscriptions, no data broker selling. Human vulnerability is never commercialized.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-ankahe-secondary/60 border border-ankahe-border space-y-2">
            <span className="font-mono text-ankahe-gold uppercase tracking-wider block">Multilingual Heart</span>
            <p className="text-ankahe-muted/80 leading-relaxed">
              Honoring Hindi, Marathi, Urdu, Hinglish, and English with equal dignity and native typography.
            </p>
          </div>
        </div>

        {/* Action Link to Principles */}
        <div className="pt-6 border-t border-ankahe-border/60 flex items-center justify-between text-xs">
          <Link
            to="/principles"
            className="inline-flex items-center gap-1.5 text-ankahe-gold hover:text-ankahe-gold-light font-medium"
          >
            <span>Read Community Principles</span>
            <span>→</span>
          </Link>

          <Link
            to="/home"
            className="text-ankahe-muted hover:text-ankahe-text"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </CommunityLayout>
  );
};
