import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Lock, Feather, Globe, UserX, AlertCircle } from 'lucide-react';
import { CommunityLayout } from '../components/community/CommunityLayout';

export const PrinciplesPage: React.FC = () => {
  const principles = [
    {
      title: '1. Respectful Expression',
      icon: Heart,
      description:
        'People share memories of grief, first love, family estrangement, and ordinary exhaustion here. Treat every piece with the tenderness you would offer someone speaking to you across a dimly lit room.',
    },
    {
      title: '2. Privacy & Personal Choice',
      icon: Lock,
      description:
        'You always choose how your words appear: under an elected pen name, completely anonymous, or saved strictly as a private draft that only you can see.',
    },
    {
      title: '3. Original Writing & Attribution',
      icon: Feather,
      description:
        'ANKAHE is for your own words and observations. Please do not paste famous poetry, film dialogues, or song lyrics pretending they are yours. If you quote someone, honor their name.',
    },
    {
      title: '4. No Harassment or Humiliation',
      icon: UserX,
      description:
        'There are zero comment comment-wars, downvotes, or quote-retweets on ANKAHE. Mockery, harassment, hate speech, and targeting of individuals have no home here.',
    },
    {
      title: '5. No Pressure to Share',
      icon: AlertCircle,
      description:
        'Reading quietly is just as valued as writing. You never need to post to justify your presence here. Take whatever time you need.',
    },
    {
      title: '6. Respect for Every Language & Mother Tongue',
      icon: Globe,
      description:
        'Hindi, Marathi, Urdu, Hinglish, English, and regional dialects are embraced equally. We preserve native typography and right-to-left scripts because feelings sound best in the tongue in which they were felt.',
    },
  ];

  return (
    <CommunityLayout>
      <div className="space-y-12 max-w-3xl mx-auto py-4">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ankahe-gold">
            <ShieldCheck size={13} />
            <span>Community Principles • आचारसंहिता</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal leading-tight">
            How we protect this quiet corner.
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-ankahe-muted leading-relaxed">
            Not terms of service written by corporate lawyers, but a human agreement between people who share a quiet room.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-7 rounded-2xl bg-ankahe-secondary/70 border border-ankahe-border space-y-3 text-xs"
              >
                <div className="flex items-center gap-2 text-sm font-serif font-medium text-ankahe-gold">
                  <Icon size={16} />
                  <span>{p.title}</span>
                </div>
                <p className="font-sans text-xs text-ankahe-muted/90 font-light leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing note */}
        <div className="p-6 rounded-2xl paper-surface border border-ankahe-paper-border text-ankahe-paper-dark text-xs space-y-2 shadow-paper">
          <p className="font-serif text-sm font-medium">A note on crisis support</p>
          <p className="font-light leading-relaxed opacity-90">
            If you or someone you know is in acute distress or struggling with severe crisis, please reach out to trusted local helplines or professional care. While poetry and expression heal, human medical care is irreplaceable.
          </p>
        </div>

        {/* Return to community */}
        <div className="pt-4 border-t border-ankahe-border/60 flex items-center justify-between text-xs">
          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 text-ankahe-gold hover:text-ankahe-gold-light font-medium"
          >
            <span>Enter the community</span>
            <span>→</span>
          </Link>
          <Link
            to="/"
            className="text-ankahe-muted hover:text-ankahe-text"
          >
            Back to Public Teaser
          </Link>
        </div>

      </div>
    </CommunityLayout>
  );
};
