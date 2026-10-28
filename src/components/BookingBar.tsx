import React from 'react';
import { Calendar, Users, Tag, ArrowRight } from 'lucide-react';

export interface BookingState {
  checkin: string;
  checkout: string;
  guests: number;
  roomType: string;
  promoCode?: string;
}

interface BookingBarProps {
  booking: BookingState;
  onBookingChange: (updates: Partial<BookingState>) => void;
  onOpenBooking: () => void;
  currency: string;
}

const fieldLabel = 'flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a2e45]/55';
const fieldInput =
  'w-full bg-transparent border-0 border-b border-[#0a2e45]/15 px-0 py-1.5 text-sm text-[#0a2e45] focus:outline-none focus:border-[#1fb5ac] transition-colors';

export default function BookingBar({ booking, onBookingChange, onOpenBooking, currency }: BookingBarProps) {
  const nights = React.useMemo(() => {
    try {
      const diff = Math.ceil((new Date(booking.checkout).getTime() - new Date(booking.checkin).getTime()) / 86400000);
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  }, [booking.checkin, booking.checkout]);

  const basePricePerNight = booking.roomType === 'deluxe' ? 109 : booking.roomType === 'family' ? 189 : 106;
  const currencySymbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'AED' ? 'AED ' : '$';
  const currencyMultiplier = currency === 'EUR' ? 0.92 : currency === 'GBP' ? 0.78 : currency === 'AED' ? 3.67 : 1;
  const estimatedTotal = Math.round(basePricePerNight * nights * currencyMultiplier);

  return (
    <div id="book" className="relative -mt-16 sm:-mt-14 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onOpenBooking();
        }}
        className="bg-white rounded-xl shadow-[0_24px_50px_-24px_rgba(10,46,69,0.35),0_2px_6px_rgba(10,46,69,0.06)] px-5 py-5 sm:px-7 grid grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_1fr_auto] gap-x-6 gap-y-5 items-end"
      >
        <div className="space-y-1">
          <label htmlFor="checkin" className={fieldLabel}>
            <Calendar className="w-3.5 h-3.5 text-[#1fb5ac]" />
            Check-In
          </label>
          <input
            id="checkin"
            type="date"
            value={booking.checkin}
            onChange={(e) => onBookingChange({ checkin: e.target.value })}
            className={fieldInput}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="checkout" className={fieldLabel}>
            <Calendar className="w-3.5 h-3.5 text-[#1fb5ac]" />
            Check-Out
          </label>
          <input
            id="checkout"
            type="date"
            value={booking.checkout}
            onChange={(e) => onBookingChange({ checkout: e.target.value })}
            className={fieldInput}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="guests" className={fieldLabel}>
            <Users className="w-3.5 h-3.5 text-[#1fb5ac]" />
            Guests
          </label>
          <select
            id="guests"
            value={booking.guests}
            onChange={(e) => onBookingChange({ guests: Number(e.target.value) })}
            className={fieldInput + ' cursor-pointer'}
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4 Guests</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="promo" className={fieldLabel}>
            <Tag className="w-3.5 h-3.5 text-[#1fb5ac]" />
            Promo Code
          </label>
          <input
            id="promo"
            type="text"
            placeholder="Optional"
            value={booking.promoCode || ''}
            onChange={(e) => onBookingChange({ promoCode: e.target.value.toUpperCase() })}
            className={fieldInput + ' uppercase placeholder:normal-case placeholder:text-[#0a2e45]/35'}
          />
        </div>

        <div className="col-span-2 lg:col-span-1 flex flex-col items-stretch gap-1">
          <span className="text-[10px] text-[#0a2e45]/55 tracking-wide lg:text-right">
            {nights} night{nights > 1 ? 's' : ''} · est. <strong className="text-[#0a2e45] tabular-nums">{currencySymbol}{estimatedTotal}</strong>
          </span>
          <button type="submit" className="btn-cta px-6 py-3 text-xs">
            <span>Check Rates</span>
            <ArrowRight className="w-3.5 h-3.5 btn-cta-icon" />
          </button>
        </div>
      </form>
    </div>
  );
}
