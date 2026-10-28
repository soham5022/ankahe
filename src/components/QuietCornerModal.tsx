import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Moon } from 'lucide-react';

interface QuietCornerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUIET_THOUGHTS = [
  "You do not have to explain why today felt heavy.",
  "Give yourself permission to pause. The world will wait.",
  "Some days, simply existing is your poetry.",
  "In the quiet of midnight, every thought finds its true weight.",
  "You are allowed to miss who you used to be, while still becoming who you are.",
  "खामोशी को भी एक मौका देकर देखो, वो कभी झूठ नहीं बोलती।",
  "श्वास घे... शांत हो... इथे कोणतीही स्पर्धा नाही.",
];

export const QuietCornerModal: React.FC<QuietCornerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [thoughtIndex, setThoughtIndex] = useState(0);

  // Web Audio API ambient sound generator (soft rain / brown noise)
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioNode | null>(null);

  // Cycle thoughts slowly
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setThoughtIndex((prev) => (prev + 1) % QUIET_THOUGHTS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Breathing rhythm: 4s Inhale, 4s Hold, 4s Exhale, 4s Rest
  useEffect(() => {
    if (!isOpen) return;
    const phases: ('Inhale' | 'Hold' | 'Exhale' | 'Rest')[] = ['Inhale', 'Hold', 'Exhale', 'Rest'];
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep = (currentStep + 1) % phases.length;
      setBreathPhase(phases[currentStep]);
    }, 4000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Handle ambient rain audio synthesis using Web Audio API (zero external mp3 needed)
  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Generate gentle brown noise (simulating gentle distant rain)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; // Gain adjustment
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Low-pass filter for soothing rain muffled effect
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNodeRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        sourceNodeRef.current = whiteNoise;
        setIsPlayingAudio(true);
      } catch (e) {
        console.warn("Ambient audio context could not start:", e);
      }
    }
  };

  // Cleanup audio on modal close
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ankahe-bg/95 backdrop-blur-xl p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="The Quiet Corner"
    >
      {/* Background delicate celestial noise */}
      <div className="absolute inset-0 midnight-noise opacity-50 pointer-events-none" />

      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ankahe-muted/70">
          <Moon size={14} className="text-ankahe-gold" />
          <span>The Quiet Corner • एक शांत कोपरा</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleAmbientSound}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-colors border ${
              isPlayingAudio
                ? 'bg-ankahe-elevated text-ankahe-gold border-ankahe-gold/40'
                : 'text-ankahe-muted border-ankahe-border hover:text-ankahe-text'
            }`}
            title="Toggle soothing rain ambience"
            aria-label="Toggle ambient sound"
          >
            {isPlayingAudio ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{isPlayingAudio ? 'Rain Sound: On' : 'Play Rain Ambience'}</span>
          </button>

          <button
            onClick={() => {
              if (audioContextRef.current) {
                audioContextRef.current.close().catch(() => {});
                setIsPlayingAudio(false);
              }
              onClose();
            }}
            className="p-2 text-ankahe-muted hover:text-ankahe-text rounded-full hover:bg-ankahe-elevated transition-colors"
            aria-label="Exit Quiet Corner"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Central Serene Breathing Sanctuary */}
      <div className="relative max-w-xl mx-auto text-center space-y-12 px-4">
        {/* Breathing Circle */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto flex items-center justify-center">
          {/* Animated pulsing outer halo */}
          <div
            className={`absolute inset-0 rounded-full border border-ankahe-gold/30 transition-all duration-1000 ease-in-out ${
              breathPhase === 'Inhale'
                ? 'scale-110 opacity-70 bg-ankahe-gold/5'
                : breathPhase === 'Hold'
                ? 'scale-110 opacity-90 bg-ankahe-rose/5'
                : breathPhase === 'Exhale'
                ? 'scale-90 opacity-40 bg-transparent'
                : 'scale-95 opacity-50 bg-transparent'
            }`}
          />
          <div
            className={`absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-ankahe-border transition-all duration-1000 ease-in-out ${
              breathPhase === 'Inhale'
                ? 'scale-105'
                : breathPhase === 'Exhale'
                ? 'scale-95'
                : 'scale-100'
            }`}
          />

          {/* Central Instruction */}
          <div className="relative z-10 space-y-1">
            <span className="text-xs uppercase tracking-[0.25em] text-ankahe-gold/80 font-medium block">
              {breathPhase === 'Inhale' && 'Breathe In'}
              {breathPhase === 'Hold' && 'Hold Gently'}
              {breathPhase === 'Exhale' && 'Release'}
              {breathPhase === 'Rest' && 'Rest'}
            </span>
            <span className="text-[11px] text-ankahe-muted/60 font-light block">
              {breathPhase === 'Inhale' && 'श्वास आत'}
              {breathPhase === 'Hold' && 'थांबून राहा'}
              {breathPhase === 'Exhale' && 'श्वास सोडा'}
              {breathPhase === 'Rest' && 'विश्रांती'}
            </span>
          </div>
        </div>

        {/* Shifting Quiet Thought */}
        <div className="min-h-[80px] flex items-center justify-center">
          <blockquote className="font-serif italic text-lg sm:text-2xl text-ankahe-text/90 font-light leading-relaxed max-w-lg transition-opacity duration-700">
            "{QUIET_THOUGHTS[thoughtIndex]}"
          </blockquote>
        </div>

        {/* Quiet reassurance text */}
        <p className="text-xs text-ankahe-muted/60 font-light max-w-md mx-auto">
          No likes, no feed, no timer. Stay as long as your heart needs.
        </p>

        <div>
          <button
            onClick={() => {
              if (audioContextRef.current) {
                audioContextRef.current.close().catch(() => {});
                setIsPlayingAudio(false);
              }
              onClose();
            }}
            className="px-6 py-2 rounded-full border border-ankahe-border text-xs text-ankahe-muted hover:text-ankahe-text hover:border-ankahe-gold/40 transition-colors"
          >
            Step back into the world
          </button>
        </div>
      </div>
    </div>
  );
};
