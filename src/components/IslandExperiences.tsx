import React from 'react';
import TypographicSnapIn from './TypographicSnapIn';
import ScrollRevealSection from './ScrollRevealSection';
import { Fish, Waves, Car } from 'lucide-react';

interface ExperienceItemProps {
  category: string;
  title: string;
  description: string;
  timing: string;
  imageUrl: string;
  icon: React.ReactNode;
  className?: string;
  large?: boolean;
}

function ExperienceCard({ category, title, description, timing, imageUrl, icon, className = '', large = false }: ExperienceItemProps) {
  return (
    <article
      className={
        'group relative overflow-hidden rounded-2xl bg-[#0a2e45] shadow-[0_18px_40px_-28px_rgba(10,46,69,0.5)] min-h-[360px] ' + className
      }
    >
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="zoom-img absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e45]/90 via-[#0a2e45]/35 to-transparent" />
      <span className="absolute top-5 left-5 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white bg-white/15 backdrop-blur-md rounded-full">
        {category}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white space-y-3">
        <div className="flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#9fe6dc]">
          {icon}
          <span>{timing}</span>
        </div>
        <h3 className={'font-serif font-semibold leading-tight ' + (large ? 'text-3xl sm:text-4xl' : 'text-2xl')}>{title}</h3>
        <p className={'text-sm text-white/80 leading-relaxed ' + (large ? 'max-w-lg' : '')}>{description}</p>
      </div>
    </article>
  );
}

interface IslandExperiencesProps {
  typoTriggerKey?: number;
}

export default function IslandExperiences({ typoTriggerKey }: IslandExperiencesProps) {
  const experiences: ExperienceItemProps[] = [
    {
      category: 'ISLAND LIFE',
      title: 'Rasfannu Coral Beach & Promenade',
      description:
        'Less than 1km from Tourist Inn, Rasfannu is an artificial white-sand beach with dedicated swimming pavilions, coconut palms, and sunset sea views.',
      timing: '12 Min Leisurely Walk',
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/882949273.jpg?k=a5c74065c8e865fa2425870bcc8d0920268762442b07f2b4a4279ca8a8608e6c&o=&hp=1',
      icon: <Waves className="w-4 h-4" />,
      className: 'md:col-span-2 md:row-span-2',
      large: true,
    },
    {
      category: 'ATOLL TRANSIT',
      title: 'Seamless Sinamalé Bridge Highway',
      description:
        'Leave behind volatile boat schedules. Jump in an air-conditioned taxi directly from Velana Airport arrivals across the 1.4km Sinamalé marine bridge for just $4–$8.',
      timing: '10–15 Minutes Transit',
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172634083.jpg?k=5897f12b0962f8928b41b60769db64aa1f46fda321e27da2a43010c87fae651c&o=&hp=1',
      icon: <Car className="w-4 h-4" />,
    },
    {
      category: 'CULINARY FREEDOM',
      title: 'Fresh Catch & In-Suite Kitchenette',
      description:
        'Visit the famous Malé Fish Market in the morning for fresh yellowfin tuna, then prepare your own healthy island meals using your private in-room kitchenette.',
      timing: 'Self-Paced Island Living',
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/172989565.jpg?k=6ce86d0338d7418bf68337069309ab9d4b099ae69ef2ac2e399f75122721fa58&o=&hp=1',
      icon: <Fish className="w-4 h-4" />,
    },
  ];

  return (
    <ScrollRevealSection id="experiences" className="py-24 sm:py-28 bg-[#fbf8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="eyebrow">MALÉ ON & OFF THE WATER</span>
            <TypographicSnapIn
              as="h2"
              text="AUTHENTIC ATOLL EXPERIENCES"
              triggerKey={typoTriggerKey}
              delayMultiplier={0.015}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#0a2e45]"
            />
          </div>
          <p className="text-sm text-[#0a2e45]/70 max-w-md leading-relaxed">
            Curate your stay with airport bridge convenience, historic mosque tours, and local seafood markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[290px] gap-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} {...exp} className={(exp.className || '') + ' md:min-h-0'} />
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
