import React from 'react';
import TypographicSnapIn from './TypographicSnapIn';
import ScrollRevealSection from './ScrollRevealSection';
import { useCardTilt } from '../hooks/useCardTilt';
import { Compass, Ship, Fish, Waves, Car, ArrowUpRight } from 'lucide-react';

interface ExperienceItemProps {
  category: string;
  title: string;
  description: string;
  timing: string;
  imageUrl: string;
  icon: React.ReactNode;
}

function ExperienceCard({
  category,
  title,
  description,
  timing,
  imageUrl,
  icon,
}: ExperienceItemProps) {
  const tiltRef = useCardTilt<HTMLDivElement>({ maxTiltDeg: 10, scale: 1.03 });

  return (
    <div
      ref={tiltRef}
      className="group bg-white rounded-2xl border border-[#051d2d]/12 overflow-hidden shadow-sm hover:shadow-xl will-change-transform transform-gpu transition-shadow duration-300 flex flex-col justify-between"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051d2d]/80 via-[#051d2d]/25 to-transparent" />
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-white bg-[#051d2d]/80 backdrop-blur rounded">
            {category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
              {icon}
            </div>
            <span className="text-xs font-mono">{timing}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-serif font-bold text-[#051d2d] group-hover:text-teal-700 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[#051d2d]/70 leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface IslandExperiencesProps {
  typoTriggerKey?: number;
}

export default function IslandExperiences({ typoTriggerKey }: IslandExperiencesProps) {
  const experiences: ExperienceItemProps[] = [
    {
      category: 'ATOLL TRANSIT',
      title: 'Seamless Sinamalé Bridge Highway',
      description:
        'Leave behind volatile boat schedules. Jump in an air-conditioned taxi directly from Velana Airport arrivals across the 1.4km Sinamalé marine bridge for just $4–$8.',
      timing: '10–15 Minutes Transit',
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172634083.jpg?k=5897f12b0962f8928b41b60769db64aa1f46fda321e27da2a43010c87fae651c&o=&hp=1',
      icon: <Car className="w-4 h-4 text-white" />,
    },
    {
      category: 'ISLAND LIFE',
      title: 'Rasfannu Coral Beach & Promenade',
      description:
        'Less than 1km from Tourist Inn, Rasfannu is an artificial white-sand beach with dedicated swimming pavilions, coconut palms, and sunset sea views.',
      timing: '12 Min Leisurely Walk',
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/882949273.jpg?k=a5c74065c8e865fa2425870bcc8d0920268762442b07f2b4a4279ca8a8608e6c&o=&hp=1',
      icon: <Waves className="w-4 h-4 text-white" />,
    },
    {
      category: 'CULINARY FREEDOM',
      title: 'Fresh Catch & In-Suite Kitchenette',
      description:
        'Visit the famous Malé Fish Market in the morning for fresh yellowfin tuna, then prepare your own healthy island meals using your private in-room kitchenette.',
      timing: 'Self-Paced Island Living',
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172989565.jpg?k=6ce86d0338d7418bf68337069309ab9d4b099ae69ef2ac2e399f75122721fa58&o=&hp=1',
      icon: <Fish className="w-4 h-4 text-white" />,
    },
  ];

  return (
    <ScrollRevealSection id="experiences" className="py-24 bg-gradient-to-b from-[#f7f5ef] to-[#f0ece1] border-b border-[#051d2d]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading with Scroll Reveal Typographic Snap-In */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#051d2d]/10">
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-800 block font-bold">
              MALÉ ON & OFF THE WATER
            </span>
            <TypographicSnapIn
              as="h2"
              text="AUTHENTIC ATOLL EXPERIENCES"
              triggerKey={typoTriggerKey}
              delayMultiplier={0.015}
              className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#051d2d]"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#051d2d]/70 max-w-md font-normal leading-relaxed">
            Curate your stay with airport bridge convenience, historic mosque tours, and local seafood markets.
          </p>
        </div>

        {/* 3D Perspective Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} {...exp} />
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
