import React from 'react';
import TypographicSnapIn from './TypographicSnapIn';
import ScrollRevealSection from './ScrollRevealSection';
import { Check, Star, Sparkles, ArrowRight } from 'lucide-react';
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
  const convertedNightly = Math.round(basePriceUSD * currencyMultiplier);
  const totalStay = Math.round(convertedNightly * nights);

  return (
    <article
      className={
        'group relative flex flex-col overflow-hidden rounded-2xl transition-shadow duration-500 ' +
        (isPopular
          ? 'bg-[#0a2e45] text-white shadow-[0_30px_60px_-30px_rgba(10,46,69,0.6)] ring-1 ring-[#c9a96e]/70 lg:-translate-y-4'
          : 'bg-white text-[#0a2e45] shadow-[0_18px_40px_-28px_rgba(10,46,69,0.35)] hover:shadow-[0_28px_50px_-26px_rgba(10,46,69,0.45)]')
      }
    >
      <div className="relative h-60 w-full overflow-hidden">
        <img src={imageUrl} alt={name} loading="lazy" referrerPolicy="no-referrer" className="zoom-img w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e45]/70 via-transparent to-transparent" />
        {isPopular && (
          <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] bg-[#c9a96e] text-[#0a2e45] rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Most Popular Choice
          </span>
        )}
        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs">
          <span className="uppercase tracking-[0.18em]">{subtitle}</span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />
            4.9 / 5
          </span>
        </div>
      </div>

      <div className="p-7 flex-1 flex flex-col gap-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-serif font-semibold">{name}</h3>
          <p className={'text-xs ' + (isPopular ? 'text-white/65' : 'text-[#0a2e45]/60')}>
            Queen Bed · Sleeps 2 Guests · En-Suite Bath
          </p>
        </div>

        <div className={'pt-4 border-t ' + (isPopular ? 'border-white/15' : 'border-[#0a2e45]/10')}>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-serif tabular-nums">{currencySymbol}{convertedNightly}</span>
            <span className={'text-xs uppercase tracking-wider ' + (isPopular ? 'text-white/60' : 'text-[#0a2e45]/55')}>/ night</span>
          </div>
          <div className={'text-xs mt-1 ' + (isPopular ? 'text-[#e9d3a6]' : 'text-[#8a6d3b]')}>
            {nights} night stay: <strong>{currencySymbol}{totalStay}</strong> total
          </div>
        </div>

        <ul className="space-y-2.5 text-[13px] flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className={'w-4 h-4 mt-0.5 shrink-0 ' + (isPopular ? 'text-[#7fdcd0]' : 'text-[#1fb5ac]')} />
              <span className={isPopular ? 'text-white/85' : 'text-[#0a2e45]/80'}>{feature}</span>
            </li>
          ))}
        </ul>

        <button onClick={onSelect} className="btn-cta w-full py-3.5 text-xs">
          <span>Select This Room</span>
          <ArrowRight className="w-3.5 h-3.5 btn-cta-icon" />
        </button>
      </div>
    </article>
  );
}

export default function PricingTable({ booking, onSelectTier, currency, typoTriggerKey }: PricingTableProps) {
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
      isPopular: true,
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
    <ScrollRevealSection id="rooms" className="py-24 sm:py-28 bg-[#f3ead9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="eyebrow">TRANSPARENT NIGHTLY PRICING</span>
          <TypographicSnapIn
            as="h2"
            text="ACCOMMODATION & SUITES"
            triggerKey={typoTriggerKey}
            delayMultiplier={0.018}
            className="text-3xl sm:text-5xl font-serif font-semibold text-[#0a2e45]"
          />
          <p className="text-sm sm:text-base text-[#0a2e45]/70 leading-relaxed">
            Transparent pricing with zero hidden city charges. Enjoy private kitchenettes, airport bridge convenience, and verified 8.8/10 guest hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <PricingCard key={tier.id} {...tier} />
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}
