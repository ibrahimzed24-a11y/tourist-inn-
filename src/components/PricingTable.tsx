import React from 'react';
import { useCardTilt } from '../hooks/useCardTilt';
import { useMagneticOrbit } from '../hooks/useMagneticOrbit';
import TypographicSnapIn from './TypographicSnapIn';
import ScrollRevealSection from './ScrollRevealSection';
import { Check, Star, Bed, Sparkles, ArrowRight } from 'lucide-react';
import { BookingState } from './BookingBar';

interface PricingTableProps {
  booking: BookingState;
  onSelectTier: (roomType: string) => void;
  currency: string;
  typoTriggerKey?: number;
}

interface TierProps {
  id: string;
  name: string;
  subtitle: string;
  basePriceUSD: number;
  isPopular?: boolean;
  features: string[];
  imageUrl: string;
  nights: number;
  currencySymbol: string;
  currencyMultiplier: number;
  onSelect: () => void;
}

function PricingCard({
  id,
  name,
  subtitle,
  basePriceUSD,
  isPopular = false,
  features,
  imageUrl,
  nights,
  currencySymbol,
  currencyMultiplier,
  onSelect,
}: TierProps) {
  const cardRef = useCardTilt<HTMLDivElement>({ maxTiltDeg: 10, scale: 1.03 });
  const buttonRef = useMagneticOrbit<HTMLButtonElement>({ radius: 32, maxDisplacementRatio: 0.22 });

  const convertedNightly = Math.round(basePriceUSD * currencyMultiplier);
  const totalStay = Math.round(convertedNightly * nights);

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col justify-between rounded-2xl transition-all duration-300 will-change-transform transform-gpu ${
        isPopular
          ? 'bg-[#0d1527] text-white shadow-2xl ring-2 ring-[#ff5a36] lg:-translate-y-2'
          : 'bg-white text-[#0d1527] border border-[#0d1527]/12 shadow-md hover:shadow-xl'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Most Popular Focal Vector Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 inset-x-0 flex justify-center z-20">
          <span className="px-4 py-1 text-[11px] font-mono font-bold uppercase tracking-widest bg-[#ff5a36] text-white rounded-full shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular Choice
          </span>
        </div>
      )}

      {/* Card Header & Preview Image */}
      <div>
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div
            className={`absolute inset-0 ${
              isPopular
                ? 'bg-gradient-to-t from-[#0d1527] via-transparent to-transparent'
                : 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
            }`}
          />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs font-mono uppercase tracking-wider bg-black/40 backdrop-blur px-2.5 py-1 rounded">
              {subtitle}
            </span>
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-7 space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-serif font-bold tracking-tight">
              {name}
            </h3>
            <p className={`text-xs ${isPopular ? 'text-white/70' : 'text-[#0d1527]/65'}`}>
              Queen Bed · Sleeps 2 Guests · En-Suite Bath
            </p>
          </div>

          {/* Pricing Math */}
          <div className="space-y-1 pt-2 border-t border-current/15">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-serif font-bold tracking-tight tabular-nums">
                {currencySymbol}{convertedNightly}
              </span>
              <span className={`text-xs uppercase font-medium ${isPopular ? 'text-white/70' : 'text-[#0d1527]/60'}`}>
                / night
              </span>
            </div>
            <div className={`text-xs font-mono ${isPopular ? 'text-amber-300' : 'text-amber-800'}`}>
              {nights} night stay: <strong>{currencySymbol}{totalStay}</strong> total
            </div>
          </div>

          {/* Amenities checklist */}
          <ul className="space-y-2.5 pt-2 text-xs">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2.5">
                <div
                  className={`p-1 rounded-full ${
                    isPopular ? 'bg-[#ff5a36]/20 text-[#ff5a36]' : 'bg-[#0d1527]/10 text-[#0d1527]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className={isPopular ? 'text-white/90' : 'text-[#0d1527]/85'}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button with Kinetic Magnet Orbit */}
      <div className="p-6 sm:p-7 pt-0">
        <button
          ref={buttonRef}
          onClick={onSelect}
          className={`w-full py-3.5 px-5 text-xs font-semibold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all will-change-transform shadow-md ${
            isPopular
              ? 'bg-[#ff5a36] hover:bg-[#e04825] text-white'
              : 'bg-[#0d1527] hover:bg-[#1a294d] text-white'
          }`}
        >
          <span>Select This Room</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function PricingTable({
  booking,
  onSelectTier,
  currency,
  typoTriggerKey,
}: PricingTableProps) {
  const nights = React.useMemo(() => {
    try {
      const d1 = new Date(booking.checkin);
      const d2 = new Date(booking.checkout);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  }, [booking.checkin, booking.checkout]);

  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'AED' ? 'AED ' : '$';
  const currencyMultiplier = currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : currency === 'AED' ? 3.67 : 1;

  const tiers: TierProps[] = [
    {
      id: 'superior',
      name: 'Superior Double Room',
      subtitle: 'City View Suite',
      basePriceUSD: 106,
      isPopular: false,
      features: [
        'Private kitchenette & dining corner',
        'En-suite modern bathroom with toiletries',
        'Air-conditioned comfort & flat-screen TV',
        'Electric kettle & complimentary tea/coffee',
        'High-speed Maldivian fiber Wi-Fi',
      ],
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max640x480/882948449.jpg?k=bac54df9ab82d11674c9a3f24277fc280a955499ff6a7ee2e67ea2fca3afde11&o=&hp=1',
      nights,
      currencySymbol,
      currencyMultiplier,
      onSelect: () => onSelectTier('superior'),
    },
    {
      id: 'deluxe',
      name: 'Deluxe Double Room',
      subtitle: 'Premium High Floor',
      basePriceUSD: 109,
      isPopular: true, // Visually highlighted Most Popular tier
      features: [
        'Private kitchenette with microwave & cookware',
        'Balcony city view & natural illumination',
        'Queen plush pillow-top mattress',
        'Espresso machine & mini-bar refrigerator',
        'Priority airport taxi transfer coordination',
        'Daily housekeeping & fresh linens',
      ],
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max640x480/470677745.jpg?k=fb6db8ddeddedde520eeffd4bd688bfafea1e351c3716c90c273e210be00af4a&o=&hp=1',
      nights,
      currencySymbol,
      currencyMultiplier,
      onSelect: () => onSelectTier('deluxe'),
    },
    {
      id: 'family',
      name: 'Executive Family Suite',
      subtitle: 'Triple / Quad Occupancy',
      basePriceUSD: 189,
      isPopular: false,
      features: [
        'Expanded layout accommodating up to 4 guests',
        'Separate dining table & lounge setup',
        'Full kitchenware, microwave & large fridge',
        'Two queen or twin sleeping configurations',
        'Dedicated 24/7 WhatsApp concierge priority',
      ],
      imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/882948455.jpg?k=545f0cf51968728a88644d13f990438b452bf224fd688475e1d04d9008b292e2&o=&hp=1',
      nights,
      currencySymbol,
      currencyMultiplier,
      onSelect: () => onSelectTier('family'),
    },
  ];

  return (
    <ScrollRevealSection id="rooms" className="py-24 bg-[#f2efe9] border-b border-[#051d2d]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header with Typographic Snap-In */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-teal-800 block font-bold">
            TRANSPARENT NIGHTLY PRICING
          </span>
          <TypographicSnapIn
            as="h2"
            text="ACCOMMODATION & SUITES"
            triggerKey={typoTriggerKey}
            delayMultiplier={0.018}
            className="text-3xl sm:text-5xl font-serif font-bold text-[#051d2d]"
          />
          <p className="text-sm sm:text-base text-[#051d2d]/70 font-normal leading-relaxed">
            Transparent pricing with zero hidden city charges. Enjoy private kitchenettes, airport bridge convenience, and verified 8.8/10 guest hospitality.
          </p>
        </div>

        {/* 3-Column Pricing Grid with Highlighted Most Popular Tier */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {tiers.map((tier) => (
            <PricingCard key={tier.id} {...tier} />
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
