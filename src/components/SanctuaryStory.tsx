import React from 'react';
import TypographicSnapIn from './TypographicSnapIn';
import ScrollRevealSection from './ScrollRevealSection';
import { Compass, Waves, Sun, Coffee, CheckCircle } from 'lucide-react';

interface SanctuaryStoryProps {
  typoTriggerKey?: number;
}

export default function SanctuaryStory({ typoTriggerKey }: SanctuaryStoryProps) {
  return (
    <ScrollRevealSection id="story" className="py-24 bg-[#f7f5ef] border-b border-[#051d2d]/10 relative overflow-hidden">
      {/* Decorative Maldivian Atoll Watermark Texture */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-teal-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header with Scroll Reveal Typographic Snap-In */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-teal-800 font-bold flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            THE SANCTUARY PHILOSOPHY
          </span>
          <TypographicSnapIn
            as="h2"
            text="BETWEEN THE REEF & THE CAPITAL"
            triggerKey={typoTriggerKey}
            delayMultiplier={0.018}
            className="text-3xl sm:text-5xl font-serif font-bold text-[#051d2d]"
          />
          <p className="text-base sm:text-lg text-[#051d2d]/70 leading-relaxed font-normal pt-2">
            Most visits to the Maldives rush travelers immediately past the capital. TOURIST INN was
            founded on a different premise: that Malé City possesses its own vibrant culture, storied mosques,
            and bustling harbor life—deserving of an architectural, calm, and private residence.
          </p>
        </div>

        {/* Multi-Layered Editorial Layout with Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Layered Image Composition (6 Cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-[#051d2d]/15 aspect-[4/3]">
              <img
                src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/172634083.jpg?k=5897f12b0962f8928b41b60769db64aa1f46fda321e27da2a43010c87fae651c&o=&hp=1"
                alt="Tourist Inn Malé Island Suite"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051d2d]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono flex items-center justify-between">
                <span>Ma. leaves · Maaveyo Magu</span>
                <span className="bg-black/40 backdrop-blur px-2.5 py-1 rounded">Collection of 3 Houses</span>
              </div>
            </div>

            {/* Overlapping Floating Inset Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 z-20 w-64 bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-2xl border border-teal-900/15 text-[#051d2d] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-800">
                <Waves className="w-4 h-4 text-teal-600" />
                <span>ISLAND HOSPITALITY</span>
              </div>
              <p className="text-xs text-[#051d2d]/75 leading-relaxed font-normal">
                Authentic Dhivehi warmth with modern digital conveniences, private kitchenettes, and 24/7 care.
              </p>
            </div>
          </div>

          {/* Right Narrative & Pillars (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6 text-sm text-[#051d2d]/80 leading-relaxed font-normal">
              <p>
                Whether arriving late on an international flight before your seaplane to the outer atolls,
                conducting business in the capital's government ministries, or taking a relaxed city break,
                TOURIST INN provides complete autonomy with hotel-grade refinement.
              </p>
              <p>
                Each room is a self-contained island suite: equipped with whisper-quiet air conditioning,
                unthrottled fiber optic Wi-Fi for remote work, and a private kitchenette stocked with an
                electric kettle, refrigerator, and microwave.
              </p>
            </div>

            {/* Three Pillars Array */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#051d2d]/10">
              <div className="p-4 bg-white rounded-xl border border-[#051d2d]/8 shadow-sm space-y-1">
                <Sun className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold text-[#051d2d] uppercase tracking-wider">
                  Sunny Atoll Days
                </h3>
                <p className="text-[11px] text-[#051d2d]/60">
                  Rasfannu Beach is an easy 800m walk for sunset swims.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#051d2d]/8 shadow-sm space-y-1">
                <Coffee className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold text-[#051d2d] uppercase tracking-wider">
                  Island Breakfast
                </h3>
                <p className="text-[11px] text-[#051d2d]/60">
                  Continental, Asian, or à la carte breakfasts prepared daily.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#051d2d]/8 shadow-sm space-y-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-[#051d2d] uppercase tracking-wider">
                  No Speedboat
                </h3>
                <p className="text-[11px] text-[#051d2d]/60">
                  Fixed taxi connection directly via Sinamalé road bridge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
