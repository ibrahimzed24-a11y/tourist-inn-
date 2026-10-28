import React from 'react';
import TypographicSnapIn from './TypographicSnapIn';
import ScrollRevealSection from './ScrollRevealSection';
import { Star, ShieldCheck, MapPin, Bus, Car, Coffee, Compass } from 'lucide-react';

interface ReviewsAndLocationProps {
  typoTriggerKey?: number;
}

export default function ReviewsAndLocation({ typoTriggerKey }: ReviewsAndLocationProps) {
  const scoreBreakdowns = [
    { label: 'Staff & Service Friendliness', pct: '93%', score: '9.3 / 10' },
    { label: 'Room Cleanliness & Linens', pct: '100%', score: '10 / 10' },
    { label: 'Property & Air-Conditioning', pct: '92%', score: '9.2 / 10' },
    { label: 'Airport & Bridge Connectivity', pct: '92%', score: '9.2 / 10' },
    { label: 'Kitchen & Dining Amenities', pct: '78%', score: '7.8 / 10' },
  ];

  const nearbySights = [
    { name: 'Maaveyo Maixan', kind: 'Public Garden', dist: '240 m' },
    { name: 'Fini Park', kind: 'Urban Green Park', dist: '300 m' },
    { name: 'Maafannu Sahara Bus Stop', kind: 'Ferry Pier & Bus', dist: '400 m' },
    { name: 'Bihuroazu Kamanaa Mosque', kind: 'Historic Landmark', dist: '420 m' },
    { name: 'National Museum of Maldives', kind: 'Cultural Museum', dist: '480 m' },
    { name: 'Greater Malé Bus Terminal', kind: 'Airport Bus Depot', dist: '620 m' },
  ];

  return (
    <ScrollRevealSection id="reviews" className="py-24 bg-[#fbf8f3] border-b border-[#0a2e45]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Heading */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs uppercase font-mono tracking-widest text-[#1fb5ac] block font-semibold">
            GUEST SATISFACTION & MALÉ GEOGRAPHY
          </span>
          <TypographicSnapIn
            as="h2"
            text="VERIFIED REPUTATION & SURROUNDINGS"
            triggerKey={typoTriggerKey}
            delayMultiplier={0.014}
            className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0a2e45]"
          />
        </div>

        {/* Split Grid: Left = Verified Scorecard, Right = Getting There & Nearby */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Quantitative Rigor (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#0a2e45]/12 p-8 shadow-sm space-y-8">
            <div className="flex items-baseline justify-between border-b border-[#0a2e45]/10 pb-6">
              <div>
                <div className="text-5xl font-serif font-bold text-[#0a2e45] tabular-nums flex items-baseline gap-2">
                  <span>8.8</span>
                  <span className="text-xl text-[#0a2e45]/50 font-sans font-normal">/ 10</span>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mt-1">
                  ★ Rated Excellent Across 678 Reviews
                </div>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold rounded">
                  100% Cleanliness
                </span>
              </div>
            </div>

            {/* Score bars */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-wider font-bold text-[#0a2e45]/70">
                Performance Metrics by Theme
              </h3>
              {scoreBreakdowns.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[#0a2e45] font-medium">
                    <span>{item.label}</span>
                    <span className="font-mono tabular-nums text-[#0a2e45]/70">{item.pct}</span>
                  </div>
                  <div className="w-full h-2 bg-[#0a2e45]/8 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0a2e45] rounded-full transition-all duration-700"
                      style={{ width: item.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Verified Quotes */}
            <div className="pt-4 border-t border-[#0a2e45]/10 space-y-4">
              <div className="p-4 bg-[#f5efe4] rounded-xl border border-[#0a2e45]/8 text-xs leading-relaxed text-[#0a2e45]/80 italic">
                “Incredible convenience for our Malé transit. The WhatsApp concierge had a taxi waiting at the airport, and the kitchenette allowed us to prepare breakfast easily before catching our morning seaplane.”
                <span className="block not-italic font-semibold text-[#0a2e45] mt-2">
                  — Elena & Marco S. · Verified Booking Partner Review
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Getting There & Sights (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Airport Transfer Transit Card */}
            <div className="bg-[#0a2e45] text-white rounded-2xl p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Car className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    AIRPORT TRANSIT (MLE)
                  </span>
                </div>
                <span className="text-xs font-mono text-white/60">3.0 km distance</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold">Sinamalé Bridge Highway</h3>
                <p className="text-sm text-white/80 leading-relaxed font-normal">
                  No speedboats or sea transfers required. Velana International Airport is directly connected to Malé Island via the road bridge. Fixed taxi fares typically run MVR 60–100 ($4–$8 USD) and take just 10–20 minutes.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-white/60 block">Travel Duration</span>
                  <span className="text-white font-bold text-base">10–15 Minutes</span>
                </div>
                <div>
                  <span className="text-white/60 block">Fixed Taxi Rate</span>
                  <span className="text-white font-bold text-base">$4 – $8 USD</span>
                </div>
              </div>
            </div>

            {/* Nearby Sights */}
            <div id="location" className="bg-white rounded-2xl border border-[#0a2e45]/12 p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#1fb5ac]" />
                  <h3 className="text-base font-serif font-bold text-[#0a2e45]">
                    Points of Interest Nearby
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#0a2e45]/50">Walking Distance</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {nearbySights.map((sight, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#f5efe4] rounded-lg border border-[#0a2e45]/8 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[#0a2e45]">{sight.name}</div>
                      <div className="text-[11px] text-[#0a2e45]/60">{sight.kind}</div>
                    </div>
                    <span className="font-mono font-bold text-[#0a2e45]">{sight.dist}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
