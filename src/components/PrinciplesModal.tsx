import React from 'react';
import { X } from 'lucide-react';

interface PrinciplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRINCIPLES = [
  {
    num: "01",
    title: "Expression over perfection.",
    hindi: "अभिव्यक्ति, पूर्णता से पहले।",
    desc: "Your words do not need to be polished literature. Grammatical flaws, broken lines, and raw feelings are welcome here."
  },
  {
    num: "02",
    title: "Understanding over judgement.",
    hindi: "न्याय नहीं, सहानुभूति।",
    desc: "We read with gentle curiosity, not harsh critique. Every life has unseen battles and unspoken grief."
  },
  {
    num: "03",
    title: "Privacy over popularity.",
    hindi: "गोपनीयता, लोकप्रियता से ऊपर।",
    desc: "No public like counts, follower tallies, or emotional leaderboards. You are a human being, not an engagement metric."
  },
  {
    num: "04",
    title: "Connection over engagement.",
    hindi: "गहराई, भटकाव से परे।",
    desc: "We favor one meaningful resonance that touches a single heart over thousands of passive, hurried scrolls."
  },
  {
    num: "05",
    title: "Authentic expression over algorithmic competition.",
    hindi: "सच्चे जज़्बात, किसी अल्गोरिदम के मोहताज नहीं।",
    desc: "No algorithms decide who gets heard. Content is discovered through emotional resonance and quiet reflection."
  }
];

export const PrinciplesModal: React.FC<PrinciplesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/90 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="ANKAHE Community Principles"
    >
      <div className="relative w-full max-w-2xl bg-ankahe-secondary rounded-3xl border border-ankahe-border shadow-2xl p-6 sm:p-10 space-y-7 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-ankahe-border/60">
          <div>
            <span className="text-xs uppercase tracking-widest text-ankahe-gold font-medium">
              Our Ethos
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ankahe-text font-normal mt-1">
              Community Principles
            </h3>
            <p className="text-xs text-ankahe-muted font-light mt-0.5">
              Five promises that guide every feature we build and every word we hold.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-ankahe-muted hover:text-ankahe-text rounded-full hover:bg-ankahe-elevated transition-colors"
            aria-label="Close principles dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Principles List */}
        <div className="space-y-4">
          {PRINCIPLES.map((p) => (
            <div
              key={p.num}
              className="p-4 rounded-2xl bg-ankahe-elevated/50 border border-ankahe-border space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs text-ankahe-gold/80 font-semibold tracking-wider">
                  Principle {p.num}
                </span>
                <span className="font-devanagari text-xs text-ankahe-muted/60 font-light">
                  {p.hindi}
                </span>
              </div>
              <h4 className="font-serif text-base sm:text-lg text-ankahe-text font-medium">
                {p.title}
              </h4>
              <p className="text-xs sm:text-sm text-ankahe-muted font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-ankahe-border/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-ankahe-elevated hover:bg-ankahe-hover text-ankahe-text text-xs border border-ankahe-border transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
