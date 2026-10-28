import React, { useEffect, useState } from 'react';
import TypographicSnapIn from './TypographicSnapIn';
import { oceanSound } from '../utils/oceanAudio';
import { Volume2, VolumeX, Star, ShieldCheck, ArrowRight, Compass, Sun, Waves, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  typoTriggerKey?: number;
  onReplayTypo?: () => void;
}

// The property's own photographs, already used across the site
const SLIDES = [
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/882949273.jpg?k=a5c74065c8e865fa2425870bcc8d0920268762442b07f2b4a4279ca8a8608e6c&o=&hp=1',
    alt: 'Tourist Inn, Malé',
  },
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172634083.jpg?k=5897f12b0962f8928b41b60769db64aa1f46fda321e27da2a43010c87fae651c&o=&hp=1',
    alt: 'Malé and the Sinamalé Bridge',
  },
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/882948455.jpg?k=545f0cf51968728a88644d13f990438b452bf224fd688475e1d04d9008b292e2&o=&hp=1',
    alt: 'Executive Family Suite',
  },
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172989565.jpg?k=6ce86d0338d7418bf68337069309ab9d4b099ae69ef2ac2e399f75122721fa58&o=&hp=1',
    alt: 'In-suite kitchenette',
  },
];

const SLIDE_MS = 6500;

export default function HeroSection({ onOpenBooking, typoTriggerKey }: HeroSectionProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  useEffect(() => {
    return () => {
      if (oceanSound.playing) oceanSound.stop();
    };
  }, []);

  const go = (dir: number) => setActive((i) => (i + dir + SLIDES.length) % SLIDES.length);

  const toggleOceanSound = () => {
    const on = oceanSound.toggle();
    setIsAudioActive(on);
  };

  return (
    <section
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0a2e45] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Tourist Inn photo slider"
    >
      {/* Image slider */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={i === active ? slide.alt : ''}
            aria-hidden={i !== active}
            referrerPolicy="no-referrer"
            loading={i === 0 ? 'eager' : 'lazy'}
            className={
              'hero-slide absolute inset-0 w-full h-full object-cover ' + (i === active ? 'is-active' : '')
            }
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e45]/75 via-[#0a2e45]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e45]/70 via-transparent to-[#0a2e45]/45" />
      </div>

      {/* Text card */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-40 sm:pb-44">
        <div className="max-w-2xl rounded-2xl bg-[#0a2e45]/40 backdrop-blur-md border border-white/15 p-7 sm:p-10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] space-y-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] tracking-[0.18em] uppercase text-white/85">
            <span className="inline-flex items-center gap-1.5 text-[#e9d3a6]">
              <Star className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />
              8.8 / 10 · 678 Reviews
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#9fe6dc]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Malé City Guesthouse
            </span>
            <span className="text-white/75">From $106/Night</span>
          </div>

          <div className="space-y-2">
            <TypographicSnapIn
              as="h1"
              text="TOURIST INN"
              triggerKey={typoTriggerKey}
              delayMultiplier={0.02}
              initialDelay={0.05}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-semibold text-white tracking-[0.04em]"
            />
            <TypographicSnapIn
              as="h2"
              text="AN ISLAND SANCTUARY IN MALÉ"
              triggerKey={typoTriggerKey}
              delayMultiplier={0.016}
              initialDelay={0.25}
              className="text-xl sm:text-3xl font-serif italic font-normal text-[#9fe6dc]"
            />
          </div>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            An intimate collection of boutique guesthouses designed for international travelers,
            transit guests, and long-term island explorers. Situated ten minutes across the Sinamalé Bridge
            from Velana International Airport, featuring autonomous kitchenette suites, 24/7 WhatsApp
            concierge, and genuine Dhivehi hospitality.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button onClick={onOpenBooking} className="btn-cta px-7 py-3.5 text-xs">
              <span>Reserve Your Stay</span>
              <ArrowRight className="w-4 h-4 btn-cta-icon" />
            </button>
            <a href="#rooms" className="btn-ghost px-6 py-3.5 text-xs">
              <Compass className="w-4 h-4" />
              <span>View Accommodations</span>
            </a>
          </div>

          <div className="pt-5 border-t border-white/15 grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-white tabular-nums">$106</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/65">Rates From / Night</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#9fe6dc] tabular-nums">4.0 km</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/65">From Velana Airport</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif text-[#e9d3a6] tabular-nums">100%</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/65">Cleanliness Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Island conditions + slider controls */}
      <div className="absolute z-10 inset-x-0 bottom-24 sm:bottom-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-[11px] tracking-wider text-white/80">
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-[#e9b37a]" />29°C · North Malé Atoll</span>
            <span className="flex items-center gap-1.5"><Waves className="w-3.5 h-3.5 text-[#9fe6dc]" />Lagoon Water: 28°C</span>
            <button
              onClick={toggleOceanSound}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title={isAudioActive ? 'Mute ambient Maldivian ocean surf' : 'Play ambient Maldivian ocean surf waves'}
            >
              {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              Ocean Surf: {isAudioActive ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button onClick={() => go(-1)} aria-label="Previous photo" className="w-9 h-9 rounded-full border border-white/35 flex items-center justify-center hover:bg-white/15 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setActive(i)}
                  aria-label={'Show photo ' + (i + 1)}
                  className={'h-[3px] rounded-full transition-all duration-500 ' + (i === active ? 'w-8 bg-white' : 'w-4 bg-white/45 hover:bg-white/70')}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next photo" className="w-9 h-9 rounded-full border border-white/35 flex items-center justify-center hover:bg-white/15 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
