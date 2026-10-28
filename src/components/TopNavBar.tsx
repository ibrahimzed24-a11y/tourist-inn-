import React, { useState } from 'react';
import { useMagneticOrbit } from '../hooks/useMagneticOrbit';
import { oceanSound } from '../utils/oceanAudio';
import { Menu, X, ArrowUpRight, Sparkles, Volume2, VolumeX, Waves } from 'lucide-react';

interface TopNavBarProps {
  onOpenBooking: () => void;
  onReplayTypo?: () => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
}

export default function TopNavBar({
  onOpenBooking,
  onReplayTypo,
  currency,
  onCurrencyChange,
}: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const magneticCtaRef = useMagneticOrbit<HTMLButtonElement>({ radius: 36, maxDisplacementRatio: 0.22 });

  const toggleSound = () => {
    const active = oceanSound.toggle();
    setIsAudioActive(active);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f7f5ef]/90 backdrop-blur-md border-b border-[#051d2d]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#top"
          className="text-2xl font-serif font-bold tracking-tight text-[#051d2d] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          TOURIST INN
        </a>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav
          className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold text-[#051d2d]/75"
          aria-label="Main Navigation"
        >
          <a
            href="#story"
            className="hover:text-[#051d2d] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-teal-700 after:transition-all after:duration-300"
          >
            Sanctuary
          </a>
          <a
            href="#rooms"
            className="hover:text-[#051d2d] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-teal-700 after:transition-all after:duration-300"
          >
            Suites & Rates
          </a>
          <a
            href="#experiences"
            className="hover:text-[#051d2d] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-teal-700 after:transition-all after:duration-300"
          >
            Atoll Experiences
          </a>
          <a
            href="#features"
            className="hover:text-[#051d2d] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-teal-700 after:transition-all after:duration-300"
          >
            Amenities
          </a>
          <a
            href="#reviews"
            className="hover:text-[#051d2d] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-teal-700 after:transition-all after:duration-300"
          >
            Guest Stories
          </a>
          <a
            href="#faq"
            className="hover:text-[#051d2d] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-teal-700 after:transition-all after:duration-300"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio surf toggle */}
          <button
            onClick={toggleSound}
            aria-label={isAudioActive ? 'Mute ocean sound' : 'Play ambient ocean sound'}
            title={isAudioActive ? 'Mute ambient ocean surf' : 'Play ambient ocean surf'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors ${
              isAudioActive
                ? 'bg-teal-50 border-teal-300 text-teal-800'
                : 'bg-white/60 hover:bg-white border-[#051d2d]/15 text-[#051d2d]/70'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                <span className="font-mono text-[11px]">Surf: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#051d2d]/50" />
                <span className="font-mono text-[11px]">Surf: OFF</span>
              </>
            )}
          </button>

          {/* Currency selector */}
          <div className="hidden sm:flex items-center text-xs font-mono font-medium text-[#051d2d]/70 border border-[#051d2d]/15 rounded px-2 py-1 bg-white/60">
            <label htmlFor="top-currency-select" className="sr-only">Currency</label>
            <select
              id="top-currency-select"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="bg-transparent cursor-pointer focus:outline-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>

          {/* Replay Snap Wave */}
          {onReplayTypo && (
            <button
              onClick={onReplayTypo}
              title="Replay Typographic Snap-In sequence"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#051d2d]/70 hover:text-[#051d2d] border border-[#051d2d]/15 rounded bg-white/60 hover:bg-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-mono text-[11px]">Snap Wave</span>
            </button>
          )}

          {/* Primary CTA with Magnetic Orbit */}
          <button
            ref={magneticCtaRef}
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#051d2d] hover:bg-[#0c3653] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap will-change-transform"
          >
            <span>Reserve Stay</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#051d2d] hover:bg-black/5 rounded focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f7f5ef] border-b border-[#051d2d]/15 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-semibold uppercase tracking-wider text-[#051d2d]/80">
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#051d2d]"
            >
              The Sanctuary
            </a>
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#051d2d]"
            >
              Suites & Nightly Rates
            </a>
            <a
              href="#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#051d2d]"
            >
              Atoll Experiences
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#051d2d]"
            >
              Amenities & Kitchenettes
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#051d2d]"
            >
              Guest Stories & Sights
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#051d2d]"
            >
              Traveler FAQ
            </a>
          </nav>
          <div className="pt-4 border-t border-[#051d2d]/10 flex flex-col gap-3">
            <button
              onClick={toggleSound}
              className="w-full py-2.5 text-xs font-mono text-[#051d2d] bg-white border border-[#051d2d]/15 rounded flex items-center justify-center gap-2"
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-teal-600" /> : <VolumeX className="w-4 h-4" />}
              <span>Ocean Surf Waves: {isAudioActive ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-xs font-bold uppercase tracking-widest text-center text-white bg-[#051d2d] rounded-lg"
            >
              Reserve Room Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
