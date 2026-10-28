import React from 'react';
import TypographicSnapIn from './TypographicSnapIn';
import ScrollRevealSection from './ScrollRevealSection';
import { MapPin, Utensils, MessageSquare, ArrowUpRight } from 'lucide-react';

interface FeatureCardItemProps {
  index: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  imageUrl: string;
}

function FeatureCard({
  index,
  title,
  tagline,
  description,
  highlights,
  icon,
  imageUrl,
}: FeatureCardItemProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col justify-between bg-white rounded-2xl overflow-hidden shadow-[0_18px_40px_-28px_rgba(10,46,69,0.35)] hover:shadow-[0_28px_50px_-26px_rgba(10,46,69,0.45)] transition-shadow duration-500"
     
    >
      {/* Visual Asset Window */}
      <div className="relative h-64 w-full overflow-hidden bg-[#0a2e45]/5">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="zoom-img w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e45]/75 via-[#0a2e45]/20 to-transparent" />
        
        {/* Editorial Index Stamp */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-white bg-[#0a2e45]/80 backdrop-blur rounded">
            {index}
          </span>
        </div>

        {/* Icon Affordance */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
              {icon}
            </div>
            <span className="text-xs font-semibold tracking-wide uppercase text-white/90">
              {tagline}
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-serif font-bold text-[#0a2e45] group-hover:text-[#1fb5ac] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[#0a2e45]/70 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Bullet utility items */}
        <div className="pt-3 border-t border-[#0a2e45]/10 space-y-2">
          {highlights.map((item, i) => (
            <div key={i} className="text-xs text-[#0a2e45]/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1fb5ac]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FeaturesGridProps {
  typoTriggerKey?: number;
}

export default function FeaturesGrid({ typoTriggerKey }: FeaturesGridProps) {
  const features: FeatureCardItemProps[] = [
    {
      index: '01 / LOCATION',
      title: 'Capital Proximity & Transit',
      tagline: 'Sinamalé Bridge Link',
      description:
        'Just 10 minutes across the bridge from Velana International Airport (MLE). Walking distance to Rasfannu Beach, National Museum, and central commercial hubs.',
      highlights: [
        'Airport taxi directly via bridge (no boat required)',
        '400m to Maafannu ferry pier & bus terminals',
        'Inexpensive transfers ($4–$8 fixed rate)',
      ],
      icon: <MapPin className="w-4 h-4 text-white" />,
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172634083.jpg?k=5897f12b0962f8928b41b60769db64aa1f46fda321e27da2a43010c87fae651c&o=&hp=1',
    },
    {
      index: '02 / COMFORT',
      title: 'Self-Sustaining Kitchenettes',
      tagline: 'Autonomous Living',
      description:
        'Every suite is thoughtfully equipped with a private kitchenette, microwave, refrigerator, dining nook, and espresso kettle for independent convenience.',
      highlights: [
        'Private kitchenette, microwave & refrigerator',
        'Whisper-quiet air conditioning & smart TV',
        'Daily housekeeping and linen services',
      ],
      icon: <Utensils className="w-4 h-4 text-white" />,
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172989565.jpg?k=6ce86d0338d7418bf68337069309ab9d4b099ae69ef2ac2e399f75122721fa58&o=&hp=1',
    },
    {
      index: '03 / SERVICE',
      title: '24/7 Island Concierge',
      tagline: 'Always Connected',
      description:
        'Seamless round-the-clock assistance via dedicated WhatsApp concierge. From immediate taxi booking and baggage care to curated Maldivian day trips.',
      highlights: [
        '24/7 WhatsApp concierge response desk',
        'Fresh continental, Asian & à la carte breakfast',
        'Airport pickup and drop-off coordination',
      ],
      icon: <MessageSquare className="w-4 h-4 text-white" />,
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172989561.jpg?k=063212a978bcec701cdb727b7f63207aad9c7c03f895fd04d849ff4466f53f14&o=&hp=1',
    },
  ];

  return (
    <ScrollRevealSection id="features" className="py-24 bg-[#fbf8f3] border-b border-[#0a2e45]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading with Typographic Snap-In */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0a2e45]/10">
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#1fb5ac] block font-semibold">
              CURATED ADVANTAGES
            </span>
            <TypographicSnapIn
              as="h2"
              text="ARCHITECTURAL BALANCE & UTILITY"
              triggerKey={typoTriggerKey}
              delayMultiplier={0.015}
              className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0a2e45]"
            />
          </div>
          <p className="text-sm text-[#0a2e45]/70 max-w-md font-normal leading-relaxed">
            Every feature is calibrated to provide effortless peace of mind during your Malé transit or extended city retreat.
          </p>
        </div>

        {/* 3-Column 3D Perspective Card Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
