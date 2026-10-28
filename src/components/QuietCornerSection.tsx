import React, { useState, useRef, useEffect } from 'react';
import { Moon, Volume2, VolumeX, Wind } from 'lucide-react';

interface QuietCornerSectionProps {
  onOpenFullQuietCorner: () => void;
}

const SANCTUARY_READINGS = [
  {
    text: "There is nothing you need to accomplish in the next few minutes. The world is carrying on, and you are allowed to put down everything you're holding.",
    author: "A quiet reminder",
    note: "Read slowly",
  },
  {
    text: "काही संध्याकाळी स्वतःसाठी चहा करणं आणि शांत बसून राहणं, हेही एक मोठं सांत्वन असतं.",
    author: "मनातली नोंद",
    note: "संथ वाचन",
  },
  {
    text: "खामोश रहना कोई हार नहीं होती। कभी-कभी इंसान सिर्फ शोर से थक जाता है, अपने वजूद से नहीं।",
    author: "एक अनकही बात",
    note: "सुकून के पल",
  },
  {
    text: "You don't have to turn every sorrow into art, and you don't have to turn every quiet moment into productivity. Sometimes, simply being here is enough.",
    author: "Late night companion",
    note: "No hurry",
  }
];

export const QuietCornerSection: React.FC<QuietCornerSectionProps> = ({
  onOpenFullQuietCorner,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingRain, setIsPlayingRain] = useState(false);

  // Web Audio rain generator for this quiet sanctuary
  const audioCtxRef = useRef<AudioContext | null>(null);

  const toggleRain = () => {
    if (isPlayingRain) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsPlayingRain(false);
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.0;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        setIsPlayingRain(true);
      } catch (err) {
        console.warn("Could not start rain audio:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section id="quiet-corner" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-ankahe-border/50 relative overflow-hidden bg-gradient-to-b from-ankahe-bg via-ankahe-secondary/30 to-ankahe-bg">
      {/* Background starlight / quiet noise */}
      <div className="absolute inset-0 midnight-noise opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="font-handwriting text-lg sm:text-xl text-ankahe-gold tracking-wide flex items-center justify-center gap-1.5">
            <Moon size={15} className="text-ankahe-gold/80" />
            <span>A place without demands</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ankahe-text font-normal">
            You don't have to say anything.
          </h2>
          <p className="text-sm sm:text-base text-ankahe-muted/90 font-light leading-relaxed">
            You can simply be here for a while. No expectations, no sign-ups, no notifications.
          </p>
        </div>

        {/* Sanctuary Reading Card */}
        <div className="bg-ankahe-elevated/70 backdrop-blur-sm rounded-3xl p-8 sm:p-14 border border-ankahe-border/80 shadow-elevated text-center space-y-8 relative max-w-3xl mx-auto">
          {/* Top Ambience & Breathing bar */}
          <div className="flex items-center justify-between text-xs text-ankahe-muted pb-4 border-b border-ankahe-border/60">
            <button
              onClick={toggleRain}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-colors ${
                isPlayingRain
                  ? 'bg-ankahe-secondary text-ankahe-gold border-ankahe-gold/40'
                  : 'border-ankahe-border text-ankahe-muted hover:text-ankahe-text'
              }`}
              title="Soft rain audio"
            >
              {isPlayingRain ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{isPlayingRain ? 'Rain Ambience Playing' : 'Listen to Soft Rain'}</span>
            </button>

            <span className="text-[11px] font-mono text-ankahe-muted/60 uppercase tracking-widest">
              {SANCTUARY_READINGS[currentIndex].note}
            </span>
          </div>

          {/* Central Comfortable Reading Passage */}
          <div className="min-h-[140px] flex items-center justify-center py-4">
            <blockquote className="font-serif text-lg sm:text-2xl md:text-2xl text-ankahe-text/95 font-normal leading-relaxed sm:leading-loose max-w-2xl mx-auto select-text">
              "{SANCTUARY_READINGS[currentIndex].text}"
            </blockquote>
          </div>

          {/* Attribution & Next Line */}
          <div className="pt-4 border-t border-ankahe-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-ankahe-muted/70 font-serif">
              — {SANCTUARY_READINGS[currentIndex].author}
            </span>

            <div className="flex items-center gap-2">
              {SANCTUARY_READINGS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === i
                      ? 'w-6 bg-ankahe-gold'
                      : 'bg-ankahe-border hover:bg-ankahe-muted'
                  }`}
                  aria-label={`Go to quiet reading ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={onOpenFullQuietCorner}
              className="inline-flex items-center gap-1.5 text-xs text-ankahe-gold hover:text-ankahe-gold-light transition-colors"
            >
              <Wind size={13} />
              <span>Full Screen Breathing Sanctuary</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
