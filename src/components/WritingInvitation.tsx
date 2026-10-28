import React from 'react';
import { Feather, Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface WritingInvitationProps {
  onOpenWriteModal: () => void;
}

export const WritingInvitation: React.FC<WritingInvitationProps> = ({
  onOpenWriteModal,
}) => {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Warm paper-inspired container */}
        <div className="paper-texture rounded-3xl p-8 sm:p-14 lg:p-16 border border-ankahe-paper-border shadow-paper-warm text-ankahe-paper-dark relative overflow-hidden">
          {/* Subtle paper watermark / postal stamp motif in the corner */}
          <div
            className="absolute top-6 right-6 sm:top-8 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-ankahe-paper-dark/20 flex flex-col items-center justify-center pointer-events-none select-none opacity-40 rotate-12"
            aria-hidden="true"
          >
            <span className="font-serif text-[10px] uppercase tracking-widest text-ankahe-paper-dark">
              ANKAHE
            </span>
            <span className="text-[8px] font-sans text-ankahe-paper-faint">
              संवेदना
            </span>
          </div>

          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ankahe-paper-muted border border-ankahe-paper-border text-xs text-ankahe-paper-faint">
              <Sparkles size={12} className="text-ankahe-gold-dark" />
              <span>A sanctuary without algorithms</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ankahe-paper-dark leading-tight">
                Your words don't have to be perfect.
              </h2>
              <p className="font-serif italic text-xl sm:text-2xl text-ankahe-paper-faint">
                "They only have to be yours."
              </p>
            </div>

            <p className="text-sm sm:text-base text-ankahe-paper-faint leading-relaxed font-light max-w-xl mx-auto">
              No likes to chase, no follower counts to impress, and no algorithmic competition.
              Whether it is a single Hindi sher, an unsent note to an old friend, or a quiet midnight thought—there is room for all of it here.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenWriteModal}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-ankahe-paper-dark text-ankahe-paper hover:bg-[#1a1916] transition-all duration-200 text-sm sm:text-base font-medium shadow-md flex items-center justify-center gap-2.5 group"
                id="btn-write-what-you-feel"
              >
                <Feather size={16} className="text-ankahe-gold group-hover:-translate-y-0.5 transition-transform" />
                <span>Write what's on your mind</span>
              </button>
            </div>

            {/* Quiet values guarantee */}
            <div className="pt-6 border-t border-ankahe-paper-border/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-ankahe-paper-faint">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-ankahe-gold-dark" />
                Anonymous or pen name option
              </span>
              <span className="flex items-center gap-1.5">
                <Heart size={14} className="text-ankahe-rose-dark" />
                Zero commercial ads, forever
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
