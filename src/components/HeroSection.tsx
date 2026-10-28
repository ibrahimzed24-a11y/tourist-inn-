import React, { useState, useRef, useEffect } from 'react';
import MagnetLines from '@/sd-components/679ce99e-18b4-4c5f-a421-c1a3fd1bac4c';
import TypographicSnapIn from './TypographicSnapIn';
import { useMagneticOrbit } from '../hooks/useMagneticOrbit';
import { oceanSound } from '../utils/oceanAudio';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Star,
  MapPin,
  Waves,
  Sun,
  ShieldCheck,
  ArrowRight,
  Compass,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  typoTriggerKey?: number;
  onReplayTypo?: () => void;
}

export default function HeroSection({
  onOpenBooking,
  typoTriggerKey,
  onReplayTypo,
}: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);
  const [magnetColor, setMagnetColor] = useState<string>('tomato');
  const videoRef = useRef<HTMLVideoElement>(null);

  const primaryCtaRef = useMagneticOrbit<HTMLButtonElement>({ radius: 36, maxDisplacementRatio: 0.22 });
  const secondaryCtaRef = useMagneticOrbit<HTMLAnchorElement>({ radius: 32, maxDisplacementRatio: 0.18 });

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleOceanSound = () => {
    const active = oceanSound.toggle();
    setIsAudioActive(active);
  };

  useEffect(() => {
    return () => {
      if (oceanSound.playing) {
        oceanSound.stop();
      }
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#051d2d] text-white">
      {/* 1. Cinematic Live Video Loop Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://cf.bstatic.com/xdata/images/hotel/max1280x900/882949273.jpg?k=a5c74065c8e865fa2425870bcc8d0920268762442b07f2b4a4279ca8a8608e6c&o=&hp=1"
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
        >
          {/* Multiple reliable public tropical ocean / Maldivian water video loops */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-reaching-the-beach-40170-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-turquoise-water-4856-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Deep Tropical Ocean Gradient Scrims for pristine depth and WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#051d2d]/95 via-[#051d2d]/80 to-[#051d2d]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051d2d] via-transparent to-[#051d2d]/70" />

        {/* Subdued caustic sunlight reflection overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-300/30 via-cyan-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Top Island Condition Bar (Editorial Maldivian Live Data) */}
      <div className="relative z-10 border-b border-white/10 bg-black/25 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono tracking-wider text-white/80 gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-teal-300 font-semibold">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              29°C · North Malé Atoll
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <Waves className="w-3.5 h-3.5 text-cyan-300" />
              Lagoon Water: 28°C
            </span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span className="hidden md:inline text-white/70">
              Airport Road: Sinamalé Bridge Open (10 Min Transit)
            </span>
          </div>

          {/* Interactive Live Video Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleOceanSound}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-all border ${
                isAudioActive
                  ? 'bg-teal-500/20 text-teal-300 border-teal-400/40'
                  : 'bg-white/10 text-white/70 hover:text-white border-white/15'
              }`}
              title={isAudioActive ? 'Mute ambient Maldivian ocean surf' : 'Play ambient Maldivian ocean surf waves'}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
                  <span>Ocean Surf: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Ocean Surf: OFF</span>
                </>
              )}
            </button>

            <button
              onClick={toggleVideoPlayback}
              className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              aria-label={isPlaying ? 'Pause live video loop' : 'Play live video loop'}
              title={isPlaying ? 'Pause video loop' : 'Play video loop'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Hero Split Grid: Editorial Storytelling + MagnetLines Kinetic Pavilion */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-7">
            {/* Trust Kicker Badges */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs tracking-wider uppercase font-semibold text-white/80">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded font-medium backdrop-blur">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>★ 8.8 / 10 · 678 Reviews</span>
              </span>
              <span className="text-white/40">·</span>
              <span className="text-teal-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Malé City Guesthouse
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">From $106/Night</span>
            </div>

            {/* Pattern A: Typographic Snap-In Headline with Scroll Reveal */}
            <div className="space-y-1">
              <div className="block">
                <TypographicSnapIn
                  as="h1"
                  text="TOURIST INN"
                  triggerKey={typoTriggerKey}
                  delayMultiplier={0.02}
                  initialDelay={0.05}
                  className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight"
                />
              </div>
              <div className="block">
                <TypographicSnapIn
                  as="h2"
                  text="AN ISLAND SANCTUARY IN MALÉ"
                  triggerKey={typoTriggerKey}
                  delayMultiplier={0.016}
                  initialDelay={0.25}
                  className="text-2xl sm:text-4xl lg:text-5xl font-serif italic font-normal text-teal-200"
                />
              </div>
            </div>

            {/* Editorial Lead Paragraph */}
            <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed font-normal">
              An intimate collection of boutique guesthouses designed for international travelers,
              transit guests, and long-term island explorers. Situated ten minutes across the Sinamalé Bridge
              from Velana International Airport, featuring autonomous kitchenette suites, 24/7 WhatsApp
              concierge, and genuine Dhivehi hospitality.
            </p>

            {/* Action Group with Magnetic Orbits */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                ref={primaryCtaRef}
                onClick={onOpenBooking}
                className="group px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#051d2d] bg-white hover:bg-teal-50 rounded-lg shadow-xl transition-all inline-flex items-center gap-3 will-change-transform"
              >
                <span>Reserve Your Stay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                ref={secondaryCtaRef}
                href="#rooms"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur rounded-lg transition-all inline-flex items-center gap-2 will-change-transform"
              >
                <Compass className="w-4 h-4 text-teal-300" />
                <span>View Accommodations</span>
              </a>

              {onReplayTypo && (
                <button
                  onClick={onReplayTypo}
                  className="p-3 text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors inline-flex items-center gap-1.5"
                  title="Replay the typographic snap-in wave"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-[11px] hidden sm:inline">Replay Wave</span>
                </button>
              )}
            </div>

            {/* Bottom Atmospheric Depth Metrics */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6 text-left max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">$106</div>
                <div className="text-[11px] uppercase tracking-wider text-white/60 font-mono">Rates From / Night</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-teal-300 tabular-nums">4.0 km</div>
                <div className="text-[11px] uppercase tracking-wider text-white/60 font-mono">From Velana Airport</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 tabular-nums">100%</div>
                <div className="text-[11px] uppercase tracking-wider text-white/60 font-mono">Cleanliness Rating</div>
              </div>
            </div>
          </div>

          {/* Right Hero: Mandated MagnetLines Component inside Glass Pavilion (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[460px] aspect-square rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl flex flex-col items-center justify-between overflow-hidden group">
              {/* Glass Header */}
              <div className="w-full flex items-center justify-between text-[11px] uppercase tracking-widest font-mono text-white/80 pb-3 border-b border-white/15 z-10">
                <span className="flex items-center gap-1.5 font-bold text-white tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[tomato] animate-ping" />
                  Tourist Inn
                </span>
                <span className="text-teal-300">9 × 9 Responsive</span>
              </div>

              {/* Mandated MagnetLines Component Integration */}
              <div className="my-auto py-2 flex items-center justify-center w-full">
                <MagnetLines
                  rows={9}
                  columns={9}
                  containerSize="min(44vmin, 330px)"
                  lineColor={magnetColor}
                  lineWidth="0.8vmin"
                  lineHeight="5vmin"
                  baseAngle={0}
                  className="rounded-xl transition-all"
                />
              </div>

              {/* Interactive Color Switcher for MagnetLines */}
              <div className="w-full pt-3 border-t border-white/15 flex items-center justify-between text-xs font-mono text-white/70 z-10">
                <span>Touch or hover to deflect lines</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMagnetColor('tomato')}
                    aria-label="Coral Tomato"
                    className={`w-3.5 h-3.5 rounded-full bg-[tomato] border ${
                      magnetColor === 'tomato' ? 'ring-2 ring-white scale-110' : 'opacity-60'
                    } transition-all`}
                  />
                  <button
                    onClick={() => setMagnetColor('#14b8a6')}
                    aria-label="Maldivian Turquoise"
                    className={`w-3.5 h-3.5 rounded-full bg-[#14b8a6] border ${
                      magnetColor === '#14b8a6' ? 'ring-2 ring-white scale-110' : 'opacity-60'
                    } transition-all`}
                  />
                  <button
                    onClick={() => setMagnetColor('#ffffff')}
                    aria-label="Pure White"
                    className={`w-3.5 h-3.5 rounded-full bg-white border ${
                      magnetColor === '#ffffff' ? 'ring-2 ring-amber-400 scale-110' : 'opacity-60'
                    } transition-all`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle transition wave bar into main body */}
      <div className="relative z-10 w-full h-8 bg-gradient-to-t from-[#f7f5ef] to-transparent pointer-events-none" />
    </section>
  );
}
