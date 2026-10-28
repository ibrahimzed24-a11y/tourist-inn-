import React, { useEffect, useState } from 'react';
import { oceanSound } from '../utils/oceanAudio';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

interface TopNavBarProps {
  onOpenBooking: () => void;
  onReplayTypo?: () => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
}

const NAV_LINKS = [
  { href: '#experiences', label: 'Experience' },
  { href: '#rooms', label: 'Accommodation' },
  { href: '#features', label: 'Dining' },
  { href: '#story', label: 'Wellness' },
];

export default function TopNavBar({ onOpenBooking, currency, onCurrencyChange }: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSound = () => {
    const active = oceanSound.toggle();
    setIsAudioActive(active);
  };

  const solid = scrolled || mobileMenuOpen;
  const tone = solid ? 'text-[#0a2e45]' : 'text-white';

  return (
    <header
      className={
        'fixed top-0 inset-x-0 z-40 w-full transition-all duration-500 ease-luxury ' +
        (solid
          ? 'bg-[#fbf8f3]/95 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(10,46,69,0.25)]'
          : 'bg-transparent')
      }
    >
      <div
        className={
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 transition-all duration-500 ' +
          (solid ? 'h-16' : 'h-20')
        }
      >
        <a
          href="#top"
          className={'font-serif text-xl sm:text-2xl font-semibold tracking-[0.18em] whitespace-nowrap shrink-0 transition-colors ' + tone}
        >
          TOURIST INN
        </a>

        <nav className="hidden lg:flex items-center gap-9" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={'nav-link text-[12px] uppercase tracking-[0.22em] font-medium transition-colors ' + tone}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleSound}
            aria-label={isAudioActive ? 'Mute ocean sound' : 'Play ambient ocean sound'}
            title={isAudioActive ? 'Mute ambient ocean surf' : 'Play ambient ocean surf'}
            className={
              'hidden sm:flex items-center justify-center w-9 h-9 rounded-full border transition-colors ' +
              (solid ? 'border-[#0a2e45]/15 text-[#0a2e45]/70 hover:text-[#0a2e45]' : 'border-white/30 text-white/80 hover:text-white')
            }
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <div
            className={
              'hidden sm:flex items-center text-xs font-medium rounded-full border px-3 py-1.5 ' +
              (solid ? 'border-[#0a2e45]/15 text-[#0a2e45]/80' : 'border-white/30 text-white/85')
            }
          >
            <label htmlFor="top-currency-select" className="sr-only">Currency</label>
            <select
              id="top-currency-select"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="bg-transparent cursor-pointer focus:outline-none [&>option]:text-[#0a2e45]"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>

          <button onClick={onOpenBooking} className="btn-cta hidden sm:inline-flex px-5 py-2.5 text-[11px]">
            <span>Book Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 btn-cta-icon" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={'lg:hidden p-2 rounded-full focus:outline-none ' + tone}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf8f3] border-t border-[#0a2e45]/10 px-6 py-6 space-y-5 shadow-lg">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 font-serif text-2xl text-[#0a2e45] border-b border-[#0a2e45]/8"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className="flex-1 py-2.5 text-xs text-[#0a2e45] bg-white border border-[#0a2e45]/15 rounded-full flex items-center justify-center gap-2"
            >
              {isAudioActive ? <Volume2 className="w-4 h-4 text-[#1fb5ac]" /> : <VolumeX className="w-4 h-4" />}
              <span>Ocean Surf: {isAudioActive ? 'ON' : 'OFF'}</span>
            </button>
            <select
              aria-label="Currency"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="flex-1 py-2.5 px-3 text-xs text-[#0a2e45] bg-white border border-[#0a2e45]/15 rounded-full"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn-cta w-full py-3.5 text-xs"
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 btn-cta-icon" />
          </button>
        </div>
      )}
    </header>
  );
}
