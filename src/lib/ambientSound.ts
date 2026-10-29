/**
 * AmbientSoundManager
 * Procedural ambient sound generator (soft rain & room tone) using Web Audio API.
 * - Zero external assets or network requests
 * - Strictly muted by default
 * - Started only on explicit user interaction
 * - Smooth exponential fades to prevent audio pops
 */

class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      await this.stop();
      return false;
    } else {
      return await this.start();
    }
  }

  public async start(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      // 5-second seamless stereo buffer
      const sampleRate = this.ctx.sampleRate;
      const bufferSize = sampleRate * 5;
      const noiseBuffer = this.ctx.createBuffer(2, bufferSize, sampleRate);
      const left = noiseBuffer.getChannelData(0);
      const right = noiseBuffer.getChannelData(1);

      // Pink/brown noise generation for warm rain texture
      let b0 = 0, b1 = 0, b2 = 0;
      let b0R = 0, b1R = 0, b2R = 0;
      for (let i = 0; i < bufferSize; i++) {
        const whiteL = Math.random() * 2 - 1;
        const whiteR = Math.random() * 2 - 1;

        b0 = 0.99 * b0 + whiteL * 0.05;
        b1 = 0.95 * b1 + whiteL * 0.1;
        b2 = 0.85 * b2 + whiteL * 0.15;
        left[i] = (b0 + b1 + b2) * 0.4;

        b0R = 0.99 * b0R + whiteR * 0.05;
        b1R = 0.95 * b1R + whiteR * 0.1;
        b2R = 0.85 * b2R + whiteR * 0.15;
        right[i] = (b0R + b1R + b2R) * 0.4;
      }

      // Lowpass filter for soft rain sound on glass
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      // Master gain node with smooth fade-in
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      // Gentle target volume (subtle background whisper)
      this.masterGain.gain.exponentialRampToValueAtTime(0.045, this.ctx.currentTime + 1.6);

      this.sourceNode = this.ctx.createBufferSource();
      this.sourceNode.buffer = noiseBuffer;
      this.sourceNode.loop = true;

      this.sourceNode.connect(filter);
      filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.sourceNode.start();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch {
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public async stop(): Promise<void> {
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      this.notify();
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      setTimeout(() => {
        if (this.sourceNode) {
          try {
            this.sourceNode.stop();
            this.sourceNode.disconnect();
          } catch {
            // ignore if already stopped
          }
          this.sourceNode = null;
        }
        this.isPlaying = false;
        this.notify();
      }, 850);
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }
}

export const ambientSound = new AmbientSoundManager();

