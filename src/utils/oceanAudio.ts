/**
 * Web Audio API synthesizer for ambient Maldivian ocean surf waves.
 * Zero external audio files required, zero CORS errors, works offline.
 */
class OceanSoundManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private lfo: OscillatorNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public get playing(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Generate 5 seconds of pink noise buffer
      const bufferSize = this.ctx.sampleRate * 5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
        b6 = white * 0.115926;
      }

      // Loop source
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Low pass filter for soft water timbre
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 420;
      filter.Q.value = 1.8;

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.5);

      // Low frequency oscillator (LFO) to swell like waves crashing every 6 seconds
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.value = 0.16; // ~6.25 second swell period
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 280;

      this.lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Connect pipeline
      this.noiseNode.connect(filter);
      filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.lfo.start();
      this.noiseNode.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext initialization deferred:', e);
    }
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
        setTimeout(() => {
          this.noiseNode?.stop();
          this.lfo?.stop();
          this.ctx?.close();
          this.ctx = null;
        }, 900);
      } catch {}
    }
    this.isPlaying = false;
  }
}

export const oceanSound = new OceanSoundManager();
